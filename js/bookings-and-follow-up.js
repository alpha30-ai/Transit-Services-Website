document.addEventListener("DOMContentLoaded", function () {
    let bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
    if (bookingDetails) {
        let bookingDetailsDiv = document.getElementById('booking-details');
        bookingDetailsDiv.innerHTML = `
            <div class="booking-card">
                <h3>${bookingDetails.service}</h3>
                <p><strong>السعر الأصلي:</strong> ${bookingDetails.originalPrice}</p>
                <p><strong>السعر بعد الخصم:</strong> ${bookingDetails.discountedPrice}</p>
            </div>
        `;
    }
});

function togglePaymentFields() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const electronicPaymentFields = document.getElementById('electronicPaymentFields');
    if (paymentMethod === 'electronic') {
        electronicPaymentFields.style.display = 'block';
    } else {
        electronicPaymentFields.style.display = 'none';
    }
}

function validatePaymentForm() {
    const clientName = document.getElementById("clientName").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const paymentMethod = document.getElementById("paymentMethod").value;

    if (clientName === "" || age === "" || gender === "" || paymentMethod === "") {
        alert("يرجى ملء جميع الحقول");
        return false;
    }

    if (paymentMethod === "electronic") {
        const cardNumber = document.getElementById("cardNumber").value;
        const cardHolderName = document.getElementById("cardHolderName").value;
        const expirationDate = document.getElementById("expirationDate").value;
        const cvv = document.getElementById("cvv").value;

        if (cardNumber === "" || cardHolderName === "" || expirationDate === "" || cvv === "") {
            alert("يرجى ملء جميع الحقول الخاصة بالدفع الإلكتروني");
            return false;
        }
    }

    return true;
}

function completePayment() {
    if (validatePaymentForm()) {
        alert("تم إتمام عملية الدفع بنجاح!");
        deleteBooking();
        // Redirect to the homepage
        window.location.href = "index.html"; // Change this to your homepage URL if different
    }
}

function deleteBooking() {
    localStorage.removeItem('bookingDetails');
    document.getElementById('booking-details').innerHTML = "";
    alert("تم حذف الخدمة بنجاح!");
}
function completePayment() {
    if (validatePaymentForm()) {
        const paymentDetails = {
            clientName: document.getElementById("clientName").value,
            age: document.getElementById("age").value,
            gender: document.getElementById("gender").value,
            paymentMethod: document.getElementById("paymentMethod").value,
            cardNumber: document.getElementById("cardNumber")?.value || '',
            cardHolderName: document.getElementById("cardHolderName")?.value || '',
            expirationDate: document.getElementById("expirationDate")?.value || '',
        };

        localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));

        alert("تم إتمام عملية الدفع بنجاح!");

        const userWantsToPrint = confirm("هل تريد طباعة الإيصال؟");
        if (userWantsToPrint) {
            window.location.href = "receipt-print.html"; // تأكد من تغيير الرابط إلى صفحة الإيصال الخاصة بك إذا كانت مختلفة
        } else {
            deleteBooking();
        }
    }
}
