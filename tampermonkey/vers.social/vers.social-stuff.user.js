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

    //Give the site an icon
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    // link.href = 'https://vers.social/static/images/logo_white.png';
    link.href = 'https://pbs.twimg.com/profile_images/1447665019693551622/1Ad34MT3_400x400.jpg';
    
})();
