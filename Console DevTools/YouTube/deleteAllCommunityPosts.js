// Based on https://webapps.stackexchange.com/a/137482 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function deleteAllCommunityActions() {
    'use strict';
    var items = document.querySelectorAll('ytd-menu-renderer yt-icon-button.dropdown-trigger > button[aria-label="Action menu"]');
    var out;
    var out2;

    for (var i = 0; i < items.length; i++) {
        items[i].click();
        out = setTimeout(function () {
            if (document.querySelector('tp-yt-paper-listbox .ytd-menu-navigation-item-renderer').lastElementChild) {
                document.querySelector('tp-yt-paper-listbox .ytd-menu-navigation-item-renderer').lastElementChild.click();
            }
        }, 100);
        out2 = setTimeout(function () {
            if (document.querySelector('tp-yt-paper-button[aria-label="Delete"]')) {
                document.querySelector('tp-yt-paper-button[aria-label="Delete"]').click();
            }
        }, 250);

        await sleep(500); // sleep cause browser can not handle the process
        clearTimeout(out);
        clearTimeout(out2);
    }
}

deleteAllCommunityActions();
