// Hàm logic sẽ được thực thi trên trang web
function autofillLogic(targetValue) {
  const inputs = document.querySelectorAll('input.ant-input-number-input:not([disabled])');
  
  inputs.forEach(input => {
    let valueToFill;
    
    if (targetValue === 'MAX') {
      valueToFill = input.getAttribute('aria-valuemax');
    } else {
      // Đảm bảo không điền quá điểm tối đa của ô đó
      const max = parseFloat(input.getAttribute('aria-valuemax')) || 999;
      valueToFill = Math.min(parseFloat(targetValue), max);
    }

    if (valueToFill !== null && !isNaN(valueToFill)) {
      input.value = valueToFill;
      // Kích hoạt sự kiện để React/AntD cập nhật dữ liệu
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
}

// Bắt sự kiện click trên giao diện Popup
document.getElementById('fillMax').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: autofillLogic,
    args: ['MAX']
  });
});

document.getElementById('fillCustom').addEventListener('click', async () => {
  const val = document.getElementById('customValue').value;
  if (!val) return alert("Vui lòng nhập số!");

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: autofillLogic,
    args: [val]
  });
});
