// ==UserScript==
// @name         Filter Invert PDF
// @namespace    InvertFilterPDF.user.js
// @version      1.0.0
// @description  A simple invert filter for a pdf document. (ONLY USEFUL IN SCENARIOS WHERE YOUR EYES HURT BUT YOU HAVE TO KEEP READING)
// @author       HBIDamian
// @match        *://*/*.pdf
// @icon         https://img.icons8.com/ios-filled/2x/ffffff/pdf-window.png
// @grant        all
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector('embed').style = "position: absolute; left: 0; top: 0; filter: invert(1);";
})();
