// ==UserScript==
// @name         YouTube Cookie Paralyzer
// @namespace    youtubeCookieParalyzer.user.js
// @version      0.1
// @description  Automatically rejects cookies on YouTube (And maybe other sites in the future too)
// @author       HBIDamian
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const ZhuLi = setInterval(DoTheThing, 200);
    function DoTheThing() {
        const cookie = [
            document.querySelector('[aria-label="Reject the use of cookies and other data for the purposes described"]'),
            document.querySelector('form[action^="https://consent.youtube"] div div button[aria-label="Reject all"]')
        ];
        if (cookie.some(e => e !== null)) {
                console.log(cookie);
                cookie.forEach(e => {
                    if (e !== null) {
                        e.click();
                        clearInterval(ZhuLi);
                    }
                });
            } else {
                console.log('no cookie');
                setTimeout(function () { clearInterval(ZhuLi); }, 5000);
            }
        }
})();
