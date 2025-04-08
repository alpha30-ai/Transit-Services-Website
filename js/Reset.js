// reset_password.js

document.getElementById("reset-password-form").addEventListener("submit", function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة
  
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    // التحقق من تطابق كلمة المرور مع التأكيد
    if (newPassword !== confirmPassword) {
      alert("كلمة المرور غير متطابقة. حاول مجددًا.");
      return;
    }
  
    // إرسال كلمة المرور الجديدة إلى الخادم
    fetch('https://your-api-url.com/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword: newPassword })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("تم تغيير كلمة المرور بنجاح.");
        window.location.href = 'Login.html'; // العودة إلى صفحة تسجيل الدخول
      } else {
        alert("حدث خطأ أثناء تغيير كلمة المرور.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("حدث خطأ في الاتصال بالخادم.");
    });
  });
  