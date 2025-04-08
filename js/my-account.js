document.addEventListener('DOMContentLoaded', function() {
    // استرجاع البيانات من localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    const bannerImage = localStorage.getItem('profileBanner');
    const profileImage = localStorage.getItem('profileImage');

    // إذا كانت البيانات موجودة، قم بعرضها
    if (userData) {
        document.getElementById('full-name').value = userData.username || '';
        document.getElementById('bio').value = userData.bio || 'محب للتسوق الإلكتروني';
        document.getElementById('phone-number').value = userData.phone || '';
        document.getElementById('email').value = userData.email || '';
        document.getElementById('shipping-address').value = userData.governorate && userData.city ?
            `${userData.governorate}, ${userData.city}, ${userData.neighborhood || ''}` : '';

        // التحقق من وجود العناصر قبل تعيين قيمها
        if (document.getElementById('payment-methods')) {
            document.getElementById('payment-methods').value = userData.paymentMethod || 'visa';
        }
        if (document.getElementById('offer-notifications')) {
            document.getElementById('offer-notifications').value = userData.offerNotifications || 'enabled';
        }
        if (document.getElementById('order-updates')) {
            document.getElementById('order-updates').value = userData.orderUpdates || 'enabled';
        }
        if (document.getElementById('stock-alerts')) {
            document.getElementById('stock-alerts').value = userData.stockAlerts || 'enabled';
        }
        if (document.getElementById('data-controls')) {
            document.getElementById('data-controls').value = userData.dataControls || 'enabled';
        }
        if (document.getElementById('account-status')) {
            document.getElementById('account-status').value = userData.accountStatus || 'active';
        }

        // تحديث صورة المستخدم المصغرة في القائمة الجانبية
        const userAvatarImg = document.querySelector('.user-avatar img');
        if (userAvatarImg && profileImage) {
            userAvatarImg.src = profileImage;
        }
    }

    // إضافة المؤثرات الحركية للقائمة الجانبية
    const accountSidebar = document.querySelector('.account-sidebar');
    if (accountSidebar) {
        setTimeout(() => {
            accountSidebar.style.opacity = '1';
            accountSidebar.style.transform = 'translateX(0)';
        }, 300);
    }

    // إذا كانت الصور موجودة، قم بعرضها
    if (bannerImage) {
        document.getElementById('profile-banner').src = bannerImage;
    }

    if (profileImage) {
        document.getElementById('profile-image').src = profileImage;
    }

    // إضافة وظيفة زر العودة للأعلى
    const backToTopButton = document.querySelector('.back-to-top');

    // إظهار الزر عند التمرير لأسفل
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // التمرير للأعلى عند النقر على الزر
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // وظيفة التبديل بين الأقسام
    const menuItems = document.querySelectorAll('.account-menu-item');
    const sections = document.querySelectorAll('.account-section');

    // إضافة مستمع حدث لكل عنصر في القائمة
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع عناصر القائمة
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            // إضافة الفئة النشطة للعنصر الذي تم النقر عليه
            this.classList.add('active');

            // إخفاء جميع الأقسام
            sections.forEach(section => section.classList.remove('active'));

            // إظهار القسم المطلوب
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // إضافة وظيفة لأزرار الحفظ في كل قسم
    const sectionSaveButtons = document.querySelectorAll('.section-save-btn');
    sectionSaveButtons.forEach(button => {
        button.addEventListener('click', function() {
            saveUserData();
            showNotification('تم حفظ المعلومات بنجاح');
        });
    });

    // إضافة وظيفة لزر تغيير كلمة المرور
    document.getElementById('change-password').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            showNotification('تم تغيير كلمة المرور بنجاح');
            this.value = '';
        }
    });

    // إضافة وظيفة لزر حذف الحساب
    document.getElementById('delete-account-btn').addEventListener('click', function() {
        if (confirm('هل أنت متأكد من رغبتك في حذف الحساب؟')) {
            showNotification('تم حذف الحساب', 'warning');
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 2000);
        }
    });

    // حفظ صورة البنر في localStorage
    document.getElementById('upload-banner').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const bannerSrc = e.target.result;
                document.getElementById('profile-banner').src = bannerSrc;
                localStorage.setItem('profileBanner', bannerSrc);
                console.log('Banner image saved to localStorage');
                showNotification('تم تحديث صورة الغلاف بنجاح');
            };
            reader.readAsDataURL(file);
        }
    });

    // حفظ صورة البروفايل في localStorage
    document.getElementById('upload-profile').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const profileSrc = e.target.result;
                document.getElementById('profile-image').src = profileSrc;

                // تحديث الصورة المصغرة في القائمة الجانبية أيضاً
                const userAvatarImg = document.querySelector('.user-avatar img');
                if (userAvatarImg) {
                    userAvatarImg.src = profileSrc;
                }

                localStorage.setItem('profileImage', profileSrc);
                console.log('Profile image saved to localStorage');

                // إظهار رسالة نجاح
                showNotification('تم تحديث الصورة الشخصية بنجاح');
            };
            reader.readAsDataURL(file);
        }
    });

    // دالة لحفظ بيانات المستخدم
    function saveUserData() {
        const fullName = document.getElementById('full-name').value.trim();
        const bio = document.getElementById('bio').value.trim();
        const phoneNumber = document.getElementById('phone-number').value.trim();
        const email = document.getElementById('email').value.trim();
        const shippingAddress = document.getElementById('shipping-address').value.trim();
        const paymentMethod = document.getElementById('payment-methods').value;
        const offerNotifications = document.getElementById('offer-notifications').value;
        const orderUpdates = document.getElementById('order-updates').value;
        const stockAlerts = document.getElementById('stock-alerts').value;
        const dataControls = document.getElementById('data-controls').value;
        const accountStatus = document.getElementById('account-status').value;

        // تقسيم عنوان الشحن إلى أجزاء
        let governorate = '', city = '', neighborhood = '';
        const addressParts = shippingAddress.split(',');
        if (addressParts.length >= 1) governorate = addressParts[0].trim();
        if (addressParts.length >= 2) city = addressParts[1].trim();
        if (addressParts.length >= 3) neighborhood = addressParts[2].trim();

        // حفظ جميع المعلومات في localStorage
        const updatedUserData = {
            username: fullName,
            bio: bio,
            phone: phoneNumber,
            email: email,
            governorate: governorate,
            city: city,
            neighborhood: neighborhood,
            paymentMethod: paymentMethod,
            offerNotifications: offerNotifications,
            orderUpdates: orderUpdates,
            stockAlerts: stockAlerts,
            dataControls: dataControls,
            accountStatus: accountStatus
        };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
    }

    // إضافة وظيفة لزر حفظ المعلومات الرئيسي
    document.getElementById('save-btn').addEventListener('click', function() {
        saveUserData();
        showNotification('تم حفظ جميع المعلومات بنجاح');

        // عرض رسالة تأكيد قبل إعادة التوجيه
        setTimeout(function() {
            showNotification('سوف يتم توجيهك الى الصفحه الرئيسيه', 'info');
            setTimeout(function() {
                window.location.href = 'index.html'; // قم بتعديل الرابط إلى الصفحة الرئيسية الفعلية
            }, 2000);
        }, 1000); // تأخير لمدة ثانية واحدة قبل إعادة التوجيه
    });

    // إضافة وظائف للأقسام الجديدة

    // سجل الطلبات - زر تفاصيل الطلب
    const orderDetailsButtons = document.querySelectorAll('.btn-order-details');
    orderDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification('جاري عرض تفاصيل الطلب...', 'info');
            // يمكن إضافة المزيد من الوظائف هنا
        });
    });

    // سجل الطلبات - زر إعادة الطلب
    const reorderButtons = document.querySelectorAll('.btn-reorder');
    reorderButtons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification('تمت إعادة الطلب بنجاح', 'success');
        });
    });

    // العناوين المحفوظة - زر إضافة عنوان جديد
    const addAddressButton = document.querySelector('.btn-add-address');
    if (addAddressButton) {
        addAddressButton.addEventListener('click', function() {
            openAddressModal();
        });
    }

    // العناوين المحفوظة - أزرار تعديل العنوان
    const editAddressButtons = document.querySelectorAll('.btn-edit-address');
    editAddressButtons.forEach(button => {
        button.addEventListener('click', function() {
            openAddressModal(true);
        });
    });

    // المواعيد - زر حجز موعد جديد
    const addAppointmentButton = document.querySelector('.btn-add-appointment');
    if (addAppointmentButton) {
        addAppointmentButton.addEventListener('click', function() {
            showNotification('جاري فتح نموذج حجز موعد جديد...', 'info');
        });
    }

    // إعدادات الدفع - زر إضافة بطاقة جديدة
    const addCardButton = document.getElementById('add-new-card');
    if (addCardButton) {
        addCardButton.addEventListener('click', function() {
            openPaymentModal();
        });
    }

    // إعدادات الدفع - أزرار تعديل البطاقة
    const editCardButtons = document.querySelectorAll('.btn-edit-card');
    editCardButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cardId = this.getAttribute('data-card-id');
            openPaymentModal(true, cardId);
        });
    });

    // إعدادات الدفع - أزرار حذف البطاقة
    const deleteCardButtons = document.querySelectorAll('.btn-delete-card');
    deleteCardButtons.forEach(button => {
        button.addEventListener('click', function() {
            // الحصول على معرف البطاقة للاستخدام في المستقبل
            const cardId = this.getAttribute('data-card-id');
            console.log(`محاولة حذف البطاقة رقم ${cardId}`);

            if (confirm('هل أنت متأكد من حذف هذه البطاقة؟')) {
                // يمكن إضافة كود لحذف البطاقة من قاعدة البيانات هنا
                showNotification(`تم حذف البطاقة رقم ${cardId} بنجاح`, 'success');
            }
        });
    });

    // وظائف النماذج المنبثقة

    // نموذج العنوان
    const addressModal = document.getElementById('address-modal');
    const addressForm = document.getElementById('address-form');
    const addressModalTitle = document.getElementById('address-modal-title');

    // فتح نموذج العنوان
    function openAddressModal(isEdit = false) {
        addressModalTitle.textContent = isEdit ? 'تعديل العنوان' : 'إضافة عنوان جديد';

        if (isEdit) {
            // ملئ النموذج ببيانات العنوان الحالي
            document.getElementById('address-title').value = 'المنزل';
            document.getElementById('address-name').value = 'محمد أحمد';
            document.getElementById('address-governorate').value = 'القاهرة';
            document.getElementById('address-city').value = 'مدينة العبور';
            document.getElementById('address-street').value = 'شارع النصر';
            document.getElementById('address-phone').value = '01012345678';
            document.getElementById('address-default').checked = true;
        } else {
            // إعادة تعيين النموذج
            addressForm.reset();
        }

        addressModal.classList.add('show');
        document.body.classList.add('modal-open'); // منع التمرير في الخلفية

        // التمرير لأعلى النموذج على الهواتف
        setTimeout(() => {
            addressModal.scrollTo(0, 0);
        }, 100);
    }

    // نموذج الدفع
    const paymentModal = document.getElementById('payment-modal');
    const paymentForm = document.getElementById('payment-form');
    const paymentModalTitle = document.getElementById('payment-modal-title');
    const paymentCard = document.querySelector('.payment-card');

    // فتح نموذج الدفع
    function openPaymentModal(isEdit = false, cardId = null) {
        paymentModalTitle.textContent = isEdit ? 'تعديل بيانات البطاقة' : 'إضافة بطاقة جديدة';

        if (isEdit && cardId) {
            // ملئ النموذج ببيانات البطاقة الحالية
            if (cardId === '1') {
                document.getElementById('card-number').value = '4111 1111 1111 1234';
                document.getElementById('card-holder').value = 'محمد أحمد';
                document.getElementById('card-expiry-month').value = '12';
                document.getElementById('card-expiry-year').value = '25';
                document.getElementById('card-cvv').value = '123';
                document.getElementById('save-card').checked = true;

                // تحديث عرض البطاقة
                document.getElementById('card-number-display').textContent = '4111 1111 1111 1234';
                document.getElementById('card-holder-display').textContent = 'محمد أحمد';
                document.getElementById('card-expiry-display').textContent = '12/25';
            } else if (cardId === '2') {
                document.getElementById('card-number').value = '5555 5555 5555 5678';
                document.getElementById('card-holder').value = 'محمد أحمد';
                document.getElementById('card-expiry-month').value = '06';
                document.getElementById('card-expiry-year').value = '26';
                document.getElementById('card-cvv').value = '456';
                document.getElementById('save-card').checked = true;

                // تحديث عرض البطاقة
                document.getElementById('card-number-display').textContent = '5555 5555 5555 5678';
                document.getElementById('card-holder-display').textContent = 'محمد أحمد';
                document.getElementById('card-expiry-display').textContent = '06/26';
            }
        } else {
            // إعادة تعيين النموذج
            paymentForm.reset();
            document.getElementById('card-number-display').textContent = '**** **** **** ****';
            document.getElementById('card-holder-display').textContent = 'الاسم الكامل';
            document.getElementById('card-expiry-display').textContent = 'MM/YY';
        }

        paymentModal.classList.add('show');
        document.body.classList.add('modal-open'); // منع التمرير في الخلفية

        // التمرير لأعلى النموذج على الهواتف
        setTimeout(() => {
            paymentModal.scrollTo(0, 0);
        }, 100);
    }

    // إغلاق النماذج المنبثقة
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // إغلاق النموذج عند النقر خارجه
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });

    // إغلاق النموذج بأزرار الإلغاء
    const cancelAddressButton = document.querySelector('.btn-cancel-address');
    if (cancelAddressButton) {
        cancelAddressButton.addEventListener('click', function() {
            closeModal(addressModal);
        });
    }

    const cancelPaymentButton = document.querySelector('.btn-cancel-payment');
    if (cancelPaymentButton) {
        cancelPaymentButton.addEventListener('click', function() {
            closeModal(paymentModal);
        });
    }

    // دالة موحدة لإغلاق النماذج
    function closeModal(modal) {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }

    // تقديم نموذج العنوان
    if (addressForm) {
        addressForm.addEventListener('submit', function(event) {
            event.preventDefault();
            closeModal(addressModal);
            showNotification('تم حفظ العنوان بنجاح', 'success');
        });
    }

    // تقديم نموذج الدفع
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            closeModal(paymentModal);
            showNotification('تم حفظ بيانات البطاقة بنجاح', 'success');
        });
    }

    // تحديث عرض البطاقة في الوقت الفعلي
    const cardNumber = document.getElementById('card-number');
    const cardHolder = document.getElementById('card-holder');
    const cardExpiryMonth = document.getElementById('card-expiry-month');
    const cardExpiryYear = document.getElementById('card-expiry-year');
    const cardCvv = document.getElementById('card-cvv');

    if (cardNumber) {
        cardNumber.addEventListener('input', function() {
            // تنسيق رقم البطاقة بمسافات كل 4 أرقام
            let value = this.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            this.value = formattedValue;
            document.getElementById('card-number-display').textContent = formattedValue || '**** **** **** ****';

            // تحديد نوع البطاقة (فيزا أو ماستركارد)
            const firstDigit = value.charAt(0);
            const visaIcon = document.querySelector('.card-type .fa-cc-visa');
            const mastercardIcon = document.querySelector('.card-type .fa-cc-mastercard');

            if (firstDigit === '4') {
                visaIcon.style.opacity = '1';
                mastercardIcon.style.opacity = '0.3';
            } else if (firstDigit === '5') {
                visaIcon.style.opacity = '0.3';
                mastercardIcon.style.opacity = '1';
            } else {
                visaIcon.style.opacity = '0.8';
                mastercardIcon.style.opacity = '0.8';
            }
        });
    }

    if (cardHolder) {
        cardHolder.addEventListener('input', function() {
            document.getElementById('card-holder-display').textContent = this.value || 'الاسم الكامل';
        });
    }

    if (cardExpiryMonth && cardExpiryYear) {
        function updateExpiry() {
            const month = cardExpiryMonth.value || 'MM';
            const year = cardExpiryYear.value || 'YY';
            document.getElementById('card-expiry-display').textContent = `${month}/${year}`;
        }

        cardExpiryMonth.addEventListener('change', updateExpiry);
        cardExpiryYear.addEventListener('change', updateExpiry);
    }

    if (cardCvv) {
        cardCvv.addEventListener('focus', function() {
            paymentCard.classList.add('flipped');
        });

        cardCvv.addEventListener('blur', function() {
            paymentCard.classList.remove('flipped');
        });
    }

    // دالة لإظهار الإشعارات
    function showNotification(message, type = 'success') {
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        // إضافة أيقونة حسب نوع الإشعار
        let icon = 'check-circle';
        if (type === 'error') icon = 'times-circle';
        if (type === 'info') icon = 'info-circle';
        if (type === 'warning') icon = 'exclamation-triangle';

        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <p>${message}</p>
        `;

        // إضافة الإشعار إلى الصفحة
        document.body.appendChild(notification);

        // إظهار الإشعار بعد لحظة قصيرة
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // إخفاء الإشعار بعد 3 ثواني
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});