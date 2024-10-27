// ==UserScript==
// @name         RemovePeskyYTShit
// @namespace    RemovePeskyYTShit.user.js
// @version      1.3.0
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

    var used = false;

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

        // Remove Shorts sections
        // Select all ytd-rich-section-renderer elements
        const sections = document.querySelectorAll('ytd-rich-section-renderer');
        // Iterate over each section
        sections.forEach(section => {
            // Check if it contains a span with the text "Shorts"
            const shortsSpan = Array.from(section.querySelectorAll('span')).find(span => span.textContent.trim() === 'Shorts');

            // If found, remove the ytd-rich-section-renderer
            if (shortsSpan) {
                section.remove();
            }
        });

        // Remove "Shorts" from the sidebar
        const sidebarItems = document.querySelectorAll('ytd-guide-entry-renderer');
        // document.querySelector('ytd-guide-entry-renderer  a[title="Shorts"]').parentNode
        sidebarItems.forEach(sidebarItem => {
            const shortsLink = sidebarItem.querySelector('a[title="Shorts"]');
            if (shortsLink) {
                sidebarItem.remove();
            }
        });

        // If url contains "shorts" then go to last non-shorts video in browser's history
        if (window.location.href.includes('shorts') && !used) {
            used = true;
            window.history.go(-1);
        }

        // Find the <yt-formatted-string> element with the exact text "About"
        const aboutElement = [...document.querySelectorAll('yt-formatted-string')]
        .find(el => el.textContent.trim() === "About");

        // If the element exists, access its nested <tp-yt-paper-dialog> element
        const dialogElement = aboutElement ? aboutElement.closest('tp-yt-paper-dialog') : null;

        // Remove continuation items excluding those inside dialogElement
        const elements = document.querySelectorAll('ytd-continuation-item-renderer');
        const commentSections = document.querySelectorAll('ytd-comments');

        elements.forEach(element => {
            const isInsideCommentSection = Array.from(commentSections).some(commentSection => commentSection.contains(element));
            const isInsideDialogElement = dialogElement && dialogElement.contains(element);

            if (!isInsideCommentSection && !isInsideDialogElement) {
                element.remove();
            }
        });

    };

    // Run the function on window load
    window.addEventListener('load', takeOutTheTrash);

    // Create a MutationObserver to watch for changes in the document
    const observer = new MutationObserver(takeOutTheTrash);
    observer.observe(document.body, observerConfig);
})();
