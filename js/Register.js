document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const openSideMenu = document.getElementById('open-side');
  const closeSideMenu = document.getElementById('close-side');
  const mobileMenu = document.getElementById('mobile-menu');

  if (openSideMenu && mobileMenu) {
      openSideMenu.addEventListener('click', function() {
          mobileMenu.classList.add('active');
          document.body.style.overflow = 'hidden';
      });
  }

  if (closeSideMenu && mobileMenu) {
      closeSideMenu.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
      });
  }

  // Mobile Dropdown Toggle
  const mobileDropdownLinks = document.querySelectorAll('.has-dropdown > a');

  mobileDropdownLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          this.parentNode.classList.toggle('active');
      });
  });

  // Toggle password visibility
  const togglePassword = document.getElementById('togglePassword');
  const passwordField = document.getElementById('password');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  const confirmPasswordField = document.getElementById('confirm-password');

  togglePassword.addEventListener('click', function() {
      if (passwordField.type === 'password') {
          passwordField.type = 'text';
          this.innerHTML = '<i class="far fa-eye-slash"></i>';
      } else {
          passwordField.type = 'password';
          this.innerHTML = '<i class="far fa-eye"></i>';
      }
  });

  toggleConfirmPassword.addEventListener('click', function() {
      if (confirmPasswordField.type === 'password') {
          confirmPasswordField.type = 'text';
          this.innerHTML = '<i class="far fa-eye-slash"></i>';
      } else {
          confirmPasswordField.type = 'password';
          this.innerHTML = '<i class="far fa-eye"></i>';
      }
  });

  // Password strength meter - تحسين مقياس قوة كلمة المرور
  const passwordInput = document.getElementById('password');
  const strengthMeter = document.querySelector('.strength-meter');
  const strengthText = document.querySelector('.strength-text');

  passwordInput.addEventListener('input', function() {
      const password = this.value;
      let strength = 0;
      let strengthPercent = 0;

      // تحسين معايير قوة كلمة المرور
      if (password.length >= 8) strength += 1;
      if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
      if (password.match(/\d/)) strength += 1;
      if (password.match(/[^a-zA-Z\d]/)) strength += 1;
      if (password.length >= 12) strength += 0.5;

      // حساب النسبة المئوية لقوة كلمة المرور
      strengthPercent = Math.min(100, Math.round((strength / 4.5) * 100));

      // تعيين عرض شريط قوة كلمة المرور بناءً على النسبة المئوية
      strengthMeter.style.width = strengthPercent + '%';

      // إضافة تأثير انتقالي للشريط
      strengthMeter.style.transition = 'width 0.3s ease-in-out, background-color 0.3s ease-in-out';

      // تحديد لون وحالة قوة كلمة المرور
      if (strengthPercent <= 25) {
          strengthMeter.className = 'strength-meter weak';
          strengthText.textContent = 'قوة كلمة المرور: ضعيفة جدًا';
          strengthText.style.color = '#e74c3c';
      } else if (strengthPercent <= 50) {
          strengthMeter.className = 'strength-meter weak';
          strengthText.textContent = 'قوة كلمة المرور: ضعيفة';
          strengthText.style.color = '#e67e22';
      } else if (strengthPercent <= 75) {
          strengthMeter.className = 'strength-meter medium';
          strengthText.textContent = 'قوة كلمة المرور: متوسطة';
          strengthText.style.color = '#f39c12';
      } else if (strengthPercent <= 90) {
          strengthMeter.className = 'strength-meter strong';
          strengthText.textContent = 'قوة كلمة المرور: جيدة';
          strengthText.style.color = '#27ae60';
      } else {
          strengthMeter.className = 'strength-meter very-strong';
          strengthText.textContent = 'قوة كلمة المرور: ممتازة';
          strengthText.style.color = '#2ecc71';
      }

      // إضافة تأثير انتقالي للنص
      strengthText.style.transition = 'color 0.3s ease-in-out';
  });

  // Form validation - تحسين التحقق من صحة النموذج
  const registerForm = document.getElementById('registrationForm');

  // إضافة التحقق المباشر لكل حقل عند الخروج منه
  const formInputs = registerForm.querySelectorAll('input:not([type="checkbox"])');
  formInputs.forEach(input => {
      input.addEventListener('blur', function() {
          validateInput(this);
      });
  });

  // وظيفة التحقق من صحة الحقل الفردي
  function validateInput(input) {
      const id = input.id;
      const value = input.value.trim();

      switch(id) {
          case 'fullname':
              if (value === '') {
                  showError(input, 'الرجاء إدخال الاسم بالكامل');
                  return false;
              } else if (value.length < 5) {
                  showError(input, 'الاسم قصير جدًا');
                  return false;
              } else {
                  showSuccess(input);
                  return true;
              }
          case 'email':
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) {
                  showError(input, 'الرجاء إدخال بريد إلكتروني صحيح');
                  return false;
              } else {
                  showSuccess(input);
                  return true;
              }
          case 'phone':
              if (value === '' || value.length < 10) {
                  showError(input, 'الرجاء إدخال رقم هاتف صحيح');
                  return false;
              } else {
                  showSuccess(input);
                  return true;
              }
          case 'governorate':
              if (value === '') {
                  showError(input, 'الرجاء إدخال المحافظة');
                  return false;
              } else {
                  showSuccess(input);
                  return true;
              }
          case 'city':
              if (value === '') {
                  showError(input, 'الرجاء إدخال المدينة');
                  return false;
              } else {
                  showSuccess(input);
                  return true;
              }
          case 'neighborhood':
              if (value === '') {
                  showError(input, 'الرجاء إدخال الحي');
                  return false;
              } else {
                  showSuccess(input);
                  return true;
              }
          case 'password':
              if (value.length < 8) {
                  showError(input, 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل');
                  return false;
              } else {
                  showSuccess(input);
                  // التحقق من تطابق كلمة المرور إذا تم إدخال تأكيد كلمة المرور
                  const confirmPasswordInput = document.getElementById('confirm-password');
                  if (confirmPasswordInput.value.trim() !== '') {
                      validateInput(confirmPasswordInput);
                  }
                  return true;
              }
          case 'confirm-password':
              const passwordInput = document.getElementById('password');
              if (value !== passwordInput.value) {
                  showError(input, 'كلمات المرور غير متطابقة');
                  return false;
              } else if (value === '') {
                  showError(input, 'الرجاء تأكيد كلمة المرور');
                  return false;
              } else {
                  showSuccess(input);
                  return true;
              }
          default:
              return true;
      }
  }

  // معالجة تقديم النموذج
  registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;

      // التحقق من جميع الحقول
      formInputs.forEach(input => {
          if (!validateInput(input)) {
              isValid = false;
          }
      });

      // التحقق من الموافقة على الشروط
      const agreeTerms = document.querySelector('input[name="agree-terms"]').checked;
      if (!agreeTerms) {
          // إنشاء رسالة خطأ مخصصة للشروط والأحكام
          const termsAgreement = document.querySelector('.terms-agreement');
          termsAgreement.classList.add('error');

          // إزالة أي رسالة خطأ سابقة
          let termsError = termsAgreement.querySelector('.terms-error');
          if (termsError) {
              termsAgreement.removeChild(termsError);
          }

          // إنشاء رسالة خطأ جديدة
          termsError = document.createElement('div');
          termsError.className = 'terms-error';
          termsError.innerHTML = '<i class="fas fa-exclamation-circle"></i> يجب الموافقة على الشروط والأحكام';
          termsAgreement.appendChild(termsError);

          // إضافة تأثير اهتزاز
          termsError.style.animation = 'shake 0.5s ease-in-out';

          isValid = false;
      } else {
          // إزالة رسالة الخطأ إذا كانت موجودة
          const termsAgreement = document.querySelector('.terms-agreement');
          termsAgreement.classList.remove('error');
          const termsError = termsAgreement.querySelector('.terms-error');
          if (termsError) {
              termsAgreement.removeChild(termsError);
          }
      }

      if (isValid) {
          // تخزين بيانات المستخدم في localStorage
          const userData = {
              fullname: document.getElementById('fullname').value.trim(),
              email: document.getElementById('email').value.trim(),
              phone: document.getElementById('phone').value.trim(),
              governorate: document.getElementById('governorate').value.trim(),
              city: document.getElementById('city').value.trim(),
              neighborhood: document.getElementById('neighborhood').value.trim(),
              password: document.getElementById('password').value,
              registrationDate: new Date().toISOString(),
              isLoggedIn: true // إضافة حالة تسجيل الدخول
          };

          // تخزين البيانات في localStorage لاستخدامها في صفحة حسابي
          localStorage.setItem('userData', JSON.stringify(userData));

          // تخزين بيانات تسجيل الدخول في localStorage
          const loginData = {
              username: userData.email,
              password: userData.password,
              rememberMe: true,
              timestamp: new Date().getTime()
          };
          localStorage.setItem('loginData', JSON.stringify(loginData));

          // تخزين بيانات إضافية للعرض في صفحة حسابي
          const accountData = {
              fullname: userData.fullname,
              email: userData.email,
              phone: userData.phone,
              address: `${userData.governorate}, ${userData.city}, ${userData.neighborhood}`,
              bio: 'مستخدم جديد في مدينة العبور',
              registrationDate: userData.registrationDate
          };
          localStorage.setItem('accountData', JSON.stringify(accountData));

          // إظهار رسالة نجاح متحركة
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerHTML = '<i class="fas fa-check-circle"></i> تم إنشاء الحساب بنجاح!';

          // إضافة رسالة النجاح إلى النموذج
          const registerCard = document.querySelector('.register-card');
          registerCard.appendChild(successMessage);

          // إضافة تأثير ظهور لرسالة النجاح
          successMessage.style.opacity = '0';
          successMessage.style.transform = 'translateY(20px)';

          setTimeout(() => {
              successMessage.style.opacity = '1';
              successMessage.style.transform = 'translateY(0)';
              successMessage.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
          }, 10);

          // إضافة تأثير انتقالي للنموذج
          registerForm.style.opacity = '0.5';
          registerForm.style.pointerEvents = 'none';
          registerForm.style.transition = 'opacity 0.5s ease-in-out';

          // إضافة رسالة إضافية توضح الخطوات التالية
          const nextStepsMessage = document.createElement('div');
          nextStepsMessage.className = 'next-steps-message';
          nextStepsMessage.innerHTML = 'سيتم توجيهك إلى صفحة تسجيل الدخول. يمكنك بعد ذلك الانتقال إلى صفحة "حسابي" لرؤية معلوماتك.';
          registerCard.appendChild(nextStepsMessage);

          // الانتقال إلى صفحة تسجيل الدخول بعد فترة زمنية
          setTimeout(() => {
              // إنشاء معلومات URL لتمريرها إلى صفحة تسجيل الدخول
              const params = new URLSearchParams({
                  username: userData.email,
                  password: userData.password,
                  newAccount: 'true' // إضافة علامة لحساب جديد
              });

              // الانتقال إلى صفحة تسجيل الدخول مع المعلومات
              window.location.href = `Login.html?${params.toString()}`;
          }, 3000);
      }
  });

  // Show error message - تحسين عرض رسائل الخطأ
  function showError(input, message) {
      const formGroup = input.closest('.form-group');

      // إزالة أي حالة نجاح سابقة
      formGroup.classList.remove('success');

      // إضافة صنف الخطأ مع تأثير انتقالي
      formGroup.classList.add('error');

      // التحقق من وجود رسالة خطأ بالفعل
      let errorMessage = formGroup.querySelector('.error-message');
      if (!errorMessage) {
          errorMessage = document.createElement('div');
          errorMessage.className = 'error-message';

          // إضافة أيقونة الخطأ
          const errorIcon = document.createElement('i');
          errorIcon.className = 'fas fa-exclamation-circle';
          errorMessage.appendChild(errorIcon);

          // إضافة نص الخطأ
          const errorText = document.createElement('span');
          errorMessage.appendChild(errorText);

          formGroup.appendChild(errorMessage);
      }

      // تحديث نص الخطأ
      const errorText = errorMessage.querySelector('span');
      errorText.textContent = message;

      // تطبيق تأثيرات بصرية على حقل الإدخال
      input.style.borderColor = '#e74c3c';
      input.style.boxShadow = '0 0 0 2px rgba(231, 76, 60, 0.25)';

      // إضافة تأثير اهتزاز لرسالة الخطأ
      errorMessage.style.animation = 'shake 0.5s ease-in-out';

      // إضافة تأثير انتقالي للحقل
      input.style.transition = 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out';

      // إضافة أيقونة خطأ في الحقل
      const inputContainer = input.closest('.input-container');
      let errorInputIcon = inputContainer.querySelector('.error-input-icon');

      if (!errorInputIcon) {
          errorInputIcon = document.createElement('i');
          errorInputIcon.className = 'fas fa-times-circle error-input-icon';
          inputContainer.appendChild(errorInputIcon);
      }

      // إظهار أيقونة الخطأ
      errorInputIcon.style.display = 'block';
      errorInputIcon.style.opacity = '1';
  }

  // Remove error message - تحسين إزالة رسائل الخطأ
  function removeError(formGroup) {
      // إزالة صنف الخطأ
      formGroup.classList.remove('error');

      // إزالة رسالة الخطأ إذا وجدت
      const errorMessage = formGroup.querySelector('.error-message');
      if (errorMessage) {
          // إضافة تأثير تلاشي قبل الإزالة
          errorMessage.style.opacity = '0';
          errorMessage.style.transform = 'translateY(-10px)';
          errorMessage.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';

          // إزالة العنصر بعد انتهاء التأثير الانتقالي
          setTimeout(() => {
              if (errorMessage.parentNode === formGroup) {
                  formGroup.removeChild(errorMessage);
              }
          }, 300);
      }

      // إعادة تعيين نمط حقل الإدخال
      const input = formGroup.querySelector('input');
      if (input) {
          input.style.borderColor = '';
          input.style.boxShadow = '';

          // إزالة أيقونة الخطأ من الحقل
          const inputContainer = input.closest('.input-container');
          const errorInputIcon = inputContainer.querySelector('.error-input-icon');

          if (errorInputIcon) {
              errorInputIcon.style.opacity = '0';
              setTimeout(() => {
                  errorInputIcon.style.display = 'none';
              }, 300);
          }
      }
  }

  // Add success validation - إضافة تحقق ناجح
  function showSuccess(input) {
      const formGroup = input.closest('.form-group');

      // إزالة أي حالة خطأ سابقة
      removeError(formGroup);

      // إضافة صنف النجاح
      formGroup.classList.add('success');

      // تطبيق تأثيرات بصرية على حقل الإدخال
      input.style.borderColor = '#2ecc71';
      input.style.boxShadow = '0 0 0 2px rgba(46, 204, 113, 0.25)';

      // إضافة تأثير انتقالي للحقل
      input.style.transition = 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out';

      // إضافة أيقونة نجاح في الحقل
      const inputContainer = input.closest('.input-container');
      let successInputIcon = inputContainer.querySelector('.success-input-icon');

      if (!successInputIcon) {
          successInputIcon = document.createElement('i');
          successInputIcon.className = 'fas fa-check-circle success-input-icon';
          inputContainer.appendChild(successInputIcon);
      }

      // إظهار أيقونة النجاح مع تأثير انتقالي
      successInputIcon.style.display = 'block';
      successInputIcon.style.opacity = '0';
      setTimeout(() => {
          successInputIcon.style.opacity = '1';
          successInputIcon.style.transition = 'opacity 0.3s ease-in-out';
      }, 10);
  }

  // Add enhanced input focus effects - تحسين تأثيرات التركيز على الحقول
  const inputs = document.querySelectorAll('.input-container input');

  inputs.forEach(input => {
      // إضافة الأيقونة المتحركة للحقل
      const inputIcon = input.parentNode.querySelector('.input-icon');
      if (inputIcon) {
          // إضافة تأثير انتقالي للأيقونة
          inputIcon.style.transition = 'color 0.3s ease-in-out, transform 0.3s ease-in-out';
      }

      // إضافة تأثير التركيز المحسن
      input.addEventListener('focus', function() {
          // إضافة صنف التركيز
          const container = this.parentNode;
          container.classList.add('focused');

          // تحريك الأيقونة وتغيير لونها
          if (inputIcon) {
              inputIcon.style.color = 'var(--primary-color)';
              inputIcon.style.transform = 'scale(1.1)';
          }

          // إضافة تأثير ظل للحقل
          this.style.boxShadow = '0 0 0 3px rgba(122, 28, 172, 0.1)';
          this.style.transition = 'all 0.3s ease-in-out';
      });

      // إزالة تأثير التركيز إذا كان الحقل فارغًا
      input.addEventListener('blur', function() {
          const container = this.parentNode;

          // إعادة الأيقونة إلى حالتها الأصلية
          if (inputIcon) {
              inputIcon.style.color = '';
              inputIcon.style.transform = 'scale(1)';
          }

          // إزالة تأثير الظل
          this.style.boxShadow = '';

          // إزالة صنف التركيز إذا كان الحقل فارغًا
          if (this.value.trim() === '') {
              container.classList.remove('focused');
          }

          // التحقق من صحة الحقل عند الخروج منه
          validateInput(this);
      });

      // التحقق من وجود قيمة في الحقل عند تحميل الصفحة
      if (input.value.trim() !== '') {
          input.parentNode.classList.add('focused');
      }

      // إضافة تأثير عند تحويم المؤشر على الحقل
      const inputContainer = input.parentNode;
      inputContainer.addEventListener('mouseenter', function() {
          if (!this.classList.contains('focused')) {
              this.style.borderColor = 'var(--primary-color-light)';
              this.style.transition = 'all 0.3s ease-in-out';
          }
      });

      inputContainer.addEventListener('mouseleave', function() {
          if (!this.classList.contains('focused')) {
              this.style.borderColor = '';
          }
      });
  });

  // إضافة تأثير انتقالي لزر إنشاء الحساب
  const registerBtn = document.querySelector('.register-btn');
  if (registerBtn) {
      registerBtn.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-3px)';
          this.style.boxShadow = '0 7px 14px rgba(122, 28, 172, 0.2)';
      });

      registerBtn.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
          this.style.boxShadow = '';
      });

      registerBtn.style.transition = 'all 0.3s ease-in-out';
  }

  // إضافة تأثير انتقالي CSS للاهتزاز
  const style = document.createElement('style');
  style.textContent = `
      @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
      }

      .error-message, .terms-error {
          animation: shake 0.5s ease-in-out;
          color: #e74c3c;
          margin-top: 5px;
          font-size: 0.85em;
          display: flex;
          align-items: center;
          gap: 5px;
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
          border-left: 4px solid #2ecc71;
      }

      .error-input-icon, .success-input-icon {
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          transition: opacity 0.3s ease-in-out;
      }

      .error-input-icon {
          color: #e74c3c;
      }

      .success-input-icon {
          color: #2ecc71;
      }

      .next-steps-message {
          background-color: rgba(52, 152, 219, 0.1);
          color: #3498db;
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
          text-align: center;
          font-size: 0.9em;
          line-height: 1.5;
          border-left: 4px solid #3498db;
          animation: fadeIn 0.5s ease-in-out 0.5s both;
      }
  `;
  document.head.appendChild(style);
});