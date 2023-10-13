// ==UserScript==
// @name         YouTube Adblocker Blocker Be Gone
// @namespace    https://hbidamian.xyz
// @version      1.0.0
// @description  YouTube Adblocker Blocker Be Gone is a userscript that removes the adblocker blocker on YouTube videos.
// @author       HBIDamian
// @updateURL    https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/youtube/YouTubeAdblockerBlockerBeGone.user.js
// @downloadURL  https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/youtube/YouTubeAdblockerBlockerBeGone.user.js
// @match        *://*.youtube.com*
// @match        *://youtube.com*
// @match        *://*.youtube.com/*
// @match        *://youtube.com/*
// @icon         https://s3.amazonaws.com/s3.timetoast.com/public/uploads/photo/8976351/image/9f8760a45a6184568e4002a3a55408c6
// @grant        none
// ==/UserScript==

(function () {
    "use strict";
    // This script was made to block the adblocker blocker on YouTube videos.
    // This script was also made with the challenge of not using setTimeout or setInterval.
    // Testing this script was a pain, as YouTube's adblocker blocker dialog doesn't always appear.
    // So, bugs may be present. If you find any, please let me know.
    
    function handleAdblockerBlocker() {
        var closeButton = null;
        var enforcementMessageViewModel = null;
        enforcementMessageViewModel = document.querySelector('ytd-enforcement-message-view-model');
        if (enforcementMessageViewModel && isElementVisible(enforcementMessageViewModel)) {
            closeButton = enforcementMessageViewModel.querySelector('button[aria-label="Close"]');
            if (closeButton && isElementVisible(closeButton)) {
                // click the button.
                closeButton.click();
                console.log("[YTABBG] YouTube adblock blocker has been blocked!");
                // Add an event listener for when the close button's click action is completed
                closeButton.addEventListener("click", function () {
                    var playButton = document.querySelector("button.ytp-play-button.ytp-button");
                    if (playButton) {
                        if (playButton.getAttribute("data-title-no-tooltip") === "Play") {
                            playButton.click(); // Click the play button
                        }
                    }
                });
                console.log("[YTABBG] Closed the AdBlocker Blocker element.");
            }
        }
    }

    function isElementVisible(element) {
        return element.offsetWidth > 0 && element.offsetHeight > 0;
    }

    function observeDOM() {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === "childList") {
                    handleAdblockerBlocker();
                }
            });
            console.log("[YTABBG] A mutation has been observed");
        });

        // Start observing the target node for configured mutations
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Initial DOM observation
    observeDOM();
})();
