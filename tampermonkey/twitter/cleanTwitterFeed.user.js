// ==UserScript==
// @name         A Clean Twitter Feed!
// @namespace    cleanTwitterFeed.user.js
// @version      1.5.0
// @description  Elon Musk wishes he hired me...
// @author       HBIDamian
// @updateURL    https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/twitter/cleanTwitterFeed.user.js
// @downloadURL  https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/twitter/cleanTwitterFeed.user.js
// @match        *://*.twitter.com/*
// @icon         https://images.livemint.com/img/2022/11/05/600x338/TWITTER-LAYOFFS--Elon_Musk_1667610270597_1667610270851_1667610270851.JPG
// @grant        none
// ==/UserScript==

(function() {
    var ss = document.styleSheets[0];
    ss.insertRule('::-webkit-scrollbar {width:10px; height:10px;}', 0);
    ss.insertRule('::-webkit-scrollbar-corner {background: rgb(29, 155, 240); height: unset; width: unset;}', 0);
    ss.insertRule('::-webkit-scrollbar-track {background: rgb(29, 155, 240);}', 0);
    ss.insertRule('::-webkit-scrollbar-thumb {background: rgb(7, 82, 133);}', 0);
    ss.insertRule('::-webkit-scrollbar-thumb:hover {background: rgb(13, 116, 186);}', 0);
    'use strict';
    const phrasesToRemove = [
        'Carol Vorderman',
        '@elonmusk',
        'elon musk',
        'Manchester United',
        'Matt Hancock',
        '#MattHancock',
        '@MattHancock',
        '#imaceleb'
    ];

    const promotedPhrases = [
        'Promoted',
        'Advertisment'
    ];

    takeOutTheTrash();
    setInterval(takeOutTheTrash, 0);

    function takeOutTheTrash(){
        if(document.querySelector('[data-testid="sidebarColumn"]')){
            document.querySelector('[data-testid="sidebarColumn"]').remove();
        }

        var xpath = "//span[text()='Official']";
        var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if(matchingElement){
            matchingElement.parentElement.parentElement.parentElement.remove();
        }
        if(document.querySelector('img[src^="https://pbs.twimg.com/semantic_core_img/"]')){
            document.querySelector('img[src^="https://pbs.twimg.com/semantic_core_img/"]').parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        }
        if(document.querySelector('[data-testid="primaryColumn"]')){
            document.querySelector('[data-testid="primaryColumn"]').style.setProperty("max-width", "100%", "important");
        }
        if(!(window.location.pathname.startsWith('/messages'))) {
            if(document.getElementsByClassName('r-1ye8kvj')){
                // a class within primaryColumn with max-width.
                Array.from(document.getElementsByClassName('r-1ye8kvj'))
                    .forEach(elm => elm.style.setProperty("max-width", "unset", "important"));
            }
        }
        if(document.querySelector('[aria-label="Timeline: Your Home Timeline"]')){
            document.querySelector('[aria-label="Timeline: Your Home Timeline"]').parentElement.parentElement.parentElement.style.maxWidth = "100%";
        }
        if(document.querySelector('[aria-label="Timeline: Explore"]')){
            document.querySelector('[aria-label="Timeline: Explore"]').parentElement.parentElement.parentElement.style.maxWidth = "100%";
        }
        if(document.querySelector('[aria-label="Timeline: Notifications"]')){
            document.querySelector('[aria-label="Timeline: Notifications"]').parentElement.parentElement.parentElement.parentElement.style.maxWidth = "100%";
        }
        if(document.querySelector('svg[aria-label="Verified account"]')){
            Array.from(document.querySelectorAll('svg[aria-label="Verified account"]'))
                .forEach(rmElm => rmElm.innerHTML = '');
        }
        for (let i = 0; i < phrasesToRemove.length; ++i) {
            Array.from(document.querySelectorAll('article[data-testid="tweet"]'))
                .filter(elm => elm.textContent.toLowerCase().includes(phrasesToRemove[i].toLowerCase()))
                .forEach(rmElm => rmElm.parentElement.parentElement.parentElement.innerHTML = '')
        }
        for (let ii = 0; ii < promotedPhrases.length; ++ii) {
            Array.from(document.querySelectorAll('[data-testid="placementTracking"]'))
                .filter(elm => elm.textContent.toLowerCase().includes(promotedPhrases[ii].toLowerCase()))
                .forEach(rmElm => rmElm.parentElement.parentElement.innerHTML = '');
        }
    }
})();
