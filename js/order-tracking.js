document.addEventListener("DOMContentLoaded", function () {
    const orderDetailsContainer = document.getElementById("order-details");
    const orderNumberDisplay = document.getElementById("order-number-display");
    const progressBar = document.getElementById("progress-bar");
    const progressSteps = document.querySelectorAll(".progress-step");
    const shippingAddress = document.getElementById("shipping-address");
    const shippingPhone = document.getElementById("shipping-phone");
    const paymentMethod = document.getElementById("payment-method");
    const expectedDelivery = document.getElementById("expected-delivery");
    const orderNotes = document.getElementById("order-notes");
    const deliveryName = document.getElementById("delivery-name");
    const deliveryPhone = document.getElementById("delivery-phone");

    // الحصول على بيانات الطلب من التخزين المحلي
    const orderData = JSON.parse(localStorage.getItem("orderTrackingData"));

    // إنشاء بيانات الطلب (من البيانات المحفوظة أو عشوائية)
    const orderNumber = orderData ? orderData.orderNumber : Math.floor(100000 + Math.random() * 900000);
    const orderDate = orderData ? orderData.orderDate : new Date().toLocaleDateString("ar-EG");
    const orderStatus = orderData ? orderData.orderStatus : ["تم الطلب", "قيد التجهيز", "قيد التوصيل", "تم التسليم"][Math.floor(Math.random() * 4)];

    // تاريخ التسليم المتوقع (بعد 3-5 أيام من تاريخ الطلب)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(3 + Math.random() * 3));
    const expectedDeliveryDate = deliveryDate.toLocaleDateString("ar-EG");

    // تحديث رقم الطلب في العنوان
    if (orderNumberDisplay) {
        orderNumberDisplay.textContent = `رقم الطلب: #${orderNumber}`;
    }

    // تحديث مؤشر حالة الطلب
    updateProgressBar(orderStatus);

    // تحديث معلومات الشحن والتوصيل
    if (expectedDelivery) {
        expectedDelivery.textContent = expectedDeliveryDate;
    }

    // تحديث عنوان الشحن
    if (shippingAddress && orderData && orderData.shippingAddress) {
        shippingAddress.textContent = orderData.shippingAddress;
    }

    // تحديث طريقة الدفع
    if (paymentMethod && orderData && orderData.paymentMethod) {
        paymentMethod.textContent = orderData.paymentMethod;
    }

    // عرض بيانات الطلب
    if (orderData) {
        const { myCart, totalAmount, discountAmount, shippingAmount, finalAmount } = orderData;

        // عرض تفاصيل الطلب
        const orderInfoElement = document.createElement("div");
        orderInfoElement.classList.add("order-info");
        orderInfoElement.innerHTML = `
            <h2>تفاصيل الطلب #${orderNumber}</h2>
            <p><span>تاريخ الطلب:</span> <span>${orderDate}</span></p>
            <p><span>الحالة الحالية:</span> <span class="status">${orderStatus} <i class="${getStatusIcon(orderStatus)}"></i></span></p>
        `;
        orderDetailsContainer.appendChild(orderInfoElement);

        // عرض المنتجات
        myCart.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("order-item");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" onerror="this.src='img/placeholder.jpg'">
                <div class="order-item-info">
                    <h2>${product.name}</h2>
                    <p>${product.description || 'لا يوجد وصف'}</p>
                    <p>الكمية: ${product.quantity}</p>
                    <p>السعر: ${product.originalPrice}</p>
                </div>
            `;
            orderDetailsContainer.appendChild(productElement);
        });

        // عرض ملخص الطلب
        const orderSummaryElement = document.createElement("div");
        orderSummaryElement.classList.add("order-summary");
        orderSummaryElement.innerHTML = `
            <p><span>إجمالي المنتجات:</span> <span>${totalAmount || '0 ج.م'}</span></p>
            <p><span>رسوم الشحن:</span> <span>${shippingAmount || '50 ج.م'}</span></p>
            <p><span>الخصم:</span> <span>${discountAmount || '0 ج.م'}</span></p>
            <p><span>الإجمالي:</span> <span>${finalAmount || '0 ج.م'}</span></p>
        `;
        orderDetailsContainer.appendChild(orderSummaryElement);

        // تحديث رقم الهاتف في معلومات الشحن
        if (shippingPhone && orderData.shippingAddress) {
            // استخراج رقم الهاتف من عنوان الشحن إذا كان موجودًا
            const phoneMatch = orderData.shippingAddress.match(/رقم الهاتف: ([0-9]+)/i);
            if (phoneMatch && phoneMatch[1]) {
                shippingPhone.textContent = phoneMatch[1];
            }
        }
    } else {
        // إنشاء بيانات عشوائية للعرض
        const demoProducts = [
            {
                name: "منتج تجريبي 1",
                description: "وصف المنتج التجريبي الأول",
                quantity: 2,
                originalPrice: "150 ج.م",
                image: "img/product-1.jpg"
            },
            {
                name: "منتج تجريبي 2",
                description: "وصف المنتج التجريبي الثاني",
                quantity: 1,
                originalPrice: "200 ج.م",
                image: "img/product-2.jpg"
            }
        ];

        // عرض تفاصيل الطلب
        const orderInfoElement = document.createElement("div");
        orderInfoElement.classList.add("order-info");
        orderInfoElement.innerHTML = `
            <h2>تفاصيل الطلب #${randomOrderNumber}</h2>
            <p><span>تاريخ الطلب:</span> <span>${randomOrderDate}</span></p>
            <p><span>الحالة الحالية:</span> <span class="status">${randomOrderStatus} <i class="${getStatusIcon(randomOrderStatus)}"></i></span></p>
        `;
        orderDetailsContainer.appendChild(orderInfoElement);

        // عرض المنتجات التجريبية
        demoProducts.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("order-item");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" onerror="this.src='img/placeholder.jpg'">
                <div class="order-item-info">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>الكمية: ${product.quantity}</p>
                    <p>السعر: ${product.originalPrice}</p>
                </div>
            `;
            orderDetailsContainer.appendChild(productElement);
        });

        // عرض ملخص الطلب
        const orderSummaryElement = document.createElement("div");
        orderSummaryElement.classList.add("order-summary");
        orderSummaryElement.innerHTML = `
            <p><span>إجمالي المنتجات:</span> <span>500 ج.م</span></p>
            <p><span>رسوم الشحن:</span> <span>50 ج.م</span></p>
            <p><span>الخصم:</span> <span>0 ج.م</span></p>
            <p><span>الإجمالي:</span> <span>550 ج.م</span></p>
        `;
        orderDetailsContainer.appendChild(orderSummaryElement);
    }
});

