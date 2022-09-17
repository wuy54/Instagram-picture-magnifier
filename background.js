
let picURL;


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        if (request.cmd === "displayNow") {
            console.log("Display the profile pic");
            picURL = request.data.value;
            sendResponse("URL received");
            chrome.tabs.create({ url: picURL});
        }

    }

);