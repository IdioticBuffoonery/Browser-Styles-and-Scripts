// ==UserScript==
// @name         RemovePeskyYTShit
// @namespace    https://hbidamian.xyz
// @version      1.0.0
// @description  Removes various shit on YouTube
// @author       HBIDamian
// @match        *://*.youtube.com*
// @match        *://youtube.com*
// @match        *://*.youtube.com/*
// @match        *://youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const observerConfig = {
        childList: true,
        subtree: true
    };
    const observer = new MutationObserver((mutationsList, observer) => {
        takeOutTheTrash();
    });
    observer.observe(document, observerConfig);

    function takeOutTheTrash() {
        // Removes YouTube Playables Games
        document.querySelectorAll('[title="YouTube Playables"]').forEach(element => {
            let parent = element.closest('ytd-rich-shelf-renderer');
            if (parent) {
                parent.remove();
            }
        });

        // Removes "Includes Paid Promotions" popup from the home screen of YouTube
        // (Makes it easier so it doesn't redirect to https://support.google.com/youtube/answer/10588440 on mouse middle click
        // If you need it off the video too, do the same with div[class^="ytp-paid-content-overlay"]
        document.querySelectorAll('div[class^="YtInlinePlayerControlsTopLeftControls"]').forEach(element => {
            element.remove();
        });
    }
})();
