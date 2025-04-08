    // كود JavaScript لإرسال البريد الإلكتروني واستلام الرابط
    document.getElementById("recovery-form").addEventListener("submit", function(event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة
        
        const email = document.getElementById("email").value;
        
        // تحقق من صحة البريد الإلكتروني
        if (!email) {
          alert("يرجى إدخال بريدك الإلكتروني.");
          return;
        }
  
        // إرسال طلب استرداد كلمة المرور إلى الخادم
        fetch('https://your-api-url.com/recover-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert("تم إرسال رابط الاسترداد إلى بريدك الإلكتروني.");
          } else {
            alert("حدث خطأ أثناء إرسال الرابط. حاول مجددًا.");
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert("حدث خطأ في الاتصال بالخادم.");
        });
      });