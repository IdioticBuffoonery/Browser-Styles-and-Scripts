// ==UserScript==
// @name         Facebook: Automate Clear Video Watch History
// @namespace    facebookAutomateClearVideoHistory.user.js
// @version      1.0.0
// @description  Automating Facebook's "Clear Video Watch History" becuase doing it manually can take hours.
// @author       You
// @updateURL    https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/facebook/facebookAutomateClearVideoHistory.user.js
// @downloadURL  https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/facebook/facebookAutomateClearVideoHistory.user.js
// @match        https://www.facebook.com/*/allactivity?activity_history=*&category_key=VIDEOWATCH&*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=facebook.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    querySelectorIncludesText("span", "Clear Video Watch History").click();
    setTimeout(function() {
        document.querySelector('div[aria-label="Clear Video Watch History"]').click();
        setTimeout(function() {
            window.location.reload(true);
        }, 200);
    }, 200);


    function querySelectorIncludesText (selector, text){
        return Array.from(document.querySelectorAll(selector))
            .find(el => el.textContent.includes(text));
    }
})();
