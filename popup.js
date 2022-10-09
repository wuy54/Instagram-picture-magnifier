let displayProfile = document.getElementById("profilePic");
let displayStoryPost = document.getElementById("storyPostPic");
let displayMultiPicPost = document.getElementById("postMultiPic");
let displayStoryVid = document.getElementById("story");
let displayVSCO = document.getElementById("vsco");
let picURL;
let postURLs;

displayProfile.addEventListener("click", async() => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: displayProfilePic,
    });

});

displayVSCO.addEventListener("click", async() => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: displayVSCOpic,
    });

});

displayStoryVid.addEventListener("click", async() => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: displayVidStory,
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

    // private account profile pic
    picURL = document.querySelector('[class="_aadp"]');

    if(!picURL) {
        console.log("THIS IS NOT A PRIVATE ACCOUNT")
        // public account profile pic
        picURL = document.querySelector('[class="_aa8j"]');
    }

    chrome.runtime.sendMessage({ cmd: "displayNow", data: { value: picURL.src } },
        function (response) {
            console.log(response);
        });
}

function displayStryPstPic() {

    // pic story
    picURL = document.querySelector('[class="_aa63 _ac51"]');

    if(!picURL) {
        // thumbnail of video story
        picURL = document.querySelector('[class="_aa63"]');
    }

    if(!picURL) {

        // last pic in multiple pics post
        postURLs = document.querySelectorAll('[class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3"]');
        picURL = postURLs[postURLs.length - 1]

    }


    chrome.runtime.sendMessage({ cmd: "displayNow", data: { value: picURL.src } },
        function (response) {
            console.log(response);
        });
}

// in progress, kinda works but does not fetch the highest quality pics
function displayVSCOpic() {

    postURLs = document.querySelectorAll('[style="padding-top: 133.333%;"]');

    for (let i = 0; i < postURLs.length; ++i) {
        picURL = postURLs[i].querySelector("img");

        chrome.runtime.sendMessage({ cmd: "displayNow", data: { value: picURL.src } },
            function (response) {
                console.log(response);
            });
    }

}

function displayVidStory() {
    // vid story
    const vid = document.querySelector('[class="_aa63  _ac3u"]');
    let vidURL = vid.querySelector("source");

    chrome.runtime.sendMessage({ cmd: "displayNow", data: { value: vidURL.src } },
        function (response) {
            console.log(response);
        });
}


function displayMultiPicPst() {

    // the current pic
    postURLs = document.querySelectorAll('[class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3"]');
    picURL = postURLs[postURLs.length - 2]

    chrome.runtime.sendMessage({ cmd: "displayNow", data: { value: picURL.src } },
        function (response) {
            console.log(response);
        });
}