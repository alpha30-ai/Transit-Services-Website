document.addEventListener('DOMContentLoaded', function() {
  // استخراج المعلومات من URL
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  const password = urlParams.get('password');

  // إذا كانت المعلومات موجودة، قم بملء الحقول
  if (username && password) {
    document.getElementById('username').value = username;
    document.getElementById('password').value = password;
  }

  // تحويل المستخدم إلى الصفحة الرئيسية بعد تسجيل الدخول
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة
    window.location.href = 'index.html'; // تأكد من وجود ملف index.html في نفس المجلد
  });
});