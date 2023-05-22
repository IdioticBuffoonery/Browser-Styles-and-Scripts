// ==UserScript==
// @name         A Clean Twitter Feed!
// @namespace    cleanTwitterFeed.user.js
// @version      1.7.0
// @description  I'm not buying your shit, Elon!
// @author       HBIDamian
// @updateURL    https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/twitter/cleanTwitterFeed.user.js
// @downloadURL  https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/twitter/cleanTwitterFeed.user.js
// @match        *://*.twitter.com/*
// @icon         https://pbs.twimg.com/media/Fq8gUN7XgAEq-ou?format=png&name=900x900
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var ss = document.styleSheets[0];
    ss.insertRule('::-webkit-scrollbar {width:10px; height:10px;}', 0);
    ss.insertRule('::-webkit-scrollbar-corner {background: rgb(29, 155, 240); height: unset; width: unset;}', 0);
    ss.insertRule('::-webkit-scrollbar-track {background: rgb(29, 155, 240);}', 0);
    ss.insertRule('::-webkit-scrollbar-thumb {background: rgb(7, 82, 133);}', 0);
    ss.insertRule('::-webkit-scrollbar-thumb:hover {background: rgb(13, 116, 186);}', 0);

    const phrasesToRemove = [
        '@elonmusk',
        'elon musk'
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

        if(document.querySelector('svg[aria-label="Verified account"]')){
            Array.from(document.querySelectorAll('svg[aria-label="Verified account"]'))
                .forEach(rmElm => (rmElm.outerHTML = '<h1>💩</h1>'));
        }

        if(document.querySelector('a[href="/i/verified-orgs-signup"]')){
            document.querySelector('a[href="/i/verified-orgs-signup"]').remove();
        }

        if(document.querySelector('a[href="/i/circles"]')){
            document.querySelector('a[href="/i/circles"]').remove();
        }

        if(document.querySelector('a[href="/i/twitter_blue_sign_up"]')){
            document.querySelector('a[href="/i/twitter_blue_sign_up"]').remove();
        }

        if(document.querySelector('[data-testid="primaryColumn"]')){
            document.querySelector('[data-testid="primaryColumn"]').style.setProperty("max-width", "100vw", "important");
        }
        if(!(window.location.pathname.startsWith('/messages'))) {
            if(document.getElementsByClassName('r-1ye8kvj')){
                // a class within primaryColumn with max-width.
                Array.from(document.getElementsByClassName('r-1ye8kvj'))
                    .forEach(elm => elm.style.setProperty("max-width", "100vw", "important"));
            }
        }
        if(document.querySelector('[aria-label="Timeline: Your Home Timeline"]')){
            document.querySelector('[aria-label="Timeline: Your Home Timeline"]').parentElement.parentElement.parentElement.style.maxWidth = "100vw";
        }
        if(document.querySelector('[aria-label="Timeline: Explore"]')){
            document.querySelector('[aria-label="Timeline: Explore"]').parentElement.parentElement.parentElement.style.maxWidth = "100vw";
        }
        if(document.querySelector('[aria-label="Timeline: Notifications"]')){
            document.querySelector('[aria-label="Timeline: Notifications"]').parentElement.parentElement.parentElement.parentElement.style.maxWidth = "100vw";
        }
        const spanElements = document.getElementsByTagName('span');

        // Iterate over the found elements
        for (let i = 0; i < spanElements.length; i++) {
            const span = spanElements[i];

            // Check if the inner text matches the desired text
            if (span.innerText === ' and get access to their exclusive content') {
                const closestArticle = span.closest('article');
                closestArticle.parentElement.remove();
            }
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

    function replaceTwitterWithTitter() {
        var pageTitle = document.title;
        var newTitle = pageTitle.replace(/Twitter/g, 'Titter');
        if (newTitle !== pageTitle) {
            document.title = newTitle;
        }
    }
    setInterval(replaceTwitterWithTitter, 0);
})();
