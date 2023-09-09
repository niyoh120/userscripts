// ==UserScript==
// @name         给bgm.tv增加资源搜索功能
// @namespace    https://github.com/niyoh120/userscripts
// @version      0.1
// @description  给bgm.tv增加资源搜索功能
// @author       niyoh
// @match        https://bgm.tv/anime/list/*/collect*
// @match        https://bangumi.tv/anime/list/*/collect*
// ==/UserScript==

await (async function () {
  'use strict'
  document
    .querySelector('ul#browserItemList')
    .querySelectorAll('li')
    .forEach(item => {
      let needHandle = false
      item.querySelectorAll('p.collectInfo > span.tip').forEach(tipTag => {
        if (needHandle) {
          return
        }
        const content = tipTag.textContent.trim()
        if (content.startsWith('标签: ')) {
          needHandle = content
            .replace('标签: ', '')
            .trim()
            .split(' ')
            .includes('里番')
        }
      })
      if (!needHandle) {
        return
      }
      const titleTag = item.querySelector('h3')
      let originTitle = titleTag.textContent.trim()
      const originTitleTag = titleTag.querySelector('small')
      if (originTitleTag && originTitleTag.textContent.trim()) {
        originTitle = originTitleTag.textContent.trim()
      }
      let small = document.createElement('small')
      small.setAttribute('class', 'grey')
      let a = document.createElement('a')
      a.textContent = '在hanime1.me上搜索'
      a.href =
        'https://hanime1.me/search?query=' + encodeURIComponent(originTitle)
      small.appendChild(a)
      titleTag.appendChild(small)
    })
})()
