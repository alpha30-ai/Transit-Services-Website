var pluginConfig = {
    envType: "test",
    hashKey: "HASH-KEY",
    style:{
      listing:"horizontal"
    },
    version:"0",
    requestBody: {
        "cartTotal": "50",
        "currency": "EGP",
        "customer": {
            "first_name": "test",
            "last_name": "fawaterk",
            "email": "test@fawaterk.com",
            "phone": "0123456789",
            "address": "test address"
        },
        "redirectionUrls": {
            "successUrl": "https://dev.fawaterk.com/success",
            "failUrl": "https://dev.fawaterk.com/fail",
            "pendingUrl": "https://dev.fawaterk.com/pending"
        },
        "cartItems": [{
                "name": "this is test oop 112252",
                "price": "25",
                "quantity": "1"
            },
            {
                "name": "this is test oop 112252",
                "price": "25",
                "quantity": "1"
            }
        ],
        "payLoad": {
          "custom_field1":"xyz",
          "custom_field2":"xyz2"
        }
    }
};
document.addEventListener("DOMContentLoaded", function () {
    let myCart = JSON.parse(localStorage.getItem("myCart")) || [];
    const cartContainer = document.querySelector(".cart-details");
    const subtotalAmount = document.getElementById("subtotal-amount");
    const discountAmount = document.getElementById("discount-amount");
    const shippingAmount = document.getElementById("shipping-amount");
    const finalAmount = document.getElementById("final-amount");
    const cartCount = document.getElementById("cart-count");
    const couponCode = document.getElementById("coupon-code");
    const couponMessage = document.getElementById("coupon-message");
    const couponDiscountRow = document.getElementById("coupon-discount-row");
    const couponDiscountAmount = document.getElementById("coupon-discount-amount");
    const applyButton = document.getElementById("apply-coupon");
    const nextStepButton = document.getElementById("next-step-btn");
    const prevStepButton = document.getElementById("prev-step-btn");
    const placeOrderButton = document.getElementById("place-order-btn");
    const continueButton = document.getElementById("continue-shopping");
    const orderConfirmation = document.getElementById("order-confirmation");
    const orderNumber = document.getElementById("order-number");
    const orderTotal = document.getElementById("order-total");
    const trackOrderButton = document.getElementById("track-order");
    const backToShopButton = document.getElementById("back-to-shop");
    const closeModal = document.querySelector(".close-modal");

    // أقسام الخطوات
    const cartStepContent = document.getElementById("cart-step-content");
    const shippingStepContent = document.getElementById("shipping-step-content");
    const paymentStepContent = document.getElementById("payment-step-content");
    const confirmationStepContent = document.getElementById("confirmation-step-content");

    // ملخص الطلب في صفحة التأكيد
    const orderItemsSummary = document.getElementById("order-items-summary");
    const shippingAddressSummary = document.getElementById("shipping-address-summary");
    const paymentMethodSummary = document.getElementById("payment-method-summary");

    // متغير لتتبع الخطوة الحالية
    let currentStep = 1;

    // Define discount tiers based on total quantity
    const discountTiers = [
        { minQuantity: 0, discountPercentage: 0 },
        { minQuantity: 5, discountPercentage: 5 },
        { minQuantity: 10, discountPercentage: 10 },
        { minQuantity: 20, discountPercentage: 15 }
    ];

    // Define coupon codes
    const validCoupons = [
        { code: "WELCOME10", discountPercentage: 10 },
        { code: "SUMMER20", discountPercentage: 20 },
        { code: "SPECIAL25", discountPercentage: 25 }
    ];

    let appliedCoupon = null;
    let shippingCost = 50; // Default shipping cost

    function getDiscountPercentage(totalQuantity) {
        for (let i = discountTiers.length - 1; i >= 0; i--) {
            if (totalQuantity >= discountTiers[i].minQuantity) {
                return discountTiers[i].discountPercentage;
            }
        }
        return 0;
    }

    function calculateDiscountedPrice(product, discountPercentage) {
        let originalPrice = 0;

        // تحديد السعر الأصلي
        if (product.originalPrice) {
            // إذا كان السعر الأصلي موجود كنص
            if (typeof product.originalPrice === 'string') {
                originalPrice = parseFloat(product.originalPrice.replace(/[^\d.]/g, ""));
            } else {
                // إذا كان السعر الأصلي موجود كرقم
                originalPrice = product.originalPrice;
            }
        } else if (product.price) {
            // استخدام السعر العادي إذا لم يكن هناك سعر أصلي
            originalPrice = typeof product.price === 'string' ?
                parseFloat(product.price.replace(/[^\d.]/g, "")) : product.price;
        }

        let discount = discountPercentage / 100;
        let discountedPrice = originalPrice * (1 - discount);
        return discountedPrice.toFixed(2); // Ensure two decimal places
    }

    function updateCartUI() {
        cartContainer.innerHTML = ""; // Clear current content

        if (myCart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>السلة فارغة</h3>
                    <p>لم تقم بإضافة أي منتجات إلى سلة التسوق الخاصة بك.</p>
                    <a href="Products.html" class="btn">تصفح المنتجات</a>
                </div>
            `;
            subtotalAmount.textContent = "0 ج.م";
            discountAmount.textContent = "0 ج.م";
            shippingAmount.textContent = "0 ج.م";
            finalAmount.textContent = "0 ج.م";
            cartCount.textContent = "لا توجد منتجات في عربة التسوق";
            return;
        }

        let totalQuantity = myCart.reduce((total, product) => total + (product.quantity || 1), 0);
        let discountPercentage = getDiscountPercentage(totalQuantity);

        let subtotal = 0;
        let totalDiscount = 0;

        myCart.forEach((product, index) => {
            // تعامل مع مختلف أنواع بنية البيانات من الصفحات المختلفة
            let originalPrice = 0;
            if (product.originalPrice) {
                // إذا كان السعر الأصلي موجود كنص
                if (typeof product.originalPrice === 'string') {
                    originalPrice = parseFloat(product.originalPrice.replace(/[^\d.]/g, ""));
                } else {
                    // إذا كان السعر الأصلي موجود كرقم
                    originalPrice = product.originalPrice;
                }
            } else if (product.price) {
                // استخدام السعر العادي إذا لم يكن هناك سعر أصلي
                originalPrice = typeof product.price === 'string' ?
                    parseFloat(product.price.replace(/[^\d.]/g, "")) : product.price;
            }

            // حساب السعر بعد الخصم باستخدام الدالة المحسنة
            let discountedPrice = 0;
            if (product.discountedPrice) {
                // إذا كان السعر بعد الخصم موجود
                discountedPrice = typeof product.discountedPrice === 'string' ?
                    parseFloat(product.discountedPrice.replace(/[^\d.]/g, "")) : product.discountedPrice;
            } else {
                // استخدام دالة حساب السعر بعد الخصم
                discountedPrice = parseFloat(calculateDiscountedPrice(product, discountPercentage));
            }

            // التأكد من وجود الكمية
            const quantity = product.quantity || 1;

            // حساب إجمالي سعر المنتج والخصم
            let productTotal = discountedPrice * quantity;
            let productDiscount = (originalPrice - discountedPrice) * quantity;

            subtotal += originalPrice * quantity;
            totalDiscount += productDiscount;

            // تنسيق السعر الأصلي للعرض
            const formattedOriginalPrice = typeof product.originalPrice === 'string' ?
                product.originalPrice : `${originalPrice.toFixed(2)} ج.م`;

            const productElement = document.createElement("div");
            productElement.classList.add("cart-item");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-item-info">
                    <h2>${product.name}</h2>
                    <span>${product.description || "منتج من خدمات العبور"}</span>
                </div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity(${index}, 'decrease')">-</button>
                    <input type="number" value="${quantity}" readonly>
                    <button onclick="updateQuantity(${index}, 'increase')">+</button>
                </div>
                <div class="cart-item-price">
                    <span class="original-price"><del>${formattedOriginalPrice}</del></span>
                    <span class="discounted-price">${productTotal.toFixed(2)} ج.م</span>
                </div>
                <div class="cart-item-actions">
                    <i class="fas fa-heart" title="إضافة إلى المفضلة" onclick="addToFavorites(${index})"></i>
                    <i class="fas fa-trash-alt" title="حذف المنتج" onclick="removeFromCart(${index})"></i>
                </div>
            `;
            cartContainer.appendChild(productElement);
        });

        // Update cart count text
        cartCount.textContent = totalQuantity === 1
            ? "لديك منتج واحد في عربة التسوق"
            : `لديك ${totalQuantity} منتجات في عربة التسوق`;

        // Calculate coupon discount if applied
        let couponDiscountValue = 0;
        if (appliedCoupon) {
            couponDiscountValue = (subtotal - totalDiscount) * (appliedCoupon.discountPercentage / 100);
            couponDiscountRow.style.display = "flex";
            couponDiscountAmount.textContent = `${couponDiscountValue.toFixed(2)} ج.م`;
        } else {
            couponDiscountRow.style.display = "none";
        }

        // Calculate final amounts
        let finalSubtotal = subtotal;
        let finalDiscount = totalDiscount;
        let finalShipping = myCart.length > 0 ? shippingCost : 0;
        let finalTotal = finalSubtotal - finalDiscount - couponDiscountValue + finalShipping;

        // Update summary display
        subtotalAmount.textContent = `${finalSubtotal.toFixed(2)} ج.م`;
        discountAmount.textContent = `${finalDiscount.toFixed(2)} ج.م`;
        shippingAmount.textContent = `${finalShipping.toFixed(2)} ج.م`;
        finalAmount.textContent = `${finalTotal.toFixed(2)} ج.م`;

        // Update steps indicator
        updateStepsIndicator(1); // Start at step 1 (cart)
    }

    function updateStepsIndicator(step) {
        const steps = document.querySelectorAll('.step');
        steps.forEach((stepEl, index) => {
            if (index + 1 < step) {
                stepEl.classList.remove('active');
                stepEl.classList.add('completed');
            } else if (index + 1 === step) {
                stepEl.classList.add('active');
                stepEl.classList.remove('completed');
            } else {
                stepEl.classList.remove('active', 'completed');
            }
        });
    }

    // وظيفة للانتقال إلى خطوة محددة
    function goToStep(step) {
        // إخفاء جميع الخطوات
        cartStepContent.style.display = 'none';
        shippingStepContent.style.display = 'none';
        paymentStepContent.style.display = 'none';
        confirmationStepContent.style.display = 'none';

        // إظهار الخطوة المطلوبة
        switch(step) {
            case 1:
                cartStepContent.style.display = 'block';
                prevStepButton.style.display = 'none';
                nextStepButton.style.display = 'block';
                placeOrderButton.style.display = 'none';
                nextStepButton.textContent = 'متابعة';
                break;
            case 2:
                shippingStepContent.style.display = 'block';
                prevStepButton.style.display = 'block';
                nextStepButton.style.display = 'block';
                placeOrderButton.style.display = 'none';
                nextStepButton.textContent = 'متابعة للدفع';
                break;
            case 3:
                paymentStepContent.style.display = 'block';
                prevStepButton.style.display = 'block';
                nextStepButton.style.display = 'block';
                placeOrderButton.style.display = 'none';
                nextStepButton.textContent = 'مراجعة الطلب';
                break;
            case 4:
                confirmationStepContent.style.display = 'block';
                prevStepButton.style.display = 'block';
                nextStepButton.style.display = 'none';
                placeOrderButton.style.display = 'block';
                updateOrderSummary();
                break;
        }

        // تحديث مؤشر الخطوات
        updateStepsIndicator(step);

        // تحديث الخطوة الحالية
        currentStep = step;
    }

    // وظيفة لتحديث ملخص الطلب في صفحة التأكيد
    function updateOrderSummary() {
        // ملخص المنتجات
        if (orderItemsSummary) {
            orderItemsSummary.innerHTML = '';
            if (myCart.length === 0) {
                orderItemsSummary.innerHTML = '<p>لا توجد منتجات في السلة</p>';
            } else {
                let itemsHTML = '<div class="order-items">';
                myCart.forEach(product => {
                    itemsHTML += `
                        <div class="order-item">
                            <span class="item-name">${product.name} x ${product.quantity}</span>
                            <span class="item-price">${parseFloat(product.originalPrice.replace(/[^\d.]/g, "")) * product.quantity} ج.م</span>
                        </div>
                    `;
                });
                itemsHTML += `
                    <div class="order-item total">
                        <span>الإجمالي:</span>
                        <span>${finalAmount.textContent}</span>
                    </div>
                `;
                itemsHTML += '</div>';
                orderItemsSummary.innerHTML = itemsHTML;
            }
        }

        // ملخص العنوان
        if (shippingAddressSummary) {
            const addressSelect = document.getElementById("address-select");
            if (addressSelect && addressSelect.value === "current") {
                shippingAddressSummary.textContent = "العنوان الحالي: شارع المحطة، مدينة العبور، القاهرة";
            } else {
                const governorate = document.getElementById("governorate");
                const city = document.getElementById("city");
                const street = document.getElementById("street");
                const phone = document.getElementById("phone");

                let addressText = "";
                if (governorate && governorate.value) {
                    addressText += governorate.options[governorate.selectedIndex].text + ", ";
                }
                if (city && city.value) {
                    addressText += city.options[city.selectedIndex].text + ", ";
                }
                if (street && street.value) {
                    addressText += street.value + ", ";
                }
                if (phone && phone.value) {
                    addressText += "رقم الهاتف: " + phone.value;
                }

                shippingAddressSummary.textContent = addressText || "لم يتم تحديد عنوان";
            }
        }

        // ملخص طريقة الدفع
        if (paymentMethodSummary) {
            const codRadio = document.getElementById('payment-cod');
            const cardRadio = document.getElementById('payment-card');
            const walletRadio = document.getElementById('payment-wallet');

            if (codRadio && codRadio.checked) {
                paymentMethodSummary.textContent = "الدفع عند الاستلام";
            } else if (cardRadio && cardRadio.checked) {
                const cardNumber = document.getElementById('card-number');
                let cardText = "بطاقة ائتمان";
                if (cardNumber && cardNumber.value) {
                    // إظهار آخر 4 أرقام من البطاقة فقط
                    const cardNumberValue = cardNumber.value.replace(/\s/g, '');
                    if (cardNumberValue.length >= 4) {
                        cardText += " - **** " + cardNumberValue.slice(-4);
                    }
                }
                paymentMethodSummary.textContent = cardText;
            } else if (walletRadio && walletRadio.checked) {
                const walletType = document.getElementById('wallet-type');
                let walletText = "محفظة إلكترونية";
                if (walletType && walletType.value) {
                    walletText += " - " + walletType.options[walletType.selectedIndex].text;
                }
                paymentMethodSummary.textContent = walletText;
            } else {
                paymentMethodSummary.textContent = "لم يتم تحديد طريقة الدفع";
            }
        }
    }

    // Quantity update function
    window.updateQuantity = function (index, action) {
        if (action === 'increase') {
            myCart[index].quantity++;
        } else if (action === 'decrease' && myCart[index].quantity > 1) {
            myCart[index].quantity--;
        }
        localStorage.setItem("myCart", JSON.stringify(myCart));
        updateCartUI();
    };

    // Remove from cart function
    window.removeFromCart = function (index) {
        const productName = myCart[index].name;
        myCart.splice(index, 1);
        localStorage.setItem("myCart", JSON.stringify(myCart));
        updateCartUI();
        showInfoNotification(`تم إزالة ${productName} من السلة`);
    };

    // Add to favorites function
    window.addToFavorites = function (index) {
        let favorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
        let product = myCart[index];
        if (!favorites.some(item => item.id === product.id)) {
            // إضافة المعلومات المطلوبة للمفضلة
            const favoriteProduct = {
                id: product.id || Date.now().toString(),
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                discountedPrice: product.discountedPrice || product.price,
                image: product.image,
                quantity: product.quantity || 1,
                service: product.service || "unknown",
                category: product.category || "unknown",
                description: product.description || "منتج من خدمات العبور",
                rating: product.rating || 4.5,
                ratingCount: product.ratingCount || 10,
                availability: product.availability || "in-stock",
                dateAdded: new Date().getTime()
            };

            favorites.push(favoriteProduct);
            localStorage.setItem("myFavorites", JSON.stringify(favorites));

            // Show success message with animation
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> تمت الإضافة إلى المفضلة!';
            document.body.appendChild(successMessage);

            setTimeout(() => {
                successMessage.classList.add('show');
            }, 100);

            setTimeout(() => {
                successMessage.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                }, 500);
            }, 3000);
        }
    };

    // Add to cart function
    window.addToCart = function (product) {
        // التأكد من وجود معرف للمنتج
        if (!product.id) {
            product.id = Date.now().toString();
        }

        let existingProduct = myCart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity = (existingProduct.quantity || 1) + 1;
            showSuccessNotification(`تم تحديث كمية ${product.name} في السلة`);
        } else {
            // التأكد من وجود جميع الحقول المطلوبة
            const cartProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice || `${product.price} جنيه`,
                discountedPrice: product.discountedPrice || product.price,
                image: product.image,
                quantity: 1,
                service: product.service || "unknown",
                category: product.category || "unknown",
                description: product.description || "منتج من خدمات العبور",
                dateAdded: new Date().getTime()
            };

            myCart.push(cartProduct);
            showSuccessNotification(`تمت إضافة ${product.name} إلى السلة`);
        }
        localStorage.setItem("myCart", JSON.stringify(myCart));
        updateCartUI();
    };

    // Toggle address fields
    window.toggleAddressFields = function() {
        let addressSelect = document.getElementById("address-select");
        let newAddressFields = document.getElementById("new-address-fields");
        if (addressSelect && newAddressFields) {
            newAddressFields.style.display = addressSelect.value === "new" ? "block" : "none";
        }
    };

    // Toggle payment methods
    window.togglePaymentMethod = function() {
        const cardRadio = document.getElementById('payment-card');
        const walletRadio = document.getElementById('payment-wallet');
        const cardFields = document.getElementById('credit-card-fields');
        const walletFields = document.getElementById('wallet-fields');

        if (cardRadio && cardFields && walletRadio && walletFields) {
            cardFields.style.display = cardRadio.checked ? 'block' : 'none';
            walletFields.style.display = walletRadio.checked ? 'block' : 'none';
        }
    };

    // Apply coupon code
    if (applyButton) {
        applyButton.addEventListener('click', function() {
            const code = couponCode.value.trim().toUpperCase();
            if (!code) {
                showWarningNotification("الرجاء إدخال كود الخصم");
                couponMessage.textContent = "الرجاء إدخال كود الخصم";
                couponMessage.style.color = "#f44336";
                return;
            }

            const coupon = validCoupons.find(c => c.code === code);
            if (coupon) {
                appliedCoupon = coupon;
                showSuccessNotification(`تم تطبيق الخصم: ${coupon.discountPercentage}%`);
                couponMessage.textContent = `تم تطبيق الخصم: ${coupon.discountPercentage}%`;
                couponMessage.style.color = "#4CAF50";
                updateCartUI();
            } else {
                appliedCoupon = null;
                showErrorNotification("كود الخصم غير صالح");
                couponMessage.textContent = "كود الخصم غير صالح";
                couponMessage.style.color = "#f44336";
                updateCartUI();
            }
        });
    }

    // أحداث النقر على أزرار التنقل
    if (nextStepButton) {
        nextStepButton.addEventListener('click', function() {
            // التحقق من السلة فارغة
            if (myCart.length === 0 && currentStep === 1) {
                showWarningNotification("السلة فارغة. الرجاء إضافة منتجات قبل المتابعة.");
                return;
            }

            // التحقق من البيانات المطلوبة لكل خطوة
            if (currentStep === 2) {
                // التحقق من بيانات الشحن
                const addressSelect = document.getElementById("address-select");
                if (addressSelect && addressSelect.value === "new") {
                    const requiredFields = ["governorate", "city", "street", "phone"];
                    let isValid = true;

                    requiredFields.forEach(fieldId => {
                        const field = document.getElementById(fieldId);
                        if (field && !field.value.trim()) {
                            field.classList.add("error");
                            isValid = false;
                        } else if (field) {
                            field.classList.remove("error");
                        }
                    });

                    if (!isValid) {
                        showErrorNotification("الرجاء إكمال جميع حقول العنوان المطلوبة.");
                        return;
                    }
                }
            } else if (currentStep === 3) {
                // التحقق من بيانات الدفع
                const cardRadio = document.getElementById('payment-card');
                if (cardRadio && cardRadio.checked) {
                    const cardFields = ["card-number", "card-expiry", "card-cvc", "card-name"];
                    let isValid = true;

                    cardFields.forEach(fieldId => {
                        const field = document.getElementById(fieldId);
                        if (field && !field.value.trim()) {
                            field.classList.add("error");
                            isValid = false;
                        } else if (field) {
                            field.classList.remove("error");
                        }
                    });

                    if (!isValid) {
                        showErrorNotification("الرجاء إكمال جميع تفاصيل بطاقة الائتمان.");
                        return;
                    }
                }

                const walletRadio = document.getElementById('payment-wallet');
                if (walletRadio && walletRadio.checked) {
                    const walletFields = ["wallet-type", "wallet-phone"];
                    let isValid = true;

                    walletFields.forEach(fieldId => {
                        const field = document.getElementById(fieldId);
                        if (field && !field.value.trim()) {
                            field.classList.add("error");
                            isValid = false;
                        } else if (field) {
                            field.classList.remove("error");
                        }
                    });

                    if (!isValid) {
                        showErrorNotification("الرجاء إكمال جميع تفاصيل المحفظة الإلكترونية.");
                        return;
                    }
                }
            }

            // الانتقال إلى الخطوة التالية
            goToStep(currentStep + 1);
        });
    }

    if (prevStepButton) {
        prevStepButton.addEventListener('click', function() {
            // الرجوع إلى الخطوة السابقة
            if (currentStep > 1) {
                goToStep(currentStep - 1);
            }
        });
    }

    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', function() {
            // التحقق من الموافقة على الشروط
            const termsCheckbox = document.getElementById('terms-checkbox');
            if (termsCheckbox && !termsCheckbox.checked) {
                showErrorNotification("يجب الموافقة على الشروط والأحكام لإتمام الطلب.");
                return;
            }

            // إظهار نافذة تأكيد الطلب
            if (orderConfirmation) {
                // توليد رقم طلب عشوائي
                const randomOrderNum = Math.floor(100000 + Math.random() * 900000);
                if (orderNumber) orderNumber.textContent = `#${randomOrderNum}`;
                if (orderTotal) orderTotal.textContent = finalAmount.textContent;

                // حفظ معلومات الطلب لصفحة تتبع الطلب
                const orderTrackingData = {
                    orderNumber: randomOrderNum,
                    orderDate: new Date().toLocaleDateString("ar-EG"),
                    orderStatus: "تم الطلب",
                    myCart: myCart,
                    totalAmount: subtotalAmount.textContent,
                    discountAmount: discountAmount.textContent,
                    shippingAmount: shippingAmount.textContent,
                    finalAmount: finalAmount.textContent,
                    shippingAddress: getShippingAddress(),
                    paymentMethod: getPaymentMethod()
                };

                // حفظ البيانات في localStorage
                localStorage.setItem("orderTrackingData", JSON.stringify(orderTrackingData));

                orderConfirmation.style.display = "flex";

                // مسح السلة بعد نجاح الطلب
                localStorage.removeItem("myCart");
                myCart = [];
            }
        });
    }

    // دالة للحصول على عنوان الشحن
    function getShippingAddress() {
        const addressSelect = document.getElementById("address-select");
        if (addressSelect && addressSelect.value === "current") {
            return "شارع المحطة، مدينة العبور، القاهرة";
        } else {
            const governorate = document.getElementById("governorate");
            const city = document.getElementById("city");
            const street = document.getElementById("street");
            const phone = document.getElementById("phone");

            let addressText = "";
            if (governorate && governorate.value) {
                addressText += governorate.options[governorate.selectedIndex].text + ", ";
            }
            if (city && city.value) {
                addressText += city.options[city.selectedIndex].text + ", ";
            }
            if (street && street.value) {
                addressText += street.value + ", ";
            }
            if (phone && phone.value) {
                addressText += "رقم الهاتف: " + phone.value;
            }

            return addressText || "لم يتم تحديد عنوان";
        }
    }

    // دالة للحصول على طريقة الدفع
    function getPaymentMethod() {
        const codRadio = document.getElementById('payment-cod');
        const cardRadio = document.getElementById('payment-card');
        const walletRadio = document.getElementById('payment-wallet');

        if (codRadio && codRadio.checked) {
            return "الدفع عند الاستلام";
        } else if (cardRadio && cardRadio.checked) {
            const cardNumber = document.getElementById('card-number');
            let cardText = "بطاقة ائتمان";
            if (cardNumber && cardNumber.value) {
                // إظهار آخر 4 أرقام من البطاقة فقط
                const cardNumberValue = cardNumber.value.replace(/\s/g, '');
                if (cardNumberValue.length >= 4) {
                    cardText += " - **** " + cardNumberValue.slice(-4);
                }
            }
            return cardText;
        } else if (walletRadio && walletRadio.checked) {
            const walletType = document.getElementById('wallet-type');
            let walletText = "محفظة إلكترونية";
            if (walletType && walletType.value) {
                walletText += " - " + walletType.options[walletType.selectedIndex].text;
            }
            return walletText;
        } else {
            return "لم يتم تحديد طريقة الدفع";
        }
    }

    // Continue shopping button
    if (continueButton) {
        continueButton.addEventListener('click', function() {
            window.location.href = "Products.html";
        });
    }

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            orderConfirmation.style.display = "none";
            updateCartUI();
        });
    }

    // Track order button
    if (trackOrderButton) {
        trackOrderButton.addEventListener('click', function() {
            window.location.href = "order-tracking.html";
        });
    }

    // Back to shop button
    if (backToShopButton) {
        backToShopButton.addEventListener('click', function() {
            orderConfirmation.style.display = "none";
            window.location.href = "Products.html";
        });
    }

    // Setup payment method toggle listeners
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', window.togglePaymentMethod);
    });

    // Initialize the cart UI
    updateCartUI();

    // Initialize address fields toggle
    window.toggleAddressFields();

    // Initialize payment method toggle
    window.togglePaymentMethod();

    // تهيئة الخطوة الأولى
    goToStep(1);
});

