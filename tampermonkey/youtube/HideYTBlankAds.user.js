// ==UserScript==
// @name         HideYTBlankAds
// @namespace    HideYTBlankAds.user.js
// @version      0.1
// @description  Hide the blank advert space on the main YouTube page when using adblockers or Brave browser.
// @author       HBIDamian
// @include      *://*.youtube.com/
// @include      *://youtube.com/
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var a = document.querySelector(".style-scope .ytd-display-ad-renderer");
    setInterval(function(){
        while(a){
            try{
                document.querySelector(".style-scope .ytd-display-ad-renderer").parentElement.parentElement.parentElement.remove();
                console.warn("\n\n\nBlank Advert Deleted!\n\n\n");

                break
            } catch(err){
                console.warn("\n\n\nNo Blank Advert Detected.\n\n\n")
                break
            }
        }
    }, 500);
})();
