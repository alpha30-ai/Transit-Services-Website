// اختيار الزر الخاص بالتبديل
const themeToggle = document.getElementById('theme-toggle');
const ordersForm = document.querySelector('.orders-form');
const totalAmountInput = document.getElementById('total-amount');
const commissionPercentageInput = document.getElementById('commission-percentage');
const commissionAmountInput = document.getElementById('commission-amount');

// تغيير الوضع عند التبديل
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        ordersForm.classList.add('dark-mode');
    } else {
        ordersForm.classList.remove('dark-mode');
    }
});

// حساب العمولة بناءً على القيم المدخلة
const calculateCommission = () => {
    const totalAmount = parseFloat(totalAmountInput.value) || 0;
    const commissionPercentage = parseFloat(commissionPercentageInput.value) || 0;
    commissionAmountInput.value = (totalAmount * (commissionPercentage / 100)).toFixed(2);
};

// إضافة مستمعي الأحداث لحساب العمولة عند تغيير القيم
totalAmountInput.addEventListener('input', calculateCommission);
commissionPercentageInput.addEventListener('input', calculateCommission);

// تبديل حالة البائع
function toggleSellerStatus(checkbox) {
    console.log(checkbox.checked ? 'Seller activated' : 'Seller deactivated');
}

// معالجة إرسال النموذج
document.getElementById('order-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Order submitted successfully!');
});

// التحقق عند تحميل المحتوى
document.addEventListener("DOMContentLoaded", function() {
    // تحقق إذا تم تغيير حالة التبديل
    themeToggle.addEventListener("change", function() {
        if (themeToggle.checked) {
            ordersForm.classList.add("dark-mode"); // إضافة كلاس الوضع الليلي
        } else {
            ordersForm.classList.remove("dark-mode"); // إزالة كلاس الوضع الليلي
        }
    });
});
// نموذج البيانات للطلبات
let orders = [];

// دالة لإضافة طلب جديد
function addOrder(order) {
    orders.push(order);
    console.log('تم إضافة الطلب:', order);
}

// دالة لعرض الطلبات حسب الحالة
function showOrdersByStatus(status) {
    const filteredOrders = orders.filter(order => order.status === status);
    console.log(`طلبات ${status}:`, filteredOrders);
}

// دالة لتحديث حالة الطلب
function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(order => order.id === orderId);
    if (order) {
        order.status = newStatus;
        console.log(`تم تحديث حالة الطلب ${orderId} إلى ${newStatus}`);
    } else {
        console.log(`لم يتم العثور على الطلب ${orderId}`);
    }
}

// إضافة بعض الطلبات لاختبار الدوال
addOrder({ id: 1, customerName: 'عميل 1', status: 'pending' });
addOrder({ id: 2, customerName: 'عميل 2', status: 'completed' });
addOrder({ id: 3, customerName: 'عميل 3', status: 'failed' });
addOrder({ id: 4, customerName: 'عميل 4', status: 'pending' });

// عرض الطلبات حسب الحالة
showOrdersByStatus('pending'); // عرض الطلبات قيد الانتظار
showOrdersByStatus('completed'); // عرض الطلبات المكتملة
showOrdersByStatus('failed'); // عرض الطلبات الفاشلة

// تحديث حالة طلب
updateOrderStatus(1, 'completed'); // تحديث الطلب 1 إلى مكتمل
updateOrderStatus(3, 'pending'); // تحديث الطلب 3 إلى قيد الانتظار

// عرض الطلبات بعد التحديث
console.log('الطلبات بعد التحديث:');
console.log(orders);
// الحصول على النماذج
const addOperationForm = document.getElementById('addOperationForm');
const addSellerForm = document.getElementById('addSellerForm');
const addServiceForm = document.getElementById('addServiceForm');

// الحصول على الجدول الذي سيظهر فيه الإشعارات
const notificationsTable = document.getElementById('notificationsTable').getElementsByTagName('tbody')[0];

// وظيفة لإضافة إشعار إلى الجدول
function addNotification(type, details) {
    // إنشاء صف جديد
    const row = notificationsTable.insertRow();
    
    // إضافة الأعمدة للصف الجديد
    const typeCell = row.insertCell(0);
    const detailsCell = row.insertCell(1);
    const dateCell = row.insertCell(2);
    const actionCell = row.insertCell(3);
    
    // إدخال البيانات في الخلايا
    typeCell.textContent = type;
    detailsCell.textContent = details;
    
    // تاريخ الإشعار
    const date = new Date().toLocaleDateString();
    dateCell.textContent = date;
    
    // زر للإجراء (قد يكون رابط أو زر لتوجيه إلى صفحة أخرى)
    const actionButton = document.createElement('button');
    actionButton.classList.add('action-btn');
    actionButton.textContent = 'مراجعة';
    actionCell.appendChild(actionButton);
}

// حدث إضافة عملية جديدة
addOperationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // الحصول على تفاصيل العملية
    const operationDetails = document.getElementById('operationDetails').value;
    
    // إضافة إشعار جديد للتنبيهات
    addNotification('عملية جديدة', `تم إضافة عملية جديدة: ${operationDetails}`);
    
    // إعادة تعيين النموذج
    addOperationForm.reset();
});

// حدث إضافة بائع جديد
addSellerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // الحصول على اسم البائع
    const sellerName = document.getElementById('sellerName').value;
    
    // إضافة إشعار جديد للتنبيهات
    addNotification('بائع جديد', `تم إضافة بائع جديد: ${sellerName}`);
    
    // إعادة تعيين النموذج
    addSellerForm.reset();
});

// حدث إضافة خدمة جديدة
addServiceForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // الحصول على اسم الخدمة
    const serviceName = document.getElementById('serviceName').value;
    
    // إضافة إشعار جديد للتنبيهات
    addNotification('خدمة جديدة', `تم إضافة خدمة جديدة: ${serviceName}`);
    
    // إعادة تعيين النموذج
    addServiceForm.reset();
});

function filterOrders(status) {
    const rows = document.querySelectorAll(".order-row");
    
    rows.forEach(row => {
        if (status === "all" || row.getAttribute("data-status") === status) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
