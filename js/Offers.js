document.addEventListener("DOMContentLoaded", function() {
    // العناصر الرئيسية في الصفحة
    const serviceFilter = document.getElementById("serviceFilter");
    const heroServiceFilter = document.getElementById("heroServiceFilter");
    const priceRange = document.getElementById("priceRange");
    const priceRangeValue = document.getElementById("priceRangeValue");
    const categoryFilter = document.getElementById("category");
    const availabilityFilter = document.getElementById("availability");
    const filterSearch = document.getElementById("filterSearch");
    const heroSearch = document.getElementById("heroSearch");
    const sortBy = document.getElementById("sortBy");
    const gridViewBtn = document.getElementById("gridView");
    const listViewBtn = document.getElementById("listView");
    const loadingIndicator = document.getElementById("loadingIndicator");
    const noOffersMessage = document.getElementById("noOffersMessage");
    const resetFiltersBtn = document.getElementById("resetFilters");
    const activeFilters = document.getElementById("activeFilters");
    const backToTopBtn = document.getElementById("backToTop");
    const successToast = document.getElementById("successToast");
    const errorToast = document.getElementById("errorToast");
    const successToastMessage = document.getElementById("successToastMessage");
    const errorToastMessage = document.getElementById("errorToastMessage");

    // أقسام العروض
    const pharmacyOffers = document.getElementById("pharmacyOffers");
    const hypermarketOffers = document.getElementById("hypermarketOffers");
    const restaurantOffers = document.getElementById("restaurantOffers");
    const carServiceOffers = document.getElementById("carServiceOffers");
    const randomOffers = document.getElementById("randomOffers");

    // التنقل بين الصفحات
    const pagination = document.getElementById("pagination");
    const paginationNumbers = document.getElementById("paginationNumbers");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");

    // متغيرات عامة
    let currentPage = 1;
    const offersPerPage = 8;
    let filteredOffers = [];
    let currentFilter = {
        service: "all",
        category: "all",
        price: 1000,
        availability: "all",
        search: ""
    };

    // بيانات العروض
    const offersData = [
    // منتجات الصيدليات
    {
        id: "p1",
        name: "باراسيتامول",
        description: "مسكن للألم وخافض للحرارة، يستخدم لعلاج الصداع وآلام العضلات والمفاصل.",
        price: 25,
        discountedPrice: 22.5,
        discount: 10,
        category: "مسكنات",
        service: "pharmacy",
        availability: "in-stock",
        rating: 4.5,
        reviewCount: 42,
        image: "img/paracetamol-extra-en.jpg",
        tags: ["new"]
    },
    {
        id: "p2",
        name: "أسبرين",
        description: "مسكن للألم ومضاد للتجلط. يستخدم للوقاية من النوبات القلبية والسكتات الدماغية.",
        price: 15,
        discountedPrice: 13.5,
        discount: 5,
        category: "أدوية القلب",
        service: "pharmacy",
        availability: "out-of-stock",
        rating: 4.0,
        reviewCount: 28,
        image: "img/prod-packshot-aspirin-protect-ar2 (1).png",
        tags: ["bestseller"]
    },
    {
        id: "p3",
        name: "فيتامين سي",
        description: "مكمل غذائي يدعم جهاز المناعة ويساعد في الوقاية من نزلات البرد والإنفلونزا.",
        price: 35,
        discountedPrice: 30,
        discount: 15,
        category: "فيتامينات",
        service: "pharmacy",
        availability: "in-stock",
        rating: 4.8,
        reviewCount: 56,
        image: "img/vitamin-d.jpg",
        tags: []
    },
    {
        id: "p4",
        name: "مضاد حيوي",
        description: "مضاد حيوي يستخدم لعلاج العدوى البكتيرية.",
        price: 50,
        discountedPrice: 45,
        discount: 10,
        category: "مضادات حيوية",
        service: "pharmacy",
        availability: "in-stock",
        rating: 4.7,
        reviewCount: 35,
        image: "img/antibiotic.jpg",
        tags: ["new"]
    },

    // منتجات الهايبر ماركت
    {
        id: "h1",
        name: "أرز أبيض",
        description: "أرز أبيض من الدرجة الأولى، عالي الجودة ومناسب لجميع أنواع الطبخ.",
        price: 25,
        discountedPrice: 22.5,
        discount: 10,
        category: "مواد غذائية",
        service: "hypermarket",
        availability: "in-stock",
        rating: 5.0,
        reviewCount: 64,
        image: "img/2a3b2788-897e-434c-9c39-cccd4c3a9c69.jpg",
        tags: []
    },
    {
        id: "h2",
        name: "زيت زيتون",
        description: "زيت زيتون بكر ممتاز، معصور على البارد، غني بمضادات الأكسدة والفوائد الصحية.",
        price: 120,
        discountedPrice: 108,
        discount: 10,
        category: "زيوت وسمن",
        service: "hypermarket",
        availability: "in-stock",
        rating: 4.7,
        reviewCount: 38,
        image: "img/joint-supplement.jpg",
        tags: ["featured"]
    },
    {
        id: "h3",
        name: "عصير برتقال طبيعي",
        description: "عصير برتقال طبيعي 100%، بدون إضافة سكر أو مواد حافظة، غني بفيتامين سي.",
        price: 18,
        discountedPrice: 15,
        discount: 15,
        category: "مشروبات",
        service: "hypermarket",
        availability: "in-stock",
        rating: 4.5,
        reviewCount: 27,
        image: "img/skin-supplement.jpg",
        tags: ["new"]
    },
    {
        id: "h4",
        name: "معكرونة إسباجيتي",
        description: "معكرونة إسباجيتي عالية الجودة، مصنوعة من القمح الكامل.",
        price: 20,
        discountedPrice: 18,
        discount: 10,
        category: "مواد غذائية",
        service: "hypermarket",
        availability: "in-stock",
        rating: 4.6,
        reviewCount: 40,
        image: "img/spaghetti.jpg",
        tags: ["new"]
    },

    // منتجات المطاعم
    {
        id: "r1",
        name: "بيتزا مارجريتا",
        description: "بيتزا مارجريتا مع صلصة الطماطم وجبنة الموزاريلا والريحان الطازج.",
        price: 80,
        discountedPrice: 68,
        discount: 15,
        category: "وجبات سريعة",
        service: "restaurant",
        availability: "in-stock",
        rating: 4.5,
        reviewCount: 92,
        image: "img/restaurants1.jpg",
        tags: ["bestseller"]
    },
    {
        id: "r2",
        name: "برجر لحم أنجوس",
        description: "برجر لحم أنجوس مشوي مع جبنة شيدر وصلصة خاصة، يقدم مع بطاطس مقلية.",
        price: 95,
        discountedPrice: 85.5,
        discount: 10,
        category: "برجر",
        service: "restaurant",
        availability: "in-stock",
        rating: 4.8,
        reviewCount: 76,
        image: "img/Foods1.jpg",
        tags: []
    },
    {
        id: "r3",
        name: "سلطة سيزر بالدجاج",
        description: "سلطة سيزر طازجة مع قطع دجاج مشوية وجبن بارميزان وصلصة سيزر الخاصة.",
        price: 65,
        discountedPrice: 58.5,
        discount: 10,
        category: "سلطات",
        service: "restaurant",
        availability: "in-stock",
        rating: 4.6,
        reviewCount: 45,
        image: "img/Foods2.jpg",
        tags: ["new"]
    },
    {
        id: "r4",
        name: "شاورما دجاج",
        description: "شاورما دجاج مع خضروات طازجة وصلصة ثومية، يقدم مع خبز عربي.",
        price: 50,
        discountedPrice: 45,
        discount: 10,
        category: "وجبات سريعة",
        service: "restaurant",
        availability: "in-stock",
        rating: 4.7,
        reviewCount: 55,
        image: "img/shawarma.jpg",
        tags: ["new"]
    },

    // منتجات خدمات السيارات
    {
        id: "c1",
        name: "فرش سيارات جلد",
        description: "فرش سيارات جلد فاخر مقاوم للماء والحرارة، مناسب لجميع أنواع السيارات.",
        price: 500,
        discountedPrice: 475,
        discount: 5,
        category: "فرش سيارات",
        service: "car-service",
        availability: "in-stock",
        rating: 5.0,
        reviewCount: 32,
        image: "img/Cars1.jpg",
        tags: []
    },
    {
        id: "c2",
        name: "زيت محرك سينثتيك",
        description: "زيت محرك سينثتيك كامل 5W-30، يوفر حماية قصوى للمحرك ويحسن من أداء السيارة.",
        price: 250,
        discountedPrice: 225,
        discount: 10,
        category: "زيوت وسوائل",
        service: "car-service",
        availability: "in-stock",
        rating: 4.9,
        reviewCount: 58,
        image: "img/Cars2.jpg",
        tags: ["bestseller"]
    },
    {
        id: "c3",
        name: "مساحات زجاج أمامي",
        description: "مساحات زجاج أمامي عالية الجودة، مقاومة للأشعة فوق البنفسجية وتوفر رؤية واضحة في جميع الظروف الجوية.",
        price: 120,
        discountedPrice: 108,
        discount: 10,
        category: "قطع غيار",
        service: "car-service",
        availability: "out-of-stock",
        rating: 4.3,
        reviewCount: 24,
        image: "img/Cars3.jpg",
        tags: []
    },
    {
        id: "c4",
        name: "إطارات سيارات",
        description: "إطارات سيارات عالية الجودة، مناسبة لجميع أنواع الطرق.",
        price: 800,
        discountedPrice: 720,
        discount: 10,
        category: "إطارات",
        service: "car-service",
        availability: "in-stock",
        rating: 4.8,
        reviewCount: 30,
        image: "img/tires.jpg",
        tags: ["new"]
    }
];

    // تهيئة الصفحة
    function initPage() {
        // إظهار مؤشر التحميل
        loadingIndicator.classList.add("show");

        // تحديث عدد المنتجات في السلة وإجمالي السعر
        updateCartInfo();

        // رابط السلة يعمل بشكل افتراضي بدون الحاجة إلى مستمع حدث

        // تحميل المنتجات بعد فترة قصيرة (محاكاة لتأخير الشبكة)
        setTimeout(() => {
            // تحميل العروض لكل قسم
            loadOffersByService("pharmacy", pharmacyOffers);
            loadOffersByService("hypermarket", hypermarketOffers);
            loadOffersByService("restaurant", restaurantOffers);
            loadOffersByService("car-service", carServiceOffers);

            // تحميل عروض عشوائية
            loadRandomOffers();

            // إخفاء مؤشر التحميل
            loadingIndicator.classList.remove("show");

            // تهيئة الترقيم
            setupPagination();

            // تهيئة مستمع الأحداث
            setupEventListeners();

            // تحديث فئات المنتجات
            updateCategoryOptions('all');

            // تطبيق الفلاتر الافتراضية
            applyFilters();

            // تحديث حالة أزرار المفضلة
            updateFavoriteButtonsState();

            // تحديث معلومات السلة مرة أخرى بعد تحميل الصفحة
            updateCartInfo();
        }, 1000);
    }

    // تحديث معلومات السلة
    function updateCartInfo() {
        // الحصول على السلة من التخزين المحلي
        const cart = JSON.parse(localStorage.getItem('myCart')) || [];

        // تحديث عدد المنتجات في السلة
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
            cartCount.textContent = totalItems;
        }

        // حساب إجمالي سعر السلة
        const cartTotalPrice = document.getElementById('cartTotalPrice');
        if (cartTotalPrice) {
            const totalPrice = cart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0);
            cartTotalPrice.textContent = `${totalPrice.toFixed(2)} جنيه`;
        }
    }

    // تحديث حالة أزرار المفضلة
    function updateFavoriteButtonsState() {
        // الحصول على قائمة المفضلة من التخزين المحلي
        const favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];

        // الحصول على جميع أزرار المفضلة
        const favoriteButtons = document.querySelectorAll('.add-to-favorite, .add-to-favorite-btn');

        // تحديث حالة كل زر
        favoriteButtons.forEach(button => {
            // الحصول على معرف العرض
            const offerCard = button.closest('.offer-card');
            const offerId = offerCard ? offerCard.dataset.id : button.dataset.id;

            // التحقق مما إذا كان العرض في المفضلة
            const isFavorite = favorites.some(item => item.id === offerId);

            // تحديث حالة الزر
            if (isFavorite) {
                button.classList.add('active');
                const icon = button.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-heart';
                }
            }
        });
    }

    // تحميل العروض حسب الخدمة
    function loadOffersByService(service, container) {
        try {
            // التحقق من وجود الحاوية
            if (!container) {
                console.error(`الحاوية غير موجودة للخدمة: ${service}`);
                return;
            }

            // تصفية العروض حسب الخدمة
            const serviceOffers = offersData.filter(offer => offer.service === service);

            // الحد الأقصى للعروض المعروضة في كل قسم
            const maxOffers = 4;

            // تفريغ الحاوية
            container.innerHTML = '';

            // إضافة العروض إلى الحاوية
            serviceOffers.slice(0, maxOffers).forEach(offer => {
                container.appendChild(createOfferCard(offer));
            });
        } catch (error) {
            console.error(`حدث خطأ أثناء تحميل عروض الخدمة ${service}:`, error);
        }
    }

    // تحميل عروض عشوائية
    function loadRandomOffers() {
        try {
            // التحقق من وجود الحاوية
            if (!randomOffers) {
                console.error("حاوية العروض العشوائية غير موجودة");
                return;
            }

            // خلط العروض بشكل عشوائي
            const shuffledOffers = [...offersData].sort(() => 0.5 - Math.random());

            // الحد الأقصى للعروض العشوائية
            const maxRandomOffers = 4;

            // تفريغ الحاوية
            randomOffers.innerHTML = '';

            // إضافة العروض العشوائية إلى الحاوية
            shuffledOffers.slice(0, maxRandomOffers).forEach(offer => {
                randomOffers.appendChild(createOfferCard(offer));
            });
        } catch (error) {
            console.error("حدث خطأ أثناء تحميل العروض العشوائية:", error);
        }
    }

    // إنشاء كرت عرض
    function createOfferCard(offer) {
        const offerCard = document.createElement("div");
        offerCard.className = "offer-card";
        offerCard.dataset.id = offer.id;

        // تحديد حالة توفر العرض
        const isAvailable = offer.availability === "in-stock";

        // إنشاء محتوى كرت العرض
        offerCard.innerHTML = `
            <div class="offer-image">
                <img src="${offer.image}" alt="${offer.name}">
                ${offer.discount ? `<span class="discount">خصم ${offer.discount}%</span>` : ''}
                ${offer.tags && offer.tags.length > 0 ? `<span class="offer-tag ${offer.tags[0]}">${getTagText(offer.tags[0])}</span>` : ''}
                <div class="offer-actions-overlay">
                    <button class="quick-view-btn" data-id="${offer.id}"><i class="fas fa-eye"></i></button>
                    <button class="add-to-favorite-btn" data-id="${offer.id}"><i class="far fa-heart"></i></button>
                </div>
            </div>
            <div class="offer-info">
                <div class="offer-category">${offer.category}</div>
                <h3>${offer.name}</h3>
                <div class="offer-rating">
                    ${generateRatingStars(offer.rating)}
                    <span>(${offer.reviewCount})</span>
                </div>
                <p class="offer-description">${offer.description}</p>
                <div class="price">
                    <div class="price-info">
                        ${offer.discount ? `<span class="original-price">${offer.price} جنيه</span>` : ''}
                        <span class="discounted-price">${offer.discountedPrice || offer.price} جنيه</span>
                    </div>
                    <span class="offer-badge ${isAvailable ? 'in-stock' : 'out-of-stock'}">
                        <i class="fas ${isAvailable ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                        ${isAvailable ? 'متوفر' : 'غير متوفر'}
                    </span>
                </div>
                <div class="offer-actions">
                    <button class="add-to-cart" ${!isAvailable ? 'disabled' : ''} data-id="${offer.id}">
                        <i class="fa-solid fa-cart-plus"></i> إضافة للسلة
                    </button>
                    <button class="add-to-favorite">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
        `;

        return offerCard;
    }

    // الحصول على نص الشارة
    function getTagText(tag) {
        switch(tag) {
            case 'new': return 'جديد';
            case 'bestseller': return 'الأكثر مبيعاً';
            case 'featured': return 'مميز';
            default: return '';
        }
    }

    // إنشاء نجوم التقييم
    function generateRatingStars(rating) {
        let starsHtml = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        // إضافة النجوم الكاملة
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }

        // إضافة نصف نجمة إذا لزم الأمر
        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }

        // إضافة النجوم الفارغة
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }

        return starsHtml;
    }

    // تهيئة الترقيم
    function setupPagination() {
        // إنشاء أزرار الترقيم
        paginationNumbers.innerHTML = '';

        // عدد الصفحات الكلي (نفترض 5 صفحات للعرض)
        const totalPages = 5;

        // إنشاء أزرار الصفحات
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = `pagination-number ${i === currentPage ? 'active' : ''}`;
            pageButton.textContent = i;
            pageButton.dataset.page = i;

            // إضافة مستمع حدث للزر
            pageButton.addEventListener('click', function() {
                // تحديث الصفحة الحالية
                currentPage = parseInt(this.dataset.page);

                // تحديث حالة أزرار الترقيم
                updatePaginationState();

                // إظهار مؤشر التحميل
                loadingIndicator.classList.add("show");

                // محاكاة تحميل البيانات
                setTimeout(() => {
                    // إخفاء مؤشر التحميل
                    loadingIndicator.classList.remove("show");

                    // عرض رسالة نجاح
                    showToast(successToast, successToastMessage, `تم عرض العروض - الصفحة ${currentPage}`);

                    // تمرير تلقائي للأعلى
                    window.scrollTo({
                        top: document.querySelector(".offers-main-content").offsetTop - 100,
                        behavior: "smooth"
                    });

                    // إضافة تأثير انتقالي للعروض
                    animateProducts();
                }, 800);
            });

            paginationNumbers.appendChild(pageButton);
        }

        // تحديث حالة أزرار الترقيم
        updatePaginationState();
    }

    // تحديث حالة أزرار الترقيم
    function updatePaginationState() {
        // تحديث أزرار الصفحات
        const pageButtons = document.querySelectorAll('.pagination-number');
        pageButtons.forEach(button => {
            button.classList.toggle('active', parseInt(button.dataset.page) === currentPage);
        });

        // تحديث أزرار السابق والتالي
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === 5; // نفترض أن إجمالي الصفحات هو 5
    }

    // إضافة تأثير انتقالي للعروض
    function animateProducts() {
        // الحصول على جميع كروت العروض
        const offerCards = document.querySelectorAll(".offer-card");

        // إخفاء العروض بشكل متتالي
        offerCards.forEach((card, index) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";

            // إظهار العروض بشكل متتالي مع تأخير مختلف لكل عرض
            setTimeout(() => {
                card.style.transition = "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.5)";
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 100 + (index * 50));
        });
    }

    // عرض الإشعارات
    function showToast(toastElement, messageElement, message) {
        // تحديث نص الرسالة
        if (messageElement && message) {
            messageElement.textContent = message;
        }

        // إظهار الإشعار
        toastElement.classList.add("show");

        // إخفاء الإشعار بعد 3 ثوانٍ
        setTimeout(() => {
            toastElement.classList.remove("show");
        }, 3000);
    }

    // تهيئة مستمع الأحداث
    function setupEventListeners() {
        // مستمع حدث لزر السابق
        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    updatePaginationState();
                    // محاكاة تحميل البيانات
                    loadingIndicator.classList.add("show");
                    setTimeout(() => {
                        loadingIndicator.classList.remove("show");
                        showToast(successToast, successToastMessage, `تم عرض العروض - الصفحة ${currentPage}`);
                        animateProducts();
                    }, 800);
                }
            });
        }

        // مستمع حدث لزر التالي
        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', function() {
                if (currentPage < 5) { // نفترض أن إجمالي الصفحات هو 5
                    currentPage++;
                    updatePaginationState();
                    // محاكاة تحميل البيانات
                    loadingIndicator.classList.add("show");
                    setTimeout(() => {
                        loadingIndicator.classList.remove("show");
                        showToast(successToast, successToastMessage, `تم عرض العروض - الصفحة ${currentPage}`);
                        animateProducts();
                    }, 800);
                }
            });
        }

        // مستمع حدث لزر تحديث العروض العشوائية
        const refreshRandomOffersBtn = document.getElementById("refreshRandomOffers");
        if (refreshRandomOffersBtn) {
            refreshRandomOffersBtn.addEventListener('click', function() {
                // إضافة فئة التحميل للزر
                this.classList.add('loading');

                // إظهار مؤشر التحميل
                loadingIndicator.classList.add("show");

                // محاكاة تحميل البيانات
                setTimeout(() => {
                    // تحميل عروض عشوائية جديدة
                    loadRandomOffers();

                    // إخفاء مؤشر التحميل
                    loadingIndicator.classList.remove("show");

                    // إزالة فئة التحميل من الزر
                    this.classList.remove('loading');

                    // عرض رسالة نجاح
                    showToast(successToast, successToastMessage, "تم تحديث العروض العشوائية بنجاح");

                    // إضافة تأثير انتقالي للعروض
                    const randomOfferCards = document.querySelectorAll("#randomOffers .offer-card");
                    randomOfferCards.forEach((card, index) => {
                        card.style.opacity = "0";
                        card.style.transform = "translateY(20px)";

                        setTimeout(() => {
                            card.style.transition = "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.5)";
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        }, 100 + (index * 50));
                    });
                }, 800);
            });
        }

        // مستمع حدث لزر إعادة ضبط الفلاتر
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', function() {
                // إعادة ضبط الفلاتر
                if (serviceFilter) serviceFilter.value = "all";
                if (heroServiceFilter) heroServiceFilter.value = "all";
                if (categoryFilter) categoryFilter.value = "all";
                if (priceRange) priceRange.value = 1000;
                if (priceRangeValue) priceRangeValue.textContent = "1000 جنيه";
                if (availabilityFilter) availabilityFilter.value = "all";
                if (filterSearch) filterSearch.value = "";
                if (heroSearch) heroSearch.value = "";

                // إعادة ضبط الفلتر الحالي
                currentFilter = {
                    service: "all",
                    category: "all",
                    price: 1000,
                    availability: "all",
                    search: ""
                };

                // تحديث الفلاتر النشطة
                updateActiveFilters();

                // إخفاء رسالة عدم وجود عروض
                if (noOffersMessage) noOffersMessage.style.display = "none";

                // إظهار مؤشر التحميل
                loadingIndicator.classList.add("show");

                // محاكاة تحميل البيانات
                setTimeout(() => {
                    // إخفاء مؤشر التحميل
                    loadingIndicator.classList.remove("show");

                    // عرض رسالة نجاح
                    showToast(successToast, successToastMessage, "تم إعادة ضبط الفلاتر بنجاح");

                    // إضافة تأثير انتقالي للعروض
                    animateProducts();
                }, 800);
            });
        }

        // مستمع حدث لتغيير نطاق السعر
        if (priceRange) {
            // ضبط قيمة نطاق السعر الافتراضية
            if (priceRangeValue) priceRangeValue.textContent = `${priceRange.value} جنيه`;

            priceRange.addEventListener('input', function() {
                // تحديث قيمة نطاق السعر
                if (priceRangeValue) priceRangeValue.textContent = `${this.value} جنيه`;

                // تحديث الفلتر الحالي
                currentFilter.price = parseInt(this.value);

                // تحديث الفلاتر النشطة
                updateActiveFilters();

                // تطبيق الفلاتر بعد تأخير قصير
                if (this._priceTimeout) {
                    clearTimeout(this._priceTimeout);
                }
                this._priceTimeout = setTimeout(() => {
                    applyFilters();
                }, 300);
            });

            // تطبيق الفلتر عند النقر على نطاق السعر
            priceRange.addEventListener('change', function() {
                applyFilters();
            });
        }

        // مستمع حدث لتغيير فلتر الخدمة
        if (serviceFilter) {
            serviceFilter.addEventListener('change', function() {
                // تحديث الفلتر الحالي
                currentFilter.service = this.value;

                // تحديث فئات المنتجات بناءً على الخدمة المختارة
                updateCategoryOptions(this.value);

                // تحديث الفلاتر النشطة
                updateActiveFilters();

                // تطبيق الفلاتر
                applyFilters();
            });
        }

        // مستمع حدث لتغيير فلتر الفئة
        if (categoryFilter) {
            categoryFilter.addEventListener('change', function() {
                // تحديث الفلتر الحالي
                currentFilter.category = this.value;

                // تحديث الفلاتر النشطة
                updateActiveFilters();

                // تطبيق الفلاتر
                applyFilters();
            });
        }

        // مستمع حدث لتغيير فلتر التوفر
        if (availabilityFilter) {
            availabilityFilter.addEventListener('change', function() {
                // تحديث الفلتر الحالي
                currentFilter.availability = this.value;

                // تحديث الفلاتر النشطة
                updateActiveFilters();

                // تطبيق الفلاتر
                applyFilters();
            });
        }

        // مستمع حدث للبحث
        if (filterSearch) {
            filterSearch.addEventListener('input', function() {
                // تحديث الفلتر الحالي
                currentFilter.search = this.value.trim().toLowerCase();

                // تحديث الفلاتر النشطة
                updateActiveFilters();

                // تطبيق الفلاتر بعد تأخير قصير (لتجنب الكثير من الطلبات أثناء الكتابة)
                if (this._searchTimeout) {
                    clearTimeout(this._searchTimeout);
                }
                this._searchTimeout = setTimeout(() => {
                    applyFilters();
                }, 500);
            });
        }

        // مستمع حدث للبحث في البانر الرئيسي
        if (heroSearch) {
            heroSearch.addEventListener('input', function() {
                // تحديث الفلتر الحالي
                currentFilter.search = this.value.trim().toLowerCase();

                // تحديث حقل البحث الآخر للتزامن
                if (filterSearch) filterSearch.value = this.value;

                // تحديث الفلاتر النشطة
                updateActiveFilters();

                // تطبيق الفلاتر بعد تأخير قصير
                if (this._searchTimeout) {
                    clearTimeout(this._searchTimeout);
                }
                this._searchTimeout = setTimeout(() => {
                    applyFilters();
                }, 500);
            });
        }

        // مستمع حدث لفلتر الخدمة في البانر الرئيسي
        if (heroServiceFilter) {
            heroServiceFilter.addEventListener('change', function() {
                // تحديث الفلتر الحالي
                currentFilter.service = this.value;

                // تحديث فلتر الخدمة الآخر للتزامن
                if (serviceFilter) serviceFilter.value = this.value;

                // تحديث فئات المنتجات بناءً على الخدمة المختارة
                updateCategoryOptions(this.value);

                // تحديث الفلاتر النشطة
                updateActiveFilters();

                // تطبيق الفلاتر
                applyFilters();
            });
        }

        // مستمع حدث لزر العرض كشبكة
        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', function() {
                // إضافة الفئة النشطة لزر العرض كشبكة
                this.classList.add('active');

                // إزالة الفئة النشطة من زر العرض كقائمة
                if (listViewBtn) listViewBtn.classList.remove('active');

                // تغيير عرض العروض إلى شبكة
                const offersGrids = document.querySelectorAll('.offers-grid');
                offersGrids.forEach(grid => {
                    grid.classList.remove('list-view');
                    grid.classList.add('grid-view');
                });
            });
        }

        // مستمع حدث لزر العرض كقائمة
        if (listViewBtn) {
            listViewBtn.addEventListener('click', function() {
                // إضافة الفئة النشطة لزر العرض كقائمة
                this.classList.add('active');

                // إزالة الفئة النشطة من زر العرض كشبكة
                if (gridViewBtn) gridViewBtn.classList.remove('active');

                // تغيير عرض العروض إلى قائمة
                const offersGrids = document.querySelectorAll('.offers-grid');
                offersGrids.forEach(grid => {
                    grid.classList.remove('grid-view');
                    grid.classList.add('list-view');
                });
            });
        }

        // مستمع حدث لزر الترتيب
        if (sortBy) {
            sortBy.addEventListener('change', function() {
                // إظهار مؤشر التحميل
                loadingIndicator.classList.add("show");

                // محاكاة تحميل البيانات
                setTimeout(() => {
                    // إخفاء مؤشر التحميل
                    loadingIndicator.classList.remove("show");

                    // عرض رسالة نجاح
                    showToast(successToast, successToastMessage, `تم ترتيب العروض حسب: ${sortBy.options[sortBy.selectedIndex].text}`);

                    // إضافة تأثير انتقالي للعروض
                    animateProducts();
                }, 800);
            });
        }

        // تم نقل مستمع حدث زر العودة للأعلى إلى ملف منفصل

        // مستمع حدث لأزرار إغلاق الإشعارات
        const toastCloseButtons = document.querySelectorAll('.toast-close');
        toastCloseButtons.forEach(button => {
            button.addEventListener('click', function() {
                // الحصول على الإشعار الأب
                const toast = this.closest('.toast');
                if (toast) {
                    // إخفاء الإشعار
                    toast.classList.remove('show');
                }
            });
        });

        // مستمع حدث لأزرار إضافة للسلة
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('add-to-cart') || event.target.closest('.add-to-cart')) {
                // الحصول على الزر
                const button = event.target.classList.contains('add-to-cart') ? event.target : event.target.closest('.add-to-cart');

                // التحقق من أن الزر غير معطل
                if (!button.disabled) {
                    // الحصول على معرف العرض
                    const offerId = button.dataset.id;

                    // الحصول على العرض من البيانات
                    const offer = offersData.find(o => o.id === offerId);

                    if (offer) {
                        // إضافة العرض للسلة في التخزين المحلي
                        let cart = JSON.parse(localStorage.getItem('myCart')) || [];

                        // التحقق مما إذا كان العرض موجوداً بالفعل
                        const existingOfferIndex = cart.findIndex(item => item.id === offer.id);

                        if (existingOfferIndex !== -1) {
                            // زيادة الكمية إذا كان العرض موجوداً بالفعل
                            cart[existingOfferIndex].quantity = (cart[existingOfferIndex].quantity || 1) + 1;
                        } else {
                            // إضافة العرض إلى السلة
                            cart.push({
                                id: offer.id,
                                name: offer.name,
                                price: offer.discountedPrice || offer.price,
                                originalPrice: `${offer.price} جنيه`,
                                image: offer.image,
                                quantity: 1,
                                service: offer.service,
                                category: offer.category,
                                description: offer.description || "منتج من خدمات العبور",
                                dateAdded: new Date().getTime()
                            });
                        }

                        // حفظ السلة في التخزين المحلي
                        localStorage.setItem('myCart', JSON.stringify(cart));

                        // تحديث معلومات السلة
                        updateCartInfo();

                        // إضافة تأثير لعدد المنتجات في السلة
                        const cartCount = document.getElementById('cartCount');
                        if (cartCount) {
                            cartCount.classList.add('animate-count');
                            setTimeout(() => {
                                cartCount.classList.remove('animate-count');
                            }, 500);
                        }

                        // عرض رسالة نجاح
                        showToast(successToast, successToastMessage, `تمت إضافة ${offer.name} إلى السلة بنجاح`);
                    }
                }
            }
        });

        // مستمع حدث لأزرار إضافة للمفضلة
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('add-to-favorite') || event.target.closest('.add-to-favorite') ||
                event.target.classList.contains('add-to-favorite-btn') || event.target.closest('.add-to-favorite-btn')) {
                // الحصول على الزر
                const button = event.target.classList.contains('add-to-favorite') || event.target.classList.contains('add-to-favorite-btn') ?
                    event.target : event.target.closest('.add-to-favorite') || event.target.closest('.add-to-favorite-btn');

                // الحصول على معرف العرض
                const offerCard = button.closest('.offer-card');
                const offerId = offerCard ? offerCard.dataset.id : button.dataset.id;

                // الحصول على العرض من البيانات
                const offer = offersData.find(o => o.id === offerId);

                if (offer) {
                    // تبديل حالة الزر
                    button.classList.toggle('active');

                    // تغيير الأيقونة
                    const icon = button.querySelector('i');
                    if (icon) {
                        // الحصول على قائمة المفضلة من التخزين المحلي
                        let favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];

                        if (button.classList.contains('active')) {
                            // إضافة العرض إلى المفضلة
                            icon.className = 'fa-solid fa-heart';

                            // التحقق مما إذا كان العرض موجوداً بالفعل
                            if (!favorites.some(item => item.id === offer.id)) {
                                favorites.push({
                                    id: offer.id,
                                    name: offer.name,
                                    price: offer.discountedPrice || offer.price,
                                    originalPrice: `${offer.price} جنيه`,
                                    discountedPrice: offer.discountedPrice || offer.price,
                                    image: offer.image,
                                    service: offer.service,
                                    category: offer.category,
                                    description: offer.description || "منتج من خدمات العبور",
                                    rating: offer.rating || 4.5,
                                    ratingCount: offer.reviewCount || 10,
                                    availability: offer.availability || "in-stock",
                                    dateAdded: new Date().getTime()
                                });

                                // حفظ المفضلة في التخزين المحلي
                                localStorage.setItem('myFavorites', JSON.stringify(favorites));

                                // عرض رسالة نجاح
                                showToast(successToast, successToastMessage, `تمت إضافة ${offer.name} إلى المفضلة بنجاح`);
                            }
                        } else {
                            // إزالة العرض من المفضلة
                            icon.className = 'fa-regular fa-heart';

                            // إزالة العرض من المفضلة
                            favorites = favorites.filter(item => item.id !== offer.id);

                            // حفظ المفضلة في التخزين المحلي
                            localStorage.setItem('myFavorites', JSON.stringify(favorites));

                            // عرض رسالة نجاح
                            showToast(successToast, successToastMessage, `تمت إزالة ${offer.name} من المفضلة بنجاح`);
                        }
                    }
                }
            }
        });

        // مستمع حدث لأزرار العرض السريع
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('quick-view-btn') || event.target.closest('.quick-view-btn')) {
                // الحصول على الزر
                const button = event.target.classList.contains('quick-view-btn') ? event.target : event.target.closest('.quick-view-btn');

                // الحصول على معرف العرض
                const offerId = button.dataset.id;

                // الحصول على العرض من البيانات
                const offer = offersData.find(o => o.id === offerId);

                if (offer) {
                    // إنشاء نافذة منبثقة للعرض السريع
                    createQuickViewModal(offer);
                }
            }
        });

        // إنشاء نافذة منبثقة للعرض السريع
        function createQuickViewModal(offer) {
            // التحقق من وجود نافذة منبثقة سابقة وإزالتها
            const existingModal = document.getElementById('quickViewModal');
            if (existingModal) {
                existingModal.remove();
            }

            // إنشاء نافذة منبثقة جديدة
            const modal = document.createElement('div');
            modal.id = 'quickViewModal';
            modal.className = 'quick-view-modal';

            // تحديد حالة توفر العرض
            const isAvailable = offer.availability === "in-stock";

            // إنشاء محتوى النافذة المنبثقة
            modal.innerHTML = `
                <div class="quick-view-content">
                    <div class="quick-view-header">
                        <h2>${offer.name}</h2>
                        <button class="quick-view-close">&times;</button>
                    </div>
                    <div class="quick-view-body">
                        <div class="quick-view-image-container">
                            <div class="quick-view-image">
                                <img src="${offer.image}" alt="${offer.name}">
                                ${offer.discount ? `<span class="quick-view-discount">خصم ${offer.discount}%</span>` : ''}
                            </div>
                        </div>
                        <div class="quick-view-details">
                            <div class="quick-view-category">${offer.category}</div>
                            <h3 class="quick-view-title">${offer.name}</h3>
                            <div class="quick-view-rating">
                                ${generateRatingStars(offer.rating)}
                                <span>(${offer.reviewCount})</span>
                            </div>
                            <p class="quick-view-description">${offer.description}</p>
                            <div class="quick-view-price">
                                ${offer.discount ? `<span class="quick-view-original-price">${offer.price} جنيه</span>` : ''}
                                <span class="quick-view-discounted-price">${offer.discountedPrice || offer.price} جنيه</span>
                            </div>
                            <div class="quick-view-availability ${isAvailable ? 'in-stock' : 'out-of-stock'}">
                                <i class="fas ${isAvailable ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                                ${isAvailable ? 'متوفر في المخزن' : 'غير متوفر حالياً'}
                            </div>
                            <div class="quick-view-actions">
                                <button class="quick-view-add-to-cart" ${!isAvailable ? 'disabled' : ''} data-id="${offer.id}">
                                    <i class="fa-solid fa-cart-plus"></i> إضافة للسلة
                                </button>
                                <button class="quick-view-favorite" data-id="${offer.id}">
                                    <i class="fa-regular fa-heart"></i> إضافة للمفضلة
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="quick-view-footer">
                        <div class="quick-view-meta">
                            <div class="meta-item">
                                <i class="fas fa-tag"></i>
                                <span>الفئة: ${offer.category}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-store"></i>
                                <span>الخدمة: ${getServiceName(offer.service)}</span>
                            </div>
                        </div>
                        <div class="quick-view-share">
                            <span class="share-label">مشاركة:</span>
                            <div class="share-icons">
                                <div class="share-icon"><i class="fab fa-facebook-f"></i></div>
                                <div class="share-icon"><i class="fab fa-twitter"></i></div>
                                <div class="share-icon"><i class="fab fa-whatsapp"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // إضافة النافذة المنبثقة إلى الصفحة
            document.body.appendChild(modal);

            // إظهار النافذة المنبثقة
            setTimeout(() => {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // منع التمرير في الصفحة الخلفية
            }, 10);

            // مستمع حدث لإغلاق النافذة المنبثقة
            const closeButton = modal.querySelector('.quick-view-close');
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    modal.classList.remove('show');
                    document.body.style.overflow = 'auto'; // إعادة تمكين التمرير
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                });
            }

            // إغلاق النافذة المنبثقة عند النقر خارجها
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.classList.remove('show');
                    document.body.style.overflow = 'auto'; // إعادة تمكين التمرير
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                }
            });

            // مستمع حدث لأزرار المشاركة
            const shareIcons = modal.querySelectorAll('.share-icon');
            shareIcons.forEach(icon => {
                icon.addEventListener('click', function() {
                    showToast(successToast, successToastMessage, 'تمت مشاركة المنتج بنجاح');
                });
            });

            // مستمع حدث لزر إضافة للسلة في النافذة المنبثقة
            const addToCartButton = modal.querySelector('.quick-view-add-to-cart');
            if (addToCartButton && !addToCartButton.disabled) {
                addToCartButton.addEventListener('click', function() {
                    // إضافة العرض للسلة في التخزين المحلي
                    let cart = JSON.parse(localStorage.getItem('myCart')) || [];

                    // التحقق مما إذا كان العرض موجوداً بالفعل
                    const existingOfferIndex = cart.findIndex(item => item.id === offer.id);

                    if (existingOfferIndex !== -1) {
                        // زيادة الكمية إذا كان العرض موجوداً بالفعل
                        cart[existingOfferIndex].quantity = (cart[existingOfferIndex].quantity || 1) + 1;
                    } else {
                        // إضافة العرض إلى السلة
                        cart.push({
                            id: offer.id,
                            name: offer.name,
                            price: offer.discountedPrice || offer.price,
                            originalPrice: `${offer.price} جنيه`,
                            image: offer.image,
                            quantity: 1,
                            service: offer.service,
                            category: offer.category,
                            description: offer.description || "منتج من خدمات العبور",
                            dateAdded: new Date().getTime()
                        });
                    }

                    // حفظ السلة في التخزين المحلي
                    localStorage.setItem('myCart', JSON.stringify(cart));

                    // تحديث معلومات السلة
                    updateCartInfo();

                    // إضافة تأثير لعدد المنتجات في السلة
                    const countInCard = document.querySelector('.count-in-card');
                    if (countInCard) {
                        countInCard.classList.add('pulse-cart');
                        setTimeout(() => {
                            countInCard.classList.remove('pulse-cart');
                        }, 500);
                    }

                    // عرض رسالة نجاح
                    showToast(successToast, successToastMessage, `تمت إضافة ${offer.name} إلى السلة بنجاح`);

                    // إغلاق النافذة المنبثقة
                    modal.classList.remove('show');
                    document.body.style.overflow = 'auto'; // إعادة تمكين التمرير
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                });
            }

            // مستمع حدث لزر إضافة للمفضلة في النافذة المنبثقة
            const addToFavoriteButton = modal.querySelector('.quick-view-favorite');
            if (addToFavoriteButton) {
                // التحقق مما إذا كان العرض في المفضلة
                const favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
                const isFavorite = favorites.some(item => item.id === offer.id);

                // تحديث حالة الزر
                if (isFavorite) {
                    addToFavoriteButton.classList.add('active');
                    const icon = addToFavoriteButton.querySelector('i');
                    if (icon) {
                        icon.className = 'fa-solid fa-heart';
                    }
                }

                addToFavoriteButton.addEventListener('click', function() {
                    // تبديل حالة الزر
                    this.classList.toggle('active');

                    // تغيير الأيقونة
                    const icon = this.querySelector('i');
                    if (icon) {
                        if (this.classList.contains('active')) {
                            icon.className = 'fa-solid fa-heart';
                        } else {
                            icon.className = 'fa-regular fa-heart';
                        }
                    }

                    // الحصول على المفضلة من التخزين المحلي
                    let favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];

                    // التحقق مما إذا كان العرض موجوداً بالفعل
                    const existingOfferIndex = favorites.findIndex(item => item.id === offer.id);

                    if (this.classList.contains('active')) {
                        // إضافة العرض إلى المفضلة إذا لم يكن موجوداً
                        if (existingOfferIndex === -1) {
                            favorites.push({
                                id: offer.id,
                                name: offer.name,
                                price: offer.discountedPrice || offer.price,
                                originalPrice: offer.price,
                                image: offer.image,
                                service: offer.service,
                                category: offer.category,
                                description: offer.description || "منتج من خدمات العبور",
                                dateAdded: new Date().getTime()
                            });

                            // عرض رسالة نجاح
                            showToast(successToast, successToastMessage, `تمت إضافة ${offer.name} إلى المفضلة بنجاح`);
                        }
                    } else {
                        // إزالة العرض من المفضلة إذا كان موجوداً
                        if (existingOfferIndex !== -1) {
                            favorites.splice(existingOfferIndex, 1);

                            // عرض رسالة نجاح
                            showToast(successToast, successToastMessage, `تمت إزالة ${offer.name} من المفضلة بنجاح`);
                        }
                    }

                    // حفظ المفضلة في التخزين المحلي
                    localStorage.setItem('myFavorites', JSON.stringify(favorites));

                    // تحديث أزرار المفضلة في الصفحة
                    updateFavoriteButtons();
                });
            }
        }
    }

    // تحديث أزرار المفضلة في الصفحة
    function updateFavoriteButtons() {
        // الحصول على قائمة المفضلة من التخزين المحلي
        const favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];

        // الحصول على جميع أزرار المفضلة في الصفحة
        const favoriteButtons = document.querySelectorAll('.add-to-favorite');

        // تحديث حالة كل زر
        favoriteButtons.forEach(button => {
            // الحصول على معرف العرض
            const offerCard = button.closest('.offer-card');
            const offerId = offerCard ? offerCard.dataset.id : button.dataset.id;

            const isFavorite = favorites.some(item => item.id === offerId);

            // تحديث حالة الزر
            if (isFavorite) {
                button.classList.add('active');
                const icon = button.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-heart';
                }
            } else {
                button.classList.remove('active');
                const icon = button.querySelector('i');
                if (icon) {
                    icon.className = 'fa-regular fa-heart';
                }
            }
        });
    }

    // تحديث خيارات الفئات بناءً على الخدمة المختارة
    function updateCategoryOptions(service) {
        // التحقق من وجود عنصر فلتر الفئة
        if (!categoryFilter) return;

        // تفريغ خيارات الفئة
        categoryFilter.innerHTML = '<option value="all">جميع الفئات</option>';

        // قائمة الفئات المحددة مسبقاً لكل خدمة
        const predefinedCategories = {
            'pharmacy': [
                'مسكنات',
                'فيتامينات',
                'أدوية القلب',
                'مضادات حيوية',
                'مستحضرات تجميل',
                'مكملات غذائية',
                'أدوية السكر',
                'أدوية الضغط'
            ],
            'hypermarket': [
                'مواد غذائية',
                'زيوت وسمن',
                'مشروبات',
                'منظفات',
                'أدوات منزلية',
                'أجهزة كهربائية',
                'منتجات الأطفال',
                'منتجات العناية الشخصية'
            ],
            'restaurant': [
                'وجبات سريعة',
                'برجر',
                'سلطات',
                'مشروبات',
                'حلويات',
                'مأكولات بحرية',
                'مأكولات شرقية',
                'مأكولات غربية'
            ],
            'car-service': [
                'فرش سيارات',
                'زيوت وسوائل',
                'قطع غيار',
                'إكسسوارات',
                'إطارات',
                'أدوات صيانة',
                'أجهزة إلكترونية',
                'منظفات وملمعات'
            ]
        };

        // الحصول على الفئات المناسبة
        let categoriesToAdd = [];

        if (service === 'all') {
            // إضافة جميع الفئات من جميع الخدمات
            Object.values(predefinedCategories).forEach(categories => {
                categoriesToAdd = [...categoriesToAdd, ...categories];
            });

            // إزالة التكرار
            categoriesToAdd = [...new Set(categoriesToAdd)];
        } else if (predefinedCategories[service]) {
            // إضافة الفئات من الخدمة المختارة فقط
            categoriesToAdd = predefinedCategories[service];
        }

        // إضافة خيارات الفئات
        categoriesToAdd.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        // تحديث الفلاتر النشطة
        updateActiveFilters();
    }

    // تحديث الفلاتر النشطة
    function updateActiveFilters() {
        if (!activeFilters) return;

        // تفريغ الفلاتر النشطة
        activeFilters.innerHTML = '';

        // إضافة الفلاتر النشطة
        if (currentFilter.service !== 'all') {
            addActiveFilter('offer', getServiceName(currentFilter.service));
        }

        if (currentFilter.category !== 'all') {
            addActiveFilter('category', currentFilter.category);
        }

        if (currentFilter.price < 1000) {
            addActiveFilter('price', `أقل من ${currentFilter.price} جنيه`);
        }

        if (currentFilter.availability !== 'all') {
            addActiveFilter('availability', currentFilter.availability === 'in-stock' ? 'متوفر' : 'غير متوفر');
        }

        if (currentFilter.search) {
            addActiveFilter('search', currentFilter.search);
        }
    }

    // إضافة فلتر نشط
    function addActiveFilter(type, value) {
        if (!activeFilters) return;

        const filterTag = document.createElement('div');
        filterTag.className = 'filter-tag';
        filterTag.dataset.type = type;

        filterTag.innerHTML = `
            <span>${value}</span>
            <i class="fas fa-times"></i>
        `;

        // إضافة مستمع حدث لإزالة الفلتر
        filterTag.querySelector('i').addEventListener('click', function() {
            // إزالة الفلتر
            removeFilter(type);
        });

        activeFilters.appendChild(filterTag);
    }

    // إزالة فلتر
    function removeFilter(type) {
        // إعادة ضبط الفلتر المناسب
        switch(type) {
            case 'offer':
                if (serviceFilter) serviceFilter.value = 'all';
                if (heroServiceFilter) heroServiceFilter.value = 'all';
                currentFilter.service = 'all';
                // تحديث فئات المنتجات
                updateCategoryOptions('all');
                break;
            case 'category':
                if (categoryFilter) categoryFilter.value = 'all';
                currentFilter.category = 'all';
                break;
            case 'price':
                if (priceRange) priceRange.value = 1000;
                if (priceRangeValue) priceRangeValue.textContent = '1000 جنيه';
                currentFilter.price = 1000;
                break;
            case 'availability':
                if (availabilityFilter) availabilityFilter.value = 'all';
                currentFilter.availability = 'all';
                break;
            case 'search':
                if (filterSearch) filterSearch.value = '';
                if (heroSearch) heroSearch.value = '';
                currentFilter.search = '';
                break;
        }

        // تحديث الفلاتر النشطة
        updateActiveFilters();

        // تطبيق الفلاتر
        applyFilters();
    }

    // الحصول على اسم الخدمة
    function getServiceName(offer) {
        switch(offer) {
            case 'pharmacy': return 'صيدليات';
            case 'hypermarket': return 'هايبر ماركت';
            case 'restaurant': return 'مطاعم';
            case 'car-service': return 'خدمات السيارات';
            default: return 'جميع الخدمات';
        }
    }

    // تطبيق الفلاتر
    function applyFilters() {
        // إظهار مؤشر التحميل
        loadingIndicator.classList.add("show");

        // محاكاة تحميل البيانات
        setTimeout(() => {
            // تصفية العروض بناءً على الفلاتر
            filteredOffers = offersData.filter(offer => {
                // فلتر الخدمة
                if (currentFilter.service !== 'all' && offer.service !== currentFilter.service) {
                    return false;
                }

                // فلتر الفئة
                if (currentFilter.category !== 'all' && offer.category !== currentFilter.category) {
                    return false;
                }

                // فلتر السعر
                if (offer.discountedPrice > currentFilter.price) {
                    return false;
                }

                // فلتر التوفر
                if (currentFilter.availability !== 'all' && offer.availability !== currentFilter.availability) {
                    return false;
                }

                // فلتر البحث
                if (currentFilter.search) {
                    const searchTerm = currentFilter.search.toLowerCase();
                    return (
                        offer.name.toLowerCase().includes(searchTerm) ||
                        offer.description.toLowerCase().includes(searchTerm) ||
                        offer.category.toLowerCase().includes(searchTerm)
                    );
                }

                return true;
            });

            // إخفاء مؤشر التحميل
            loadingIndicator.classList.remove("show");

            // عرض رسالة نجاح
            showToast(successToast, successToastMessage, "تم تطبيق الفلاتر بنجاح");

            // إظهار أو إخفاء رسالة عدم وجود عروض
            if (filteredOffers.length === 0) {
                if (noOffersMessage) noOffersMessage.style.display = "flex";
            } else {
                if (noOffersMessage) noOffersMessage.style.display = "none";
            }

            // تحديث العروض في كل قسم
            updateFilteredOffers();

            // إعادة ضبط الصفحة الحالية
            currentPage = 1;

            // تحديث حالة أزرار الترقيم
            updatePaginationState();

            // إضافة تأثير انتقالي للعروض
            animateProducts();
        }, 800);
    }

    // تحديث العروض المفلترة في كل قسم
    function updateFilteredOffers() {
        // تحديث عروض الصيدليات
        if (pharmacyOffers) {
            const pharmacyFilteredOffers = filteredOffers.filter(offer => offer.service === "pharmacy");
            pharmacyOffers.innerHTML = '';
            pharmacyFilteredOffers.slice(0, 4).forEach(offer => {
                pharmacyOffers.appendChild(createOfferCard(offer));
            });
        }

        // تحديث عروض الهايبر ماركت
        if (hypermarketOffers) {
            const hypermarketFilteredOffers = filteredOffers.filter(offer => offer.service === "hypermarket");
            hypermarketOffers.innerHTML = '';
            hypermarketFilteredOffers.slice(0, 4).forEach(offer => {
                hypermarketOffers.appendChild(createOfferCard(offer));
            });
        }

        // تحديث عروض المطاعم
        if (restaurantOffers) {
            const restaurantFilteredOffers = filteredOffers.filter(offer => offer.service === "restaurant");
            restaurantOffers.innerHTML = '';
            restaurantFilteredOffers.slice(0, 4).forEach(offer => {
                restaurantOffers.appendChild(createOfferCard(offer));
            });
        }

        // تحديث عروض خدمات السيارات
        if (carServiceOffers) {
            const carServiceFilteredOffers = filteredOffers.filter(offer => offer.service === "car-service");
            carServiceOffers.innerHTML = '';
            carServiceFilteredOffers.slice(0, 4).forEach(offer => {
                carServiceOffers.appendChild(createOfferCard(offer));
            });
        }
    }

    // تحديث معلومات السلة
    function updateCartInfo() {
        // الحصول على السلة من التخزين المحلي
        const cart = JSON.parse(localStorage.getItem('myCart')) || [];

        // حساب إجمالي السعر
        let totalPrice = 0;
        let totalItems = 0;

        cart.forEach(item => {
            const price = parseFloat(item.price);
            const quantity = item.quantity || 1;
            totalPrice += price * quantity;
            totalItems += quantity;
        });

        // تحديث عدد العناصر في السلة
        const countInCard = document.querySelector('.count-in-card');
        if (countInCard) {
            countInCard.textContent = totalItems;
        }

        // تحديث إجمالي السعر
        const cartPrice = document.querySelector('.card.transit-cart .price span');
        if (cartPrice) {
            cartPrice.textContent = `${totalPrice.toFixed(2)} جنيه`;
        }
    }

    // إضافة مستمع حدث لزر العودة للأعلى
    if (backToTopBtn) {
        // إظهار الزر عند التمرير لأسفل
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // التمرير للأعلى عند النقر على الزر
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // تحديث معلومات السلة عند تحميل الصفحة
    updateCartInfo();

    // تحديث أزرار المفضلة عند تحميل الصفحة
    updateFavoriteButtons();

    // بدء تهيئة الصفحة
    initPage();
});