// دالة لتحديث مؤشر حالة الطلب
function updateProgressBar(currentStatus) {
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressBar = document.getElementById('progress-bar');

    let currentStepIndex = 0;
    let isCurrentFound = false;

    // تحديد الخطوة الحالية والخطوات المكتملة
    progressSteps.forEach((step, index) => {
        const stepStatus = step.getAttribute('data-status');

        // إزالة جميع الفئات
        step.classList.remove('active', 'completed');

        if (!isCurrentFound) {
            if (stepStatus === currentStatus) {
                // الخطوة الحالية
                step.classList.add('active');
                currentStepIndex = index;
                isCurrentFound = true;
            } else {
                // الخطوات السابقة
                step.classList.add('completed');
            }
        }
    });

    // تحديث شريط التقدم
    if (progressBar) {
        // حساب نسبة التقدم بناءً على الخطوة الحالية
        const progressPercentage = (currentStepIndex / (progressSteps.length - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.style.background = getProgressColor(currentStepIndex);
    }
}

// دالة للحصول على لون شريط التقدم بناءً على الخطوة
function getProgressColor(stepIndex) {
    const colors = {
        0: '#0028ff', // تم الطلب
        1: '#0028ff', // قيد التجهيز
        2: '#0028ff', // قيد التوصيل
        3: '#4CAF50'  // تم التسليم
    };

    return colors[stepIndex] || '#0028ff';
}

// دالة لإرجاع الأيقونة المناسبة بناءً على حالة الطلب
function getStatusIcon(status) {
    switch (status) {
        case "تم الطلب":
            return "fas fa-check-circle";
        case "قيد التجهيز":
            return "fas fa-box";
        case "قيد التوصيل":
            return "fas fa-truck";
        case "تم التسليم":
            return "fas fa-home";
        default:
            return "fas fa-info-circle";
    }
}

// دالة إلغاء الطلب
function cancelOrder() {
    // إنشاء نافذة تأكيد مخصصة
    const confirmationDialog = document.createElement('div');
    confirmationDialog.className = 'custom-confirm';
    confirmationDialog.innerHTML = `
        <div class="confirm-content">
            <div class="confirm-header">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>تأكيد إلغاء الطلب</h3>
            </div>
            <p>هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟</p>
            <div class="confirm-buttons">
                <button id="confirm-yes" class="btn-yes">نعم، إلغاء الطلب</button>
                <button id="confirm-no" class="btn-no">لا، العودة</button>
            </div>
        </div>
    `;

    document.body.appendChild(confirmationDialog);

    // إضافة الأنماط المخصصة للنافذة
    const style = document.createElement('style');
    style.textContent = `
        .custom-confirm {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }

        .confirm-content {
            background-color: white;
            border-radius: 16px;
            padding: 30px;
            width: 90%;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            animation: slideIn 0.3s ease;
        }

        .confirm-header {
            margin-bottom: 20px;
        }

        .confirm-header i {
            font-size: 50px;
            color: #f44336;
            margin-bottom: 15px;
        }

        .confirm-header h3 {
            font-size: 22px;
            color: #333;
            margin: 0;
        }

        .confirm-content p {
            font-size: 16px;
            color: #666;
            margin-bottom: 25px;
        }

        .confirm-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
        }

        .btn-yes, .btn-no {
            padding: 12px 20px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-yes {
            background-color: #f44336;
            color: white;
        }

        .btn-no {
            background-color: #e0e0e0;
            color: #333;
        }

        .btn-yes:hover {
            background-color: #d32f2f;
            transform: translateY(-3px);
        }

        .btn-no:hover {
            background-color: #bdbdbd;
            transform: translateY(-3px);
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;

    document.head.appendChild(style);

    // إضافة أحداث النقر
    document.getElementById('confirm-yes').addEventListener('click', function() {
        // إلغاء الطلب
        localStorage.removeItem("orderTrackingData");

        // إزالة نافذة التأكيد
        document.body.removeChild(confirmationDialog);
        document.head.removeChild(style);

        // عرض رسالة نجاح
        showSuccessNotification('تم إلغاء الطلب بنجاح');

        // إعادة توجيه بعد فترة قصيرة
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    });

    document.getElementById('confirm-no').addEventListener('click', function() {
        // إغلاق نافذة التأكيد
        document.body.removeChild(confirmationDialog);
        document.head.removeChild(style);
    });
}

// دالة الاتصال بالمندوب
function contactDelivery() {
    const deliveryPhone = document.getElementById("delivery-phone");
    const phoneNumber = deliveryPhone ? deliveryPhone.textContent : "01xxxxxxxxx";

    // عرض رسالة مع رقم الهاتف
    showInfoNotification(`يمكنك الاتصال بالمندوب على الرقم: ${phoneNumber}`);
}

// استخدام نظام الإشعارات الموحد
// لاحظ أن هذه الدالة موجودة الآن في ملف notifications.js المشترك