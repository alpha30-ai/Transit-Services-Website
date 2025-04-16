document.addEventListener("DOMContentLoaded", function() {
    const productDetails = JSON.parse(localStorage.getItem("quickBuyProduct"));
    const productDetailsContainer = document.getElementById("productDetails");

    if (productDetails) {
        productDetailsContainer.innerHTML = `
            <img src="${productDetails.image}" alt="${productDetails.name}">
            <div>
                <h2>${productDetails.name}</h2>
                <p>${productDetails.description}</p>
                <div class="price">
                    <span class="original-price">${productDetails.originalPrice}</span>
                    <span class="discounted-price">${productDetails.discountedPrice}</span>
                </div>
                <div>
                    <label for="quantity">الكمية:</label>
                    <input type="number" id="quantity" name="quantity" value="1" min="1">
                </div>
                <button id="removeProduct">حذف المنتج</button>
            </div>
        `;

        const removeProductButton = document.getElementById("removeProduct");
        removeProductButton.addEventListener("click", function() {
            localStorage.removeItem("quickBuyProduct");
            location.reload();
        });

        const quantityInput = document.getElementById("quantity");
        quantityInput.addEventListener("input", updateTotalPrice);

        function updateTotalPrice() {
            const quantity = parseInt(quantityInput.value);
            const totalPrice = productDetails.discountedPrice * quantity;
            document.getElementById("orderSummary").innerText = `المبلغ الإجمالي: ${totalPrice.toFixed(2)}`;
        }

        updateTotalPrice();

    } else {
        productDetailsContainer.innerHTML = "<p>لا توجد منتجات محددة للشراء السريع.</p>";
    }

    const paymentMethodSelect = document.getElementById("paymentMethod");
    const cardDetails = document.getElementById("cardDetails");
    const applePayDetails = document.getElementById("applePayDetails");
    const googlePayDetails = document.getElementById("googlePayDetails");
    const paypalDetails = document.getElementById("paypalDetails");

    paymentMethodSelect.addEventListener("change", function() {
        cardDetails.classList.add("hidden");
        applePayDetails.classList.add("hidden");
        googlePayDetails.classList.add("hidden");
        paypalDetails.classList.add("hidden");

        if (paymentMethodSelect.value === "card") {
            cardDetails.classList.remove("hidden");
        } else if (paymentMethodSelect.value === "applepay") {
            applePayDetails.classList.remove("hidden");
        } else if (paymentMethodSelect.value === "googlepay") {
            googlePayDetails.classList.remove("hidden");
        } else if (paymentMethodSelect.value === "paypal") {
            paypalDetails.classList.remove("hidden");
        }
    });

    const checkoutButton = document.getElementById("checkoutButton");
    checkoutButton.addEventListener("click", function() {
        if (validateForm()) {
            alert("تم إتمام الشراء بنجاح!");
            localStorage.removeItem("quickBuyProduct");
            location.reload();
        } else {
            alert("يرجى ملء جميع الحقول المطلوبة.");
        }
    });

    function validateForm() {
        const form = document.getElementById("paymentForm");
        return form.checkValidity();
    }
});