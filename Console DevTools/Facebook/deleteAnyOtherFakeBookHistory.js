// Based on https://webapps.stackexchange.com/a/137482
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function yeetThatShit() {
    'use strict';
    var items = document.querySelectorAll('div[aria-label="Action options"][role="button"]');
    var out;
    var out2;
    
    //var option  |  1 = Delete    2 = Recycle Bin 
    const option = 1;

    for (var i = 0; i < items.length; i++) {
        items[0].click();
        out = setTimeout(function () {
            if (option == 1) {
                var xpath = "//span[text()='Delete']";
                var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                matchingElement.click();
            } else if (option == 2){
                var xpath = "//span[text()='Move to Recycle bin']";
                var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                matchingElement.click();
            } else {
                return console.error("Wrong Option");
            }
            out2 = setTimeout(function (){
                if (option == 1) {
                    if(document.querySelectorAll('div[aria-label="Delete"]')[1]){
                        document.querySelectorAll('div[aria-label="Delete"]')[1].click();
                    }
                } else if (option == 2){
                    if (document.querySelectorAll('div[aria-label="Move to Recycle bin"]')[1]){
                        document.querySelectorAll('div[aria-label="Move to Recycle bin"]')[1].click()
                    }
                } else{
                    return console.error("Wrong Option");
                }                
            }, 250);
        }, 250);

        await sleep(750); // sleep because browser can not handle the process otherwise.
        clearTimeout(out);
        clearTimeout(out2);
    }
}
yeetThatShit();
