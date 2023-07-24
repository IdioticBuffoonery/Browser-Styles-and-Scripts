// ==UserScript==
// @name         A Clean Twitter Feed!
// @namespace    cleanTwitterFeed.user.js
// @version      1.8.0
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
        if(document.querySelector('a[aria-label="Communities (New items)"] div div div[aria-label*="unread"')){
            document.querySelector('a[aria-label="Communities (New items)"] div div div[aria-label*="unread"').remove();
        }
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

        const oldTwitterLogo = 'M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z';
        const xLogo = document.querySelectorAll('svg g path[d="M14.258 10.152L23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293l-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0"]');
        Array.from(xLogo)
            .forEach(elm => {
            elm.setAttribute('d', oldTwitterLogo);
            elm.parentElement.parentElement.setAttribute('viewBox', "0 0 250 200");
        })
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