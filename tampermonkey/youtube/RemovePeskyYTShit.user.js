// ==UserScript==
// @name         RemovePeskyYTShit
// @namespace    RemovePeskyYTShit.user.js
// @version      1.1.0
// @description  Removes various elements on YouTube, including Playables, paid promotions, and continuation items.
// @author       HBIDamian
// @updateURL    https://raw.githubusercontent.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/youtube/RemovePeskyYTShit.user.js
// @downloadURL  https://raw.githubusercontent.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/youtube/RemovePeskyYTShit.user.js
// @match        *://*.youtube.com*
// @match        *://youtube.com*
// @match        *://*.youtube.com/*
// @match        *://youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Configuration for MutationObserver
    const observerConfig = {
        childList: true,
        subtree: true
    };

    // Function to remove unwanted elements
    const takeOutTheTrash = () => {
        // Removes YouTube Playables Games
        document.querySelectorAll('[title="YouTube Playables"]').forEach(element => {
            let parent = element.closest('ytd-rich-shelf-renderer');
            if (parent) {
                parent.remove();
            }
        });

        // Removes "Includes Paid Promotions" popup
        document.querySelectorAll('div[class^="YtInlinePlayerControlsTopLeftControls"]').forEach(element => {
            element.remove();
        });

        // Remove continuation items
        const elements = document.querySelectorAll('ytd-continuation-item-renderer');
        const commentSections = document.querySelectorAll('ytd-comments');

        elements.forEach(element => {
            const isInsideCommentSection = Array.from(commentSections).some(commentSection => commentSection.contains(element));
            if (!isInsideCommentSection) element.remove();
        });
    };

    // Run the function on window load
    window.addEventListener('load', takeOutTheTrash);

    // Create a MutationObserver to watch for changes in the document
    const observer = new MutationObserver(takeOutTheTrash);
    observer.observe(document.body, observerConfig);
})();
