// ==UserScript==
// @name         TempFix for fullscreen from Theatre Mode 
// @namespace    YouTubeTheaterModeTempFix.user.js
// @version      0.1
// @description  This script is a temporary fix to YouTube's bug of black screen when using fullscreen from Theater mode. It's more of a discourager really.
// @author       HBIDamian
// @updateURL    https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/youtube/YouTubeTheaterModeTempFix.user.js
// @downloadURL  https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/youtube/YouTubeTheaterModeTempFix.user.js
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    var fullScreenButton = document.querySelector('button[aria-keyshortcuts="f"]');
    var exitFullScreenButton = document.querySelector('button[data-title-no-tooltip="Exit full screen"]');
    var clonedButton = fullScreenButton.cloneNode(true);
    fullScreenButton.parentNode.replaceChild(clonedButton, fullScreenButton);
    let text;

    clonedButton.addEventListener('click', function(){

        if(getCookie("wide") == 1){
            if (confirm("YouTube's fullscreen is broken when you use theater mode into fullscreen, so this script disables the function.\r\r\n\nPress Yes to reload with theater mode disabled.\nPress no to continue regardless. \r\n\nIf you're sometimes stuck on fullscreen, click the \"ESC\" key to escape.") == true) {
                text = "You pressed OK!";
                document.querySelector('button[class="ytp-size-button ytp-button"][title="Default view (t)"]').click();
                clonedButton.parentNode.replaceChild(fullScreenButton, clonedButton);
                //location.reload(true);
            } else {
                text = "You canceled!";
            }
            console.log(text);
        } else {
            document.querySelector('video').parentElement.parentNode.requestFullscreen({ navigationUI: "show" })
        }
    });

    //thanks https://stackoverflow.com/a/4825695 for the function
    function getCookie(c_name) {
        let c_start;
        let c_end;
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }
})();
