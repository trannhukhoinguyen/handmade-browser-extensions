chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get(["enabled"], (data) => {
        const newStatus = !data.enabled;
        chrome.storage.sync.set({ enabled: newStatus });

        chrome.action.setBadgeText({
            text: newStatus ? "ON" : ""
        });
        chrome.action.setBadgeBackgroundColor({ color: "#4CAF50" });
    });
});

// Set badge mặc định khi extension load
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ enabled: false });
    chrome.action.setBadgeText({ text: "" });
});
