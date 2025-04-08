document.addEventListener("DOMContentLoaded", function () {
    const orderDetailsContainer = document.getElementById("order-details");
    const orderData = JSON.parse(localStorage.getItem("orderTrackingData"));

    // إنشاء بيانات عشوائية للطلب
    const randomOrderNumber = Math.floor(Math.random() * 1000000);
    const randomOrderDate = new Date().toLocaleDateString("ar-EG");
    const randomOrderStatus = ["تم الطلب", "قيد التجهيز", "قيد التوصيل", "تم التسليم"][Math.floor(Math.random() * 4)];

    if (orderData) {
        const { myCart, totalAmount, finalAmount } = orderData;

        // عرض تفاصيل الطلب
        const orderInfoElement = document.createElement("div");
        orderInfoElement.classList.add("order-info");
        orderInfoElement.innerHTML = `
            <h2>رقم الطلب: <span>#${randomOrderNumber}</span></h2>
            <p>تاريخ الطلب: <span>${randomOrderDate}</span></p>
            <p>الحالة الحالية: <span class="status">${randomOrderStatus} <i class="${getStatusIcon(randomOrderStatus)}"></i></span></p>
        `;
        orderDetailsContainer.appendChild(orderInfoElement);

        // عرض المنتجات
        myCart.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("order-item");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="order-item-info">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>الكمية: ${product.quantity}</p>
                    <p>السعر الأصلي: ${product.originalPrice}</p>
                </div>
            `;
            orderDetailsContainer.appendChild(productElement);
        });

        // عرض ملخص الطلب
        const orderSummaryElement = document.createElement("div");
        orderSummaryElement.classList.add("order-summary");
        orderSummaryElement.innerHTML = `
            <p>المبلغ الإجمالي: ${totalAmount}</p>
            <p>المبلغ النهائي بعد الخصم: ${finalAmount}</p>
        `;
        orderDetailsContainer.appendChild(orderSummaryElement);
    } else {
        orderDetailsContainer.innerHTML = "<p>لا توجد معلومات حول الطلب.</p>";
    }
});

// دالة لإرجاع الأيقونة المناسبة بناءً على حالة الطلب
function getStatusIcon(status) {
    switch (status) {
        case "تم الطلب":
            return "fas fa-check-circle";
        case "قيد التجهيز":
            return "fas fa-cog";
        case "قيد التوصيل":
            return "fas fa-truck";
        case "تم التسليم":
            return "fas fa-home";
        default:
            return "fas fa-info-circle";
    }
}

function cancelOrder() {
    if (confirm("هل أنت متأكد من إلغاء الطلب؟")) {
        localStorage.removeItem("orderTrackingData");
        alert("تم إلغاء الطلب بنجاح.");
        window.location.href = "index.html"; // Redirect to home page or any other page
    }
}

function contactDelivery() {
    const deliveryNumber = "123-456-7890"; // Replace with actual delivery contact number
    alert(`رقم الدليفري: ${deliveryNumber}`);
}