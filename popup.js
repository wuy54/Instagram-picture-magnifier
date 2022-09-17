
let displayProfile = document.getElementById("profilePic");
let displayStoryPost = document.getElementById("storyPostPic");
let displayMultiPicPost = document.getElementById("postMultiPic");
let picURL;
let postURLs;

displayProfile.addEventListener("click", async() => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: displayProfilePic,
    });

});

displayStoryPost.addEventListener("click", async() => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: displayStryPstPic,
    });

});

displayMultiPicPost.addEventListener("click", async() => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: displayMultiPicPst,
    });

});

function displayProfilePic() {

    picURL = document.querySelector('[class="_aadp"]');

    if(!picURL) {
        console.log("THIS IS NOT A PRIVATE ACCOUNT")
        picURL = document.querySelector('[class="_aa8j"]');
    }

    chrome.runtime.sendMessage({ cmd: "displayNow", data: { value: picURL.src } },
        function (response) {
            console.log(response);
        });
}

function displayStryPstPic() {

    picURL = document.querySelector('[class="_aa63"]');

    if(!picURL) {
        picURL = document.querySelector('[class="_aa63 _ac51"]');
    }

    if(!picURL) {

        postURLs = document.querySelectorAll('[class="_aagt"]');
        picURL = postURLs[postURLs.length - 1]

    }


    chrome.runtime.sendMessage({ cmd: "displayNow", data: { value: picURL.src } },
        function (response) {
            console.log(response);
        });
}


function displayMultiPicPst() {

    postURLs = document.querySelectorAll('[class="_aagt"]');
    picURL = postURLs[postURLs.length - 2]

    chrome.runtime.sendMessage({ cmd: "displayNow", data: { value: picURL.src } },
        function (response) {
            console.log(response);
        });
}