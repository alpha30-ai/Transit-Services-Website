// JavaScript لصفحة الرئيسية

document.addEventListener('DOMContentLoaded', function() {
    // تفعيل تأثيرات البانر الرئيسي الجديد
    initHeroEffects();
    initParticlesEffect();

    // تهيئة سلايدرات البانر الرئيسي
    const heroMainSlider = new Swiper('.hero-main-slider', {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.hero-main-slider .swiper-pagination',
            clickable: true,
        },
    });

    const heroSideSliderRight = new Swiper('.hero-side-slider-right', {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });

    const heroSideSliderLeft = new Swiper('.hero-side-slider-left', {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });

    const heroCenterSlider = new Swiper('.hero-center-slider', {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
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
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // تهيئة سلايدر العروض المميزة
    const specialOffersSlider = new Swiper('.offers-slider-container .special-offers-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
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
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    // تهيئة سلايدر المنتجات
    const productsSlider = new Swiper('.products-slider-container .products-slider', {
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
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });





    // تهيئة تبويبات المنتجات الأكثر مبيعاً
    const categoryTabs = document.querySelectorAll('.category-tab');
    const productCards = document.querySelectorAll('.product-card');

    // إضافة مستمع أحداث لكل تبويب
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع التبويبات
            categoryTabs.forEach(t => t.classList.remove('active'));

            // إضافة الفئة النشطة للتبويب الحالي
            this.classList.add('active');

            // الحصول على فئة التبويب
            const category = this.dataset.category;

            // عرض/إخفاء المنتجات بناءً على الفئة
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // إضافة مستمع أحداث لأزرار المفضلة
    const favoriteButtons = document.querySelectorAll('.add-to-favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });

    // إضافة مستمع أحداث لأزرار إضافة للسلة
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // هنا يمكن إضافة منطق إضافة المنتج للسلة
            alert('تمت إضافة المنتج إلى السلة بنجاح!');
        });
    });

    // إضافة مستمع أحداث لنموذج النشرة الإخبارية
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert(`تم الاشتراك بنجاح باستخدام البريد الإلكتروني: ${emailInput.value}`);
                emailInput.value = '';
            }
        });
    }

    // تأثيرات التمرير
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-banner-card, .booking-card, .product-card, .featured-service-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // تشغيل التأثيرات عند التمرير
    window.addEventListener('scroll', animateOnScroll);

    // تشغيل التأثيرات عند تحميل الصفحة
    animateOnScroll();
});

// دوال البانر الرئيسي الجديد

// تفعيل تأثيرات البانر الرئيسي
function initHeroEffects() {
    // تفعيل تأثير التحرك عند تمرير الماوس
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    // تفعيل تأثير التحرك عند تمرير الماوس
    heroSection.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        // تحريك الصورة الرئيسية
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(-20px) translate(${moveX * 5}px, ${moveY * 5}px)`;
        }

        // تحريك الأشكال
        const shapes = document.querySelectorAll('.hero-shape');
        shapes.forEach((shape, index) => {
            const factor = (index + 1) * 2;
            shape.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
        });

        // تحريك أيقونات المدينة
        const cityIcons = document.querySelectorAll('.hero-city-icon');
        cityIcons.forEach((icon, index) => {
            const factor = (index + 1) * 3;
            icon.style.transform = `translateY(-20px) translate(${moveX * factor}px, ${moveY * factor}px)`;
        });
    });

    // تفعيل تأثير التحرك عند التمرير للأسفل
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image-wrapper');

        if (scrollPosition < 600) {
            const translateY = scrollPosition * 0.3;
            if (heroContent) heroContent.style.transform = `translateY(${translateY}px)`;
            if (heroImage) heroImage.style.transform = `translateY(${translateY * 0.5}px)`;
        }
    });

    // تفعيل عدادات الإحصائيات
    const statNumbers = document.querySelectorAll('.hero-stat-number');
    statNumbers.forEach(stat => {
        const targetNumber = parseInt(stat.getAttribute('data-count') || '0');
        if (targetNumber > 0) {
            animateNumber(stat, 0, targetNumber, 2000);
        }
    });
}

// دالة لتحريك الأرقام
function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentNumber = Math.floor(progress * (end - start) + start);
        element.textContent = currentNumber.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// تفعيل تأثير الجزيئات
function initParticlesEffect() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles || typeof particlesJS === 'undefined') return;

    particlesJS('hero-particles', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}