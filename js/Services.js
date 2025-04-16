// Stats Counter Animation - Original
function updateStats() {
    const elements = [
        "currentVisitors", "dailyVisitors", "monthlyVisitors",
        "growthRate", "sessionDuration", "totalVisitors"
    ];

    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (id === "currentVisitors") {
                element.textContent = Math.floor(Math.random() * 50);
            } else if (id === "dailyVisitors") {
                element.textContent = Math.floor(Math.random() * 1000);
            } else if (id === "monthlyVisitors") {
                element.textContent = Math.floor(Math.random() * 30000);
            } else if (id === "growthRate") {
                element.textContent = (Math.random() * 10).toFixed(2) + "%";
            } else if (id === "sessionDuration") {
                element.textContent = Math.floor(Math.random() * 10 + 1) + " دقيقة";
            } else if (id === "totalVisitors") {
                element.textContent = Math.floor(Math.random() * 100000);
            }
        }
    });
}

// City Overview Stats Animation
function initCityOverviewStats() {
    const overviewSection = document.querySelector('.city-overview-section');
    if (!overviewSection) {
        console.log('City overview section not found');
        return;
    }

    // Check if animation has already been applied
    if (overviewSection.dataset.animated === 'true') {
        console.log('City overview section already animated');
        return;
    }

    console.log('Initializing city overview stats animation');

    const progressBars = overviewSection.querySelectorAll('.progress-bar');
    const statNumbers = overviewSection.querySelectorAll('.stat-number');

    console.log(`Found ${progressBars.length} progress bars and ${statNumbers.length} stat numbers`);

    // Mark as animated to prevent multiple animations
    overviewSection.dataset.animated = 'true';

    // Reset progress bars width to 0
    progressBars.forEach(bar => {
        // Store the original width as a data attribute if not already stored
        if (!bar.dataset.originalWidth) {
            bar.dataset.originalWidth = bar.style.width || '0%';
        }
        bar.style.width = '0';
    });

    // التأكد من أن الأرقام الإحصائية مرئية ومعروضة بشكل صحيح
    statNumbers.forEach(statNumber => {
        // التأكد من أن العنصر مرئي
        statNumber.style.visibility = 'visible';
        statNumber.style.opacity = '1';
        statNumber.style.color = '#000000'; // تعيين اللون إلى الأسود

        // تخزين النص الأصلي كسمة بيانات إذا لم يتم تخزينه بالفعل
        if (!statNumber.dataset.originalText) {
            statNumber.dataset.originalText = statNumber.textContent;
        }

        const targetText = statNumber.dataset.originalText;

        // عرض القيمة الأصلية مباشرة بدلاً من البدء من الصفر
        statNumber.textContent = targetText;
    });

    // تحريك أشرطة التقدم بشكل فوري
    progressBars.forEach(bar => {
        // التأكد من أن شريط التقدم مرئي
        bar.style.visibility = 'visible';
        bar.style.opacity = '1';

        // تعيين العرض مباشرة بدون تأخير
        bar.style.transition = 'width 1.5s ease-in-out';
        const originalWidth = bar.dataset.originalWidth || bar.getAttribute('style').match(/width:\s*([^;]+)/) || '75%';
        bar.style.width = typeof originalWidth === 'string' ? originalWidth : (Array.isArray(originalWidth) && originalWidth[1] ? originalWidth[1] : '75%');

        console.log(`Setting progress bar width to ${bar.style.width}`);
    });

    // Animate stat numbers
    statNumbers.forEach(statNumber => {
        const targetText = statNumber.dataset.originalText;
        const hasPlus = targetText.includes('+');
        let target = parseFloat(targetText.replace(/[^0-9.]/g, ''));
        const suffix = hasPlus ? '+' : '';
        const decimal = targetText.includes('.') ? 1 : 0;

        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 50);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                // Restore original text to ensure exact format
                statNumber.textContent = targetText;
            } else {
                statNumber.textContent = decimal > 0 ?
                    current.toFixed(decimal) + suffix :
                    Math.floor(current) + suffix;
            }
        }, 50);
    });
}

setInterval(updateStats, 3000);
updateStats();

// Typing Effect
const text = " استمتع بأفضل خدمات مدينة العبور معنا!";
let i = 0;
function typeWriter() {
    if (i < text.length) {
        document.getElementById("dynamicText").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// FAQ Accordion
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // Close all FAQs
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = '0';
            });

            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Open first FAQ by default
    if (faqQuestions.length > 0) {
        faqQuestions[0].classList.add('active');
        faqQuestions[0].nextElementSibling.style.maxHeight =
            faqQuestions[0].nextElementSibling.scrollHeight + 'px';
    }
}

