document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // عرض شاشة التحميل
    document.getElementById("loadingScreen").style.visibility = "visible";

    // مؤقت لمحاكاة تحميل، وبعده سيتم التوجيه للداشبورد
    setTimeout(() => {
        window.location.href = "dashboard.html"; // وجه المستخدم لصفحة الداشبورد
    }, 5000); // مدة التحميل 2 ثانية
});
const loginForm = document.getElementById('loginForm');
        
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // تحقق من اسم المستخدم وكلمة المرور
    if (username === 'HASHISH' && password === '963852') {
        // تخزين حالة تسجيل الدخول في الجلسة
        sessionStorage.setItem('loggedIn', 'true');
        // توجيه المستخدم إلى الصفحة الرئيسية (مثلاً dashboard.html)
        window.location.href = 'dashboard.html';
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
});