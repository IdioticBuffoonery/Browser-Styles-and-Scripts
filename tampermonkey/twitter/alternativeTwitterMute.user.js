// ==UserScript==
// @name         Alternative Twitter Mute
// @namespace    alternativeTwitterMute.user.js
// @version      1.1.0
// @description  An alternative to Twitter's "Mute Words" function.
// @author       HBIDamian
// @updateURL    https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/twitter/alternativeTwitterMute.user.js
// @downloadURL  https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/twitter/alternativeTwitterMute.user.js
// @match        *://*.twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const phrasesToRemove = [
        'Will Smith',
        'Chris Rock'
    ];
    const promotedPhrases = [
        'Promoted',
        'Advertisment'
    ];
    takeOutTheTrash();
    setInterval(takeOutTheTrash, 500);

    function takeOutTheTrash(){
        //document.querySelector('div[class^="css-1dbjc4n r-1awozwy r-1kihuf0 r-18u37iz r-1pi2tsx r-1777fci r-1pjcn9w r-xr3zp9 r-1xcajam r-ipm5af r-g6jmlv"]').remove()
        var whatsHappening = document.querySelectorAll('div[class="css-1dbjc4n r-1adg3ll r-1ny4l3l"]');
        var tweets = document.querySelectorAll('article[data-testid="tweet"]');
        var notifications = document.querySelectorAll('div[aria-label="Timeline: Notifications"] div div[class="css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l"]');
        var promotedTweets = document.querySelectorAll('[data-testid="placementTracking"]');

        for (let i = 0; i < phrasesToRemove.length; ++i) {
            Array.from(whatsHappening)
                .filter(elm => elm.textContent.includes(phrasesToRemove[i]))
                .forEach(rmElm => rmElm.remove());
            Array.from(tweets)
                .filter(elm => elm.textContent.includes(phrasesToRemove[i]))
                .forEach(rmElm => rmElm.parentElement.parentElement.parentElement.remove());
            Array.from(notifications)
                .filter(elm => elm.textContent.includes(phrasesToRemove[i]))
                .forEach(rmElm => rmElm.remove());
        }
        for (let ii = 0; ii < promotedPhrases.length; ++ii) {
            Array.from(promotedTweets)
                .filter(elm => elm.textContent.includes(promotedPhrases[ii]))
                .forEach(rmElm => rmElm.parentElement.parentElement.remove());
        }
    }
})();
