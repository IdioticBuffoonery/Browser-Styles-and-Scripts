// ==UserScript==
// @name         Google Search Blacklist Filter
// @namespace    googleSearch.user.js
// @version      1.0.1
// @description  Removes/Blacklists domains from Google Search results (even Google Images, Videos and News!)
// @author       HBIDamian
// @match        *://*.google.com/search?q=*
// @match        *://*.google.co*.*/search?q=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Useful for checking if on google's other pages
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // If the url on top of the Url Title includes any of the following, it will remove them.
    // There may occasionally be false positives, or remove social media posts which include the links within them.
    const links = [
        'pinterest.com',
        'quora.com',
    ];
    takeOutTheTrash();
    setInterval(takeOutTheTrash, 1000);

    // This will simply remove the searches from the page.
    // On Google's main page, it'll not replace the search.
    function takeOutTheTrash(){
        for (let i = 0; i < links.length; ++i) {
            var searches = document.querySelectorAll(`a[href*="${links[i]}"]`);
            if (searches != "" || searches != null) {
                if (searches.length > 0) {
                    for (let j = 0; j < searches.length; ++j) {
                        // If Google Image Search
                        if (urlParams.get("tbm") == "isch") {
                            searches[j].parentElement.remove(searches[j]);
                        } else {
                            searches[j].parentElement.parentElement.parentElement.remove(searches[j]);
                        }
                    }
                }
            }
        }
    }
})();
