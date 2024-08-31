// ==UserScript==
// @name         Facebook Break Reminder
// @namespace    facebookBreakReminder.user.js
// @version      1.0.0
// @description  Redirects you to a blank page with a message after 5 minutes of inactivity on Facebook to remind you to take a break.
// @author       HBIDamian
// @updateURL    https://raw.githubusercontent.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/facebook/facebookBreakReminder.user.js
// @downloadURL  https://raw.githubusercontent.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/facebook/facebookBreakReminder.user.js
// @match        *://facebook.com/*
// @match        *://www.facebook.com/*
// @icon         https://techcrunch.com/wp-content/uploads/2011/11/facebook_clock.jpg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var timeoutTime = timeInMinutes(8); // Timeout time in milliseconds (5 minutes by default)

    // Array of messages to randomly choose from
    const messages = [
        "You can do better things with your time!",
        "Step away from Facebook and enjoy the real world!",
        "Go for a walk, you'll feel better!",
        "There's more to life than scrolling!",
        "Time to focus on something productive!",
        "Don't let Facebook control your time!",
        "Social media isn't everything!",
        "Take a break from the endless feed!",
        "You've been scrolling for too long!",
        "You're not missing out on anything!",
    ];

    // Function to change the timeout time from minutes to milliseconds
    function timeInMinutes(minutes) {
        var timeoutTimeConvert = minutes * 60000;
        return timeoutTimeConvert;
    }

    // Function to get a random message
    function getRandomMessage() {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }

    // Function to check if we're on the /messages page
    function isOnMessagesPage() {
        return window.location.pathname.startsWith('/messages');
    }

    // Function to start the timeout
    function startTimeout() {
        return setTimeout(function() {
            if (!isOnMessagesPage()) {
                // Redirect to a blank page with a custom message
                document.head.innerHTML = '';
                document.body.innerHTML = `
                    <div style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background-color: #121212;
                        color: #ffffff;
                        font-family: Arial, sans-serif;
                        font-size: 4em;
                        text-align: center;
                        padding: 20px;
                        box-sizing: border-box;
                    ">
                        <div>
                            <p>🚫 Time to get off Facebook 🚫</p>
                            <p style="font-size: 0.8em !important; margin-top: 20px;">
                                (${getRandomMessage()})
                            </p>
                        </div>
                    </div>
                `;

                // Remove the title of the page to make it feel more blank
                document.title = 'Blocked';
            }
        }, timeoutTime);
    }

    // Variable to store the timeout ID
    let timeoutId = null;

    // Function to reset the timeout if the user navigates to a different page
    function resetTimeout() {
        clearTimeout(timeoutId); // Clear any existing timeout
        if (!isOnMessagesPage()) { // Start a new timeout if not on /messages
            timeoutId = startTimeout();
        }
    }

    // Start the initial timeout when the script loads
    resetTimeout();

    // Monitor URL changes to reset the timeout if necessary
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            resetTimeout();
        }
    }).observe(document, { subtree: true, childList: true });
})();
