document.addEventListener("DOMContentLoaded", function () {
    let paymentDetails = JSON.parse(localStorage.getItem('paymentDetails'));
    let bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));

    if (paymentDetails && bookingDetails) {
        let invoiceDiv = document.getElementById('invoiceDetails');
        invoiceDiv.innerHTML = `
            <h2>تفاصيل العميل</h2>
            <p><strong>اسم العميل:</strong> ${paymentDetails.clientName}</p>
            <p><strong>العمر:</strong> ${paymentDetails.age}</p>
            <p><strong>الجنس:</strong> ${paymentDetails.gender}</p>
            <p><strong>طريقة الدفع:</strong> ${paymentDetails.paymentMethod}</p>
            ${paymentDetails.paymentMethod === "electronic" ? `
                <p><strong>رقم البطاقة:</strong> **** **** **** ${paymentDetails.cardNumber.slice(-4)}</p>
                <p><strong>اسم حامل البطاقة:</strong> ${paymentDetails.cardHolderName}</p>
            ` : ""}
            <hr>
            <h2>تفاصيل الخدمة</h2>
            <p><strong>الخدمة:</strong> ${bookingDetails.service}</p>
            <p><strong>السعر الأصلي:</strong> ${bookingDetails.originalPrice} جنيه</p>
            <p><strong>السعر بعد الخصم:</strong> ${bookingDetails.discountedPrice} جنيه</p>
        `;

        // عرض تاريخ الطباعة
        document.getElementById("printDate").innerText = new Date().toLocaleDateString('ar-EG');


    } else {
        alert("⚠️ لا توجد بيانات متاحة لعرض الفاتورة.");
        window.location.href = "index.html"; // إعادة التوجيه للصفحة الرئيسية
    }
});

function printInvoice() {
    window.print(); // فتح نافذة الطباعة
    setTimeout(function() {
        alert("تمت الطباعة بنجاح!"); // إظهار رسالة تأكيد بعد الطباعة
        window.location.href = "index.html"; // إعادة التوجيه إلى الصفحة الرئيسية
    }, 1000); // مهلة قصيرة للتأكد من انتهاء الطباعة
}