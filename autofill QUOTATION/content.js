// ==============================
// CORE: set value chuẩn cho React/Vue controlled input
// ==============================
function setInputValue(el, value) {
    if (!el) return;

    const setter =
        Object.getOwnPropertyDescriptor(el, "value")?.set ||
        Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value")?.set;

    setter?.call(el, value);

    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
}

// ==============================
// 🔍 FIND FIELD (FIX CHUẨN)
// ==============================
function getField(labelText) {
    const labels = document.querySelectorAll(".ant-form-item-label label");

    for (let label of labels) {
        const title = label.getAttribute("title")?.trim();

        if (title === labelText) {
            const id = label.getAttribute("for");

            // 👉 BEST: dùng id mapping
            if (id) {
                const el = document.getElementById(id);
                if (el) return el;
            }

            // 👉 fallback
            return label.closest(".ant-form-item")?.querySelector("input, textarea");
        }
    }

    return null;
}

// ==============================
// 🔢 INPUT NUMBER
// ==============================
function getNumberField(labelText) {
    const labels = document.querySelectorAll(".ant-form-item-label label");

    for (let label of labels) {
        if (label.getAttribute("title")?.trim() === labelText) {
            return label
                .closest(".ant-form-item")
                ?.querySelector(".ant-input-number-input");
        }
    }
}

// ==============================
// 📅 DATE PICKER (FIX readonly)
// ==============================
function setDate(labelText, dateStr) {
    const input = getField(labelText);
    if (!input) return;

    // 1. open picker
    input.click();

    // 2. đợi dropdown render
    setTimeout(() => {
        const cell = document.querySelector(
            `.ant-picker-cell[title="${dateStr}"]`
        );

        if (cell) {
            cell.click();
        } else {
            console.warn("❌ Date not found:", dateStr);
        }
    }, 300);
}

// ==============================
// 🔽 SELECT (AntD)
// ==============================
function selectOption(labelText, keyword = "") {
    const labels = document.querySelectorAll(".ant-form-item-label label");

    for (let label of labels) {
        if (label.getAttribute("title")?.trim() === labelText) {
            const formItem = label.closest(".ant-form-item");
            const selector = formItem?.querySelector(".ant-select-selector");

            if (!selector) return;

            selector.click();

            // ⏳ đợi dropdown render
            setTimeout(() => {
                const options = document.querySelectorAll(".ant-select-item-option");

                for (let opt of options) {
                    if (
                        opt.innerText
                            .toLowerCase()
                            .includes(keyword.toLowerCase())
                    ) {
                        opt.click();
                        break;
                    }
                }
            }, 500);
        }
    }
}

// ==============================
// 📝 CKEditor
// ==============================
function setCKEditor(value, index = 0) {
    const editors = document.querySelectorAll(".ck-editor__editable");
    const editor = editors[index];
    if (!editor) return;

    editor.focus();

    // simulate typing
    editor.innerHTML = value;

    editor.dispatchEvent(new InputEvent("input", {
        bubbles: true,
        inputType: "insertText",
        data: value
    }));
}

// ==============================
// ⏳ WAIT UNTIL DOM READY (QUAN TRỌNG)
// ==============================
function waitForForm(callback, retries = 10) {
    const el = document.querySelector(".ant-form-item");

    if (el) {
        callback();
    } else if (retries > 0) {
        setTimeout(() => waitForForm(callback, retries - 1), 500);
    } else {
        console.warn("❌ Form not found");
    }
}

// ==============================
// 🚀 AUTOFILL
// ==============================
function autofill() {
    console.log("🔥 Autofill running...");

    setInputValue(getField("Title (EN)"), "Amazing Mekong Tour");
    setInputValue(getField("Short title (EN)"), "Mekong Tour");

    setInputValue(getField("Title (VI)"), "Tour Mekong tuyệt vời");
    setInputValue(getField("Short title (VI)"), "Tour Mekong");

    // select cần delay vì async data
    setTimeout(() => selectOption("Tour", "mekong"), 3000);

    setDate("Departure at", "2026-04-01");

    setInputValue(getNumberField("Number of Pax (person/people)"), "10");

    setInputValue(getField("Tour guide"), "Nguyen Van A");
    setInputValue(getField("Specially prepared for"), "VIP Client");

    setInputValue(getField("Starting - Ending points"), "HCMC - Mekong");
    setInputValue(getField("Arrival flight"), "VN123");
    setInputValue(getField("Departure flight"), "VN456");

    setInputValue(getField("Transportation"), "Private Car");
    setInputValue(getField("Accommodation"), "4-star Hotel");

    setInputValue(getField("Special Diet"), "Vegetarian");
    setInputValue(getField("Special Request"), "No spicy food");

    setInputValue(getField("Tour type"), "Private Tour");

    setTimeout(() => {
        setCKEditor("<p>This is a note for the tour</p>", 0);
        setCKEditor("<p>Included: Hotel, Transport...</p>", 1);
    }, 1000);
}

// ==============================
// RUN
// ==============================
// waitForForm(autofill);



// Lắng nghe phím tắt hoặc thông điệp (tùy chọn)
// Ở đây ta có thể chạy ngay bằng cách nhấn Alt + Shift + F (ví dụ)
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey && e.code === 'KeyF') {
        autofill();
    }
});
