// ==UserScript==
// @name         A Clean Twitter Feed!
// @namespace    cleanTwitterFeed.user.js
// @version      1.20.0
// @description  𝕏 Sucks. Twitter Inc. was GOAT
// @author       HBIDamian
// @updateURL    https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/twitter/cleanTwitterFeed.user.js
// @downloadURL  https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/twitter/cleanTwitterFeed.user.js
// @match        *://*.twitter.com/*
// @match        *://*.x.com/*
// @icon         https://pbs.twimg.com/media/F2FnWZeXgAEMa2H?format=png&name=small
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Apply custom styles to the scrollbar
    const ss = document.styleSheets[0];
    ss.insertRule('::-webkit-scrollbar {width: 10px; height: 10px;}', 0);
    ss.insertRule('::-webkit-scrollbar-corner {background: rgb(29, 155, 240); height: unset; width: unset;}', 0);
    ss.insertRule('::-webkit-scrollbar-track {background: rgb(29, 155, 240);}', 0);
    ss.insertRule('::-webkit-scrollbar-thumb {background: rgb(7, 82, 133);}', 0);
    ss.insertRule('::-webkit-scrollbar-thumb:hover {background: rgb(13, 116, 186);}', 0);

    // Phrases to remove and promoted phrases
    // Please note that the removed posts may still count against the rate limits.
    const phrasesToRemove = [
        '@elonmusk',
        'elon musk',
        'Manchester United',
        'Carol Volderman',
        '𝕏'
    ];
    const promotedPhrases = ['Promoted', 'Advertisement'];

    // As Twitter is removing the ability to change the theme,
    // This part will set the theme to light mode,
    // assuming they don't remove this ability too.
    // These values are used to set the theme
    // 0 = Light Mode
    // 1 = Dim Mode
    // 2 = Lights out
    const displayMode = 2;
    var night_mode_cookie = document.cookie.split(';').filter((item) => item.includes('night_mode='));
    if (night_mode_cookie.length > 0) {
        var night_mode_cookie_value = night_mode_cookie[0].split('=')[1];
        if (night_mode_cookie_value != displayMode) {
            document.cookie = 'night_mode=' + displayMode + '; path=/; domain=.twitter.com';
        }
    } else {
        document.cookie = 'night_mode=' + displayMode + '; path=/; domain=.twitter.com';
    }

    takeOutTheTrash();
    replaceTheJunk();

    // Define a MutationObserver configuration
    const observerConfig = {
        // Watch for changes in the child nodes of the target
        childList: true,
        // Watch for changes in the entire subtree of the target
        subtree: true
    };

    // Create a MutationObserver
    const observer = new MutationObserver((mutationsList, observer) => {
        // Call your functions when mutations occur
        takeOutTheTrash();
        replaceTheJunk();
    });

    // Start observing the document or a specific element (change 'document' to the target element if needed)
    observer.observe(document, observerConfig);

    // Main function to remove unwanted elements from the page
    function takeOutTheTrash() {
        // Remove elements related to unread communities
        const unreadCommunitiesElement = document.querySelector('a[aria-label="Communities (New items)"] div div div[aria-label*="unread"]');
        if (unreadCommunitiesElement) {
            unreadCommunitiesElement.remove();
        }

        const trendingTab = document.querySelector('div[aria-label="Timeline: Trending now"]');
        if (trendingTab) {
            trendingTab.parentElement.parentElement.parentElement.remove();
        }

        const subToPremiumElement = document.querySelector('aside[aria-label="Subscribe to Premium"]');
        if (subToPremiumElement) {
            subToPremiumElement.parentElement.remove();
        }

        // In <nav role="navigation"> replace <a href="/i/grok" aria-label="Grok"> with <a href="https://chat.openai.com" aria-label="ChatGPT">
        const grokElement = document.querySelector('nav[role="navigation"] a[href="/i/grok"]');
        if (grokElement) {
            // Clone the element and replace the href attribute
            const chatGptElement = grokElement.cloneNode(true);
            chatGptElement.href = 'https://chat.openai.com';
            chatGptElement.setAttribute('aria-label', 'ChatGPT');

            const spanElement = chatGptElement.querySelector('div span');
            if (spanElement) {
                spanElement.textContent = 'ChatGPT';
            }
            const svgElement = chatGptElement.querySelector('svg');
            if (svgElement) {
                var svgClasses = svgElement.getAttribute('class');
                svgElement.outerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" class="'+ svgClasses + '" data-testid="icon"><g><path d="M1.996 5.5c0-1.38 1.119-2.5 2.5-2.5h15c1.38 0 2.5 1.12 2.5 2.5v13c0 1.38-1.12 2.5-2.5 2.5h-15c-1.381 0-2.5-1.12-2.5-2.5v-13zm2.5-.5c-.277 0-.5.22-.5.5v13c0 .28.223.5.5.5h15c.276 0 .5-.22.5-.5v-13c0-.28-.224-.5-.5-.5h-15zm8.085 5H8.996V8h7v7h-2v-3.59l-5.293 5.3-1.415-1.42L12.581 10z"></path></g></svg>';
            }
            grokElement.replaceWith(chatGptElement);
            grokElement.remove();
        }

        // Remove tweets containing specific phrases
        for (let i = 0; i < phrasesToRemove.length; ++i) {
            Array.from(document.querySelectorAll('article[data-testid="tweet"]'))
                .filter(elm => elm.textContent.toLowerCase().includes(phrasesToRemove[i].toLowerCase()))
                .forEach(rmElm => rmElm.parentElement.parentElement.parentElement.innerHTML = '');
        }

        // Remove elements containing promoted phrases
        for (let ii = 0; ii < promotedPhrases.length; ++ii) {
            Array.from(document.querySelectorAll('[data-testid="placementTracking"]'))
                .filter(elm => elm.textContent.toLowerCase().includes(promotedPhrases[ii].toLowerCase()))
                .forEach(rmElm => rmElm.parentElement.parentElement.innerHTML = '');
        }

        // Replace the X logo with a custom logo (oldTwitterLogo)
        const oldTwitterLogo = 'M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z';
        const xLogo = document.querySelectorAll('svg g path[d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"]');
        Array.from(xLogo).forEach(elm => {
            elm.setAttribute('d', oldTwitterLogo);
            elm.parentElement.parentElement.setAttribute('viewBox', "0 0 250 200");
            elm.parentElement.parentElement.style.setProperty('color', 'rgb(29, 161, 243)', 'important');
            // document.querySelector('a[href="/i/verified-choose"]').firstChild.firstChild.firstChild.style.setProperty('color', 'rgb(29, 161, 243)', 'important');
            if (elm.parentElement.parentElement.parentElement.parentElement.parentElement === document.querySelector('a[href="/i/verified-choose"]')) {
                elm.parentElement.parentElement.style.setProperty('color', 'rgba(231,233,234,1.00)', 'important');
            }
        });
        document.querySelector('a[href="/i/verified-choose"]');
    }

    // Function to replace "Twitter" with "Titter" in the page title for the lols.
    // Also now replaces "Tweet" Buttons. This is a functioning placeholder ready for when he replaces the word "tweet"
    // Also now replaces 𝕏 with Old twitter logo
    function replaceTheJunk() {
        const pageTitle = document.title;
        var newTitle = pageTitle.replace(/ \/ X/g, ' / Twitter').replace(/on X:/g, 'on Twitter:');
        if (pageTitle === 'X') {
            document.title = 'Twitter';
            newTitle = 'Twitter';
        }
        // replace svg[aria-label="Verified account"] with a poop emoji
        Array.from(document.querySelectorAll('svg[aria-label="Verified account"]')).forEach(rmElm => (rmElm.outerHTML = '💩'));

        if (newTitle !== pageTitle) {
            document.title = newTitle;
        }

        if (document.querySelector('[role="button"][data-testid*="tweetButton"]')) {
            Array.from(document.querySelectorAll('[role="button"][data-testid*="tweetButton"] span span'))
                .forEach(elm => elm.textContent = elm.textContent.replace(/Post/g, 'Tweet'));
        }

        if (document.querySelectorAll('a[href*="/compose/"] div span')) {
            Array.from(document.querySelectorAll('a[href*="/compose/"] div span'))
                .forEach(elm => elm.textContent = elm.textContent.replace(/Post/g, 'Tweet'));
        }

        // Attempt to bring back "Retweet"
        if (document.querySelectorAll('div[role="group"] div a[role="link"] span span')) {
            Array.from(document.querySelectorAll('div[role="group"] div a[role="link"] span span'))
                .forEach(elm => elm.textContent = elm.textContent.replace(/Repost/g, 'Retweet'));
        }

        if (document.querySelectorAll('h2[role="heading"] > span')) {
            Array.from(document.querySelectorAll('h2[role="heading"] > span'))
                .forEach(elm => elm.textContent.replace(/Reposted/g, 'Retweeted'));
        }

        // Find the image elements with the specific source URL
        const images = document.querySelectorAll('img[src="https://pbs.twimg.com/profile_images/1683899100922511378/5lY42eHs_bigger.jpg"]');

        // Convert NodeList to an array using Array.from
        Array.from(images).forEach(image => {
            // Create a new text node with the desired symbol
            const symbolNode = document.createTextNode('');

            // Replace the parent element of the image with the text node
            image.parentNode.parentNode.parentNode.parentNode.replaceWith(symbolNode);
        });

        // Find the nav element with aria-label "footer"
        var footerNav = document.querySelector('nav[aria-label="Footer"]');

        // Check if footerNav exists
        if (footerNav) {
            // Find all divs within footerNav
            var divs = footerNav.querySelectorAll('div');

            // Iterate through each div to find the one containing the span with "$year$ Blorpo."
            divs.forEach(function (div) {
                var span = div.querySelector('span');
                if (span && span.textContent.includes("X Corp")) {
                    span.textContent = span.textContent.replace("X Corp", "Twitter Inc");
                }
            });
        }
        document.querySelector('link[rel="shortcut icon"]').setAttribute('href', '//abs.twimg.com/favicons/twitter.2.ico');
    }
})();
