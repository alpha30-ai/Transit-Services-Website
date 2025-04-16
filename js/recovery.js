document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle - تفعيل القائمة الجانبية للهواتف
    const openSideMenu = document.getElementById('open-side');
    const closeSideMenu = document.getElementById('close-side');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    if (openSideMenu && mobileMenu) {
        openSideMenu.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('active');
            }
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeSideMenu && mobileMenu) {
        closeSideMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        });
    }

    // Mobile Dropdown Toggle - تفعيل القوائم المنسدلة في القائمة الجانبية
    const mobileDropdownLinks = document.querySelectorAll('.has-dropdown > a');

    mobileDropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentNode.classList.toggle('active');
        });
    });

    // إضافة تأثير للأيقونة المتحركة
    const animatedIcon = document.querySelector('.animated-icon i');
    if (animatedIcon) {
        // إضافة تأثير نبض
        animatedIcon.classList.add('fa-beat');

        // إضافة تأثير عند تحويم المؤشر
        const iconContainer = document.querySelector('.icon-container');
        if (iconContainer) {
            iconContainer.addEventListener('mouseenter', function() {
                animatedIcon.classList.remove('fa-beat');
                animatedIcon.classList.add('fa-flip');
            });

            iconContainer.addEventListener('mouseleave', function() {
                animatedIcon.classList.remove('fa-flip');
                animatedIcon.classList.add('fa-beat');
            });
        }
    }

    // كود JavaScript لإرسال البريد الإلكتروني واستلام الرابط
    const recoveryForm = document.getElementById("recoveryForm");

    if (recoveryForm) {
        recoveryForm.addEventListener("submit", function(event) {
            event.preventDefault(); // منع إعادة تحميل الصفحة

            const email = document.getElementById("email").value;

            // تحقق من صحة البريد الإلكتروني
            if (!email) {
                alert("يرجى إدخال بريدك الإلكتروني أو رقم الهاتف.");
                return;
            }

            // إظهار رسالة نجاح متحركة
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> تم إرسال رابط استعادة كلمة المرور بنجاح! يرجى التحقق من بريدك الإلكتروني.';

            // إضافة رسالة النجاح إلى النموذج
            const loginFormSide = document.querySelector('.login-form-side');
            if (loginFormSide) {
                loginFormSide.appendChild(successMessage);

                // إضافة تأثير ظهور لرسالة النجاح
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                    successMessage.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
                }, 10);

                // إضافة تأثير انتقالي للنموذج
                recoveryForm.style.opacity = '0.5';
                recoveryForm.style.pointerEvents = 'none';
                recoveryForm.style.transition = 'opacity 0.5s ease-in-out';

                // إعادة توجيه المستخدم إلى صفحة إعادة تعيين كلمة المرور بعد فترة زمنية
                setTimeout(() => {
                    window.location.href = 'Reset.html?email=' + encodeURIComponent(email);
                }, 3000);
            }
        });
    }
});