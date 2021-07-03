// ==UserScript==
// @name         PDF Auto Hide Toolbar
// @namespace    pdfhidetoolbar.user.js
// @version      1.0.0
// @description  Automatically hide the Toolbar
// @author       HBIDamian
// @match        *://*/*.pdf
// @grant        none
// ==/UserScript==
(function($) {
    'use strict';
    var url = new URL(window.location.href);
    if (url.toString().indexOf('#toolbar') === -1) {
        url += '#toolbar=0'
        window.location.replace(url);
        window.location.reload(false); // Cheap workaround, but works nicely.
    } else {
        return false;
    }
})();
