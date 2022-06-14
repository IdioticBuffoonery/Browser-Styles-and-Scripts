// ==UserScript==
// @name         vers.social stuff
// @namespace    vers.social-stuff.user.js
// @version      0.2
// @description  A few stuff that I think would be useful to me when using the site
// @author       HBIDamian
// @match        *://*.vers.social/*
// @icon         https://vers.social/static/images/logo_white.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Disconnect Vers.social Oscillator (Because it hurts me to even visit the site at the moment...)
    setInterval(function() {
        oscillator.disconnect();
        gainNode.disconnect();
    }, 450);   
})();
