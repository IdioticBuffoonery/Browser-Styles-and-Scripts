// Based on https://webapps.stackexchange.com/a/137482
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function deleteLikedVideos() {
    'use strict';
    var items = document.querySelectorAll('div[aria-label="Action options"][role="button"]');
    var out;

    for (var i = 0; i < items.length; i++) {
        items[0].click();
        out = setTimeout(function () {
            var xpath = "//span[text()='Delete']/..";
            var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            matchingElement.click();
        }, 1000);
        await sleep(2000); // sleep cause browser can not handle the process
        clearTimeout(out);
    }
}
deleteFBWatchedVideos();