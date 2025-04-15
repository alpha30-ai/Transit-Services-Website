/**
 * تأثيرات البانر الرئيسي الحديث
 * Advanced Hero Section Animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة تأثيرات البانر الرئيسي
    initHeroEffects();
    
    // تهيئة تأثير الجزيئات
    initParticlesEffect();
    
    // تهيئة تأثير الإحصائيات
    initStatsCounter();
    
    // تهيئة تأثير التحرك ثلاثي الأبعاد
    init3DEffect();
});

/**
 * تهيئة تأثيرات البانر الرئيسي
 */
function initHeroEffects() {
    // تأثير التحرك عند تمرير الماوس
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // تأثير التحرك عند تمرير الماوس
    heroSection.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        // تحريك الأشكال
        const shapes = document.querySelectorAll('.hero-shape');
        shapes.forEach((shape, index) => {
            const factor = (index + 1) * 2;
            shape.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
        });
        
        // تحريك العناصر العائمة
        const floatingElements = document.querySelectorAll('.hero-floating-element');
        floatingElements.forEach((element, index) => {
            const factor = (index + 1) * 1.5;
            element.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px) translateY(${element.dataset.translateY || 0}) rotate(${element.dataset.rotate || 0}deg)`;
        });
        
        // تأثير ثلاثي الأبعاد على صورة البانر
        const imageContainer = document.querySelector('.hero-image-container');
        if (imageContainer) {
            const rotateX = moveY * 5;
            const rotateY = -moveX * 5;
            imageContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });
    
    // إعادة تعيين التأثيرات عند مغادرة الماوس
    heroSection.addEventListener('mouseleave', function() {
        const shapes = document.querySelectorAll('.hero-shape');
        shapes.forEach(shape => {
            shape.style.transform = 'translate(0, 0)';
        });
        
        const floatingElements = document.querySelectorAll('.hero-floating-element');
        floatingElements.forEach(element => {
            element.style.transform = `translateY(${element.dataset.translateY || 0}) rotate(${element.dataset.rotate || 0}deg)`;
        });
        
        const imageContainer = document.querySelector('.hero-image-container');
        if (imageContainer) {
            imageContainer.style.transform = 'perspective(1000px) rotateY(-5deg)';
        }
    });
    
    // تأثير التحرك عند التمرير للأسفل
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < 600) {
            const translateY = scrollPosition * 0.3;
            const heroContent = document.querySelector('.hero-text-content');
            const heroImage = document.querySelector('.hero-image-wrapper');
            
            if (heroContent) heroContent.style.transform = `translateY(${translateY}px)`;
            if (heroImage) heroImage.style.transform = `translateY(${translateY * 0.5}px)`;
        }
    });
}

/**
 * تهيئة تأثير الجزيئات
 */
function initParticlesEffect() {
    const heroParticles = document.getElementById('hero-particles');
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
                value: ['#7A1CAC', '#6b73ff', '#22c488']
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
                value: 0.5,
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
                color: '#7A1CAC',
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

/**
 * تهيئة تأثير الإحصائيات
 */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.hero-stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetNumber = parseInt(entry.target.getAttribute('data-count') || '0');
                if (targetNumber > 0) {
                    animateNumber(entry.target, 0, targetNumber, 2000);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

/**
 * دالة لتحريك الأرقام
 */
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

/**
 * تهيئة تأثير التحرك ثلاثي الأبعاد
 */
function init3DEffect() {
    const heroImageContainer = document.querySelector('.hero-image-container');
    if (!heroImageContainer) return;
    
    // تأثير التحرك ثلاثي الأبعاد عند تمرير الماوس
    heroImageContainer.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // إعادة تعيين التأثير عند مغادرة الماوس
    heroImageContainer.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateY(-5deg)';
    });
}

/**
 * تهيئة تأثير الكتابة المتحركة
 */
function initTypingEffect() {
    const typingElement = document.querySelector('.hero-typing-text');
    if (!typingElement || typeof Typed === 'undefined') return;
    
    new Typed(typingElement, {
        strings: [
            'خدمات توصيل سريعة',
            'تسوق إلكتروني آمن',
            'خدمات منزلية متكاملة',
            'حلول ذكية لمدينة العبور'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 500,
        loop: true
    });
}
