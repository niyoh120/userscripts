// ==UserScript==
// @name         Capture video url
// @namespace    https://github.com/niyoh120/userscripts
// @version      0.3
// @description  Capture video url
// @author       niyoh
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM_registerMenuCommand
// ==/UserScript==

'use strict'
function waitForElm (selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  })
}

;(() => {
  waitForElm('video').then(() => {
    const video_tags = document.getElementsByTagName('video')
    let video_map = new Map()
    for (let tag of video_tags) {
      video_map.set(tag.id, [])
      if (tag.currentSrc) {
        video_map.get(tag.id).push(tag.currentSrc)
      }
      if (tag.src) {
        video_map.get(tag.id).push(tag.src)
      }
    }

    let video_url = ''
    for (const [name, urls] of video_map.entries()) {
      console.log(name, urls)
      video_url += `${name}\n`
      for (let url of urls) {
        video_url += `${url}\n`
      }
      video_url += '\n'
    }

    // 创建一个带有拷贝按钮的文本块
    function createCopyTextBlock (text) {
      const container = document.createElement('div')
      container.style.position = 'fixed'
      container.style.top = '0'
      container.style.left = '0'
      container.style.width = '100%'
      container.style.height = '100%'
      container.style.display = 'flex'
      container.style.justifyContent = 'center'
      container.style.alignItems = 'center'
      container.style.zIndex = '999999999'

      const textBlock = document.createElement('p')
      textBlock.textContent = text
      textBlock.style.padding = '10px'
      textBlock.style.border = '1px solid #ccc'
      textBlock.style.borderRadius = '5px'
      textBlock.style.zIndex = '999999999'

      container.appendChild(textBlock)

      const copyButton = document.createElement('button')
      copyButton.textContent = 'Copy'
      copyButton.style.marginTop = '10px'
      container.appendChild(copyButton)

      copyButton.addEventListener('click', function () {
        copyToClipboard(textBlock.textContent)
      })

      // 添加点击事件监听器
      document.addEventListener('click', function (event) {
        // 检查点击的位置是否在 container 之外
        if (!textBlock.contains(event.target)) {
          container.remove()
        }
      })

      document.body.appendChild(container)
    }

    // 拷贝文本到剪贴板
    function copyToClipboard (text) {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    let showResult = () => {
      createCopyTextBlock(video_url) // 创建一个带有拷贝按钮的文本块
    }

    GM_registerMenuCommand('Capture video url', _ => {
      let pane = document.getElementById('videourlpane')
      if (pane) {
        pane.remove()
      } else {
        showResult()
      }
    })
  })
})()
