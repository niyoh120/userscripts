// ==UserScript==
// @name         使用aria2下载hanime1.me的视频合集
// @namespace    https://github.com/niyoh120/userscripts/hanime1.me.user.js
// @version      0.2
// @description  使用aria2下载hanime1.me的视频合集
// @author       niyoh
// @match        https://hanime1.me/watch*
// @connect      *
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @grant        GM_listValues
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @require      https://cdn.jsdelivr.net/npm/js-base64@3.7.5/base64.min.js
// ==/UserScript==

await (async function () {
  'use strict'

  const defaultConfig = {
    'aria2-rpc-address': 'https://localhost:6800/jsonrpc',
    'aria2-rpc-secret': '',
    'aria2-download-path': '/downloads'
  }

  function getCollectTitle () {
    const titleSelector = '#video-playlist-wrapper h4'
    const titleTag = document.querySelector(titleSelector)
    if (!titleTag) {
      throw new Error(`Invalid title selector ${titleSelector}`)
    }
    const title = titleTag.textContent
    if (!title) {
      throw new Error(`Invalid title`)
    }
    return title
  }

  function getDownloadPageURL (watchURL) {
    // 获取当前页面的 URL
    const url = new URL(watchURL)
    const baseURL = url.origin

    const params = url.searchParams
    let videoID = params.get('v')
    let downloadPageURL = `${baseURL}/download?v=${videoID}`

    return downloadPageURL
  }

  function getAllDownloadPageURL () {
    const urlTagList = document
      .querySelector('#video-playlist-wrapper')
      .querySelectorAll('a.overlay')
    if (urlTagList.length === 0) {
      throw new Error(`Invalid url selector ${urlSelector}`)
    }
    const urlList = Array.from(urlTagList).map(tag => {
      return getDownloadPageURL(tag.href)
    })
    return urlList
  }

  async function getDownloadInfo (downloadPageURL) {
    const resp = await fetch(downloadPageURL)
    const data = await resp.text()
    const iframe = document.createElement('iframe')
    iframe.srcdoc = data
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    await new Promise(resolve => (iframe.onload = resolve))
    const doc = iframe.contentDocument

    try {
      const titleSelector =
        '#content-div > div.row.no-gutter.video-show-width.download-panel > div.col-md-12 > div > div > h3'
      const titleTag = doc.querySelector(titleSelector)
      if (!titleTag) {
        throw new Error(`no title for download page ${downloadPageURL}`)
      }
      const title = titleTag.textContent
      const urlSelector = 'table.download-table a'
      const urlTag = doc.querySelector(urlSelector)
      if (!urlTag) {
        throw new Error(`no url for download page ${downloadPageURL}`)
      }
      const url = urlTag.href
      return {
        title: title,
        url: url
      }
    } catch (error) {
      throw error
    } finally {
      iframe.remove()
    }
  }

  async function addDownloadTask (collectTitle, downloadInfoList) {
    const aria2RPCAddress = GM_getValue(
      'aria2-rpc-address',
      defaultConfig['aria2-rpc-address']
    )
    console.log(aria2RPCAddress)
    const aria2RPCSecret = GM_getValue(
      'aria2-rpc-secret',
      defaultConfig['aria2-rpc-secret']
    )
    console.log(aria2RPCSecret)
    const aria2DownloadPath = GM_getValue(
      'aria2-download-path',
      defaultConfig['aria2-download-path']
    )
    console.log(aria2DownloadPath)

    // TODO:测试连接

    let url = new URL(aria2RPCAddress)

    const params = downloadInfoList.map(info => {
      return {
        method: 'aria2.addUri',
        id: 'hanime1.me',
        params: [
          `token:${aria2RPCSecret}`,
          [info.url],
          {
            dir: `${aria2DownloadPath}/${collectTitle}`,
            out: `${info.title}.mp4`
          }
        ]
      }
    })
    console.log(params)
    url.search = new URLSearchParams({
      params: Base64.encode(JSON.stringify(params))
    })
    console.log(url.toString())
    const resp = await fetch(url)
    console.log(await resp.json())
  }

  async function downloadCollection () {
    const collectTitle = getCollectTitle()
    console.log(collectTitle)
    const urlList = getAllDownloadPageURL()
    console.log(urlList)
    const downloadInfoList = await Promise.all(
      urlList.map(url => {
        return getDownloadInfo(url)
      })
    )
    console.log(downloadInfoList)
    await addDownloadTask(collectTitle, downloadInfoList)
  }

  async function downloadOne () {
    const collectTitle = getCollectTitle()
    console.log(collectTitle)
    const urlList = [getDownloadPageURL(window.location.href)]
    const downloadInfoList = await Promise.all(
      urlList.map(url => {
        return getDownloadInfo(url)
      })
    )
    console.log(downloadInfoList)
    await addDownloadTask(collectTitle, downloadInfoList)
  }

  function getDownloadPageURL (watchURL) {
    // 获取当前页面的 URL
    const url = new URL(watchURL)
    const baseURL = url.origin

    const params = url.searchParams
    let videoID = params.get('v')
    let downloadPageURL = `${baseURL}/download?v=${videoID}`

    return downloadPageURL
  }

  function modifyConfig () {
    for (const key in defaultConfig) {
      console.log(`${key}: ${GM_getValue(key, defaultConfig[key])}`)
    }
    const configKey = prompt(
      `请输入你想修改的配置项\n可选项有:\n${Object.keys(defaultConfig).join(
        '\n'
      )}`
    )
    if (configKey === null) {
      return
    }

    if (configKey in defaultConfig) {
      const configValue = prompt(
        '请输入你想修改的配置项的值',
        GM_getValue(configKey, defaultConfig[configKey])
      )
      if (configValue === null) {
        return
      }
      GM_setValue(configKey, configValue)
    } else {
      alert('请输入正确的配置项')
    }
    return
  }

  function cleanupConfig () {
    for (const key of GM_listValues()) {
      if ([null, undefined].includes(GM_getValue(key))) {
        GM_deleteValue(key)
      }
    }
  }

  cleanupConfig()
  GM_registerMenuCommand('设置', modifyConfig)
  GM_registerMenuCommand('下载本集', downloadOne)
  GM_registerMenuCommand('下载合集', downloadCollection)
})()