// Testimonial Slider - Original Version
function initTestimonials() {
    const dots = document.querySelectorAll('.testimonial-dot');
    const slides = document.querySelectorAll('.testimonial-slide');
    const slider = document.querySelector('.testimonials-slider');

    if (!dots.length || !slides.length || !slider) return;

    let currentSlide = 0;

    // Set up dots click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    function goToSlide(index) {
        // Update current slide
        currentSlide = index;

        // Update slider position
        slider.scrollTo({
            left: slides[index].offsetLeft,
            behavior: 'smooth'
        });

        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Auto slide every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }, 5000);
}

// Enhanced Testimonial Slider
function initEnhancedTestimonials() {
    const slider = document.querySelector('.testimonials-slider-enhanced');
    const slides = document.querySelectorAll('.testimonial-slide-enhanced');
    const dots = document.querySelectorAll('.testimonial-dot-enhanced');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');

    if (!slider || !slides.length) return;

    let currentSlide = 0;
    const slideCount = slides.length;

    // Set initial state
    updateSlider();

    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Add event listeners to prev/next buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateSlider();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        });
    }

    // Auto slide
    let autoSlideInterval = setInterval(autoSlide, 5000);

    // Pause auto slide on hover
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        slider.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(autoSlide, 5000);
        });
    }

    // Auto slide function
    function autoSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }

    // Update slider function
    function updateSlider() {
        // Hide all slides first
        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
            slide.style.position = 'absolute';
            slide.style.transform = 'translateX(100%)';
            slide.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        // Show current slide
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.visibility = 'visible';
        slides[currentSlide].style.position = 'relative';
        slides[currentSlide].style.transform = 'translateX(0)';

        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Make sure the slider container has proper height
        slider.style.height = slides[currentSlide].offsetHeight + 'px';
    }

    // Update slider on window resize
    window.addEventListener('resize', () => {
        // Update slider height based on current slide
        if (slides[currentSlide]) {
            slider.style.height = slides[currentSlide].offsetHeight + 'px';
        }
    });

    // Animate testimonial stats counters
    animateTestimonialCounters();
}

// Animate testimonial counters
function animateTestimonialCounters() {
    const statNumbers = document.querySelectorAll('.testimonial-stats .stat-number');

    statNumbers.forEach(statNumber => {
        const targetText = statNumber.textContent;
        const target = parseFloat(targetText.replace(/[^0-9.]/g, ''));
        const suffix = targetText.includes('+') ? '+' : '';
        const decimal = targetText.includes('.') ? 1 : 0;

        // التأكد من أن اللون أبيض
        statNumber.style.color = '#ffffff';

        // Iniciar en 0
        statNumber.textContent = '0' + suffix;

        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentValue = easeProgress * target;

            statNumber.textContent = currentValue.toFixed(decimal) + suffix;

            // التأكد من أن اللون لا يزال أبيض
            statNumber.style.color = '#ffffff';

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                statNumber.textContent = targetText;
                // التأكد من أن اللون لا يزال أبيض بعد انتهاء التحريك
                statNumber.style.color = '#ffffff';
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// Scroll Animation
function initScrollAnimation() {
    const elements = document.querySelectorAll(
        '.featured-service-card, .category-card, .service-card, ' +
        '.benefit-card, .faq-item, .testimonial-card, ' +
        '.testimonials-section-enhanced, .cta-section-enhanced, ' +
        '.testimonial-card-enhanced, .stat-item, .cta-feature, ' +
        '.cta-image-container, .cta-badge, .app-button'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
        // Add animation class for styling
        element.classList.add('scroll-animation');
    });
}

// Enhanced CTA Section Interactions
function initEnhancedCTA() {
    // Add hover effects to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button-enhanced');

    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add pulse effect to CTA badge
    const ctaBadge = document.querySelector('.cta-badge');
    if (ctaBadge) {
        setInterval(() => {
            ctaBadge.classList.add('pulse');
            setTimeout(() => {
                ctaBadge.classList.remove('pulse');
            }, 1000);
        }, 3000);
    }
}

// Function to observe elements and trigger animations when they come into view
function observeElementsForAnimation() {
    // Create an observer for the city overview section
    const cityOverviewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('City overview section is now visible');
                initCityOverviewStats(); // Initialize city overview stats when visible
                cityOverviewObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the section is visible (reduced threshold)

    // Observe the city overview section
    const cityOverviewSection = document.querySelector('.city-overview-section');
    if (cityOverviewSection) {
        console.log('Observing city overview section');
        cityOverviewObserver.observe(cityOverviewSection);
    } else {
        console.log('City overview section not found for observation');
    }
}

// Initialize everything when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded');
    typeWriter();
    initFAQ();
    initTestimonials();
    initScrollAnimation();

    // Add animation class to section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('fade-in');
    });

    // Make sure FAQ is working properly
    setTimeout(() => {
        const faqQuestions = document.querySelectorAll('.faq-question');
        if (faqQuestions.length > 0) {
            faqQuestions[0].click();
        }
    }, 500);

    // Initialize enhanced testimonials with a slight delay to ensure proper loading
    setTimeout(() => {
        initEnhancedTestimonials(); // Initialize enhanced testimonials
        initEnhancedCTA(); // Initialize enhanced CTA

        // التأكد من أن الأرقام في قسم آراء العملاء باللون الأبيض
        const testimonialStatNumbers = document.querySelectorAll('.testimonial-stats .stat-number');
        testimonialStatNumbers.forEach(statNumber => {
            statNumber.style.color = '#ffffff';
        });
    }, 300);

    // Start observing elements for animation
    observeElementsForAnimation();

    // Also call initCityOverviewStats directly as a fallback
    setTimeout(() => {
        console.log('Calling initCityOverviewStats directly as fallback');
        initCityOverviewStats();

        // التأكد مرة أخرى من أن الأرقام في قسم آراء العملاء باللون الأبيض
        const testimonialStatNumbers = document.querySelectorAll('.testimonial-stats .stat-number');
        testimonialStatNumbers.forEach(statNumber => {
            statNumber.style.color = '#ffffff';
        });
    }, 1000);

    // Additional fallback for city overview section
    setTimeout(() => {
        const cityOverviewSection = document.querySelector('.city-overview-section');
        if (cityOverviewSection && cityOverviewSection.dataset.animated !== 'true') {
            console.log('Final fallback for city overview stats');
            initCityOverviewStats();
        }

        // التأكد مرة أخرى من أن الأرقام في قسم آراء العملاء باللون الأبيض
        const testimonialStatNumbers = document.querySelectorAll('.testimonial-stats .stat-number');
        testimonialStatNumbers.forEach(statNumber => {
            statNumber.style.color = '#ffffff';
        });
    }, 2000);
});

