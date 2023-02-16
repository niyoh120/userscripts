// ==UserScript==
// @name         Capture video url
// @namespace    https://github.com/niyoh120/userscripts
// @version      0.2
// @description  Capture video url
// @author       niyoh
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM_registerMenuCommand
// ==/UserScript==


'use strict';
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

(() => {
    waitForElm("video").then(() => {
        const video_tags = document.getElementsByTagName("video");
        let video_map = new Map();
        for (let tag of video_tags) {
            video_map.set(tag.id, []);
            if (tag.currentSrc) {
                video_map.get(tag.id).push(tag.currentSrc);
            }
            if (tag.src) {
                video_map.get(tag.id).push(tag.src);
            }
        }

        let video_url_string = "";
        for (const [name, urls] of video_map.entries()) {
            console.log(name, urls);
            video_url_string += `${name}\n`;
            for (let url of urls) {
                video_url_string += `${url}\n`;
            }
            video_url_string += "\n";
        }

        let showResult = () => {
            let pane = document.createElement("div");
            pane.id = "videourlpane";
            pane.style.cssText = `width: 520px; font-size: 14px; position: fixed; color: #000; z-index: 9999999999;
            box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5); border: 1px solid #CCC; background: rgba(255, 255, 255, 0.9);
            border-top-right-radius: 2px; border-bottom-left-radius: 2px; padding: 10px; left: 0; right: 0; top: 0;
            bottom: 0; margin: auto; font-family: "Arial"; height: 400px; max-height: 90%; overflow: auto;
            text-align: center;`;
            pane.innerText = video_url_string;
            document.body.appendChild(pane);
        };

        GM_registerMenuCommand("Capture video url", (_) => {
            let pane = document.getElementById("videourlpane");
            if (pane) {
                pane.remove();
            } else {
                showResult();
            }
        });

    });
})();
