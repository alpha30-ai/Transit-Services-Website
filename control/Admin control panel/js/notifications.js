// متغير لتخزين النوع المختار
let selectedType = "";

// دالة لتعيين النوع بناءً على الزر الذي تم الضغط عليه
function setNotificationType(type) {
    selectedType = type;
    const modal = document.getElementById('modalDetails');
    const content = document.getElementById('modalDetailsContent');

    // تغيير محتوى المودال بناءً على النوع
    if (type === 'b2b') {
        content.innerHTML = "تفاصيل البائعين هنا.";
    } else if (type === 'clients') {
        content.innerHTML = "تفاصيل العملاء هنا.";
    } else if (type === 'individualClient') {
        content.innerHTML = "تفاصيل العميل الفردي هنا.";
    } else if (type === 'individualSeller') {
        content.innerHTML = "تفاصيل البائع الفردي هنا.";
    }

    modal.style.display = 'block';
}

// إغلاق النوافذ المنبثقة عند الضغط على زر الإغلاق
document.querySelectorAll('.close').forEach((element) => {
    element.addEventListener('click', () => {
        element.closest('.modal').style.display = 'none';
    });
});

// إغلاق النوافذ عند الضغط خارج النافذة
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// دالة لإرسال الإشعار وعرض الرسالة المنبثقة
function sendNotification() {
    const notificationDetails = document.getElementById('notificationDetails').value;
    const notificationID = document.getElementById('notificationID').value;
    const imageAttachment = document.getElementById('imageAttachment').files[0] ? document.getElementById('imageAttachment').files[0].name : "لا يوجد صورة";

    // التحقق من أن الإشعار غير مكرر بناءً على ID
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    if (notifications.some(notification => notification.id === notificationID)) {
        alert("تم إضافة هذا الإشعار بالفعل.");
        return; // منع إضافة الإشعار المكرر
    }

    // إضافة الصف إلى الجدول
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${getTypeInArabic(selectedType)}</td>
        <td>${notificationDetails}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td><button class="action-btn" onclick="takeAction(this)">اتخاذ إجراء</button></td>
        <td>${imageAttachment}</td>
        <td>${notificationID}</td>
        <td><button class="action-btn" onclick="deleteNotification(this)">حذف</button></td>
    `;
    document.getElementById('notificationsTableBody').appendChild(newRow);

    // حفظ الإشعار في localStorage
    saveNotificationToLocalStorage(selectedType, notificationDetails, notificationID, imageAttachment);

    // إغلاق نافذة التفاصيل بعد الإرسال
    document.getElementById('modalDetails').style.display = 'none';

    // إظهار الرسالة المنبثقة
    document.getElementById('popupMessage').style.display = 'block';
}

// تحويل النوع إلى اللغة العربية
function getTypeInArabic(type) {
    switch (type) {
        case 'b2b':
            return "بائعين";
        case 'clients':
            return "عملاء";
        case 'individualClient':
            return "عميل فردي";
        case 'individualSeller':
            return "بائع فردي";
        default:
            return "غير معروف";
    }
}

// حفظ الإشعار في localStorage
function saveNotificationToLocalStorage(type, details, id, image) {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.push({ type, details, id, image });
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

// حذف الإشعار من الجدول و localStorage
function deleteNotification(button) {
    const row = button.closest('tr');
    const notificationID = row.cells[5].innerText;

    // حذف الإشعار من localStorage
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications = notifications.filter(notification => notification.id !== notificationID);
    localStorage.setItem('notifications', JSON.stringify(notifications));

    // حذف الصف من الجدول
    row.remove();
}

// دالة لفتح نافذة التفاصيل مع نوع الإشعار
function takeAction(button) {
    const row = button.closest('tr');
    const notificationDetails = row.cells[1].innerText;

    // عرض التفاصيل في النافذة المنبثقة
    document.getElementById('modalActionContent').innerText = notificationDetails;
    document.getElementById('modalAction').style.display = 'block';
}

// تحميل البيانات من localStorage عند تحميل الصفحة
function loadNotificationsFromLocalStorage() {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.forEach(notification => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${getTypeInArabic(notification.type)}</td>
            <td>${notification.details}</td>
            <td>${new Date().toLocaleDateString()}</td>
            <td><button class="action-btn" onclick="takeAction(this)">اتخاذ إجراء</button></td>
            <td>${notification.image}</td>
            <td>${notification.id}</td>
            <td><button class="action-btn" onclick="deleteNotification(this)">حذف</button></td>
        `;
        document.getElementById('notificationsTableBody').appendChild(newRow);
    });
}

// تحميل البيانات عند تحميل الصفحة
window.onload = loadNotificationsFromLocalStorage;