document.addEventListener("DOMContentLoaded", function () {
    let myCart = JSON.parse(localStorage.getItem("myCart")) || [];
    const cartContainer = document.querySelector(".cart-details");
    const totalAmount = document.getElementById("total-amount");
    const finalAmount = document.getElementById("final-amount");

    // Define discount tiers based on total quantity
    const discountTiers = [
        { minQuantity: 0, discountPercentage: 0 },
        { minQuantity: 5, discountPercentage: 5 },
        { minQuantity: 10, discountPercentage: 10 },
        { minQuantity: 20, discountPercentage: 15 }
    ];

    function getDiscountPercentage(totalQuantity) {
        for (let i = discountTiers.length - 1; i >= 0; i--) {
            if (totalQuantity >= discountTiers[i].minQuantity) {
                return discountTiers[i].discountPercentage;
            }
        }
        return 0;
    }

    function calculateDiscountedPrice(product, discountPercentage) {
        let originalPrice = parseFloat(product.originalPrice.replace(/[^\d.]/g, ""));
        let discount = discountPercentage / 100;
        let discountedPrice = originalPrice * (1 - discount);
        return discountedPrice.toFixed(2); // Ensure two decimal places
    }

    function updateCartUI() {
        cartContainer.innerHTML = ""; // Clear current content

        if (myCart.length === 0) {
            cartContainer.innerHTML = "<p>السلة فارغة.</p>";
            totalAmount.textContent = "0 ج.م";
            finalAmount.textContent = "0 ج.م";
            return;
        }

        let totalQuantity = myCart.reduce((total, product) => total + product.quantity, 0);
        let discountPercentage = getDiscountPercentage(totalQuantity);

        let totalPrice = 0;

        myCart.forEach((product, index) => {
            let discountedPrice = calculateDiscountedPrice(product, discountPercentage);
            let productTotal = parseFloat(discountedPrice) * product.quantity;
            totalPrice += productTotal;

            const productElement = document.createElement("div");
            productElement.classList.add("cart-item");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-item-info">
                    <h2>${product.name}</h2>
                    <span>${product.description}</span>
                </div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity(${index}, 'decrease')">-</button>
                    <input type="number" value="${product.quantity}" readonly>
                    <button onclick="updateQuantity(${index}, 'increase')">+</button>
                </div>
                <div class="cart-item-price">
                    <span class="original-price"><del>${product.originalPrice}</del></span>
                    <span class="discounted-price">${productTotal.toFixed(2)} ج.م</span>
                </div>
                <div class="cart-item-actions">
                    <i class="fas fa-heart" title="إضافة إلى المفضلة" onclick="addToFavorites(${index})"></i>
                    <i class="fas fa-trash-alt" title="حذف المنتج" onclick="removeFromCart(${index})"></i>
                </div>
            `;
            cartContainer.appendChild(productElement);
        });

        totalAmount.textContent = `${(totalPrice + 200).toFixed(2)} ج.م`; // Total price without discount
        finalAmount.textContent = `${totalPrice.toFixed(2)} ج.م`; // Total price after discount
    }

    window.updateQuantity = function (index, action) {
        if (action === 'increase') {
            myCart[index].quantity++;
        } else if (action === 'decrease' && myCart[index].quantity > 1) {
            myCart[index].quantity--;
        }
        localStorage.setItem("myCart", JSON.stringify(myCart));
        updateCartUI();
    };

    window.removeFromCart = function (index) {
        myCart.splice(index, 1);
        localStorage.setItem("myCart", JSON.stringify(myCart));
        updateCartUI();
    };

    window.addToFavorites = function (index) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        let product = myCart[index];
        if (!favorites.some(item => item.id === product.id)) {
            favorites.push(product);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert("تمت الإضافة إلى المفضلة!");
        }
    };

    window.addToCart = function (product) {
        let existingProduct = myCart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            product.quantity = 1;
            myCart.push(product);
        }
        localStorage.setItem("myCart", JSON.stringify(myCart));
        updateCartUI();
    };

    function toggleAddressFields() {
        let addressSelect = document.getElementById("address-select");
        let newAddressFields = document.getElementById("new-address-fields");
        newAddressFields.style.display = addressSelect.value === "new" ? "block" : "none";
    }

    function togglePaymentOptions() {
        let paymentMethod = document.getElementById("payment-method").value;
        document.getElementById("online-payment-options").style.display = paymentMethod === "online" ? "block" : "none";
        document.getElementById("cod-options").style.display = paymentMethod === "cod" ? "block" : "none";
    }

    function toggleCardFields() {
        let method = document.getElementById("payment-method-online").value;
        document.getElementById("visa-fields").style.display = method === "visa" ? "block" : "none";
        document.getElementById("mastercard-fields").style.display = method === "mastercard" ? "block" : "none";
        document.getElementById("visa-icon").style.display = method === "visa" ? "inline" : "none";
        document.getElementById("mastercard-icon").style.display = method === "mastercard" ? "inline" : "none";
    }

    window.toggleAddressFields = toggleAddressFields;
    window.togglePaymentOptions = togglePaymentOptions;
    window.toggleCardFields = toggleCardFields;

    function confirmPayment() {
        let addressSelect = document.getElementById("address-select").value;
        let paymentMethod = document.getElementById("payment-method").value;
        let valid = true;

        if (addressSelect === "new") {
            let requiredFields = ["governorate", "city", "street", "phone"];
            requiredFields.forEach(id => {
                let field = document.getElementById(id);
                if (!field.value.trim()) {
                    valid = false;
                    field.style.border = "2px solid red";
                } else {
                    field.style.border = "";
                }
            });
        }

        if (paymentMethod === "online") {
            let cardMethod = document.getElementById("payment-method-online").value;
            if (!cardMethod) valid = false;
            let cardFields = cardMethod === "visa" ? ["visa-number", "visa-expiry", "visa-cvc"] : ["mastercard-number", "mastercard-expiry", "mastercard-cvc"];
            cardFields.forEach(id => {
                let field = document.getElementById(id);
                if (!field.value.trim()) {
                    valid = false;
                    field.style.border = "2px solid red";
                } else {
                    field.style.border = "";
                }
            });
        }

        if (valid) {
            // Save cart data to localStorage to be accessed on the next page
            localStorage.setItem("orderTrackingData", JSON.stringify({
                myCart: myCart,
                totalAmount: totalAmount.textContent,
                finalAmount: finalAmount.textContent
            }));
            window.location.href = "order-tracking.html"; // Redirect to order tracking page
        }
    }

    window.confirmPayment = confirmPayment;

    function cancelPayment() {
        localStorage.removeItem("myCart");
        localStorage.removeItem("cartData");
        localStorage.removeItem("orderTrackingData");
        updateCartUI();
        alert("تم إلغاء الدفع ومسح السلة.");
    }

    window.cancelPayment = cancelPayment;

    updateCartUI();
});

function toggleAddressFields() {
    let addressSelect = document.getElementById("address-select").value;
    document.getElementById("new-address-fields").style.display = addressSelect === "new" ? "block" : "none";
}

function togglePaymentOptions() {
    let paymentMethod = document.getElementById("payment-method").value;
    document.getElementById("online-payment-options").style.display = paymentMethod === "online" ? "block" : "none";
}

function toggleCardFields() {
    let method = document.getElementById("payment-method-online").value;
    document.getElementById("visa-fields").style.display = method === "visa" ? "block" : "none";
    document.getElementById("mastercard-fields").style.display = method === "mastercard" ? "block" : "none";
}
