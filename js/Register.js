document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    // جمع البيانات من النموذج
    const formData = new FormData(event.target);
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });

    // تخزين البيانات في localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    // إنشاء معلومات URL لتمريرها إلى صفحة تسجيل الدخول
    const params = new URLSearchParams({
      username: userData.username,
      password: userData.password
    });

    // تحويل المستخدم إلى صفحة تسجيل الدخول مع المعلومات
    window.location.href = `login.html?${params.toString()}`;
  });