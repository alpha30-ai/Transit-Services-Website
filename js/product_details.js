// عند تحميل الصفحة، جلب بيانات المنتج من LocalStorage
document.addEventListener("DOMContentLoaded", function () {
    const productDetails = JSON.parse(localStorage.getItem("productDetails"));

    if (productDetails) {
        // تعيين بيانات المنتج الأساسية
        document.getElementById("big-img").src = productDetails.image;
        document.getElementById("product-name").textContent = productDetails.name;
        document.getElementById("breadcrumb-product-name").textContent = productDetails.name;
        document.getElementById("product-description").textContent = productDetails.description;
        document.getElementById("full-description").textContent = productDetails.description;
        document.getElementById("original-price").textContent = productDetails.originalPrice;
        document.getElementById("discounted-price").textContent = productDetails.discountedPrice;
        document.getElementById("stock-count").textContent = productDetails.availability || 15;

        // تعيين صور المنتج المصغرة
        const smallImages = document.querySelectorAll(".small-img img");
        if (productDetails.images && productDetails.images.length > 0) {
            smallImages.forEach((img, index) => {
                if (productDetails.images[index]) {
                    img.src = productDetails.images[index];
                } else {
                    img.src = productDetails.image; // استخدام الصورة الرئيسية كبديل
                }
            });
        } else {
            // إذا لم تكن هناك صور إضافية، استخدم الصورة الرئيسية لجميع الصور المصغرة
            smallImages.forEach(img => {
                img.src = productDetails.image;
            });
        }
    } else {
        console.error("لا توجد بيانات منتج مخزنة.");
        // تعيين بيانات افتراضية للعرض
        document.getElementById("product-name").textContent = "منتج نموذجي";
        document.getElementById("breadcrumb-product-name").textContent = "منتج نموذجي";
        document.getElementById("product-description").textContent = "وصف المنتج النموذجي هنا. يمكن إضافة المزيد من التفاصيل حول المنتج.";
        document.getElementById("full-description").textContent = "وصف المنتج النموذجي هنا. يمكن إضافة المزيد من التفاصيل حول المنتج.";
        document.getElementById("original-price").textContent = "300.00 جنيه";
        document.getElementById("discounted-price").textContent = "250.00 جنيه";
    }

    // تفعيل وظيفة تبديل الصور المصغرة
    const smallImgs = document.querySelectorAll(".small-img img");
    const mainImg = document.getElementById("big-img");

    smallImgs.forEach(img => {
        img.addEventListener("click", function() {
            mainImg.src = this.src;
        });
    });

    // تفعيل وظيفة زيادة ونقصان الكمية
    const minusBtn = document.querySelector(".quantity-btn.minus");
    const plusBtn = document.querySelector(".quantity-btn.plus");
    const quantityInput = document.querySelector(".quantity-selector input");

    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener("click", function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });

        plusBtn.addEventListener("click", function() {
            let value = parseInt(quantityInput.value);
            let max = parseInt(quantityInput.getAttribute("max"));
            if (value < max) {
                quantityInput.value = value + 1;
            }
        });
    }

    // تفعيل وظيفة اختيار اللون والحجم
    const colorOptions = document.querySelectorAll(".color-option");
    const sizeOptions = document.querySelectorAll(".size-option");

    colorOptions.forEach(option => {
        option.addEventListener("click", function() {
            colorOptions.forEach(opt => opt.classList.remove("active"));
            this.classList.add("active");
        });
    });

    sizeOptions.forEach(option => {
        option.addEventListener("click", function() {
            sizeOptions.forEach(opt => opt.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // تفعيل وظيفة التبويبات
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const tabId = this.getAttribute("data-tab");

            // إزالة الفئة النشطة من جميع الأزرار واللوحات
            tabBtns.forEach(b => b.classList.remove("active"));
            tabPanels.forEach(p => p.classList.remove("active"));

            // إضافة الفئة النشطة للزر واللوحة المحددة
            this.classList.add("active");
            document.getElementById(`${tabId}-panel`).classList.add("active");
        });
    });

    // تفعيل وظيفة تقييم النجوم
    const starSelectors = document.querySelectorAll(".stars-select i");

    starSelectors.forEach((star, index) => {
        star.addEventListener("click", function() {
            starSelectors.forEach((s, i) => {
                if (i <= index) {
                    s.classList.remove("fa-regular");
                    s.classList.add("fa-solid");
                } else {
                    s.classList.remove("fa-solid");
                    s.classList.add("fa-regular");
                }
            });
        });
    });

    // تفعيل وظيفة الشراء السريع
    const buyNowBtn = document.querySelector(".buyNow");
    const quickPurchaseForm = document.querySelector(".creatacountfast");
    const closeFormBtn = document.querySelector(".close-form");

    if (buyNowBtn && quickPurchaseForm && closeFormBtn) {
        buyNowBtn.addEventListener("click", function() {
            quickPurchaseForm.classList.add("active");
        });

        closeFormBtn.addEventListener("click", function() {
            quickPurchaseForm.classList.remove("active");
        });
    }

    // إضافة المنتج للسلة
    const addToCartBtn = document.querySelector(".addtcart");

    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", function(e) {
            e.preventDefault();

            // الحصول على الكمية المحددة
            const quantity = parseInt(document.querySelector(".quantity-selector input").value);

            // الحصول على اللون والحجم المحددين
            let selectedColor = "";
            let selectedSize = "";

            const activeColor = document.querySelector(".color-option.active");
            if (activeColor) {
                selectedColor = window.getComputedStyle(activeColor).backgroundColor;
            }

            const activeSize = document.querySelector(".size-option.active");
            if (activeSize) {
                selectedSize = activeSize.textContent;
            }

            // إنشاء كائن المنتج للإضافة إلى السلة
            const cartItem = {
                id: productDetails?.id || Math.random().toString(36).substr(2, 9),
                name: productDetails?.name || document.getElementById("product-name").textContent,
                price: productDetails?.discountedPrice || document.getElementById("discounted-price").textContent,
                image: productDetails?.image || document.getElementById("big-img").src,
                quantity: quantity,
                color: selectedColor,
                size: selectedSize
            };

            // الحصول على السلة الحالية من التخزين المحلي
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // التحقق مما إذا كان المنتج موجودًا بالفعل في السلة
            const existingItemIndex = cart.findIndex(item =>
                item.id === cartItem.id &&
                item.color === cartItem.color &&
                item.size === cartItem.size
            );

            if (existingItemIndex !== -1) {
                // تحديث الكمية إذا كان المنتج موجودًا بالفعل
                cart[existingItemIndex].quantity += quantity;
            } else {
                // إضافة المنتج الجديد إلى السلة
                cart.push(cartItem);
            }

            // حفظ السلة المحدثة في التخزين المحلي
            localStorage.setItem("cart", JSON.stringify(cart));

            // تحديث عدد العناصر في السلة في الواجهة
            const cartCountElement = document.querySelector(".count-in-card");
            if (cartCountElement) {
                cartCountElement.textContent = cart.length;
            }

            // عرض رسالة تأكيد للمستخدم
            alert("تمت إضافة المنتج إلى السلة بنجاح!");
        });
    }
});
