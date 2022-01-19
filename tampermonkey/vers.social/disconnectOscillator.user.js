// ==UserScript==
// @name         disconnect Vers.Social Oscillator
// @namespace    disconnectOscillator.user.js
// @version      0.1
// @description  Disconnect Vers.social Oscillator (Because it hurts me to even visit the site at the moment...)
// @author       HBIDamian
// @match        *://*.vers.social/*
// @icon         https://vers.social/static/images/logo_white.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function() {
        oscillator.disconnect();
        gainNode.disconnect();
    }, 450);
})();
