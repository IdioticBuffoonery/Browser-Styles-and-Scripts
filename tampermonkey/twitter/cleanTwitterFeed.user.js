// ==UserScript==
// @name         A Clean Twitter Feed!
// @namespace    cleanTwitterFeed.user.js
// @version      1.0.0
// @description  Elon Musk wishes he hired me...
// @author       You
// @updateURL    https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/twitter/cleanTwitterFeed.user.js
// @downloadURL  https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/twitter/cleanTwitterFeed.user.js
// @match        *://*.twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const phrasesToRemove = [
        'Carol Vorderman',
        'Manchester United',
        'Matt Hancock',
        '#imaceleb'
    ];
    var tweets = document.querySelectorAll('article[data-testid="tweet"]');

    takeOutTheTrash();
    setInterval(takeOutTheTrash, 500);

    function takeOutTheTrash(){
        if(document.querySelector('[data-testid="sidebarColumn"]')){
            document.querySelector('[data-testid="sidebarColumn"]').remove();
        }
        if(document.querySelector('[data-testid="primaryColumn"]')){
            document.querySelector('[data-testid="primaryColumn"]').style.maxWidth = "100%";
        }
        if(document.querySelector('[aria-label="Timeline: Your Home Timeline"]')){
            document.querySelector('[aria-label="Timeline: Your Home Timeline"]').parentElement.parentElement.parentElement.style.maxWidth = "100%";
        }

        for (let i = 0; i < phrasesToRemove.length; ++i) {
            Array.from(document.querySelectorAll('article[data-testid="tweet"]'))
                .filter(elm => elm.textContent.includes(phrasesToRemove[i]))
                .forEach(rmElm => rmElm.parentElement.parentElement.parentElement.remove())
        }
    }
})();
