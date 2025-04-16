// JavaScript for Enhanced Services Page

document.addEventListener('DOMContentLoaded', function() {
    // Animate progress bars in stats cards
    animateProgressBars();

    // Initialize animations on scroll
    initScrollAnimations();

    // Initialize service providers slider
    initProvidersSlider();

    // Initialize FAQ accordion
    initFaqAccordion();

    // Initialize testimonials slider
    initTestimonialsSlider();
});

// Animate progress bars in stats cards
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    setTimeout(() => {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';

            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }, 1000);
}

// Initialize animations on scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.city-overview-section, .service-request-section, .featured-providers-section, .latest-news-section, .stat-card, .provider-card, .news-card, .news-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize service providers slider
function initProvidersSlider() {
    const slider = document.querySelector('.providers-slider');
    const dots = document.querySelectorAll('.provider-dot');

    if (!slider || !dots.length) return;

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all dots
            dots.forEach(d => d.classList.remove('active'));

            // Add active class to current dot
            dot.classList.add('active');

            // Calculate scroll position
            const cardWidth = slider.querySelector('.provider-card').offsetWidth;
            const gap = 25; // Gap between cards
            const scrollPosition = index * (cardWidth + gap);

            // Scroll to position
            slider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Initialize FAQ accordion
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // Close all other answers
            document.querySelectorAll('.faq-question').forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = '0';
                }
            });

            // Toggle current answer
            if (isActive) {
                question.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Open first FAQ item by default
    if (faqQuestions.length) {
        faqQuestions[0].click();
    }
}

// Form validation for service request
document.addEventListener('DOMContentLoaded', function() {
    const requestForm = document.querySelector('.request-form');

    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple validation
            let isValid = true;
            const requiredFields = requestForm.querySelectorAll('input, select, textarea');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (isValid) {
                // Show success message
                alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
                requestForm.reset();
            } else {
                // Show error message
                alert('يرجى ملء جميع الحقول المطلوبة.');
            }
        });
    }
});
