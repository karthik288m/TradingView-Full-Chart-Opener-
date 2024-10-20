// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.url) {
        // Create a new tab with the modified URL
        chrome.tabs.create({ url: request.url, index: sender.tab.index + 1 }); // Open the new tab next to the current one
    }
});
