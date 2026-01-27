function fillMaxPoints() {
  // Tìm tất cả các input number của Ant Design không bị disabled
  const inputs = document.querySelectorAll('input.ant-input-number-input:not([disabled])');
  
  if (inputs.length === 0) {
    console.log("Không tìm thấy ô input nào khả dụng!");
    return;
  }

  inputs.forEach(input => {
    // Lấy giá trị tối đa từ thuộc tính aria-valuemax
    const maxValue = input.getAttribute('aria-valuemax');
    
    if (maxValue) {
      // 1. Gán giá trị vào input
      input.value = maxValue;

      // 2. Quan trọng: Ant Design/React cần các sự kiện này để nhận biết thay đổi
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      
      // Giả lập sự kiện blur để hệ thống cập nhật state nếu cần
      input.dispatchEvent(new Event('blur', { bubbles: true }));
    }
  });

  alert(`Đã điền xong ${inputs.length} ô!`);
}

// Lắng nghe phím tắt hoặc thông điệp (tùy chọn)
// Ở đây ta có thể chạy ngay bằng cách nhấn Alt + Shift + F (ví dụ)
document.addEventListener('keydown', (e) => {
  if (e.altKey && e.shiftKey && e.code === 'KeyF') {
    fillMaxPoints();
  }
});
