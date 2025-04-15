/**
 * تهيئة السلايدرات وتفعيل وظائف التبويب
 */
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة سلايدر الخدمات المميزة
    const featuredServicesSlider = new Swiper('.featured-services-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.featured-services-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.featured-services-slider .swiper-button-next',
            prevEl: '.featured-services-slider .swiper-button-prev',
        },
        breakpoints: {
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });

    // تهيئة سلايدر المنتجات
    const productsSlider = new Swiper('.products-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.products-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.products-slider .swiper-button-next',
            prevEl: '.products-slider .swiper-button-prev',
        },
        breakpoints: {
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });

    // تهيئة سلايدر العروض
    const offersSlider = new Swiper('.special-offers-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.special-offers-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.special-offers-slider .swiper-button-next',
            prevEl: '.special-offers-slider .swiper-button-prev',
        },
        breakpoints: {
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });

    // تفعيل تبويبات المنتجات الأكثر مبيعاً
    const categoryTabs = document.querySelectorAll('.category-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const productCards = document.querySelectorAll('.product-card');

    // تفعيل التبويبات
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع التبويبات
            categoryTabs.forEach(t => t.classList.remove('active'));
            // إضافة الفئة النشطة للتبويب المحدد
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            // إخفاء جميع محتويات التبويبات
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // إظهار المحتوى المرتبط بالتبويب المحدد
            if (category === 'all') {
                document.getElementById('all').classList.add('active');
                // إظهار جميع المنتجات
                productCards.forEach(card => {
                    card.style.display = 'block';
                });
            } else {
                document.getElementById('all').classList.add('active');
                // فلترة المنتجات حسب الفئة
                productCards.forEach(card => {
                    if (card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });

    // تفعيل أزرار المنتجات
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    const favoriteButtons = document.querySelectorAll('.add-to-favorite-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // زر العرض السريع
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            alert('عرض سريع للمنتج: ' + productName);
        });
    });

    // زر إضافة للمفضلة
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;

            // تبديل حالة الزر
            if (this.querySelector('i').classList.contains('far')) {
                this.querySelector('i').classList.remove('far');
                this.querySelector('i').classList.add('fas');
                this.setAttribute('title', 'إزالة من المفضلة');
                alert('تمت إضافة المنتج للمفضلة: ' + productName);
            } else {
                this.querySelector('i').classList.remove('fas');
                this.querySelector('i').classList.add('far');
                this.setAttribute('title', 'إضافة للمفضلة');
                alert('تمت إزالة المنتج من المفضلة: ' + productName);
            }
        });
    });

    // زر إضافة للسلة
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            alert('تمت إضافة المنتج للسلة: ' + productName);
        });
    });
});
