// ==UserScript==
// @name         给bgm.tv增加资源搜索功能
// @namespace    https://github.com/niyoh120/userscripts
// @version      0.3
// @description  给bgm.tv增加资源搜索功能
// @author       niyoh
// @match        https://bgm.tv/anime/list/*/*
// @match        https://bangumi.tv/anime/list/*/*
// ==/UserScript==

'use strict'
;(() => {
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

      const resources = [
        {
          name: 'tmdb',
          searchURL: 'https://www.themoviedb.org/search/tv?query='
        },
        {
          name: 'hanime1.me',
          searchURL: 'https://hanime1.me/search?query='
        }
      ]
      let small = document.createElement('small')
      small.setAttribute('class', 'grey')
      resources.forEach(resource => {
        let a = document.createElement('a')
        a.textContent = `在${resource['name']}上搜索`
        a.href = resource['searchURL'] + encodeURIComponent(originTitle)
        small.appendChild(a)
        small.appendChild(document.createElement('br'))
      })
      titleTag.appendChild(document.createElement('br'))
      titleTag.appendChild(small)
    })
})()
