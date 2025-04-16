/**
 * نظام الإشعارات - Notifications System
 * يمكن استخدامه في جميع صفحات الموقع
 */

// إنشاء حاوية الإشعارات إذا لم تكن موجودة
function createNotificationContainer() {
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
}

/**
 * عرض إشعار جديد
 * @param {string} message - نص الإشعار
 * @param {string} type - نوع الإشعار (success, error, warning, info)
 * @param {number} duration - مدة ظهور الإشعار بالمللي ثانية (الافتراضي: 5000)
 */
function showNotification(message, type = 'info', duration = 5000) {
    // التأكد من وجود حاوية الإشعارات
    createNotificationContainer();
    const container = document.querySelector('.notification-container');
    
    // تحديد الأيقونة بناءً على نوع الإشعار
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'times-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-${icon}"></i>
        </div>
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <div class="notification-close">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    // إضافة الإشعار إلى الحاوية
    container.appendChild(notification);
    
    // تعديل مدة الرسوم المتحركة بناءً على المدة المحددة
    if (duration !== 5000) {
        const countdownAnimation = `countdown ${duration/1000}s linear forwards`;
        notification.querySelector('::before').style.animation = countdownAnimation;
        
        const fadeOutAnimation = `fadeOut 0.5s ease ${(duration-500)/1000}s forwards`;
        notification.style.animation = `slideInRight 0.5s ease, ${fadeOutAnimation}`;
    }
    
    // إضافة حدث النقر لإغلاق الإشعار
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        container.removeChild(notification);
    });
    
    // إزالة الإشعار تلقائيًا بعد المدة المحددة
    setTimeout(() => {
        if (container.contains(notification)) {
            container.removeChild(notification);
        }
    }, duration);
}

/**
 * عرض إشعار نجاح
 * @param {string} message - نص الإشعار
 * @param {number} duration - مدة ظهور الإشعار بالمللي ثانية (الافتراضي: 5000)
 */
function showSuccessNotification(message, duration = 5000) {
    showNotification(message, 'success', duration);
}

/**
 * عرض إشعار خطأ
 * @param {string} message - نص الإشعار
 * @param {number} duration - مدة ظهور الإشعار بالمللي ثانية (الافتراضي: 5000)
 */
function showErrorNotification(message, duration = 5000) {
    showNotification(message, 'error', duration);
}

/**
 * عرض إشعار تحذير
 * @param {string} message - نص الإشعار
 * @param {number} duration - مدة ظهور الإشعار بالمللي ثانية (الافتراضي: 5000)
 */
function showWarningNotification(message, duration = 5000) {
    showNotification(message, 'warning', duration);
}

/**
 * عرض إشعار معلومات
 * @param {string} message - نص الإشعار
 * @param {number} duration - مدة ظهور الإشعار بالمللي ثانية (الافتراضي: 5000)
 */
function showInfoNotification(message, duration = 5000) {
    showNotification(message, 'info', duration);
}

// تصدير الدوال للاستخدام العام
window.showNotification = showNotification;
window.showSuccessNotification = showSuccessNotification;
window.showErrorNotification = showErrorNotification;
window.showWarningNotification = showWarningNotification;
window.showInfoNotification = showInfoNotification;
