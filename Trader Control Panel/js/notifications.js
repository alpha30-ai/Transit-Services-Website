// الحصول على الأزرار والنوافذ المنبثقة
const actionButtons = document.querySelectorAll('.action-btn');
const modals = {
    orderReview: document.getElementById('modalOrderReview'),
    productReview: document.getElementById('modalProductReview'),
    performanceReport: document.getElementById('modalPerformanceReport'),
    securityVerify: document.getElementById('modalSecurityVerify'),
    payment: document.getElementById('modalPayment')
};

// الحصول على أزرار الإغلاق
const closeButtons = {
    orderReview: document.getElementById('closeOrderReview'),
    productReview: document.getElementById('closeProductReview'),
    performanceReport: document.getElementById('closePerformanceReport'),
    securityVerify: document.getElementById('closeSecurityVerify'),
    payment: document.getElementById('closePayment')
};

// إضافة أحداث النقر لكل زر
actionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const actionType = this.closest('tr').querySelector('td').textContent.trim(); // استخراج نوع التنبيه
        const details = this.closest('tr').querySelectorAll('td')[1].textContent.trim(); // استخراج التفاصيل

        // إظهار النافذة المنبثقة بناءً على نوع التنبيه
        if (actionType === "إشعار طلب") {
            document.getElementById('modalOrderReview').style.display = 'block';
        } else if (actionType === "إشعار منتج") {
            document.getElementById('modalProductReview').style.display = 'block';
        } else if (actionType === "إشعار أداء") {
            document.getElementById('modalPerformanceReport').style.display = 'block';
        } else if (actionType === "تنبيه أمني") {
            document.getElementById('modalSecurityVerify').style.display = 'block';
        } else if (actionType === "إشعار دفع") {
            document.getElementById('modalPayment').style.display = 'block';
        }
    });
});

// إغلاق النوافذ عند النقر على زر الإغلاق
Object.values(closeButtons).forEach(button => {
    button.addEventListener('click', function() {
        Object.values(modals).forEach(modal => {
            modal.style.display = 'none';  // إخفاء جميع النوافذ
        });
    });
});

// إغلاق النافذة إذا تم النقر خارجها
window.addEventListener('click', function(event) {
    Object.values(modals).forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none'; // إغلاق النافذة عند النقر خارجها
        }
    });
});
