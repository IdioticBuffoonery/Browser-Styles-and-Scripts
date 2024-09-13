// ==UserScript==
// @name         A Clean Twitter Feed!
// @namespace    cleanTwitterFeed.user.js
// @version      1.21.0
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

    const isFirefox = typeof InstallTrigger !== 'undefined';

    // Apply custom styles to the scrollbar
    const ss = document.styleSheets[0];

    if (!isFirefox) {
        // WebKit (Chrome, Safari)
        ss.insertRule('::-webkit-scrollbar {width: 10px; height: 10px;}', 0);
        ss.insertRule('::-webkit-scrollbar-corner {background: rgb(29, 155, 240); height: unset; width: unset;}', 0);
        ss.insertRule('::-webkit-scrollbar-track {background: rgb(29, 155, 240);}', 0);
        ss.insertRule('::-webkit-scrollbar-thumb {background: rgb(7, 82, 133);}', 0);
        ss.insertRule('::-webkit-scrollbar-thumb:hover {background: rgb(13, 116, 186);}', 0);
    } else {
        // Firefox
        document.documentElement.style.setProperty('--scrollbar-width', '10px');
        document.documentElement.style.setProperty('--scrollbar-track-color', 'rgb(29, 155, 240)');
        document.documentElement.style.setProperty('--scrollbar-thumb-color', 'rgb(7, 82, 133)');

        // Apply the rules for Firefox
        ss.insertRule('* { scrollbar-width: var(--scrollbar-width); scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-track-color); }', 0);
    }

    // Phrases to remove and promoted phrases
    // Please note that the removed posts may still count against the rate limits.
    const phrasesToRemove = [
        '@elonmusk',
        'elon musk',
        'Carol Vorderman',
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

    window.addEventListener('DOMContentLoaded', () => {
        takeOutTheTrash();
        replaceTheJunk();
        observer.observe(document, observerConfig);
    });
    
    // Define a MutationObserver configuration
    const observerConfig = {
        // Watch for changes in the child nodes of the target
        childList: true,
        // Watch for changes in the entire subtree of the target
        subtree: true
    };

    // Create a MutationObserver
    let timeout;
    const observer = new MutationObserver((mutationsList, observer) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            takeOutTheTrash();
            replaceTheJunk();
        }, 200); // Adjust the delay as necessary
    });


    // Start observing the document or a specific element (change 'document' to the target element if needed)
    observer.observe(document, observerConfig);

    function takeOutTheTrash() {
        const fragment = document.createDocumentFragment();
    
        // Remove unread communities
        const unreadCommunitiesElement = document.querySelector('a[aria-label="Communities (New items)"] div div div[aria-label*="unread"]');
        if (unreadCommunitiesElement) {
            fragment.appendChild(unreadCommunitiesElement);
        }
    
        const trendingTab = document.querySelector('div[aria-label="Timeline: Trending now"]');
        if (trendingTab) {
            fragment.appendChild(trendingTab.parentElement.parentElement.parentElement);
        }
    
        const subToPremiumElement = document.querySelector('aside[aria-label="Subscribe to Premium"]');
        if (subToPremiumElement) {
            fragment.appendChild(subToPremiumElement.parentElement);
        }
    
        const premiumSignUp = document.querySelector('[href="/i/premium_sign_up"]');
        if (premiumSignUp) {
            fragment.appendChild(premiumSignUp);
        }
    
        // Remove tweets containing specific phrases
        const tweets = document.querySelectorAll('article[data-testid="tweet"]');
        tweets.forEach(tweet => {
            if (phrasesToRemove.some(phrase => tweet.textContent.toLowerCase().includes(phrase.toLowerCase()))) {
                fragment.appendChild(tweet);
            }
        });
    
        // Remove elements containing promoted phrases
        const promotions = document.querySelectorAll('[data-testid="placementTracking"]');
        promotions.forEach(promotion => {
            if (promotedPhrases.some(phrase => promotion.textContent.toLowerCase().includes(phrase.toLowerCase()))) {
                fragment.appendChild(promotion);
            }
        });
    
        // Batch remove elements
        fragment.childNodes.forEach(node => node.remove());
    
    

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
                svgElement.outerHTML = '<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="' + svgClasses + '"role="img"><text x="-9999" y="-9999">ChatGPT</text><path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" fill="currentColor"></path></svg>';
            }
            grokElement.replaceWith(chatGptElement);
            grokElement.remove();
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
