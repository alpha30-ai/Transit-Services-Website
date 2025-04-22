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
                animatedIcon.classList.add('fa-spin');
            });

            iconContainer.addEventListener('mouseleave', function() {
                animatedIcon.classList.remove('fa-spin');
                animatedIcon.classList.add('fa-beat');
            });
        }
    }

    // Toggle password visibility - تحسين وظيفة إظهار/إخفاء كلمة المرور
    const toggleNewPassword = document.getElementById('toggleNewPassword');
    const newPasswordField = document.getElementById('new-password');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPasswordField = document.getElementById('confirm-password');

    if (toggleNewPassword && newPasswordField) {
        toggleNewPassword.addEventListener('click', function() {
            if (newPasswordField.type === 'password') {
                newPasswordField.type = 'text';
                this.innerHTML = '<i class="far fa-eye-slash"></i>';
            } else {
                newPasswordField.type = 'password';
                this.innerHTML = '<i class="far fa-eye"></i>';
            }
        });
    }

    if (toggleConfirmPassword && confirmPasswordField) {
        toggleConfirmPassword.addEventListener('click', function() {
            if (confirmPasswordField.type === 'password') {
                confirmPasswordField.type = 'text';
                this.innerHTML = '<i class="far fa-eye-slash"></i>';
            } else {
                confirmPasswordField.type = 'password';
                this.innerHTML = '<i class="far fa-eye"></i>';
            }
        });
    }

    // كود JavaScript لإعادة تعيين كلمة المرور
    const resetForm = document.getElementById("resetForm");

    if (resetForm) {
        resetForm.addEventListener("submit", function(event) {
            event.preventDefault(); // منع إعادة تحميل الصفحة

            const newPassword = document.getElementById("new-password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            // التحقق من تطابق كلمة المرور مع التأكيد
            if (newPassword !== confirmPassword) {
                alert("كلمة المرور غير متطابقة. حاول مجددًا.");
                return;
            }

            // إظهار رسالة نجاح متحركة
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> تم تحديث كلمة المرور بنجاح!';

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
                resetForm.style.opacity = '0.5';
                resetForm.style.pointerEvents = 'none';
                resetForm.style.transition = 'opacity 0.5s ease-in-out';

                // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول بعد فترة زمنية
                setTimeout(() => {
                    window.location.href = 'Login.html?passwordReset=true';
                }, 3000);
            }
        });
    }

    // التحقق من وجود معلومات في URL
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');

    if (emailParam) {
        // إظهار رسالة ترحيبية للمستخدم
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'welcome-message';
        welcomeMessage.innerHTML = `<i class="fas fa-envelope-open-text"></i> تم إرسال رابط إعادة تعيين كلمة المرور إلى: <strong>${emailParam}</strong>`;

        const loginFormSide = document.querySelector('.login-form-side');
        if (loginFormSide) {
            loginFormSide.insertBefore(welcomeMessage, loginFormSide.firstChild);

            // إضافة تأثير ظهور للرسالة
            welcomeMessage.style.opacity = '0';
            welcomeMessage.style.transform = 'translateY(-20px)';

            setTimeout(() => {
                welcomeMessage.style.opacity = '1';
                welcomeMessage.style.transform = 'translateY(0)';
                welcomeMessage.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
            }, 300);

            // إضافة أنماط CSS للرسالة الترحيبية
            const welcomeStyle = document.createElement('style');
            welcomeStyle.textContent = `
                .welcome-message {
                    background-color: rgba(52, 152, 219, 0.1);
                    color: #3498db;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    text-align: center;
                    font-size: 0.95em;
                    line-height: 1.5;
                    border-right: 4px solid #3498db;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }

                .welcome-message i {
                    font-size: 1.2em;
                    color: #3498db;
                }

                .success-message {
                    background-color: rgba(46, 204, 113, 0.1);
                    color: #2ecc71;
                    padding: 15px;
                    border-radius: 8px;
                    margin-top: 20px;
                    text-align: center;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    border-right: 4px solid #2ecc71;
                }
            `;
            document.head.appendChild(welcomeStyle);
        }
    }
});