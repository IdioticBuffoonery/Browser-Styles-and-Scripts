// ==UserScript==
// @name         RawDiscordImageSize
// @namespace    RawDiscordImageSize.user.js
// @version      1.0.0
// @description  Removes the width and height parameters from the URL of Discord image attachments to make them bigger
// @author       HBIDamian
// @updateURL    https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/discord/RawDiscordImageSize.user.js
// @downloadURL  https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/discord/RawDiscordImageSize.user.js
// @match        https://media.discordapp.net/attachments/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=discord.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var url = window.location.href;
    var newUrl = url.replace(/&width=\d+/, '').replace(/&height=\d+/, '');
    if (url != newUrl) {
        window
            .open(newUrl, '_self')
        return;
    }
})();
