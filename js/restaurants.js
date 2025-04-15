document.addEventListener("DOMContentLoaded", function() {
    // العناصر الرئيسية في الصفحة
    const restaurantFilter = document.getElementById("restaurantFilter");
    const heroRestaurantFilter = document.getElementById("heroRestaurantFilter");
    const priceRange = document.getElementById("priceRange");
    const categoryFilter = document.getElementById("category");
    const availabilityFilter = document.getElementById("availability");
    const searchInput = document.getElementById("search");
    const heroSearchInput = document.getElementById("heroSearch");
    const restaurantName = document.getElementById("restaurantName");
    const restaurantDescription = document.getElementById("restaurantDescription");
    const restaurantImg = document.getElementById("restaurantImg");
    const restaurantProducts = document.getElementById("restaurantProducts");
    const defaultRestaurantImage = "img/restaurant_ma7y.jpg"; // صورة افتراضية

    // عناصر الواجهة المحسنة
    const backToTopBtn = document.getElementById("backToTop");
    const successToast = document.getElementById("successToast");
    const errorToast = document.getElementById("errorToast");
    const warningToast = document.getElementById("warningToast");
    const loadingIndicator = document.getElementById("loadingIndicator");
    const filterTags = document.querySelectorAll(".restaurant-filter-tag");
    const resetFiltersBtn = document.querySelector(".reset-filters-btn");
    const applyFiltersBtn = document.querySelector(".apply-filters-btn");
    const paginationButtons = document.querySelectorAll(".pagination-btn");

    // تفعيل التبديل بين المنتجات عند الضغط على أزرار الترقيم
    paginationButtons.forEach(button => {
        button.addEventListener("click", function() {
            // إزالة الفئة النشطة من جميع الأزرار
            paginationButtons.forEach(btn => btn.classList.remove("active"));

            // إضافة الفئة النشطة للزر المضغوط
            if (!this.classList.contains("prev") && !this.classList.contains("next")) {
                this.classList.add("active");

                // إظهار مؤشر التحميل
                loadingIndicator.classList.add("show");

                // محاكاة تحميل البيانات
                setTimeout(() => {
                    loadingIndicator.classList.remove("show");

                    // إظهار رسالة نجاح بشكل أكثر احترافية
                    showToast(successToast, "تم عرض المنتجات - الصفحة " + this.textContent);

                    // تمرير تلقائي للأعلى
                    window.scrollTo({
                        top: document.querySelector(".restaurant-products").offsetTop - 100,
                        behavior: "smooth"
                    });

                    // إظهار تأثير انتقالي للمنتجات عند تغيير الصفحة
                    const productCards = document.querySelectorAll(".product-card");

                    // إخفاء المنتجات بشكل متتالي
                    productCards.forEach((card, index) => {
                        card.style.opacity = "0";
                        card.style.transform = "translateY(20px)";

                        // إظهار المنتجات بشكل متتالي مع تأخير مختلف لكل منتج
                        setTimeout(() => {
                            card.style.transition = "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.5)";
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        }, 100 + (index * 50));
                    });
                }, 800);
            }
        });
    });

    // دالة لعرض الإشعارات
    function showToast(toastElement, message = null) {
        if (message) {
            const messageSpan = toastElement.querySelector("span");
            if (messageSpan) {
                messageSpan.textContent = message;
            }
        }

        toastElement.classList.add("show");
        setTimeout(() => {
            toastElement.classList.remove("show");
        }, 3000);
    }

    const productsData = [
        // طعم الماحي
        {
            name: "شاورما",
            description: "شاورما دجاج أو لحم مع خضروات.",
            price: 50,
            discountedPrice: 45,
            category: "sandwiches",
            availability: "in-stock",
            restaurantId: "1",
            image: "img/Foods1.jpg",
            discount: "10%"
        },
        {
            name: "برجر",
            description: "برجر لحم مع جبنة وصلصات.",
            price: 60,
            discountedPrice: 55,
            category: "sandwiches",
            availability: "in-stock",
            restaurantId: "1",
            image: "img/Foods2.jpg",
            discount: "8%"
        },
        {
            name: "بيتزا",
            description: "بيتزا مختلفة النكهات.",
            price: 80,
            discountedPrice: 75,
            category: "pizza",
            availability: "in-stock",
            restaurantId: "1",
            image: "img/Foods3.jpg",
            discount: "6%"
        },
        // مطعم كشري الخديوي
        {
            name: "كشري",
            description: "كشري بالصلصة والدقة.",
            price: 20,
            discountedPrice: 18,
            category: "main_dishes",
            availability: "in-stock",
            restaurantId: "2",
            image: "img/Foods4.jpg",
            discount: "10%"
        },
        {
            name: "محشي",
            description: "محشي برميل وكوسة.",
            price: 30,
            discountedPrice: 27,
            category: "main_dishes",
            availability: "in-stock",
            restaurantId: "2",
            image: "img/Foods5.jpg",
            discount: "10%"
        },
        // مطعم الفلافل المصري
        {
            name: "فلافل",
            description: "فلافل بالحمص والطحينة.",
            price: 15,
            discountedPrice: 13.5,
            category: "sandwiches",
            availability: "in-stock",
            restaurantId: "3",
            image: "img/Foods1.jpg",
            discount: "10%"
        },
        {
            name: "فول مدمس",
            description: "فول مدمس بالزيت والليمون.",
            price: 10,
            discountedPrice: 9,
            category: "main_dishes",
            availability: "in-stock",
            restaurantId: "3",
            image: "img/Foods2.jpg",
            discount: "10%"
        },
        // مطعم دلعين السوري
        {
            name: "شاورما سوري",
            description: "شاورما بالنكهة السورية.",
            price: 55,
            discountedPrice: 50,
            category: "sandwiches",
            availability: "in-stock",
            restaurantId: "4",
            image: "img/Foods3.jpg",
            discount: "9%"
        },
        {
            name: "فتة حمص",
            description: "فتة حمص باللحم والصنوبر.",
            price: 70,
            discountedPrice: 65,
            category: "main_dishes",
            availability: "in-stock",
            restaurantId: "4",
            image: "img/Foods4.jpg",
            discount: "7%"
        }
    ];

    // بيانات المطاعم
    const restaurantsData = [
        {
            id: "1",
            name: "طعم الماحي",
            description: "مطعم يقدم أشهى الوجبات السريعة والمأكولات المتنوعة.",
            image: "img/restaurant_ma7y.jpg"
        },
        {
            id: "2",
            name: "مطعم كشري الخديوي",
            description: "مطعم متخصص في الكشري والأكلات الشعبية المصرية.",
            image: "img/restaurant_koshary.jpg"
        },
        {
            id: "3",
            name: "مطعم الفلافل المصري",
            description: "مطعم يقدم الفلافل والأكلات الشعبية المصرية التقليدية.",
            image: "img/restaurant_falafel.jpg"
        },
        {
            id: "4",
            name: "مطعم دلعين السوري",
            description: "مطعم يقدم الأكلات السورية الأصيلة والشهية.",
            image: "img/restaurant_syrian.jpg"
        }
    ];

    // تحديث معلومات المطعم عند تغيير الفلتر
    restaurantFilter.addEventListener("change", function () {
        const selectedRestaurantId = this.value;
        if (selectedRestaurantId !== "0") {
            const selectedRestaurant = restaurantsData.find(restaurant => restaurant.id === selectedRestaurantId);
            if (selectedRestaurant) {
                restaurantName.textContent = selectedRestaurant.name;
                restaurantDescription.textContent = selectedRestaurant.description;
                restaurantImg.src = selectedRestaurant.image;
            }
        } else {
            // إعادة تعيين إلى القيم الافتراضية
            restaurantName.textContent = "اسم المطعم";
            restaurantDescription.textContent = "وصف المطعم يظهر هنا عند اختيار مطعم معين.";
            restaurantImg.src = defaultRestaurantImage || "img/restaurants1.jpg";
        }

        filterProducts();
        addEventListeners(); // إعادة تعيين مستمعي الأحداث لأزرار السلة والمفضلة
    });

    function filterProducts() {
        const selectedRestaurantId = restaurantFilter.value;
        const selectedCategory = categoryFilter.value;
        const selectedAvailability = availabilityFilter.value;
        const maxPrice = priceRange.value;

        const filteredProducts = productsData.filter(product => {
            const matchesRestaurant = selectedRestaurantId === "0" || product.restaurantId === selectedRestaurantId;
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            const matchesAvailability = selectedAvailability === "all" || product.availability === selectedAvailability;
            const matchesPrice = product.discountedPrice <= maxPrice;

            return matchesRestaurant && matchesCategory && matchesAvailability && matchesPrice;
        });

        renderProducts(filteredProducts);
    }

    function renderProducts(products) {
        // إظهار مؤشر التحميل
        loadingIndicator.classList.add('show');

        // مسح المنتجات السابقة
        restaurantProducts.innerHTML = "";

        setTimeout(() => {
            if (products.length === 0) {
                restaurantProducts.innerHTML = `
                    <div class="no-products-message">
                        <i class="fas fa-search"></i>
                        <p>لا توجد منتجات تتناسب مع الفلاتر المحددة.</p>
                        <button class="reset-filters-btn" id="resetFilters">إعادة ضبط الفلاتر</button>
                    </div>
                `;

                // إضافة حدث لزر إعادة الضبط
                document.getElementById('resetFilters').addEventListener('click', resetAllFilters);
            } else {
                products.forEach(product => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card");

                    // تحديد حالة المنتج (متوفر أو غير متوفر)
                    const availabilityClass = product.availability === "in-stock" ? "in-stock" : "out-of-stock";
                    const availabilityText = product.availability === "in-stock" ? "متوفر" : "غير متوفر";

                    productCard.innerHTML = `
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                            ${product.discount && product.discount !== "0%" ? `<span class="discount">خصم ${product.discount}</span>` : ""}
                        </div>
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            <div class="price">
                                <div class="price-info">
                                    <span class="original-price">${product.price} جنيه</span>
                                    <span class="discounted-price">${product.discountedPrice} جنيه</span>
                                </div>
                                <span class="product-badge ${availabilityClass}">${availabilityText}</span>
                            </div>
                            <div class="product-actions">
                                <button class="add-to-favorite"><i class="fa-regular fa-heart"></i> المفضلة</button>
                                <button class="add-to-cart" ${product.availability !== "in-stock" ? 'disabled' : ''}>
                                    <i class="fa-solid fa-cart-plus"></i> إضافة للسلة
                                </button>
                            </div>
                        </div>
                    `;

                    restaurantProducts.appendChild(productCard);
                });
            }

            // إخفاء مؤشر التحميل
            loadingIndicator.classList.remove('show');

            // إعادة تعيين مستمعي الأحداث لأزرار السلة والمفضلة
            addEventListeners();
        }, 500); // تأخير بسيط لإظهار مؤشر التحميل
    }

    // وظيفة إعادة ضبط جميع الفلاتر
    function resetAllFilters() {
        try {
            restaurantFilter.value = "0";
            heroRestaurantFilter.value = "0";
            priceRange.value = priceRange.max;
            categoryFilter.value = "all";
            availabilityFilter.value = "all";
            searchInput.value = "";
            heroSearchInput.value = "";
            document.getElementById('priceDisplay').textContent = 'السعر: ' + priceRange.value;

            // إعادة تعيين معلومات المطعم إلى القيم الافتراضية
            restaurantName.textContent = "اسم المطعم";
            restaurantDescription.textContent = "وصف المطعم يظهر هنا عند اختيار مطعم معين.";
            restaurantImg.src = defaultRestaurantImage || "img/restaurants1.jpg";

            filterProducts();
            showToast(successToast, 'تم إعادة ضبط جميع الفلاتر');
        } catch (error) {
            console.error("Error resetting filters:", error);
            showToast(errorToast, 'حدث خطأ أثناء إعادة ضبط الفلاتر');
        }
    }

    function addEventListeners() {
        const cartButtons = document.querySelectorAll(".add-to-cart");
        const favoriteButtons = document.querySelectorAll(".add-to-favorite");
        const productImages = document.querySelectorAll(".product-image img");

        cartButtons.forEach((button) => {
            if (button.disabled) return; // تخطي الأزرار المعطلة

            button.addEventListener("click", function () {
                const productCard = this.closest(".product-card");
                const product = {
                    image: productCard.querySelector(".product-image img").src,
                    name: productCard.querySelector("h3").textContent,
                    description: productCard.querySelector(".product-description").textContent,
                    originalPrice: productCard.querySelector(".price-info .original-price").textContent,
                    discountedPrice: productCard.querySelector(".price-info .discounted-price").textContent
                };

                // إظهار مؤشر التحميل
                loadingIndicator.classList.add('show');

                setTimeout(() => {
                    let myCart = JSON.parse(localStorage.getItem("myCart")) || [];
                    const existingProductIndex = myCart.findIndex(item => item.name === product.name);

                    if (existingProductIndex !== -1) {
                        myCart[existingProductIndex].quantity = (myCart[existingProductIndex].quantity || 1) + 1;
                    } else {
                        product.quantity = 1;
                        myCart.push(product);
                    }

                    localStorage.setItem("myCart", JSON.stringify(myCart));
                    updateCartDisplay();

                    // إخفاء مؤشر التحميل وإظهار رسالة نجاح
                    loadingIndicator.classList.remove('show');
                    showToast(successToast, 'تمت إضافة المنتج إلى السلة!');
                }, 500);
            });
        });

        favoriteButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const productCard = this.closest(".product-card");
                const product = {
                    image: productCard.querySelector(".product-image img").src,
                    name: productCard.querySelector("h3").textContent,
                    description: productCard.querySelector(".product-description").textContent,
                    originalPrice: productCard.querySelector(".price-info .original-price").textContent,
                    discountedPrice: productCard.querySelector(".price-info .discounted-price").textContent
                };

                // إظهار مؤشر التحميل
                loadingIndicator.classList.add('show');

                setTimeout(() => {
                    let myFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
                    const existingProductIndex = myFavorites.findIndex(item => item.name === product.name);

                    if (existingProductIndex !== -1) {
                        // إزالة المنتج من المفضلة إذا كان موجوداً بالفعل
                        myFavorites.splice(existingProductIndex, 1);
                        localStorage.setItem("myFavorites", JSON.stringify(myFavorites));

                        // تغيير شكل الزر
                        this.innerHTML = '<i class="fa-regular fa-heart"></i> المفضلة';

                        loadingIndicator.classList.remove('show');
                        showToast(successToast, 'تمت إزالة المنتج من المفضلة');
                    } else {
                        myFavorites.push(product);
                        localStorage.setItem("myFavorites", JSON.stringify(myFavorites));

                        // تغيير شكل الزر
                        this.innerHTML = '<i class="fa-solid fa-heart"></i> المفضلة';

                        loadingIndicator.classList.remove('show');
                        showToast(successToast, 'تمت إضافة المنتج إلى المفضلة!');
                    }

                    updateFavoritesDisplay();
                }, 500);
            });
        });

        productImages.forEach((img) => {
            img.addEventListener("click", function () {
                const productCard = this.closest(".product-card");
                const product = {
                    image: productCard.querySelector(".product-image img").src,
                    name: productCard.querySelector("h3").textContent,
                    description: productCard.querySelector(".product-description").textContent,
                    originalPrice: productCard.querySelector(".price-info .original-price").textContent,
                    discountedPrice: productCard.querySelector(".price-info .discounted-price").textContent
                };

                // إظهار مؤشر التحميل
                loadingIndicator.classList.add('show');

                // تخزين المنتج في التخزين المحلي
                localStorage.setItem("productDetails", JSON.stringify(product));

                // الانتقال إلى صفحة تفاصيل المنتج
                setTimeout(() => {
                    window.location.href = "product_details.html";
                }, 300);
            });
        });
    }

    // وظيفة لإظهار الرسائل المنبثقة
    function showToast(toastElement, message = null) {
        // إغلاق أي إشعارات مفتوحة
        const activeToasts = document.querySelectorAll('.toast-notification.show');
        activeToasts.forEach(toast => {
            toast.classList.remove('show');
        });

        // تحديث نص الإشعار إذا تم توفيره
        if (message) {
            toastElement.querySelector('span').textContent = message;
        }

        // إضافة فئة العرض
        toastElement.classList.add('show');

        // إعادة تعيين الرسوم المتحركة للمؤقت
        const timerBar = toastElement.querySelector('::after');
        if (timerBar) {
            timerBar.style.animation = 'none';
            setTimeout(() => {
                timerBar.style.animation = '';
            }, 10);
        }

        // إضافة زر إغلاق مؤقتاً إذا لم يكن موجوداً
        if (!toastElement.querySelector('.close-toast')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-toast';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.addEventListener('click', () => {
                toastElement.classList.remove('show');
            });
            toastElement.appendChild(closeBtn);
        }

        // إغلاق الإشعار تلقائياً بعد فترة زمنية
        let duration = 5000; // المدة الافتراضية

        // تحديد مدة مختلفة حسب نوع الإشعار
        if (toastElement.classList.contains('success')) {
            duration = 5000;
        } else if (toastElement.classList.contains('error')) {
            duration = 7000;
        } else if (toastElement.classList.contains('warning')) {
            duration = 6000;
        }

        // إضافة تأثير صوتي للإشعار
        const audio = new Audio();
        if (toastElement.classList.contains('success')) {
            audio.src = 'sounds/success.mp3';
        } else if (toastElement.classList.contains('error')) {
            audio.src = 'sounds/error.mp3';
        } else if (toastElement.classList.contains('warning')) {
            audio.src = 'sounds/warning.mp3';
        }
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));

        // إغلاق الإشعار بعد المدة المحددة
        clearTimeout(toastElement.timeoutId);
        toastElement.timeoutId = setTimeout(() => {
            toastElement.classList.remove('show');
        }, duration);
    }

    function updateCartDisplay() {
        const cartCount = document.getElementById("cartCount");
        if (cartCount) {
            const myCart = JSON.parse(localStorage.getItem("myCart")) || [];
            cartCount.textContent = myCart.length;
        }
    }

    function updateFavoritesDisplay() {
        const favoritesCount = document.getElementById("favoritesCount");
        if (favoritesCount) {
            const myFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
            favoritesCount.textContent = myFavorites.length;
        }
    }

    // ربط فلتر البانر الرئيسي مع فلتر المنتجات
    if (heroRestaurantFilter) {
        heroRestaurantFilter.addEventListener("change", function() {
            restaurantFilter.value = this.value;
            filterProducts();
        });
    }

    // ربط بحث البانر الرئيسي مع بحث المنتجات
    if (heroSearchInput) {
        heroSearchInput.addEventListener("input", function() {
            searchInput.value = this.value;
            searchProducts();
        });
    }

    // مستمع حدث لشريط السعر
    priceRange.addEventListener("input", function () {
        filterProducts();
        document.querySelector('#priceDisplay span:last-child').textContent = this.value + ' جنيه';
    });

    // مستمعات أحداث للفلاتر
    categoryFilter.addEventListener("change", filterProducts);
    availabilityFilter.addEventListener("change", filterProducts);
    searchInput.addEventListener("input", searchProducts);

    // مستمعات أحداث لأزرار الفلتر
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetAllFilters);
    }

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // التحقق من القيم قبل تطبيق الفلاتر
            const maxPrice = priceRange.value;

            // التحقق من المطعم المحدد
            if (restaurantFilter.value === "0" && categoryFilter.value === "all" && availabilityFilter.value === "all") {
                console.log("لم يتم تحديد أي فلتر محدد");
            }

            if (maxPrice < 10) {
                // إذا كان السعر منخفض جداً، عرض تحذير
                showToast(warningToast, 'السعر المحدد منخفض جداً وقد لا تظهر نتائج');
            }

            filterProducts();
            showToast(successToast, 'تم تطبيق الفلاتر بنجاح');
        });
    }

    // مستمعات أحداث لشارات الفلتر
    if (filterTags) {
        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // إزالة الشارة عند النقر عليها
                this.style.display = 'none';
                // إعادة تطبيق الفلاتر
                filterProducts();
                // إظهار رسالة نجاح
                showToast(successToast, 'تمت إزالة الفلتر: ' + this.querySelector('span').textContent);
            });
        });
    }

    // زر العودة للأعلى
    if (backToTopBtn) {
        // إظهار الزر عند التمرير لأسفل
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // العودة للأعلى عند النقر
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // وظيفة البحث في المنتجات
    function searchProducts() {
        const searchText = searchInput.value.trim().toLowerCase();
        const productCards = document.querySelectorAll(".product-card");

        if (searchText === "") {
            // إذا كان البحث فارغاً، أعد تطبيق الفلاتر
            filterProducts();
            return;
        }

        productCards.forEach((card) => {
            const productName = card.querySelector("h3")?.textContent.trim().toLowerCase() || "";
            const productDescription = card.querySelector(".product-description")?.textContent.trim().toLowerCase() || "";

            if (productName.includes(searchText) || productDescription.includes(searchText)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });

        // إذا لم يتم العثور على نتائج
        const visibleCards = document.querySelectorAll(".product-card[style='']:not([style='display: none'])");
        if (visibleCards.length === 0) {
            if (!document.querySelector('.no-search-results')) {
                const noResults = document.createElement('div');
                noResults.className = 'no-search-results';
                noResults.innerHTML = `
                    <i class="fas fa-search"></i>
                    <p>لا توجد نتائج للبحث عن "${searchText}"</p>
                    <button class="reset-search-btn" id="resetSearch">مسح البحث</button>
                `;
                restaurantProducts.appendChild(noResults);

                document.getElementById('resetSearch').addEventListener('click', function() {
                    searchInput.value = '';
                    heroSearchInput.value = '';
                    filterProducts();
                });
            }
        } else {
            const noResults = document.querySelector('.no-search-results');
            if (noResults) {
                noResults.remove();
            }
        }
    }

    // تهيئة الصفحة عند التحميل
    filterProducts();

    // إظهار رسالة ترحيبية
    setTimeout(() => {
        showToast(successToast, 'مرحباً بك في مطاعم مدينة العبور!');
    }, 1000);
});
