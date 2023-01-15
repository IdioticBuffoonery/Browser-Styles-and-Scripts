// ==UserScript==
// @name         Volume-Up-To-Eleven!
// @namespace    Volume-Up-To-Eleven.user.js
// @version      1.1.0
// @updateURL    https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/general/Volume-Up-To-Eleven.user.js
// @downloadURL  https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/general/Volume-Up-To-Eleven.user.js
// @description  Boost volume on various websites. Websites I've included work for me with this script.
// @author       padenot & HBIDamian
// @run-at       document-body
// @match        *://*.facebook.com/*
// @match        *://*.incompetech.com/*
// @match        *://*.onedrive.live.com/*
// @match        *://*.twitter.com/*
// @match        *://*.vimeo.com/*
// @match        *://*.youtube.com/*
// @icon         https://cdn-icons-png.flaticon.com/512/4349/4349708.png
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';
    GM_registerMenuCommand("1. Mute", muteVolume, "1");
    GM_registerMenuCommand("2. Normal volume", normalVolume, "2");
    GM_registerMenuCommand("3. Crank the volume up to 11!", volTo11, "3");
    GM_registerMenuCommand("4. ⚠️ Blast my Ears off! ⚠️", goodbyeEarsVolume, "4");

    var goodbyeEarsCount = 0;

    // Parameters:
    // volumeUpToControl(varGain, varThreshold, varRatio)
    function muteVolume(){
        volumeUpToControl("-0.0", "-0", "0");
    }

    function normalVolume(){
        volumeUpToControl("1", "-24", "12.0");
    }

    function volTo11(){
        volumeUpToControl("10.0", "-24", "20.0");
    }

    function goodbyeEarsVolume(){
        if (confirm('⚠️ Warning! ⚠️\n\rThis maxes out the gain, threshold and ratio.\nThe result will make it very (possibly dangerously) loud.\n\r Press OK to use it.')) {
            volumeUpToControl("100.0", "100", "100.0");
        }
    }

    /*
    The Following code has been borrowed from https://github.com/padenot/up-to-eleven/blob/master/up-to-eleven.js#L27-L48

    Copyright 2018 Paul Adenot
    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
    1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
    THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
    IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
    HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */
    function volumeUpToControl(varGain, varThreshold, varRatio) {
        console.log(`Gain: ${varGain}\nThreshold: ${varThreshold}\nRatio: ${varRatio}`);
        if (!window.__ac) {
            window.__ac = new AudioContext();
        }

        // brick-wall limiter to avoid output saturation.
        // This one has a makeup gain stage built-in
        // https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode
        var comp = new DynamicsCompressorNode(window.__ac, {ratio: varRatio, threshold: varThreshold});

        // Increase the gain quite a lot.
        // Maybe it would be good to make it configurable.
        // https://developer.mozilla.org/en-US/docs/Web/API/GainNode/GainNode
        var gain = new GainNode(window.__ac, {gain: varGain});
        if (!window.__source) {
            var element = document.querySelector("video,audio");
            window.__source = new MediaElementAudioSourceNode(window.__ac, { mediaElement: element});
        } else {
            window.__source.disconnect();
        }
        window.__source.connect(gain).connect(comp).connect(window.__ac.destination);
        undefined;
    }
})();
