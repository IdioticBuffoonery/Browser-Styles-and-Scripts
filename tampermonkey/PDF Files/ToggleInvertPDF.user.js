// ==UserScript==
// @name         Toggle Invert PDF
// @namespace    ToggleInvertPDF.user.js
// @version      1.1.0
// @description  A simple invert filter for a pdf document. (USEFUL IN SCENARIOS WHERE YOUR EYES HURT BUT YOU HAVE TO KEEP READING)
// @author       HBIDamian
// @match        *://*/*.pdf
// @run-at       document-start
// @icon         https://img.icons8.com/ios-filled/2x/ffffff/pdf-window.png
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';
    GM_registerMenuCommand("Toggle Invert", invertPDF);
    invertPDF();
    function invertPDF(){
        var x=document.querySelector("embed");"invert(1)"==x.style.filter?document.querySelector("embed").style="position: absolute; left: 0; top: 0; filter: invert(0)":document.querySelector("embed").style="position: absolute; left: 0; top: 0; filter: invert(1)";
    }
})();
