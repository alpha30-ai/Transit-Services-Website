/**
 * وظائف الإيصال الحديث - تصميم عصري واحترافي
 */

// تهيئة الإيصال
document.addEventListener('DOMContentLoaded', function() {
    initModernReceipt();
});

// تهيئة الإيصال الحديث
function initModernReceipt() {
    setupModernReceiptModal();
    setupModernReceiptButtons();
}

// إعداد النافذة المنبثقة للإيصال
function setupModernReceiptModal() {
    const modal = document.getElementById('confirmationModal');
    const closeBtn = document.getElementById('confirmationClose');

    if (modal && closeBtn) {
        // زر الإغلاق
        closeBtn.addEventListener('click', function() {
            closeModernReceiptModal();
        });

        // إغلاق النافذة عند النقر خارجها
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModernReceiptModal();
            }
        });

        // إضافة مفتاح الهروب لإغلاق النافذة
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('show')) {
                closeModernReceiptModal();
            }
        });
    }
}

// إعداد أزرار الإيصال
function setupModernReceiptButtons() {
    // زر الطباعة
    const printBtn = document.getElementById('printReceiptBtn');
    if (printBtn) {
        printBtn.addEventListener('click', printModernReceipt);
    }

    // زر التحميل كملف PDF
    const downloadBtn = document.getElementById('downloadReceiptBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadModernReceipt);
    }

    // زر المشاركة
    const shareBtn = document.getElementById('shareReceiptBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareModernReceipt);
    }

    // زر عرض الحجوزات
    const viewBookingsBtn = document.getElementById('viewBookingsBtn');
    if (viewBookingsBtn) {
        viewBookingsBtn.addEventListener('click', function() {
            closeModernReceiptModal();
            document.getElementById('bookingsContainer').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// عرض النافذة المنبثقة للإيصال مع البيانات الكاملة
function showModernReceiptModal(bookingData) {
    const modal = document.getElementById('confirmationModal');
    if (!modal) {
        console.error('لم يتم العثور على عنصر النافذة المنبثقة');
        return;
    }

    try {
        // تعبئة بيانات الإيصال واستخراج البيانات المنظمة
        const extractedData = fillModernReceiptData(bookingData);

        // إنشاء رمز QR باستخدام البيانات المستخرجة
        generateModernQRCode(extractedData);

        // إضافة تأثيرات حركية للنافذة
        modal.style.opacity = '0';
        modal.style.display = 'flex';

        // تأخير بسيط للسماح بتطبيق التأثيرات
        setTimeout(() => {
            // عرض النافذة المنبثقة بتأثير حركي
            modal.classList.add('show');
            modal.style.opacity = '1';
            document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية

            // تحريك التركيز إلى النافذة المنبثقة للوصول
            const closeButton = document.getElementById('confirmationClose');
            if (closeButton) {
                closeButton.focus();
            }

            // تشغيل تأثيرات حركية إضافية للعناصر الداخلية
            animateReceiptElements();
        }, 50);

        // تسجيل الحدث في التحليلات (إذا كانت متوفرة)
        if (typeof gtag === 'function') {
            gtag('event', 'view_receipt', {
                'event_category': 'booking',
                'event_label': extractedData.serviceType,
                'value': extractedData.totalAmount
            });
        }
    } catch (error) {
        console.error('حدث خطأ أثناء عرض الإيصال:', error);
        // محاولة عرض النافذة على الرغم من الخطأ
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// تشغيل تأثيرات حركية لعناصر الإيصال
function animateReceiptElements() {
    // قائمة العناصر التي سيتم تحريكها مع تأخيرات
    const elementsToAnimate = [
        { selector: '.modern-receipt-service', delay: 100 },
        { selector: '.modern-receipt-details .modern-receipt-section', delay: 200 },
        { selector: '.modern-receipt-section:not(.modern-receipt-details .modern-receipt-section)', delay: 300 },
        { selector: '.modern-receipt-payment', delay: 400 },
        { selector: '.modern-receipt-qr', delay: 500 },
        { selector: '.modern-receipt-footer', delay: 600 }
    ];

    // تطبيق التأثيرات الحركية على كل عنصر
    elementsToAnimate.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(element => {
            // إضافة نمط الإخفاء المؤقت
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

            // تشغيل التأثير بعد التأخير المحدد
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, item.delay);
        });
    });
}

// إغلاق النافذة المنبثقة للإيصال
function closeModernReceiptModal() {
    const modal = document.getElementById('confirmationModal');
    if (!modal) return;

    modal.classList.remove('show');
    document.body.style.overflow = ''; // استعادة التمرير
}

// تعبئة بيانات الإيصال بشكل كامل من معلومات الدفع
function fillModernReceiptData(data) {
    console.log('Filling receipt with data:', data); // للتشخيص

    // استخراج البيانات من الهيكل المعقد للبيانات
    const bookingData = extractBookingData(data);

    // تعيين رقم الإيصال في الهيدر
    const receiptNumber = 'INV-' + generateRandomId(6);
    setElementText('receiptId', receiptNumber);

    // إضافة رقم الحجز إلى قسم معلومات الخدمة
    const serviceDetails = document.querySelector('.modern-receipt-service-details');
    if (serviceDetails) {
        // إزالة أي عنصر سابق لرقم الحجز لتجنب التكرار
        const existingBookingNumber = serviceDetails.querySelector('.modern-receipt-booking-number');
        if (existingBookingNumber) {
            existingBookingNumber.remove();
        }

        // إنشاء عنصر رقم الحجز بتصميم محسن
        const bookingNumberElement = document.createElement('div');
        bookingNumberElement.className = 'modern-receipt-booking-number';
        bookingNumberElement.innerHTML = `
            <i class="fas fa-ticket-alt"></i>
            <span>رقم الحجز: <strong>${bookingData.bookingNumber}</strong></span>
        `;

        // إضافة العنصر في بداية قسم معلومات الخدمة لإبرازه
        if (serviceDetails.firstChild) {
            serviceDetails.insertBefore(bookingNumberElement, serviceDetails.firstChild);
        } else {
            serviceDetails.appendChild(bookingNumberElement);
        }
    }

    // معلومات الخدمة
    setElementText('receiptServiceType', bookingData.serviceType);
    setElementText('receiptProvider', bookingData.provider);
    setElementText('receiptBookingDate', bookingData.date);
    setElementText('receiptBookingTime', bookingData.time);

    // صورة الخدمة
    const serviceImage = document.getElementById('receiptServiceImage');
    if (serviceImage) {
        serviceImage.src = bookingData.image;
    }

    // علامة الطوارئ
    const emergencyTag = document.getElementById('emergencyTag');
    if (emergencyTag) {
        emergencyTag.style.display = bookingData.isEmergency ? 'inline-flex' : 'none';
    }

    // معلومات المريض
    setElementText('receiptClientName', bookingData.clientName);
    setElementText('receiptNationalId', bookingData.nationalId);
    setElementText('receiptPhone', bookingData.phone);
    setElementText('receiptAge', bookingData.age);
    setElementText('receiptGender', bookingData.gender);

    // معلومات الدفع
    setElementText('receiptTransactionId', bookingData.transactionId);
    setElementText('receiptPaymentDate', bookingData.paymentDate);
    setElementText('receiptPaymentMethod', bookingData.paymentMethod);

    // معلومات البطاقة (إذا كانت متوفرة)
    const cardInfoContainer = document.getElementById('receiptCardInfoContainer');
    if (cardInfoContainer) {
        if (bookingData.paymentMethod === 'بطاقة ائتمان' ||
            bookingData.paymentMethod === 'بطاقة خصم' ||
            bookingData.paymentMethod === 'credit' ||
            bookingData.paymentMethod === 'debit') {
            cardInfoContainer.style.display = 'block';
            setElementText('receiptCardInfo', bookingData.cardInfo);
        } else {
            cardInfoContainer.style.display = 'none';
        }
    }

    // تفاصيل الخدمة
    setElementText('receiptServiceTypeDetail', bookingData.serviceTypeDetail);
    setElementText('receiptProviderDetail', bookingData.providerDetail);
    setElementText('receiptAddress', bookingData.address);
    setElementText('receiptContactNumber', bookingData.contactNumber);

    // معلومات الطبيب (إذا كانت متوفرة)
    const doctorContainer = document.getElementById('receiptDoctorContainer');
    const specialityContainer = document.getElementById('receiptSpecialityContainer');
    const durationContainer = document.getElementById('receiptDurationContainer');

    if (doctorContainer && specialityContainer && durationContainer) {
        if (bookingData.serviceCategory === 'hospital' || bookingData.serviceCategory === 'doctor' || bookingData.type === 'hospital') {
            doctorContainer.style.display = bookingData.doctor ? 'block' : 'none';
            specialityContainer.style.display = bookingData.speciality ? 'block' : 'none';
            durationContainer.style.display = bookingData.duration ? 'block' : 'none';

            if (bookingData.doctor) setElementText('receiptDoctor', bookingData.doctor);
            if (bookingData.speciality) setElementText('receiptSpeciality', bookingData.speciality);
            if (bookingData.duration) setElementText('receiptDuration', bookingData.duration);
        } else {
            doctorContainer.style.display = 'none';
            specialityContainer.style.display = 'none';
            durationContainer.style.display = 'none';
        }
    }

    // معلومات الدفع
    setElementText('receiptOriginalPrice', formatCurrency(bookingData.originalPrice));
    setElementText('receiptDiscount', formatCurrency(bookingData.discount));

    // الضريبة (إذا كانت متوفرة)
    const taxContainer = document.getElementById('receiptTaxContainer');
    if (taxContainer) {
        if (bookingData.tax) {
            taxContainer.style.display = 'flex';
            setElementText('receiptTax', formatCurrency(bookingData.tax));
        } else {
            taxContainer.style.display = 'none';
        }
    }

    // المبلغ الإجمالي
    setElementText('receiptTotalAmount', formatCurrency(bookingData.totalAmount, false));

    return bookingData; // إرجاع البيانات المستخرجة للاستخدام في وظائف أخرى
}

// استخراج بيانات الحجز من هيكل البيانات المعقد
function extractBookingData(data) {
    // إنشاء رقم حجز فريد إذا لم يكن موجودًا
    const bookingNumber = data.bookingNumber || ('BK-' + generateRandomId());

    // إنشاء كائن لتخزين البيانات المستخرجة
    const extractedData = {
        // معلومات الحجز الأساسية
        id: data.id || data.bookingId || 'INV-' + generateRandomId(),
        bookingNumber: bookingNumber, // رقم الحجز الفريد
        type: data.type || data.serviceCategory || '',
        serviceCategory: data.serviceCategory || data.type || '',

        // معلومات الخدمة
        serviceType: data.serviceType || data.title || data.appointment?.serviceType || 'تحليل صورة دم كاملة',
        serviceTypeDetail: data.serviceTypeDetail || data.serviceType || data.title || 'تحليل طبي',
        provider: data.provider || data.appointment?.provider || data.providerName || 'معمل البرج',
        providerDetail: data.providerDetail || data.provider || data.appointment?.provider || 'معمل البرج',
        date: data.date || data.appointment?.date || data.bookingDate || formatDate(new Date()),
        time: data.time || data.appointment?.time || data.bookingTime || '10:00 صباحاً',
        address: data.address || data.location || data.appointment?.location || 'شارع النصر، مدينة العبور',
        contactNumber: data.contactNumber || data.phone || data.providerPhone || '19123',
        image: data.image || data.serviceImage || 'img/lab-test.jpg',
        isEmergency: data.isEmergency || data.emergency || false,

        // معلومات المريض
        clientName: data.clientName || data.patient?.name || data.patientName || data.name || 'محمد أحمد',
        nationalId: data.nationalId || data.patient?.nationalId || data.patientId || '1234567890',
        phone: data.phone || data.patient?.phone || data.patientPhone || '01234567890',
        age: data.age || data.patient?.age || '35',
        gender: data.gender || data.patient?.gender || 'ذكر',

        // معلومات الطبيب
        doctor: data.doctor || data.doctorName || data.appointment?.doctorName || 'د. أحمد محمد',
        speciality: data.speciality || data.doctorSpeciality || data.appointment?.speciality || 'باطنة',
        duration: data.duration || data.appointmentDuration || data.appointment?.duration || '30 دقيقة',

        // معلومات الدفع
        transactionId: data.transactionId || data.payment?.transactionId || 'TRX-' + generateRandomId(),
        paymentDate: data.paymentDate || data.payment?.date || getCurrentDate(),
        paymentMethod: data.paymentMethod || data.payment?.method || 'بطاقة ائتمان',
        cardInfo: data.cardInfo || data.payment?.details?.cardNumber || '**** **** **** 1234',
        originalPrice: data.originalPrice || data.payment?.originalAmount || data.price || 300,
        discount: data.discount || data.payment?.discount || 50,
        tax: data.tax || data.payment?.tax || null,
        totalAmount: data.totalAmount || data.payment?.amount || data.price || 250
    };

    // معالجة خاصة للبيانات المالية
    if (typeof extractedData.originalPrice === 'string') {
        extractedData.originalPrice = parseFloat(extractedData.originalPrice.replace(/[^\d.-]/g, '')) || 300;
    }

    if (typeof extractedData.discount === 'string') {
        extractedData.discount = parseFloat(extractedData.discount.replace(/[^\d.-]/g, '')) || 50;
    }

    if (extractedData.tax && typeof extractedData.tax === 'string') {
        extractedData.tax = parseFloat(extractedData.tax.replace(/[^\d.-]/g, ''));
    }

    if (typeof extractedData.totalAmount === 'string') {
        extractedData.totalAmount = parseFloat(extractedData.totalAmount.replace(/[^\d.-]/g, '')) || 250;
    }

    return extractedData;
}

// إنشاء رمز QR محسن للتحقق من الحجز
function generateModernQRCode(data) {
    const qrCodeElement = document.getElementById('qrCode');
    if (!qrCodeElement) return;

    // تنظيف العنصر
    qrCodeElement.innerHTML = '';

    // إنشاء بيانات QR مفصلة للتحقق من الحجز
    const bookingId = data.id || 'INV-' + generateRandomId();
    const timestamp = new Date().getTime();
    const verificationCode = generateVerificationCode(bookingId, timestamp);

    // إنشاء بيانات الحجز المشفرة في رمز QR
    const qrData = {
        id: bookingId,
        bookingNumber: data.bookingNumber, // إضافة رقم الحجز للبيانات المشفرة
        v: verificationCode, // رمز التحقق
        t: timestamp, // الطابع الزمني
        serviceType: data.serviceType || data.title || 'تحليل صورة دم كاملة',
        provider: data.provider || data.appointment?.provider || 'معمل البرج',
        date: data.date || data.appointment?.date || '15 يونيو 2023',
        time: data.time || data.appointment?.time || '10:00 صباحاً',
        clientName: data.clientName || data.patient?.name || 'محمد أحمد',
        clientId: data.patient?.nationalId || '',
        totalAmount: data.totalAmount || data.payment?.amount || 250
    };

    // تعيين معرف الحجز ورقم الحجز ورمز التحقق كسمات للعنصر
    qrCodeElement.setAttribute('data-booking-id', qrData.id);
    qrCodeElement.setAttribute('data-booking-number', qrData.bookingNumber);
    qrCodeElement.setAttribute('data-verification-code', verificationCode);
    qrCodeElement.setAttribute('data-timestamp', timestamp);

    // إنشاء رمز QR باستخدام مكتبة QRCode.js
    try {
        // التحقق من وجود مكتبة QRCode
        if (typeof QRCode !== 'undefined') {
            // تحويل البيانات إلى JSON مضغوط
            const qrDataString = JSON.stringify(qrData);

            // إنشاء رمز QR بجودة عالية
            new QRCode(qrCodeElement, {
                text: qrDataString,
                width: 180,
                height: 180,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H, // أعلى مستوى لتصحيح الأخطاء
                logo: 'img/QR.jpg', // إضافة شعار في وسط الرمز إذا كانت المكتبة تدعم ذلك
                logoWidth: 40,
                logoHeight: 40,
                logoBackgroundColor: 'white',
                logoBackgroundTransparent: false
            });

            // إضافة معلومات التحقق إلى العنصر
            const verificationInfo = document.createElement('div');
            verificationInfo.className = 'modern-receipt-qr-verification';
            verificationInfo.innerHTML = `
                <div class="modern-receipt-qr-verification-code">
                    <span>رمز التحقق:</span>
                    <strong>${formatVerificationCode(verificationCode)}</strong>
                </div>
            `;

            // إضافة معلومات التحقق بعد رمز QR
            const qrParent = qrCodeElement.parentElement;
            if (qrParent && qrParent.className === 'modern-receipt-qr-image') {
                qrParent.after(verificationInfo);
            }
        } else {
            // إذا لم تكن المكتبة متاحة، قم بإنشاء صورة بديلة
            createFallbackQRCode(qrCodeElement, qrData);
            console.warn('مكتبة QRCode غير متوفرة. تم استخدام صورة بديلة.');
        }
    } catch (error) {
        console.error('خطأ في إنشاء رمز QR:', error);

        // إنشاء صورة بديلة في حالة الخطأ
        createFallbackQRCode(qrCodeElement, qrData);
    }

    return qrData; // إرجاع بيانات QR للاستخدام في وظائف أخرى
}

// إنشاء صورة QR بديلة
function createFallbackQRCode(element, data) {
    // تنظيف العنصر
    element.innerHTML = '';

    // إنشاء صورة بديلة لرمز QR
    const img = document.createElement('img');
    img.src = 'img/QR.jpg';
    img.alt = 'رمز QR للحجز';
    img.style.width = '100%';
    img.style.height = '100%';
    element.appendChild(img);

    // إضافة معلومات التحقق
    const verificationInfo = document.createElement('div');
    verificationInfo.className = 'modern-receipt-qr-verification';
    verificationInfo.innerHTML = `
        <div class="modern-receipt-qr-verification-code">
            <span>رمز التحقق:</span>
            <strong>${formatVerificationCode(data.v)}</strong>
        </div>
    `;

    // إضافة معلومات التحقق بعد رمز QR
    const qrParent = element.parentElement;
    if (qrParent && qrParent.className === 'modern-receipt-qr-image') {
        qrParent.after(verificationInfo);
    }
}

// إنشاء رمز تحقق فريد للحجز
function generateVerificationCode(bookingId, timestamp) {
    // دمج معرف الحجز والطابع الزمني
    const combinedString = `${bookingId}-${timestamp}-${Math.random()}`;

    // إنشاء رمز تحقق بسيط باستخدام خوارزمية هاش
    let hash = 0;
    for (let i = 0; i < combinedString.length; i++) {
        const char = combinedString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // تحويل إلى 32bit integer
    }

    // تحويل الهاش إلى رقم إيجابي وتنسيقه كرمز تحقق من 8 أرقام
    const positiveHash = Math.abs(hash);
    const verificationCode = positiveHash.toString().padStart(10, '0').slice(0, 8);

    return verificationCode;
}

// تنسيق رمز التحقق لسهولة القراءة
function formatVerificationCode(code) {
    // تقسيم الرمز إلى مجموعات من 4 أرقام لسهولة القراءة
    if (code && code.length === 8) {
        return `${code.slice(0, 4)}-${code.slice(4, 8)}`;
    }
    return code;
}

// طباعة الإيصال
function printModernReceipt() {
    try {
        // تحضير الطباعة
        const originalTitle = document.title;

        // الحصول على رقم الحجز من عنصر QR
        const qrCode = document.getElementById('qrCode');
        const bookingNumber = qrCode ? qrCode.getAttribute('data-booking-number') : 'BK-000000';

        // تغيير عنوان الصفحة للطباعة باستخدام رقم الحجز
        document.title = 'إيصال حجز - ' + bookingNumber;

        // طباعة الإيصال
        window.print();

        // استعادة عنوان الصفحة الأصلي
        document.title = originalTitle;

        // عرض رسالة نجاح
        showToast('successToast', 'تم إرسال الإيصال للطباعة بنجاح');
    } catch (error) {
        console.error('خطأ في طباعة الإيصال:', error);
        showToast('errorToast', 'حدث خطأ أثناء محاولة الطباعة');
    }
}

// تحميل الإيصال كملف PDF
function downloadModernReceipt() {
    try {
        // التحقق من وجود مكتبة html2pdf
        if (typeof html2pdf === 'undefined') {
            console.warn('مكتبة html2pdf غير متوفرة.');
            showToast('errorToast', 'لا يمكن تحميل الإيصال كملف PDF. المكتبة غير متوفرة.');
            return;
        }

        // الحصول على عنصر الإيصال
        const receiptElement = document.querySelector('.modern-receipt-container');
        if (!receiptElement) {
            showToast('errorToast', 'لا يمكن العثور على عنصر الإيصال');
            return;
        }

        // الحصول على رقم الحجز من عنصر QR
        const qrCode = document.getElementById('qrCode');
        const bookingNumber = qrCode ? qrCode.getAttribute('data-booking-number') : 'BK-000000';

        // إخفاء أزرار الإجراءات مؤقتًا
        const actionsElement = document.querySelector('.modern-receipt-actions');
        const closeButton = document.querySelector('.modern-receipt-close');

        let actionsDisplay = 'flex';
        let closeDisplay = 'flex';

        if (actionsElement) {
            actionsDisplay = actionsElement.style.display;
            actionsElement.style.display = 'none';
        }

        if (closeButton) {
            closeDisplay = closeButton.style.display;
            closeButton.style.display = 'none';
        }

        // خيارات تحويل PDF
        const options = {
            margin: [10, 10, 10, 10],
            filename: 'إيصال_حجز_' + bookingNumber + '.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // تحويل HTML إلى PDF
        html2pdf().from(receiptElement).set(options).save().then(() => {
            // استعادة عرض الأزرار
            if (actionsElement) {
                actionsElement.style.display = actionsDisplay;
            }

            if (closeButton) {
                closeButton.style.display = closeDisplay;
            }

            // عرض رسالة نجاح
            showToast('successToast', 'تم تحميل الإيصال بنجاح');
        }).catch(error => {
            console.error('خطأ في تحميل الإيصال:', error);

            // استعادة عرض الأزرار
            if (actionsElement) {
                actionsElement.style.display = actionsDisplay;
            }

            if (closeButton) {
                closeButton.style.display = closeDisplay;
            }

            showToast('errorToast', 'حدث خطأ أثناء تحميل الإيصال');
        });
    } catch (error) {
        console.error('خطأ في تحميل الإيصال:', error);
        showToast('errorToast', 'حدث خطأ أثناء محاولة تحميل الإيصال');
    }
}

// مشاركة الإيصال
function shareModernReceipt() {
    try {
        // الحصول على معلومات الحجز
        const qrCode = document.getElementById('qrCode');
        const bookingId = qrCode ? qrCode.getAttribute('data-booking-id') : 'unknown';
        const bookingNumber = qrCode ? qrCode.getAttribute('data-booking-number') : 'unknown';
        const receiptServiceType = document.getElementById('receiptServiceType')?.textContent || 'حجز خدمة';
        const receiptProvider = document.getElementById('receiptProvider')?.textContent || '';
        const receiptBookingDate = document.getElementById('receiptBookingDate')?.textContent || '';
        const receiptBookingTime = document.getElementById('receiptBookingTime')?.textContent || '';

        // إنشاء نص المشاركة مع رقم الحجز
        const shareText = `تم حجز ${receiptServiceType} لدى ${receiptProvider} بتاريخ ${receiptBookingDate} الساعة ${receiptBookingTime}. رقم الحجز: ${bookingNumber || bookingId}`;

        // التحقق من دعم واجهة مشاركة الويب
        if (navigator.share) {
            navigator.share({
                title: 'تفاصيل الحجز',
                text: shareText,
                url: window.location.href
            })
            .then(() => {
                showToast('successToast', 'تمت مشاركة الإيصال بنجاح');
            })
            .catch((error) => {
                console.error('خطأ في مشاركة الإيصال:', error);
                // إذا فشلت المشاركة، نسخ النص إلى الحافظة
                copyToClipboard(shareText);
            });
        } else {
            // إذا لم يكن هناك دعم لواجهة المشاركة، نسخ النص إلى الحافظة
            copyToClipboard(shareText);
        }
    } catch (error) {
        console.error('خطأ في مشاركة الإيصال:', error);
        showToast('errorToast', 'حدث خطأ أثناء محاولة المشاركة');
    }
}

// نسخ النص إلى الحافظة
function copyToClipboard(text) {
    // إنشاء عنصر نصي مؤقت
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        // محاولة نسخ النص
        const successful = document.execCommand('copy');
        if (successful) {
            showToast('successToast', 'تم نسخ تفاصيل الحجز إلى الحافظة');
        } else {
            showToast('errorToast', 'فشل نسخ النص');
        }
    } catch (err) {
        console.error('خطأ في نسخ النص:', err);
        showToast('errorToast', 'فشل نسخ النص');
    }

    // إزالة العنصر المؤقت
    document.body.removeChild(textArea);
}

// وظائف مساعدة

// تعيين نص العنصر
function setElementText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
    }
}

// تنسيق العملة بشكل محسن
function formatCurrency(amount, includeCurrency = true, currency = 'جنيه', decimals = 2) {
    // التحقق من نوع المبلغ
    if (amount === null || amount === undefined) {
        amount = 0;
    }

    if (typeof amount === 'string') {
        // إذا كان المبلغ نصًا، حاول تحويله إلى رقم
        // إزالة أي أحرف أو رموز غير رقمية باستثناء النقطة والعلامة السالبة
        const cleanedAmount = amount.replace(/[^\d.-]/g, '');
        amount = parseFloat(cleanedAmount);
    }

    // التحقق من صحة الرقم
    if (isNaN(amount)) {
        amount = 0;
    }

    // تنسيق الرقم بعدد محدد من الأرقام العشرية
    const formattedAmount = amount.toFixed(decimals);

    // إضافة فواصل للأرقام الكبيرة
    const parts = formattedAmount.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedWithCommas = parts.join('.');

    // إضافة العملة إذا كان مطلوبًا
    return includeCurrency ? `${formattedWithCommas} ${currency}` : formattedWithCommas;
}

// إنشاء معرف عشوائي بطول محدد
function generateRandomId(length = 6) {
    // التحقق من أن الطول رقم صحيح وموجب
    length = parseInt(length) || 6;
    if (length <= 0) length = 6;

    // إنشاء رقم عشوائي بالطول المطلوب
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(min + Math.random() * (max - min + 1)).toString();
}

// الحصول على التاريخ الحالي بالتنسيق العربي
function getCurrentDate() {
    return formatDate(new Date());
}

// تنسيق التاريخ باللغة العربية
function formatDate(date) {
    // التحقق من نوع التاريخ
    if (typeof date === 'string') {
        // محاولة تحويل النص إلى كائن تاريخ
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
            date = parsedDate;
        } else {
            // إذا كان التاريخ بتنسيق عربي مثل "15 يونيو 2023"
            // نعيده كما هو لأنه منسق بالفعل
            return date;
        }
    }

    // إذا لم يكن كائن تاريخ صالح
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        date = new Date(); // استخدام التاريخ الحالي كبديل
    }

    const day = date.getDate();
    const monthNames = [
        'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}
