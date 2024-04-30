// ==UserScript==
// @name         原神祈愿记录
// @namespace    https://github.com/niyoh120/userscripts
// @version      0.1
// @description  在新标签页中打开原神祈愿记录
// @author       niyoh
// @match        https://user.mihoyo.com
// @connect      *
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/core.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/md5.min.js
// ==/UserScript==

'use strict'

function gen_ds () {
  const CLIENT_SALT = 'ulInCDohgEs557j0VsPDYnQaaz6KJcv5'
  const t = Math.floor(Date.now() / 1000)
  const r = Array.from({ length: 6 }, () => Math.random().toString(36)[2]).join(
    ''
  )
  const m = CryptoJS.MD5(`salt=${CLIENT_SALT}&t=${t}&r=${r}`).toString()
  return `${t},${r},${m}`
}

async function open () {
  const timestamp = Math.floor(Date.now() / 1000)

  let url = `https://webapi.account.mihoyo.com/Api/login_by_cookie?`
  let response = await fetch(url + new URLSearchParams({ t: timestamp }), {
    credentials: 'include'
  })
  let data = await response.json()
  data = data.data

  if (data.status !== 1) {
    throw new Error('cookie expired')
  }

  const account_info = data.account_info
  const uid = account_info.account_id
  const token = account_info.weblogin_token

  url = `https://api-takumi.mihoyo.com/auth/api/getMultiTokenByLoginTicket?`
  response = await fetch(
    url +
      new URLSearchParams({
        uid: uid,
        login_ticket: token,
        token_types: '3'
      }),
    { credentials: 'include' }
  )

  data = await response.json()
  data = data.data
  console.log(`resp for getMultiTokenByLoginTicket: ${data}`)

  let stoken = ''
  for (let i = 0; i < data.list.length; i++) {
    if (data.list[i].name === 'stoken') {
      stoken = data.list[i].token
      break
    }
  }

  let cookies = `${document.cookie}; stuid=${uid}; stoken=${stoken}`
  console.log(`cookies for getUserGameRolesByCookie: ${cookies}`)

  url =
    `https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie?` +
    new URLSearchParams({
      game_biz: 'hk4e_cn'
    })

  response = await (function () {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        responseType: 'json',
        cookie: cookies,
        onload: resolve,
        onerror: reject
      })
    })
  })()
  console.log(`resp for getUserGameRolesByCookie: ${response.response}`)

  let dataList = response.response.data.list
  console.log(`dataList for getUserGameRolesByCookie: ${dataList}`)
  data = dataList[0]

  const auth_appid = 'webview_gacha'
  const nickname = data['nickname']
  const game_biz = data['game_biz']
  const game_uid = data['game_uid']
  const region = data['region']
  const req_data = {
    auth_appid: auth_appid,
    nickname: nickname,
    game_biz: game_biz,
    game_uid: game_uid,
    region: region
  }
  const headers = {
    referer: 'https://webstatic.mihoyo.com',
    'x-rpc-app_version': '2.28.1',
    'x-rpc-client_type': '5',
    'x-rpc-device_id': 'CBEC8312-AA77-489E-AE8A-8D498DE24E90',
    'x-requested-with': 'com.mihoyo.hyperion',
    ds: gen_ds()
  }

  url = 'https://api-takumi.mihoyo.com/binding/api/genAuthKey'
  response = await (function () {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'POST',
        url: url,
        data: JSON.stringify(req_data),
        headers: headers,
        responseType: 'json',
        cookie: cookies,
        onload: resolve,
        onerror: reject
      })
    })
  })()
  console.log(response.response)

  data = response.response

  if (data.retcode != 0) {
    throw Error(`genAuthKey failed ${data}`)
  }

  let auth_key = data.data.authkey
  params = {
    win_mode: 'fullscreen',
    authkey_ver: 1,
    sign_type: 2,
    auth_appid: auth_appid,
    init_type: 200,
    timestamp: timestamp,
    lang: 'zh-cn',
    device_type: 'mobile',
    plat_type: 'android'r
    region: region,
    authkey: auth_key,
    game_biz: game_biz
  }

  url =
    'https://webstatic.mihoyo.com/hk4e/event/e20190909gacha-v2/index.html?' +
    new URLSearchParams(params) +
    '#/log'
  console.log(url)

  GM_openInTab(url, { active: true })
}

;(() => {
  const version = '0.1'
  console.log(`script version: ${version}`)

  GM_registerMenuCommand('打开原神祈愿记录', open)
})()
