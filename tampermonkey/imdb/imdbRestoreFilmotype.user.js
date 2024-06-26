// ==UserScript==
// @name         IMDb Restore Filmotype
// @namespace    imdbRestoreFilmotype.user.js
// @version      0.1.1
// @description  Restore IMDb's "Filmotype" to actor's pages. PROOF OF CONCEPT.
// @author       HBIDamian
// @updateURL    https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/imdb/imdbRestoreFilmotype.user.js
// @downloadURL  https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/imdb/imdbRestoreFilmotype.user.js
// @match        https://www.imdb.com/name/*/
// @match        https://www.imdb.com/name/*/?ref*
// @run-at       document-start
// @icon         https://www.google.com/s2/favicons?sz=128&domain=imdb.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var url = document.location.origin + document.location.pathname;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'fullcredits', true);
    xhr.responseType = 'document';
    xhr.send();
    xhr.onload = function(e) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://m.media-amazon.com/images/S/sash/-lPdqp5$JsFH4kP.css';
        document.head.appendChild(link);

        var othersite = e.target.responseXML;
        var getDiv = othersite.getElementById('full_credits_content');
        var getContent = getDiv.innerHTML;

        var getMyDiv = document.querySelector('section.ipc-page-section.ipc-page-section--base');
        getMyDiv.innerHTML = getContent;

        // This does add the scripts, but the site doesn't run this:     onclick="toggleFilmoCategory(this);"
        var otherPageScripts = othersite.querySelectorAll('script:not([id="ads_tarnhelm"])[src^="https://m.media-amazon.com/images/S/sash/"]');
        Array.from(otherPageScripts)
            .forEach(addElm => document.head.appendChild(addElm));
    }
})();
