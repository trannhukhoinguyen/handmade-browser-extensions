function clickViewOriginalButtons() {
    // Lấy tất cả các button có class giống dạng bạn cung cấp
    const buttons = document.querySelectorAll("button.kyuRq.WOKzJe");

    buttons.forEach((btn) => {
        const text = btn.innerText.trim().toLowerCase();

        if (
            text.includes("see original") ||
            text.includes("xem bản gốc")
        ) {
            btn.click();
        }
    });
}

// Lặp kiểm tra mỗi 2 giây, nhưng chỉ click khi extension đang bật
setInterval(() => {
    chrome.storage.sync.get(["enabled"], (data) => {
        if (data.enabled) {
            clickViewOriginalButtons();
        }
    });
}, 2000);
