/**
 * ملف جافاسكريبت لصفحة المفضلة
 * يحتوي على جميع الوظائف والتفاعلات الخاصة بصفحة المفضلة
 */

document.addEventListener("DOMContentLoaded", function() {
    // تعريف العناصر الرئيسية
    const favoritesContainer = document.getElementById("favoritesContainer");
    const emptyFavorites = document.getElementById("emptyFavorites");
    const deleteAllButton = document.getElementById("deleteAllButton");
    const addAllToCartButton = document.getElementById("addAllToCartButton");
    const serviceFilter = document.getElementById("serviceFilter");
    const sortFilter = document.getElementById("sortFilter");
    const searchFilter = document.getElementById("searchFilter");
    const viewTabs = document.querySelectorAll(".view-tab");
    const favoritesCount = document.getElementById("favorites-count");
    const categoriesCount = document.getElementById("categories-count");
    const servicesCount = document.getElementById("services-count");

    // إنشاء عناصر الإشعارات
    createToastElements();

    // استرجاع المفضلة من localStorage
    let myFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];

    // تحميل المنتجات المفضلة
    loadFavorites();

    // إضافة مستمعي الأحداث
    setupEventListeners();

    /**
     * تحميل المنتجات المفضلة وعرضها
     */
    function loadFavorites() {
        // تحديث إحصائيات المفضلة
        updateFavoritesStats();

        // التحقق من وجود منتجات في المفضلة
        if (myFavorites.length === 0) {
            favoritesContainer.innerHTML = "";
            emptyFavorites.style.display = "block";
            return;
        }

        // إخفاء رسالة المفضلة الفارغة
        emptyFavorites.style.display = "none";

        // تطبيق الفلترة والفرز
        const filteredFavorites = filterAndSortFavorites();

        // عرض المنتجات
        renderFavorites(filteredFavorites);
    }

    /**
     * تصفية وفرز المنتجات المفضلة
     */
    function filterAndSortFavorites() {
        let filtered = [...myFavorites];

        // تصفية حسب الخدمة
        if (serviceFilter.value !== "all") {
            filtered = filtered.filter(product => product.category === serviceFilter.value);
        }

        // تصفية حسب البحث
        if (searchFilter.value.trim() !== "") {
            const searchTerm = searchFilter.value.trim().toLowerCase();
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
        }

        // فرز المنتجات
        switch (sortFilter.value) {
            case "newest":
                filtered.sort((a, b) => (b.dateAdded || 0) - (a.dateAdded || 0));
                break;
            case "oldest":
                filtered.sort((a, b) => (a.dateAdded || 0) - (b.dateAdded || 0));
                break;
            case "priceAsc":
                filtered.sort((a, b) => parseFloat(a.discountedPrice) - parseFloat(b.discountedPrice));
                break;
            case "priceDesc":
                filtered.sort((a, b) => parseFloat(b.discountedPrice) - parseFloat(a.discountedPrice));
                break;
        }

        return filtered;
    }

    /**
     * عرض المنتجات المفضلة
     */
    function renderFavorites(products) {
        favoritesContainer.innerHTML = "";

        if (products.length === 0) {
            // عرض رسالة عدم وجود نتائج للبحث
            favoritesContainer.innerHTML = `
                <div class="no-search-results">
                    <i class="fas fa-search"></i>
                    <h3>لا توجد نتائج مطابقة</h3>
                    <p>لم يتم العثور على منتجات تطابق معايير البحث الخاصة بك</p>
                </div>
            `;
            return;
        }

        // عرض المنتجات
        products.forEach((product, index) => {
            const favoriteCard = document.createElement("div");
            favoriteCard.classList.add("product-card");
            favoriteCard.dataset.index = index;
            favoriteCard.dataset.id = product.id || index;
            favoriteCard.dataset.category = product.category || "";

            // تحديد نص الخصم
            const discountText = product.discount ? `خصم ${product.discount}` : "";

            // تحديد نوع المنتج (جديد، الأكثر مبيعاً، مميز)
            let productTag = '';
            if (product.isNew) {
                productTag = `<span class="product-tag new">جديد</span>`;
            } else if (product.isBestseller) {
                productTag = `<span class="product-tag bestseller">الأكثر مبيعاً</span>`;
            } else if (product.isFeatured) {
                productTag = `<span class="product-tag featured">مميز</span>`;
            }

            // تحديد حالة التوفر
            let availabilityBadge = '';
            if (product.availability === 'in-stock') {
                availabilityBadge = `<span class="product-badge in-stock">متوفر</span>`;
            } else if (product.availability === 'low-stock') {
                availabilityBadge = `<span class="product-badge low-stock">متوفر بكمية محدودة</span>`;
            } else if (product.availability === 'out-of-stock') {
                availabilityBadge = `<span class="product-badge out-of-stock">غير متوفر</span>`;
            }

            // تحديد التقييم
            const rating = product.rating || 0;
            const ratingCount = product.ratingCount || 0;
            let ratingStars = '';

            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(rating)) {
                    ratingStars += `<i class="fas fa-star"></i>`;
                } else if (i - 0.5 <= rating) {
                    ratingStars += `<i class="fas fa-star-half-alt"></i>`;
                } else {
                    ratingStars += `<i class="far fa-star"></i>`;
                }
            }

            favoriteCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${discountText ? `<span class="discount">${discountText}</span>` : ''}
                    ${productTag}
                    <div class="product-actions-overlay">
                        <button class="quick-view-btn" title="عرض سريع"><i class="fas fa-eye"></i></button>
                        <button class="share-btn" title="مشاركة"><i class="fas fa-share-alt"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    ${product.category ? `<div class="product-category">${getCategoryName(product.category)}</div>` : ''}
                    <h3>${product.name}</h3>
                    ${rating > 0 ? `
                    <div class="product-rating">
                        ${ratingStars}
                        ${ratingCount > 0 ? `<span>(${ratingCount})</span>` : ''}
                    </div>` : ''}
                    <p class="product-description">${product.description}</p>
                    <div class="price">
                        <div class="price-info">
                            ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                            <span class="discounted-price">${product.discountedPrice}</span>
                        </div>
                        ${availabilityBadge}
                    </div>
                    <div class="product-actions">
                        <button class="ban-btn" data-index="${index}"><i class="fa-solid fa-trash-alt"></i> حذف</button>
                        <button class="add-to-cart" ${product.availability === 'out-of-stock' ? 'disabled' : ''}>
                            <i class="fa-solid fa-cart-plus"></i> إضافة للسلة
                        </button>
                    </div>
                </div>
            `;

            favoritesContainer.appendChild(favoriteCard);
        });

        // إضافة مستمعي الأحداث للأزرار
        addProductButtonsListeners();
    }

    /**
     * إضافة مستمعي الأحداث لأزرار المنتجات
     */
    function addProductButtonsListeners() {
        // أزرار إضافة للسلة
        document.querySelectorAll('.add-to-cart').forEach(button => {
            if (button.hasAttribute('disabled')) return; // تخطي الأزرار المعطلة

            button.addEventListener('click', function() {
                const productCard = this.closest(".product-card");
                const index = parseInt(productCard.dataset.index);
                const product = myFavorites[index];

                addToCart(product);
            });
        });

        // أزرار الحذف
        document.querySelectorAll('.ban-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest(".product-card");
                const index = parseInt(productCard.dataset.index);

                removeFromFavorites(index);
            });
        });

        // أزرار العرض السريع
        document.querySelectorAll('.quick-view-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest(".product-card");
                const index = parseInt(productCard.dataset.index);
                const product = myFavorites[index];

                showQuickView(product);
            });
        });

        // أزرار المشاركة
        document.querySelectorAll('.share-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest(".product-card");
                const index = parseInt(productCard.dataset.index);
                const product = myFavorites[index];

                shareProduct(product);
            });
        });
    }

    /**
     * إضافة منتج إلى سلة التسوق
     */
    function addToCart(product) {
        let myCart = JSON.parse(localStorage.getItem("myCart")) || [];
        const existingProductIndex = myCart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            myCart[existingProductIndex].quantity = (myCart[existingProductIndex].quantity || 1) + 1;
        } else {
            const cartProduct = {...product, quantity: 1};
            myCart.push(cartProduct);
        }

        localStorage.setItem("myCart", JSON.stringify(myCart));
        showToast("success", "تمت الإضافة", "تمت إضافة المنتج إلى سلة التسوق بنجاح");

        // تحديث عدد العناصر في السلة في الهيدر
        updateCartCount();
    }

    /**
     * إزالة منتج من المفضلة
     */
    function removeFromFavorites(index) {
        const productName = myFavorites[index].name;
        myFavorites.splice(index, 1);
        localStorage.setItem("myFavorites", JSON.stringify(myFavorites));

        showToast("info", "تمت الإزالة", `تمت إزالة ${productName} من المفضلة`);

        // إعادة تحميل المفضلة
        loadFavorites();
    }

    /**
     * إضافة جميع المنتجات إلى السلة
     */
    function addAllToCart() {
        if (myFavorites.length === 0) {
            showToast("warning", "تنبيه", "لا توجد منتجات في المفضلة لإضافتها إلى السلة");
            return;
        }

        let myCart = JSON.parse(localStorage.getItem("myCart")) || [];
        let addedCount = 0;

        // تصفية المنتجات حسب الفلاتر الحالية
        const filteredProducts = filterAndSortFavorites();

        filteredProducts.forEach(product => {
            const existingProductIndex = myCart.findIndex(item => item.id === product.id);

            if (existingProductIndex !== -1) {
                myCart[existingProductIndex].quantity = (myCart[existingProductIndex].quantity || 1) + 1;
            } else {
                const cartProduct = {...product, quantity: 1};
                myCart.push(cartProduct);
            }

            addedCount++;
        });

        localStorage.setItem("myCart", JSON.stringify(myCart));

        if (addedCount > 0) {
            showToast("success", "تمت الإضافة", `تمت إضافة ${addedCount} منتج إلى سلة التسوق`);
            // تحديث عدد العناصر في السلة في الهيدر
            updateCartCount();
        } else {
            showToast("warning", "تنبيه", "لم يتم العثور على منتجات مطابقة لإضافتها إلى السلة");
        }
    }

    /**
     * حذف جميع المنتجات من المفضلة
     */
    function deleteAllFavorites() {
        if (myFavorites.length === 0) {
            showToast("warning", "تنبيه", "المفضلة فارغة بالفعل");
            return;
        }

        // تصفية المنتجات حسب الفلاتر الحالية
        const filteredProducts = filterAndSortFavorites();

        if (filteredProducts.length === 0) {
            showToast("warning", "تنبيه", "لا توجد منتجات مطابقة للحذف");
            return;
        }

        // إنشاء مصفوفة جديدة بدون المنتجات المصفاة
        const productIdsToRemove = new Set(filteredProducts.map(product => product.id));
        myFavorites = myFavorites.filter(product => !productIdsToRemove.has(product.id));

        localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
        showToast("info", "تم الحذف", `تم حذف ${filteredProducts.length} منتج من المفضلة`);

        // إعادة تحميل المفضلة
        loadFavorites();
    }

    /**
     * تحديث إحصائيات المفضلة
     */
    function updateFavoritesStats() {
        // عدد المنتجات في المفضلة
        favoritesCount.textContent = myFavorites.length;

        // عدد الفئات المختلفة
        const uniqueCategories = new Set(myFavorites.map(product => product.category).filter(Boolean));
        categoriesCount.textContent = uniqueCategories.size;

        // عدد الخدمات المختلفة
        const uniqueServices = new Set(myFavorites.map(product => product.service).filter(Boolean));
        servicesCount.textContent = uniqueServices.size;
    }

    /**
     * تحديث عدد العناصر في السلة في الهيدر
     */
    function updateCartCount() {
        const cartCountElement = document.querySelector(".count-in-card");
        if (cartCountElement) {
            const myCart = JSON.parse(localStorage.getItem("myCart")) || [];
            const totalItems = myCart.reduce((total, item) => total + (item.quantity || 1), 0);
            cartCountElement.textContent = totalItems;
        }
    }

    /**
     * إعداد مستمعي الأحداث
     */
    function setupEventListeners() {
        // مستمع حدث لزر حذف الكل
        deleteAllButton.addEventListener('click', deleteAllFavorites);

        // مستمع حدث لزر إضافة الكل للسلة
        addAllToCartButton.addEventListener('click', addAllToCart);

        // مستمعي أحداث للفلاتر
        serviceFilter.addEventListener('change', loadFavorites);
        sortFilter.addEventListener('change', loadFavorites);
        searchFilter.addEventListener('input', debounce(loadFavorites, 300));

        // مستمعي أحداث لأزرار طريقة العرض
        viewTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // إزالة الكلاس النشط من جميع الأزرار
                viewTabs.forEach(t => t.classList.remove('active'));
                // إضافة الكلاس النشط للزر المضغوط
                this.classList.add('active');

                // تغيير طريقة العرض
                const viewMode = this.getAttribute('data-view');
                favoritesContainer.className = `favorites-products ${viewMode}-view`;
            });
        });
    }

    /**
     * إنشاء عناصر الإشعارات
     */
    function createToastElements() {
        // إنشاء حاويات الإشعارات
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);

        // إنشاء إشعار النجاح
        const successToast = document.createElement('div');
        successToast.className = 'toast-notification success';
        successToast.innerHTML = `
            <div class="toast-icon"><i class="fas fa-check-circle"></i></div>
            <div class="toast-content">
                <div class="toast-title">تمت العملية بنجاح</div>
                <div class="toast-message">تم تنفيذ العملية بنجاح</div>
            </div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        toastContainer.appendChild(successToast);

        // إنشاء إشعار الخطأ
        const errorToast = document.createElement('div');
        errorToast.className = 'toast-notification error';
        errorToast.innerHTML = `
            <div class="toast-icon"><i class="fas fa-exclamation-circle"></i></div>
            <div class="toast-content">
                <div class="toast-title">حدث خطأ</div>
                <div class="toast-message">حدث خطأ أثناء تنفيذ العملية</div>
            </div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        toastContainer.appendChild(errorToast);

        // إنشاء إشعار التحذير
        const warningToast = document.createElement('div');
        warningToast.className = 'toast-notification warning';
        warningToast.innerHTML = `
            <div class="toast-icon"><i class="fas fa-exclamation-triangle"></i></div>
            <div class="toast-content">
                <div class="toast-title">تحذير</div>
                <div class="toast-message">يرجى الانتباه إلى هذا التحذير</div>
            </div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        toastContainer.appendChild(warningToast);

        // إنشاء إشعار المعلومات
        const infoToast = document.createElement('div');
        infoToast.className = 'toast-notification info';
        infoToast.innerHTML = `
            <div class="toast-icon"><i class="fas fa-info-circle"></i></div>
            <div class="toast-content">
                <div class="toast-title">معلومات</div>
                <div class="toast-message">هذه معلومات إضافية</div>
            </div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        toastContainer.appendChild(infoToast);

        // إضافة مستمعي أحداث لأزرار الإغلاق
        document.querySelectorAll('.toast-close').forEach(button => {
            button.addEventListener('click', function() {
                const toast = this.closest('.toast-notification');
                hideToast(toast);
            });
        });
    }

    /**
     * عرض إشعار
     */
    function showToast(type, title, message) {
        const toast = document.querySelector(`.toast-notification.${type}`);
        if (!toast) return;

        // تعيين العنوان والرسالة
        toast.querySelector('.toast-title').textContent = title;
        toast.querySelector('.toast-message').textContent = message;

        // عرض الإشعار
        toast.classList.add('show');

        // إخفاء الإشعار بعد 3 ثوانٍ
        setTimeout(() => {
            hideToast(toast);
        }, 3000);
    }

    /**
     * إخفاء إشعار
     */
    function hideToast(toast) {
        toast.classList.remove('show');
    }

    /**
     * الحصول على اسم الفئة
     */
    function getCategoryName(category) {
        const categories = {
            'pharmacy': 'صيدليات',
            'hypermarket': 'هايبر ماركت',
            'restaurant': 'مطاعم',
            'car': 'صيانة سيارات',
            'hospital': 'مستشفيات',
            'lab': 'معامل تحاليل'
        };

        return categories[category] || category;
    }

    /**
     * دالة لتأخير تنفيذ الوظائف (للبحث)
     */
    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    /**
     * عرض العرض السريع للمنتج
     */
    function showQuickView(product) {
        // إنشاء عنصر العرض السريع
        const quickViewOverlay = document.createElement('div');
        quickViewOverlay.className = 'quick-view-overlay';

        // تحديد نص الخصم
        const discountText = product.discount ? `خصم ${product.discount}` : "";

        // تحديد حالة التوفر
        let availabilityBadge = '';
        if (product.availability === 'in-stock') {
            availabilityBadge = `<span class="product-badge in-stock">متوفر</span>`;
        } else if (product.availability === 'low-stock') {
            availabilityBadge = `<span class="product-badge low-stock">متوفر بكمية محدودة</span>`;
        } else if (product.availability === 'out-of-stock') {
            availabilityBadge = `<span class="product-badge out-of-stock">غير متوفر</span>`;
        }

        // تحديد التقييم
        const rating = product.rating || 0;
        const ratingCount = product.ratingCount || 0;
        let ratingStars = '';

        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                ratingStars += `<i class="fas fa-star"></i>`;
            } else if (i - 0.5 <= rating) {
                ratingStars += `<i class="fas fa-star-half-alt"></i>`;
            } else {
                ratingStars += `<i class="far fa-star"></i>`;
            }
        }

        quickViewOverlay.innerHTML = `
            <div class="quick-view-modal">
                <button class="quick-view-close"><i class="fas fa-times"></i></button>
                <div class="quick-view-content">
                    <div class="quick-view-image">
                        <img src="${product.image}" alt="${product.name}">
                        ${discountText ? `<span class="discount">${discountText}</span>` : ''}
                    </div>
                    <div class="quick-view-details">
                        ${product.category ? `<div class="product-category">${getCategoryName(product.category)}</div>` : ''}
                        <h2>${product.name}</h2>
                        ${rating > 0 ? `
                        <div class="product-rating">
                            ${ratingStars}
                            ${ratingCount > 0 ? `<span>(${ratingCount})</span>` : ''}
                        </div>` : ''}
                        <div class="price">
                            <div class="price-info">
                                ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                                <span class="discounted-price">${product.discountedPrice}</span>
                            </div>
                            ${availabilityBadge}
                        </div>
                        <div class="product-description-full">
                            <h3>وصف المنتج</h3>
                            <p>${product.description}</p>
                        </div>
                        <div class="quick-view-actions">
                            <button class="add-to-cart-quick" ${product.availability === 'out-of-stock' ? 'disabled' : ''}>
                                <i class="fa-solid fa-cart-plus"></i> إضافة للسلة
                            </button>
                            <button class="share-product-quick">
                                <i class="fas fa-share-alt"></i> مشاركة
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(quickViewOverlay);

        // إظهار العرض السريع بعد إضافته للصفحة
        setTimeout(() => {
            quickViewOverlay.classList.add('show');
        }, 10);

        // إضافة مستمع حدث لزر الإغلاق
        const closeButton = quickViewOverlay.querySelector('.quick-view-close');
        closeButton.addEventListener('click', () => {
            quickViewOverlay.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(quickViewOverlay);
            }, 300);
        });

        // إضافة مستمع حدث للنقر خارج العرض السريع
        quickViewOverlay.addEventListener('click', (e) => {
            if (e.target === quickViewOverlay) {
                quickViewOverlay.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(quickViewOverlay);
                }, 300);
            }
        });

        // إضافة مستمع حدث لزر إضافة للسلة
        const addToCartButton = quickViewOverlay.querySelector('.add-to-cart-quick');
        if (!addToCartButton.hasAttribute('disabled')) {
            addToCartButton.addEventListener('click', () => {
                addToCart(product);
                quickViewOverlay.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(quickViewOverlay);
                }, 300);
            });
        }

        // إضافة مستمع حدث لزر المشاركة
        const shareButton = quickViewOverlay.querySelector('.share-product-quick');
        shareButton.addEventListener('click', () => {
            shareProduct(product);
        });
    }

    /**
     * مشاركة المنتج
     */
    function shareProduct(product) {
        // إنشاء عنصر مشاركة المنتج
        const shareOverlay = document.createElement('div');
        shareOverlay.className = 'share-overlay';

        shareOverlay.innerHTML = `
            <div class="share-modal">
                <button class="share-close"><i class="fas fa-times"></i></button>
                <div class="share-content">
                    <h3>مشاركة ${product.name}</h3>
                    <p>شارك هذا المنتج مع أصدقائك</p>
                    <div class="share-buttons">
                        <button class="share-facebook"><i class="fab fa-facebook-f"></i> فيسبوك</button>
                        <button class="share-twitter"><i class="fab fa-twitter"></i> تويتر</button>
                        <button class="share-whatsapp"><i class="fab fa-whatsapp"></i> واتساب</button>
                        <button class="share-telegram"><i class="fab fa-telegram-plane"></i> تيليجرام</button>
                    </div>
                    <div class="share-link">
                        <input type="text" value="https://example.com/product/${product.id || '1'}" readonly>
                        <button class="copy-link"><i class="fas fa-copy"></i> نسخ</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(shareOverlay);

        // إظهار نافذة المشاركة بعد إضافتها للصفحة
        setTimeout(() => {
            shareOverlay.classList.add('show');
        }, 10);

        // إضافة مستمع حدث لزر الإغلاق
        const closeButton = shareOverlay.querySelector('.share-close');
        closeButton.addEventListener('click', () => {
            shareOverlay.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(shareOverlay);
            }, 300);
        });

        // إضافة مستمع حدث للنقر خارج نافذة المشاركة
        shareOverlay.addEventListener('click', (e) => {
            if (e.target === shareOverlay) {
                shareOverlay.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(shareOverlay);
                }, 300);
            }
        });

        // إضافة مستمع حدث لزر نسخ الرابط
        const copyButton = shareOverlay.querySelector('.copy-link');
        copyButton.addEventListener('click', () => {
            const linkInput = shareOverlay.querySelector('.share-link input');
            linkInput.select();
            document.execCommand('copy');
            showToast('success', 'تم النسخ', 'تم نسخ رابط المنتج بنجاح');
        });

        // إضافة مستمعات أحداث لأزرار المشاركة
        const facebookButton = shareOverlay.querySelector('.share-facebook');
        facebookButton.addEventListener('click', () => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=https://example.com/product/${product.id || '1'}`, '_blank');
        });

        const twitterButton = shareOverlay.querySelector('.share-twitter');
        twitterButton.addEventListener('click', () => {
            window.open(`https://twitter.com/intent/tweet?url=https://example.com/product/${product.id || '1'}&text=${encodeURIComponent(product.name)}`, '_blank');
        });

        const whatsappButton = shareOverlay.querySelector('.share-whatsapp');
        whatsappButton.addEventListener('click', () => {
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(product.name + ' - https://example.com/product/' + (product.id || '1'))}`, '_blank');
        });

        const telegramButton = shareOverlay.querySelector('.share-telegram');
        telegramButton.addEventListener('click', () => {
            window.open(`https://t.me/share/url?url=https://example.com/product/${product.id || '1'}&text=${encodeURIComponent(product.name)}`, '_blank');
        });
    }

    // تحديث عدد العناصر في السلة عند تحميل الصفحة
    updateCartCount();
});