// دوال لعرض رسائل النجاح والتحذير والخطأ
function showSuccessNotification(message) {
    showNotification(message, 'success');
}

function showInfoNotification(message) {
    showNotification(message, 'info');
}

function showErrorNotification(message) {
    showNotification(message, 'error');
}

function showWarningNotification(message) {
    showNotification(message, 'warning');
}

// دالة للتوافق مع الاستدعاءات القديمة
function showToast(toastElement, messageOrElement, message) {
    // إذا كان المعامل الثاني هو عنصر نصي
    if (typeof messageOrElement === 'object' && messageOrElement !== null && message) {
        // تحديث نص الرسالة
        messageOrElement.textContent = message;
        // إظهار الإشعار
        toastElement.classList.add("show");
        // إخفاء الإشعار بعد 3 ثوانٍ
        setTimeout(() => {
            toastElement.classList.remove("show");
        }, 3000);
    } else {
        // إذا كان المعامل الثاني هو نص الرسالة
        showSuccessNotification(messageOrElement || "تمت العملية بنجاح");
    }
}

function showNotification(message, type = 'success') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}-notification`;

    // تحديد الأيقونة حسب نوع الإشعار
    let icon = '';
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        case 'info':
            icon = '<i class="fas fa-info-circle"></i>';
            break;
    }

    // إضافة محتوى الإشعار
    notification.innerHTML = `
        ${icon}
        <span>${message}</span>
        <button class="close-notification"><i class="fas fa-times"></i></button>
    `;

    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);

    // إظهار الإشعار بعد فترة قصيرة
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // إضافة مستمع حدث لزر الإغلاق
    const closeButton = notification.querySelector('.close-notification');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }

    // إخفاء الإشعار تلقائيًا بعد 3 ثوانٍ
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for notifications and success message
const style = document.createElement('style');
style.textContent = `
.success-message {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #4CAF50;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    transform: translateX(120%);
    transition: transform 0.3s ease;
}

.success-message i {
    font-size: 20px;
}

.success-message.show {
    transform: translateX(0);
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    transform: translateX(120%);
    transition: transform 0.3s ease;
    color: white;
}

.notification i {
    font-size: 20px;
}

.notification.show {
    transform: translateX(0);
}

.success-notification {
    background-color: #4CAF50;
}

.error-notification {
    background-color: #f44336;
}

.warning-notification {
    background-color: #ff9800;
}

.info-notification {
    background-color: #2196F3;
}

.close-notification {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    margin-left: 10px;
    padding: 0;
    font-size: 16px;
}

.error {
    border: 2px solid #f44336 !important;
    background-color: rgba(244, 67, 54, 0.05);
}
`;
document.head.appendChild(style);
