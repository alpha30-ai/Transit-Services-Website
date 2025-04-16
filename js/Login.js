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
  // Toggle password visibility - تحسين وظيفة إظهار/إخفاء كلمة المرور
  const togglePassword = document.getElementById('togglePassword');
  const passwordField = document.getElementById('password');

  togglePassword.addEventListener('click', function() {
      // إضافة تأثير انتقالي للزر
      this.style.transform = 'scale(0.8)';
      setTimeout(() => {
          this.style.transform = 'scale(1)';
      }, 100);

      if (passwordField.type === 'password') {
          passwordField.type = 'text';
          this.innerHTML = '<i class="far fa-eye-slash"></i>';

          // إضافة تلميح للمستخدم
          const tooltip = document.createElement('div');
          tooltip.className = 'password-tooltip';
          tooltip.textContent = 'كلمة المرور مرئية';
          this.appendChild(tooltip);

          // إزالة التلميح بعد فترة قصيرة
          setTimeout(() => {
              if (tooltip.parentNode === this) {
                  this.removeChild(tooltip);
              }
          }, 1500);
      } else {
          passwordField.type = 'password';
          this.innerHTML = '<i class="far fa-eye"></i>';

          // إضافة تلميح للمستخدم
          const tooltip = document.createElement('div');
          tooltip.className = 'password-tooltip';
          tooltip.textContent = 'كلمة المرور مخفية';
          this.appendChild(tooltip);

          // إزالة التلميح بعد فترة قصيرة
          setTimeout(() => {
              if (tooltip.parentNode === this) {
                  this.removeChild(tooltip);
              }
          }, 1500);
      }

      // إضافة تأثير انتقالي للزر
      this.style.transition = 'transform 0.2s ease-in-out';
  });

  // إضافة تأثير للأيقونة المتحركة
  const animatedIcon = document.querySelector('.animated-icon i');
  if (animatedIcon) {
      // إضافة تأثير نبض
      animatedIcon.classList.add('fa-beat');

      // إضافة تأثير عند تحويم المؤشر
      const iconContainer = document.querySelector('.icon-container');
      iconContainer.addEventListener('mouseenter', function() {
          animatedIcon.classList.remove('fa-beat');
          animatedIcon.classList.add('fa-spin');
      });

      iconContainer.addEventListener('mouseleave', function() {
          animatedIcon.classList.remove('fa-spin');
          animatedIcon.classList.add('fa-beat');
      });
  }

  // Form validation - تحسين التحقق من صحة النموذج
  const loginForm = document.getElementById('loginForm');

  // إضافة التحقق المباشر لكل حقل عند الخروج منه
  const formInputs = loginForm.querySelectorAll('input:not([type="checkbox"])');
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
          case 'username':
              if (value === '') {
                  showError(input, 'الرجاء إدخال البريد الإلكتروني أو رقم الهاتف');
                  return false;
              } else {
                  showSuccess(input);
                  return true;
              }
          case 'password':
              if (value === '') {
                  showError(input, 'الرجاء إدخال كلمة المرور');
                  return false;
              } else if (value.length < 6) {
                  showError(input, 'كلمة المرور قصيرة جدًا');
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
  loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;

      // التحقق من جميع الحقول
      formInputs.forEach(input => {
          if (!validateInput(input)) {
              isValid = false;
          }
      });

      // التحقق من تذكرني
      const rememberMe = document.querySelector('input[name="remember-me"]').checked;

      if (isValid) {
          // الحصول على اسم المستخدم وكلمة المرور
          const username = document.getElementById('username').value.trim();
          const password = document.getElementById('password').value.trim();

          // تحديث حالة تسجيل الدخول في userData
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          userData.isLoggedIn = true;
          localStorage.setItem('userData', JSON.stringify(userData));

          // تخزين بيانات المستخدم في localStorage إذا تم تحديد تذكرني
          if (rememberMe) {
              const loginData = {
                  username: username,
                  rememberMe: true,
                  timestamp: new Date().getTime()
              };
              localStorage.setItem('loginData', JSON.stringify(loginData));
          } else {
              // إزالة البيانات المخزنة إذا كانت موجودة
              localStorage.removeItem('loginData');
          }

          // إظهار رسالة نجاح متحركة
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerHTML = '<i class="fas fa-check-circle"></i> تم تسجيل الدخول بنجاح!';

          // إضافة رسالة النجاح إلى النموذج
          const loginFormSide = document.querySelector('.login-form-side');
          loginFormSide.appendChild(successMessage);

          // إضافة تأثير ظهور لرسالة النجاح
          successMessage.style.opacity = '0';
          successMessage.style.transform = 'translateY(20px)';

          setTimeout(() => {
              successMessage.style.opacity = '1';
              successMessage.style.transform = 'translateY(0)';
              successMessage.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
          }, 10);

          // إضافة رسالة إضافية توضح الخطوات التالية
          const nextStepsMessage = document.createElement('div');
          nextStepsMessage.className = 'next-steps-message';
          nextStepsMessage.innerHTML = 'سيتم توجيهك إلى صفحة حسابك لعرض معلوماتك الشخصية.';
          loginFormSide.appendChild(nextStepsMessage);

          // إضافة تأثير ظهور للرسالة الإضافية
          nextStepsMessage.style.opacity = '0';
          nextStepsMessage.style.transform = 'translateY(20px)';

          setTimeout(() => {
              nextStepsMessage.style.opacity = '1';
              nextStepsMessage.style.transform = 'translateY(0)';
              nextStepsMessage.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
          }, 300);

          // إضافة تأثير انتقالي للنموذج
          loginForm.style.opacity = '0.5';
          loginForm.style.pointerEvents = 'none';
          loginForm.style.transition = 'opacity 0.5s ease-in-out';

          // الانتقال إلى صفحة حسابي بعد فترة زمنية
          setTimeout(() => {
              window.location.href = 'my-account.html';
          }, 2000);
      }
  });

  // التحقق من وجود بيانات تسجيل دخول محفوظة
  const savedLoginData = localStorage.getItem('loginData');
  if (savedLoginData) {
      const loginData = JSON.parse(savedLoginData);
      // التحقق من أن البيانات ليست قديمة (أقل من 30 يومًا)
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
      const now = new Date().getTime();

      if (loginData.rememberMe && (now - loginData.timestamp) < thirtyDaysInMs) {
          document.getElementById('username').value = loginData.username;
          document.querySelector('input[name="remember-me"]').checked = true;
          // إضافة صنف التركيز لحقل اسم المستخدم
          document.getElementById('username').parentNode.classList.add('focused');
      }
  }

  // التحقق من وجود معلومات في URL من صفحة التسجيل
  const urlParams = new URLSearchParams(window.location.search);
  const usernameParam = urlParams.get('username');
  const passwordParam = urlParams.get('password');
  const newAccountParam = urlParams.get('newAccount');

  if (usernameParam && passwordParam) {
      document.getElementById('username').value = usernameParam;
      document.getElementById('password').value = passwordParam;
      document.getElementById('username').parentNode.classList.add('focused');
      document.getElementById('password').parentNode.classList.add('focused');
      document.querySelector('input[name="remember-me"]').checked = true;

      // إذا كان حساب جديد، أظهر رسالة ترحيبية
      if (newAccountParam === 'true') {
          const welcomeMessage = document.createElement('div');
          welcomeMessage.className = 'welcome-message';
          welcomeMessage.innerHTML = '<i class="fas fa-user-check"></i> مرحبًا بك! تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول والانتقال إلى صفحة حسابك.';

          const loginFormSide = document.querySelector('.login-form-side');
          loginFormSide.insertBefore(welcomeMessage, loginFormSide.firstChild);

          // إضافة تأثير ظهور للرسالة
          welcomeMessage.style.opacity = '0';
          welcomeMessage.style.transform = 'translateY(-20px)';

          setTimeout(() => {
              welcomeMessage.style.opacity = '1';
              welcomeMessage.style.transform = 'translateY(0)';
              welcomeMessage.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
          }, 300);
      }
  }

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
  function removeError(input) {
      const formGroup = input.closest('.form-group');

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

  // Add success validation - إضافة تحقق ناجح
  function showSuccess(input) {
      const formGroup = input.closest('.form-group');

      // إزالة أي حالة خطأ سابقة
      removeError(input);

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

  // إضافة تأثير انتقالي لزر تسجيل الدخول
  const loginBtn = document.querySelector('.login-btn');
  if (loginBtn) {
      loginBtn.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-3px)';
          this.style.boxShadow = '0 7px 14px rgba(122, 28, 172, 0.2)';
      });

      loginBtn.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
          this.style.boxShadow = '';
      });

      loginBtn.style.transition = 'all 0.3s ease-in-out';
  }

  // إضافة تأثيرات لأزرار التواصل الاجتماعي
  const socialBtns = document.querySelectorAll('.social-btn');
  socialBtns.forEach(btn => {
      btn.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-3px) scale(1.1)';
      });

      btn.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
      });

      btn.style.transition = 'all 0.3s ease-in-out';
  });

  // إضافة تأثير انتقالي CSS للاهتزاز والرسائل
  const style = document.createElement('style');
  style.textContent = `
      @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
      }

      .error-message {
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

      .password-tooltip {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          bottom: -30px;
          right: 0;
          white-space: nowrap;
          z-index: 10;
          animation: fadeIn 0.3s ease-in-out;
      }

      @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
      }

      .social-btn:hover {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .social-btn.facebook:hover {
          background-color: #3b5998;
      }

      .social-btn.google:hover {
          background-color: #db4437;
      }

      .social-btn.twitter:hover {
          background-color: #1da1f2;
      }

      .welcome-message {
          background-color: rgba(46, 204, 113, 0.1);
          color: #27ae60;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          font-size: 0.95em;
          line-height: 1.5;
          border-right: 4px solid #27ae60;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
      }

      .welcome-message i {
          font-size: 1.2em;
          color: #27ae60;
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