// Also initialize when window is fully loaded
window.addEventListener('load', () => {
    console.log('Window fully loaded');
    // Call initCityOverviewStats again when window is fully loaded
    initCityOverviewStats();

    // إضافة معالج حدث النقر على قسم نظرة عامة على خدمات المدينة
    const cityOverviewSection = document.getElementById('city-overview-section');
    if (cityOverviewSection) {
        cityOverviewSection.addEventListener('click', () => {
            console.log('City overview section clicked');
            if (cityOverviewSection.dataset.animated !== 'true') {
                initCityOverviewStats();
            }
        });
    }

    // التأكد من ظهور الأرقام والإحصائيات بشكل صحيح
    setTimeout(() => {
        // التأكد من ظهور الأرقام الإحصائية
        // التمييز بين الأرقام في قسم نظرة عامة على خدمات المدينة والأرقام في قسم آراء العملاء
        const cityOverviewStatNumbers = document.querySelectorAll('.city-overview-section .stat-number');
        cityOverviewStatNumbers.forEach(statNumber => {
            statNumber.style.visibility = 'visible';
            statNumber.style.opacity = '1';
            statNumber.style.color = '#000000'; // لون أسود للأرقام في قسم نظرة عامة

            // التأكد من عرض النص الأصلي
            const originalText = statNumber.dataset.originalText || statNumber.textContent;
            statNumber.textContent = originalText;
            console.log(`Setting city overview stat number to ${originalText}`);
        });

        // التأكد من أن الأرقام في قسم آراء العملاء باللون الأبيض
        const testimonialStatNumbers = document.querySelectorAll('.testimonial-stats .stat-number');
        testimonialStatNumbers.forEach(statNumber => {
            statNumber.style.visibility = 'visible';
            statNumber.style.opacity = '1';
            statNumber.style.color = '#ffffff'; // لون أبيض للأرقام في قسم آراء العملاء

            // التأكد من عرض النص الأصلي
            const originalText = statNumber.dataset.originalText || statNumber.textContent;
            statNumber.textContent = originalText;
            console.log(`Setting testimonial stat number to ${originalText}`);
        });

        // التأكد من ظهور أشرطة التقدم
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            bar.style.visibility = 'visible';
            bar.style.opacity = '1';

            // تعيين العرض الصحيح
            const originalWidth = bar.dataset.originalWidth || bar.getAttribute('style')?.match(/width:\s*([^;]+)/)?.[1] || '75%';
            bar.style.transition = 'none'; // إلغاء التأثير الانتقالي للتعيين الفوري
            bar.style.width = originalWidth;
            console.log(`Setting progress bar width to ${originalWidth}`);

            // إعادة تفعيل التأثير الانتقالي بعد لحظة
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-in-out';
            }, 50);
        });
    }, 500);
});