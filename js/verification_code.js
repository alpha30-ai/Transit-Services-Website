document.getElementById("verify-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const verificationCode = document.getElementById("verification-code").value;

    if (!verificationCode) {
      alert("يرجى إدخال رمز التحقق.");
      return;
    }

    // إرسال رمز التحقق إلى الخادم
    fetch('https://your-api-url.com/verify-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ verificationCode: verificationCode })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = 'reset-password.html'; // الانتقال إلى صفحة تغيير كلمة المرور
      } else {
        alert("رمز التحقق غير صحيح. حاول مجددًا.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("حدث خطأ في الاتصال بالخادم.");
    });
  });