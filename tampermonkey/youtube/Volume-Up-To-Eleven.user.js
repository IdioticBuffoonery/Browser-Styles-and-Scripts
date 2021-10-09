// ==UserScript==
// @name         Volume-Up-To-Eleven!
// @namespace    Volume-Up-To-Eleven.user.js
// @version      0.2
// @description  Boost Volume!
// @author       padenot & HBIDamian
// @run-at       document-start
// @match        https://www.youtube.com
// @match        https://www.youtube.com/
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';
    GM_registerMenuCommand("1. Normal volume", normal, "1");
    GM_registerMenuCommand("2. Crank the volume up to 11!", volTo11, "2");
    GM_registerMenuCommand("3. ⚠️ Blast my Ears off! ⚠️", goodbyeEars, "3");
    GM_registerMenuCommand("4. Mute", mute, "4");

    // Parameters:
    // volumeControl(varGain, varThreshold, varRatio)
    function normal(){
        volumeControl("1", "-24", "12.0");
    }
    function volTo11(){
        volumeControl("10.0", "-24", "20.0");
    }
    function goodbyeEars(){
        volumeControl("100.0", "100", "100.0");
    }
    function mute(){
        volumeControl("-0.0", "-0", "0");
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
    function volumeControl(varGain, varThreshold, varRatio) {
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
            var element = document.querySelector("video");
            window.__source = new MediaElementAudioSourceNode(window.__ac, { mediaElement: element});
        } else {
            window.__source.disconnect();
        }
        window.__source.connect(gain).connect(comp).connect(window.__ac.destination);
        undefined;
    }
})();
