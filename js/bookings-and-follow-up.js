// المتغيرات العامة
let currentBookings = [];
let labBookings = [];
let hospitalBookings = [];
let otherBookings = [];
let activeTab = 'all';
let sortOption = 'date-desc';

// بيانات المستخدم
const userData = {
    name: 'محمد أحمد',
    email: 'mohamed@example.com',
    phone: '01234567890',
    bookingsCount: 0,
    pendingCount: 0,
    completedCount: 0
};

// تهيئة الصفحة عند التحميل
document.addEventListener("DOMContentLoaded", function () {
    // استرجاع البيانات من التخزين المحلي
    loadBookingsFromStorage();

    // التحقق من وجود بيانات حجز جديدة من صفحات أخرى
    checkForNewBooking();

    // تحديث معلومات المستخدم
    updateUserInfo();

    // تهيئة الأحداث
    initializeEvents();

    // عرض الحجوزات
    renderBookings();

    // تهيئة التبويبات
    initializeTabs();

    // إخفاء مؤشر التحميل
    hideLoadingIndicator();

    // تهيئة زر العودة للأعلى
    initializeBackToTop();
});

// التحقق من وجود بيانات حجز جديدة من صفحات أخرى
function checkForNewBooking() {
    // التحقق من وجود بيانات حجز من صفحة معامل التحاليل
    const labBookingData = localStorage.getItem('newLabBooking');
    if (labBookingData) {
        try {
            const labBooking = JSON.parse(labBookingData);
            // إنشاء حجز جديد للمعمل
            createNewLabBooking(labBooking);
            // حذف البيانات المؤقتة بعد المعالجة
            localStorage.removeItem('newLabBooking');
            // عرض رسالة نجاح
            showToast('successToast', 'تم استلام حجز جديد من معمل التحاليل');
        } catch (error) {
            console.error('خطأ في معالجة بيانات حجز المعمل:', error);
        }
    }

    // التحقق من وجود بيانات حجز من صفحة المستشفيات
    const hospitalBookingData = localStorage.getItem('newHospitalBooking');
    if (hospitalBookingData) {
        try {
            const hospitalBooking = JSON.parse(hospitalBookingData);
            // إنشاء حجز جديد للمستشفى
            createNewHospitalBooking(hospitalBooking);
            // حذف البيانات المؤقتة بعد المعالجة
            localStorage.removeItem('newHospitalBooking');
            // عرض رسالة نجاح
            showToast('successToast', 'تم استلام حجز جديد من المستشفى');
        } catch (error) {
            console.error('خطأ في معالجة بيانات حجز المستشفى:', error);
        }
    }
}

// إنشاء حجز جديد لمعمل التحاليل
function createNewLabBooking(labData) {
    // إنشاء كائن الحجز الجديد
    const newBooking = {
        id: 'lab-' + Date.now(),
        type: 'lab',
        title: labData.testName || 'تحليل معملي',
        provider: labData.labName || 'معمل تحاليل',
        date: labData.date || new Date().toISOString().split('T')[0],
        time: labData.time || '10:00',
        status: 'pending',
        price: labData.price || 0,
        originalPrice: labData.originalPrice || labData.price || 0,
        image: labData.image || 'img/lab-test.jpg',
        patientName: userData.name,
        patientAge: userData.age || 30,
        patientGender: 'ذكر',
        testDetails: labData.testDetails || labData.testName || 'تحليل معملي',
        results: 'غير متاح',
        doctorNotes: '',
        address: labData.address || '',
        phone: labData.phone || ''
    };

    // إضافة الحجز الجديد إلى قائمة الحجوزات
    labBookings.push(newBooking);
    currentBookings.push(newBooking);

    // حفظ التغييرات
    saveBookingsToStorage();

    // تحديث عدادات الحجوزات
    updateBookingCounts();

    // إعادة عرض الحجوزات
    renderBookings();

    // التمرير إلى قسم الدفع وعرض نموذج الدفع
    setTimeout(() => {
        showPaymentForm(newBooking);
    }, 500);
}

// إنشاء حجز جديد للمستشفى - نسخة محسنة
function createNewHospitalBooking(hospitalData) {
    // التحقق من وجود حالة طوارئ
    const isEmergency = hospitalData.isEmergency || false;

    // إذا كانت حالة طوارئ، استخدم التاريخ والوقت الحالي
    let bookingDate, bookingTime;

    if (isEmergency) {
        // استخدام التاريخ الحالي لحالات الطوارئ
        const now = new Date();
        bookingDate = now.toISOString().split('T')[0]; // اليوم الحالي

        // تنسيق الوقت الحالي
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        bookingTime = `${hours}:${minutes}`;
    } else {
        // استخدام التاريخ والوقت المحددين من قبل المستخدم
        bookingDate = hospitalData.date || new Date().toISOString().split('T')[0];
        bookingTime = hospitalData.time || '09:00';
    }

    // إنشاء كائن الحجز الجديد
    const newBooking = {
        id: 'hosp-' + Date.now(),
        type: 'hospital',
        title: hospitalData.serviceName || 'كشف طبي',
        provider: hospitalData.hospitalName || 'مستشفى',
        doctorName: hospitalData.doctorName || 'د. محمد',
        speciality: hospitalData.speciality || 'عام',
        date: bookingDate,
        time: bookingTime,
        status: 'pending',
        price: hospitalData.price || 0,
        originalPrice: hospitalData.originalPrice || hospitalData.price || 0,
        image: hospitalData.image || 'img/hospital.jpg',
        patientName: userData.name,
        patientAge: userData.age || 30,
        patientGender: hospitalData.gender || 'ذكر',
        symptoms: hospitalData.symptoms || '',
        medicalHistory: hospitalData.medicalHistory || '',
        address: hospitalData.address || '',
        phone: hospitalData.phone || '',
        isEmergency: isEmergency // إضافة علامة لتحديد ما إذا كان الحجز طارئاً
    };

    // إضافة الحجز الجديد إلى قائمة الحجوزات
    hospitalBookings.push(newBooking);
    currentBookings.push(newBooking);

    // حفظ التغييرات
    saveBookingsToStorage();

    // تحديث عدادات الحجوزات
    updateBookingCounts();

    // إعادة عرض الحجوزات
    renderBookings();

    // التمرير إلى قسم الدفع وعرض نموذج الدفع
    setTimeout(() => {
        showPaymentForm(newBooking);
    }, 500);
}

// تحميل الحجوزات من التخزين المحلي
function loadBookingsFromStorage() {
    // محاولة استرجاع الحجوزات من التخزين المحلي
    const storedBookings = localStorage.getItem('allBookings');
    const labStoredBookings = localStorage.getItem('labBookings');
    const hospitalStoredBookings = localStorage.getItem('hospitalBookings');

    if (storedBookings) {
        currentBookings = JSON.parse(storedBookings);
    } else {
        // إذا لم تكن هناك حجوزات مخزنة، قم بتحميل بيانات تجريبية
        loadDummyData();
    }

    if (labStoredBookings) {
        labBookings = JSON.parse(labStoredBookings);
    }

    if (hospitalStoredBookings) {
        hospitalBookings = JSON.parse(hospitalStoredBookings);
    }

    // تحديث عدادات الحجوزات
    updateBookingCounts();
}

// تحميل بيانات تجريبية للعرض
function loadDummyData() {
    // حجوزات معامل التحاليل
    labBookings = [
        {
            id: 'lab-001',
            type: 'lab',
            title: 'تحليل صورة دم كاملة',
            provider: 'معمل البرج',
            date: '2023-06-15',
            time: '10:00',
            status: 'completed',
            price: 250,
            originalPrice: 300,
            image: 'img/lab-test.jpg',
            patientName: 'محمد أحمد',
            patientAge: 35,
            patientGender: 'ذكر',
            testDetails: 'تحليل صورة دم كاملة CBC',
            results: 'متاح',
            doctorNotes: 'النتائج طبيعية',
            address: 'شارع النصر، مدينة العبور',
            phone: '01234567890'
        },
        {
            id: 'lab-002',
            type: 'lab',
            title: 'تحليل وظائف الكبد',
            provider: 'معمل المختبر',
            date: '2023-06-20',
            time: '11:30',
            status: 'confirmed',
            price: 350,
            originalPrice: 400,
            image: 'img/lab-test2.jpg',
            patientName: 'محمد أحمد',
            patientAge: 35,
            patientGender: 'ذكر',
            testDetails: 'تحليل وظائف الكبد الشامل',
            results: 'غير متاح',
            doctorNotes: '',
            address: 'شارع العروبة، مدينة العبور',
            phone: '01234567891'
        }
    ];

    // حجوزات المستشفيات
    hospitalBookings = [
        {
            id: 'hosp-001',
            type: 'hospital',
            title: 'كشف باطنة',
            provider: 'مستشفى العبور التخصصي',
            doctorName: 'د. أحمد محمود',
            speciality: 'باطنة',
            date: '2023-06-18',
            time: '09:00',
            status: 'pending',
            price: 300,
            originalPrice: 350,
            image: 'img/hospital.jpg',
            patientName: 'محمد أحمد',
            patientAge: 35,
            patientGender: 'ذكر',
            symptoms: 'آلام في البطن',
            medicalHistory: 'لا يوجد',
            address: 'شارع الجامعة، مدينة العبور',
            phone: '01234567892'
        }
    ];

    // حجوزات أخرى
    otherBookings = [
        {
            id: 'other-001',
            type: 'other',
            title: 'حجز سيارة إسعاف',
            provider: 'خدمات الإسعاف السريع',
            date: '2023-06-25',
            time: '14:00',
            status: 'confirmed',
            price: 500,
            originalPrice: 500,
            image: 'img/ambulance.jpg',
            patientName: 'محمد أحمد',
            patientAge: 35,
            patientGender: 'ذكر',
            serviceDetails: 'نقل مريض من المنزل إلى المستشفى',
            address: 'شارع النصر، مدينة العبور',
            phone: '01234567893'
        }
    ];

    // دمج جميع الحجوزات
    currentBookings = [...labBookings, ...hospitalBookings, ...otherBookings];

    // حفظ البيانات في التخزين المحلي
    saveBookingsToStorage();
}

// حفظ الحجوزات في التخزين المحلي
function saveBookingsToStorage() {
    localStorage.setItem('allBookings', JSON.stringify(currentBookings));
    localStorage.setItem('labBookings', JSON.stringify(labBookings));
    localStorage.setItem('hospitalBookings', JSON.stringify(hospitalBookings));
    localStorage.setItem('otherBookings', JSON.stringify(otherBookings));
}

// تحديث عدادات الحجوزات
function updateBookingCounts() {
    userData.bookingsCount = currentBookings.length;
    userData.pendingCount = currentBookings.filter(booking => booking.status === 'pending').length;
    userData.completedCount = currentBookings.filter(booking => booking.status === 'completed').length;

    // تحديث العناصر في واجهة المستخدم
    if (document.getElementById('bookingsCount')) {
        document.getElementById('bookingsCount').textContent = userData.bookingsCount;
    }

    if (document.getElementById('pendingCount')) {
        document.getElementById('pendingCount').textContent = userData.pendingCount;
    }

    if (document.getElementById('completedCount')) {
        document.getElementById('completedCount').textContent = userData.completedCount;
    }
}

// تحديث معلومات المستخدم
function updateUserInfo() {
    if (document.getElementById('userName')) {
        document.getElementById('userName').textContent = userData.name;
    }
}

// تهيئة الأحداث
function initializeEvents() {
    // أحداث التصفية
    const filterElements = {
        search: document.getElementById('search'),
        category: document.getElementById('category'),
        status: document.getElementById('status'),
        dateRange: document.getElementById('dateRange'),
        priceRange: document.getElementById('priceRange'),
        startDate: document.getElementById('startDate'),
        endDate: document.getElementById('endDate')
    };

    // أحداث البحث والتصفية
    if (filterElements.search) {
        filterElements.search.addEventListener('input', function() {
            applyFilters();
        });
    }

    if (filterElements.category) {
        filterElements.category.addEventListener('change', function() {
            applyFilters();
        });
    }

    if (filterElements.status) {
        filterElements.status.addEventListener('change', function() {
            applyFilters();
        });
    }

    if (filterElements.dateRange) {
        filterElements.dateRange.addEventListener('change', function() {
            const customDateRange = document.getElementById('customDateRange');
            if (this.value === 'custom' && customDateRange) {
                customDateRange.style.display = 'flex';
            } else if (customDateRange) {
                customDateRange.style.display = 'none';
            }
            applyFilters();
        });
    }

    if (filterElements.priceRange) {
        filterElements.priceRange.addEventListener('input', function() {
            const priceDisplay = document.getElementById('priceDisplay');
            if (priceDisplay) {
                priceDisplay.textContent = `السعر: ${this.value}`;
            }
            applyFilters();
        });
    }

    // أحداث الترتيب
    const sortBookings = document.getElementById('sortBookings');
    if (sortBookings) {
        sortBookings.addEventListener('change', function() {
            sortOption = this.value;
            renderBookings();
        });
    }

    // أحداث أزرار التصفية
    const resetFiltersBtn = document.querySelector('.reset-filters-btn');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }

    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }

    // أحداث البحث الرئيسي
    const heroSearch = document.getElementById('heroSearch');
    const heroBookingFilter = document.getElementById('heroBookingFilter');

    if (heroSearch) {
        heroSearch.addEventListener('input', function() {
            if (filterElements.search) {
                filterElements.search.value = this.value;
                applyFilters();
            }
        });
    }

    if (heroBookingFilter) {
        heroBookingFilter.addEventListener('change', function() {
            const value = parseInt(this.value);
            if (filterElements.category) {
                switch(value) {
                    case 1:
                        filterElements.category.value = 'hospitals';
                        break;
                    case 2:
                        filterElements.category.value = 'labs';
                        break;
                    case 3:
                        filterElements.category.value = 'other';
                        break;
                    default:
                        filterElements.category.value = 'all';
                }
                applyFilters();
            }
        });
    }

    // أحداث النوافذ المنبثقة
    setupModalEvents();
}

// تهيئة التبويبات
function initializeTabs() {
    // تبويبات الحجوزات
    const bookingTabs = document.querySelectorAll('.bookings-tabs .tab');
    bookingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            bookingTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            activeTab = this.getAttribute('data-tab');
            renderBookings();
        });
    });

    // تبويبات المتابعة
    const followUpTabs = document.querySelectorAll('.follow-up-tabs .tab');
    const tabContents = document.querySelectorAll('.follow-up-content .tab-content');

    followUpTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            followUpTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}Content`).classList.add('active');
        });
    });
}

// عرض الحجوزات
function renderBookings() {
    const bookingsContainer = document.getElementById('bookingsContainer');
    if (!bookingsContainer) return;

    // فلترة الحجوزات حسب التبويب النشط
    let filteredBookings = [...currentBookings];

    if (activeTab !== 'all') {
        filteredBookings = filteredBookings.filter(booking => booking.status === activeTab);
    }

    // ترتيب الحجوزات
    sortBookings(filteredBookings);

    // إذا لم تكن هناك حجوزات
    if (filteredBookings.length === 0) {
        bookingsContainer.innerHTML = `
            <div class="no-data-message">
                <i class="fas fa-calendar-times"></i>
                <p>لا توجد حجوزات متاحة حالياً</p>
            </div>
        `;
        return;
    }

    // عرض الحجوزات
    let html = '';

    filteredBookings.forEach(booking => {
        html += createBookingCard(booking);
    });

    bookingsContainer.innerHTML = html;

    // إضافة أحداث للأزرار
    attachBookingCardEvents();
}

// إنشاء كارت حجز
function createBookingCard(booking) {
    const statusClass = booking.status;
    const statusText = getStatusText(booking.status);

    return `
        <div class="booking-card" data-id="${booking.id}">
            <div class="booking-card-image">
                <img src="${booking.image || 'img/booking-placeholder.jpg'}" alt="${booking.title}">
                <div class="booking-card-badge ${statusClass}">${statusText}</div>
            </div>
            <div class="booking-card-content">
                <span class="booking-card-category">${getTypeText(booking.type)}</span>
                <h3 class="booking-card-title">${booking.title}</h3>
                <div class="booking-card-info">
                    <div class="booking-card-info-item">
                        <i class="fas fa-hospital"></i>
                        <span>${booking.provider}</span>
                    </div>
                    <div class="booking-card-info-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${formatDate(booking.date)}</span>
                    </div>
                    <div class="booking-card-info-item">
                        <i class="fas fa-clock"></i>
                        <span>${booking.time}</span>
                    </div>
                </div>
                <div class="booking-card-price">
                    <div class="price-amount">
                        ${booking.originalPrice > booking.price ? `<span class="original">${booking.originalPrice} جنيه</span>` : ''}
                        <span>${booking.price} جنيه</span>
                    </div>
                    <div class="booking-card-actions">
                        <button class="booking-card-btn view" data-action="view" data-id="${booking.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="booking-card-btn" data-action="pay" data-id="${booking.id}">
                            <i class="fas fa-credit-card"></i>
                        </button>
                        <button class="booking-card-btn" data-action="delete" data-id="${booking.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// إضافة أحداث لكروت الحجز
function attachBookingCardEvents() {
    const buttons = document.querySelectorAll('.booking-card-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const bookingId = this.getAttribute('data-id');
            const booking = findBookingById(bookingId);

            if (!booking) return;

            switch(action) {
                case 'view':
                    showBookingDetails(booking);
                    break;
                case 'pay':
                    showPaymentForm(booking);
                    break;
                case 'delete':
                    confirmDeleteBooking(booking);
                    break;
            }
        });
    });
}

// البحث عن حجز بواسطة المعرف
function findBookingById(id) {
    return currentBookings.find(booking => booking.id === id);
}

// عرض تفاصيل الحجز
function showBookingDetails(booking) {
    // تهيئة النافذة المنبثقة
    const modal = document.getElementById('quickViewModal');
    const image = document.getElementById('quickViewImage');
    const category = document.getElementById('quickViewCategory');
    const title = document.getElementById('quickViewTitle');
    const description = document.getElementById('quickViewDescription');
    const originalPrice = document.getElementById('quickViewOriginalPrice');
    const discountedPrice = document.getElementById('quickViewDiscountedPrice');
    const availability = document.getElementById('quickViewAvailability');
    const bookBtn = document.getElementById('quickViewBookBtn');

    if (!modal || !image || !category || !title || !description || !originalPrice || !discountedPrice || !availability || !bookBtn) {
        return;
    }

    // تعبئة البيانات
    image.src = booking.image || 'img/booking-placeholder.jpg';
    category.textContent = getTypeText(booking.type);
    title.textContent = booking.title;

    // إنشاء وصف مفصل بناءً على نوع الحجز
    let detailsText = '';

    if (booking.type === 'lab') {
        detailsText = `معمل: ${booking.provider}<br>نوع التحليل: ${booking.testDetails}<br>العنوان: ${booking.address}<br>الهاتف: ${booking.phone}`;
    } else if (booking.type === 'hospital') {
        detailsText = `مستشفى: ${booking.provider}<br>الطبيب: ${booking.doctorName}<br>التخصص: ${booking.speciality}<br>العنوان: ${booking.address}<br>الهاتف: ${booking.phone}`;
    } else {
        detailsText = `مقدم الخدمة: ${booking.provider}<br>تفاصيل الخدمة: ${booking.serviceDetails || ''}<br>العنوان: ${booking.address}<br>الهاتف: ${booking.phone}`;
    }

    description.innerHTML = detailsText;

    // السعر
    originalPrice.textContent = `${booking.originalPrice} جنيه`;
    discountedPrice.textContent = `${booking.price} جنيه`;

    // التوفر
    const statusText = getStatusText(booking.status);
    availability.textContent = `الحالة: ${statusText} - الموعد: ${formatDate(booking.date)} ${booking.time}`;

    // زر الحجز
    if (booking.status === 'pending' || booking.status === 'confirmed') {
        bookBtn.textContent = 'دفع الآن';
        bookBtn.onclick = function() {
            modal.style.display = 'none';
            showPaymentForm(booking);
        };
    } else if (booking.status === 'completed') {
        bookBtn.textContent = 'عرض النتائج';
        bookBtn.onclick = function() {
            modal.style.display = 'none';
            showResults(booking);
        };
    } else {
        bookBtn.textContent = 'إعادة الحجز';
        bookBtn.onclick = function() {
            modal.style.display = 'none';
            rebookAppointment(booking);
        };
    }

    // عرض النافذة
    modal.style.display = 'block';
}

// عرض نموذج الدفع - نسخة محسنة
function showPaymentForm(booking) {
    const paymentSection = document.getElementById('paymentSection');
    const selectedBookingInfo = document.getElementById('selectedBookingInfo');

    if (!paymentSection || !selectedBookingInfo) return;

    // عرض معلومات الحجز المحدد
    selectedBookingInfo.innerHTML = `
        <div class="selected-booking-item">
            <div class="booking-image">
                <img src="${booking.image || 'img/booking-placeholder.jpg'}" alt="${booking.title}">
            </div>
            <div class="booking-details">
                <h4>${booking.title}</h4>
                <p><strong>مقدم الخدمة:</strong> ${booking.provider}</p>
                <p><strong>الموعد:</strong> ${formatDate(booking.date)} ${booking.time}</p>
                <p><strong>الحالة:</strong> ${getStatusText(booking.status)}</p>
                ${booking.isEmergency ? `<div class="emergency-tag"><i class="fas fa-ambulance"></i> حجز طوارئ</div>` : ''}
                <div class="booking-price">
                    ${booking.originalPrice > booking.price ? `<span class="original-price">${booking.originalPrice} جنيه</span>` : ''}
                    <span class="final-price">${booking.price} جنيه</span>
                </div>
            </div>
        </div>
    `;

    // ملئ نموذج الدفع ببيانات المريض
    document.getElementById('clientName').value = booking.patientName || '';
    document.getElementById('age').value = booking.patientAge || '';
    document.getElementById('gender').value = booking.patientGender === 'ذكر' ? 'male' : 'female';

    // ملئ تفاصيل الحجز
    document.getElementById('appointmentDate').value = booking.date;
    document.getElementById('appointmentTime').value = booking.time;
    document.getElementById('serviceType').value = booking.title;
    document.getElementById('totalPrice').value = `${booking.price} جنيه`;

    // إظهار/إخفاء حقل المدة حسب نوع الحجز
    const durationField = document.getElementById('appointmentDuration');
    const durationContainer = durationField ? durationField.closest('.form-group') : null;

    if (durationContainer) {
        // إزالة حقل المدة لحجوزات المستشفى فقط
        if (booking.type === 'hospital') {
            durationContainer.style.display = 'none';
        } else {
            durationContainer.style.display = 'block';
            // إذا كان هناك مدة محددة مسبقاً، قم بتعيينها
            if (booking.duration) {
                durationField.value = booking.duration;
            }
        }
    }

    // إظهار معلومات إضافية لحجوزات المستشفى
    const notesField = document.getElementById('notes');
    if (notesField && booking.type === 'hospital') {
        // إضافة الأعراض والتاريخ الطبي إلى الملاحظات إذا كانت متوفرة
        let additionalNotes = '';
        if (booking.symptoms) {
            additionalNotes += `الأعراض: ${booking.symptoms}\n`;
        }
        if (booking.medicalHistory) {
            additionalNotes += `التاريخ الطبي: ${booking.medicalHistory}`;
        }
        notesField.value = additionalNotes;
    }

    // تخزين معرف الحجز الحالي
    paymentSection.setAttribute('data-booking-id', booking.id);
    // تخزين نوع الحجز لاستخدامه لاحقاً
    paymentSection.setAttribute('data-booking-type', booking.type);

    // التمرير إلى قسم الدفع
    paymentSection.scrollIntoView({ behavior: 'smooth' });
}

// تبديل حقول الدفع الإلكتروني والتأمين
function togglePaymentFields() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const electronicPaymentFields = document.getElementById('electronicPaymentFields');
    const insuranceFields = document.getElementById('insuranceFields');

    if (!electronicPaymentFields || !insuranceFields) return;

    // إخفاء جميع الحقول أولاً
    electronicPaymentFields.style.display = 'none';
    insuranceFields.style.display = 'none';

    // إظهار الحقول المناسبة حسب طريقة الدفع
    if (paymentMethod === 'electronic') {
        electronicPaymentFields.style.display = 'block';
    } else if (paymentMethod === 'insurance') {
        insuranceFields.style.display = 'block';
    }
}

// التحقق من نموذج الدفع
function validatePaymentForm() {
    // التحقق من معلومات المريض الأساسية
    const clientName = document.getElementById('clientName').value;
    const nationalId = document.getElementById('nationalId').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;

    // التحقق من معلومات الدفع
    const paymentMethod = document.getElementById('paymentMethod').value;

    // التحقق من الحقول الإلزامية
    if (!clientName || !nationalId || !age || !gender || !phone || !paymentMethod) {
        showToast('errorToast', 'يرجى ملء جميع الحقول المطلوبة');
        return false;
    }

    // تم إلغاء التحقق من الموافقة على الشروط والأحكام

    // التحقق من رقم الهوية
    if (!/^\d{10,14}$/.test(nationalId.replace(/\s/g, ''))) {
        showToast('errorToast', 'رقم الهوية غير صحيح');
        return false;
    }

    // التحقق من رقم الهاتف
    if (!/^01[0-9]{9}$/.test(phone.replace(/\s/g, ''))) {
        showToast('errorToast', 'رقم الهاتف غير صحيح');
        return false;
    }

    // التحقق من حقول الدفع الإلكتروني
    if (paymentMethod === 'electronic') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardHolderName = document.getElementById('cardHolderName').value;
        const expirationDate = document.getElementById('expirationDate').value;
        const cvv = document.getElementById('cvv').value;

        if (!cardNumber || !cardHolderName || !expirationDate || !cvv) {
            showToast('errorToast', 'يرجى ملء جميع حقول الدفع الإلكتروني');
            return false;
        }

        // التحقق من تنسيق رقم البطاقة
        if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
            showToast('errorToast', 'رقم البطاقة غير صحيح');
            return false;
        }

        // التحقق من تنسيق تاريخ الانتهاء
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)) {
            showToast('errorToast', 'تاريخ الانتهاء غير صحيح (MM/YY)');
            return false;
        }

        // التحقق من رمز CVV
        if (!/^\d{3,4}$/.test(cvv)) {
            showToast('errorToast', 'رمز CVV غير صحيح');
            return false;
        }
    }

    // التحقق من حقول التأمين الصحي
    if (paymentMethod === 'insurance') {
        const insuranceProvider = document.getElementById('insuranceProvider').value;
        const policyNumber = document.getElementById('policyNumber').value;
        const membershipId = document.getElementById('membershipId').value;
        const expiryDate = document.getElementById('expiryDate').value;

        if (!insuranceProvider || !policyNumber || !membershipId || !expiryDate) {
            showToast('errorToast', 'يرجى ملء جميع حقول التأمين الصحي');
            return false;
        }

        // التحقق من تاريخ انتهاء التأمين
        const today = new Date();
        const expiry = new Date(expiryDate);

        if (expiry < today) {
            showToast('errorToast', 'تاريخ انتهاء التأمين غير صالح');
            return false;
        }
    }

    return true;
}

// إكمال عملية الدفع - نسخة محسنة
function completePayment() {
    // التحقق من صحة النموذج
    if (!validatePaymentForm()) return;

    // عرض مؤشر التحميل
    showLoadingIndicator();

    // الحصول على معرف الحجز
    const paymentSection = document.getElementById('paymentSection');
    const bookingId = paymentSection.getAttribute('data-booking-id');
    const booking = findBookingById(bookingId);

    if (!booking) {
        hideLoadingIndicator();
        showToast('errorToast', 'حدث خطأ في العثور على الحجز');
        return;
    }

    // جمع بيانات المريض
    const patientData = {
        name: document.getElementById('clientName').value,
        nationalId: document.getElementById('nationalId').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value || '',
        notes: document.getElementById('notes').value || ''
    };

    // جمع بيانات الحجز
    const appointmentData = {
        date: booking.date,
        time: booking.time,
        serviceType: booking.title,
        provider: booking.provider,
        location: booking.address || ''
    };

    // إضافة مدة الحجز فقط لغير حجوزات المستشفى
    if (booking.type !== 'hospital') {
        appointmentData.duration = document.getElementById('appointmentDuration').value;
    }

    // إضافة معلومات الطبيب والتخصص لحجوزات المستشفى
    if (booking.type === 'hospital') {
        appointmentData.doctorName = booking.doctorName || '';
        appointmentData.speciality = booking.speciality || '';
        appointmentData.isEmergency = booking.isEmergency || false;
    }

    // جمع بيانات الدفع
    const paymentMethod = document.getElementById('paymentMethod').value;
    const paymentData = {
        method: paymentMethod,
        amount: booking.price,
        originalAmount: booking.originalPrice || booking.price,
        currency: 'جنيه',
        date: new Date().toISOString(),
        transactionId: 'TRX-' + Math.floor(Math.random() * 100000),
        details: {}
    };

    // إضافة الضريبة إذا كانت مطلوبة
    // مثال: إضافة ضريبة القيمة المضافة بنسبة 14%
    if (booking.taxable) {
        const taxRate = 0.14; // 14%
        const taxAmount = Math.round(booking.price * taxRate * 100) / 100; // تقريب الضريبة لأقرب رقمين عشريين
        paymentData.tax = taxAmount;
    }

    // إضافة تفاصيل الدفع حسب الطريقة
    if (paymentMethod === 'electronic') {
        paymentData.details = {
            provider: document.getElementById('paymentProvider').value,
            cardNumber: '****-****-****-' + document.getElementById('cardNumber').value.replace(/\s/g, '').slice(-4),
            cardHolderName: document.getElementById('cardHolderName').value,
            expirationDate: document.getElementById('expirationDate').value
        };
    } else if (paymentMethod === 'insurance') {
        paymentData.details = {
            provider: document.getElementById('insuranceProvider').value,
            policyNumber: document.getElementById('policyNumber').value,
            membershipId: document.getElementById('membershipId').value,
            expiryDate: document.getElementById('expiryDate').value
        };
    }

    // إنشاء رقم حجز فريد
    const bookingNumber = generateBookingNumber(booking.type);

    // إنشاء كائن الحجز الكامل
    const completeBookingData = {
        id: booking.id,
        bookingNumber: bookingNumber, // إضافة رقم الحجز الفريد
        type: booking.type,
        title: booking.title,
        status: 'confirmed',
        patient: patientData,
        appointment: appointmentData,
        payment: paymentData,
        image: booking.image,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // إضافة معلومات إضافية حسب نوع الحجز
    if (booking.type === 'hospital') {
        completeBookingData.doctorName = booking.doctorName;
        completeBookingData.speciality = booking.speciality;
        completeBookingData.isEmergency = booking.isEmergency;
        completeBookingData.symptoms = booking.symptoms;
        completeBookingData.medicalHistory = booking.medicalHistory;
    } else if (booking.type === 'lab') {
        completeBookingData.testDetails = booking.testDetails;
        completeBookingData.results = booking.results || 'غير متاح';
    }

    // تحديث الحجز في قاعدة البيانات
    booking.status = 'confirmed';
    booking.bookingNumber = bookingNumber; // إضافة رقم الحجز للحجز الأصلي
    booking.patientName = patientData.name;
    booking.patientAge = patientData.age;
    booking.patientGender = patientData.gender === 'male' ? 'ذكر' : 'أنثى';
    booking.phone = patientData.phone;
    booking.paymentInfo = paymentData;
    booking.completeData = completeBookingData;

    // حفظ التغييرات
    saveBookingsToStorage();

    // محاكاة عملية الدفع (تأخير لمحاكاة معالجة الدفع)
    setTimeout(() => {
        // إخفاء مؤشر التحميل
        hideLoadingIndicator();

        // استخدام الإيصال الحديث
        if (typeof showModernReceiptModal === 'function') {
            // عرض الإيصال الحديث
            showModernReceiptModal(completeBookingData);
        } else {
            // استخدام الإيصال القديم كنسخة احتياطية
            fillReceiptData(completeBookingData);
            generateQRCode(completeBookingData);
            showConfirmationModal();
        }

        // عرض رسالة نجاح
        showToast('successToast', 'تم الدفع بنجاح!');
    }, 1500);
}

// ملئ بيانات الإيصال - نسخة محسنة
function fillReceiptData(bookingData) {
    // معلومات الحجز الأساسية
    if (document.getElementById('receiptId')) {
        document.getElementById('receiptId').textContent = bookingData.id;
    }

    if (document.getElementById('receiptBookingDate')) {
        document.getElementById('receiptBookingDate').textContent = formatDate(bookingData.appointment.date);
    }

    if (document.getElementById('receiptBookingTime')) {
        document.getElementById('receiptBookingTime').textContent = bookingData.appointment.time;
    }

    if (document.getElementById('receiptServiceType')) {
        document.getElementById('receiptServiceType').textContent = bookingData.title;
    }

    if (document.getElementById('receiptProvider')) {
        document.getElementById('receiptProvider').textContent = bookingData.appointment.provider;
    }

    // معلومات المريض
    if (document.getElementById('receiptClientName')) {
        document.getElementById('receiptClientName').textContent = bookingData.patient.name;
    }

    if (document.getElementById('receiptNationalId')) {
        document.getElementById('receiptNationalId').textContent = bookingData.patient.nationalId;
    }

    if (document.getElementById('receiptPhone')) {
        document.getElementById('receiptPhone').textContent = bookingData.patient.phone;
    }

    // إضافة العمر والجنس
    if (document.getElementById('receiptAge')) {
        document.getElementById('receiptAge').textContent = bookingData.patient.age || '35';
    }

    if (document.getElementById('receiptGender')) {
        document.getElementById('receiptGender').textContent = bookingData.patient.gender === 'male' ? 'ذكر' : 'أنثى';
    }

    // معلومات الدفع
    if (document.getElementById('receiptTransactionId')) {
        document.getElementById('receiptTransactionId').textContent = bookingData.payment.transactionId;
    }

    if (document.getElementById('receiptPaymentDate')) {
        document.getElementById('receiptPaymentDate').textContent = formatDate(bookingData.payment.date);
    }

    // طريقة الدفع
    let paymentMethodText = '';
    switch(bookingData.payment.method) {
        case 'cash':
            paymentMethodText = 'الدفع عند الوصول';
            break;
        case 'electronic':
            paymentMethodText = 'بطاقة ائتمان (' + (bookingData.payment.details.provider || 'غير محدد') + ')';
            break;
        case 'insurance':
            paymentMethodText = 'تأمين صحي (' + (bookingData.payment.details.provider || 'غير محدد') + ')';
            break;
        default:
            paymentMethodText = bookingData.payment.method;
    }

    if (document.getElementById('receiptPaymentMethod')) {
        document.getElementById('receiptPaymentMethod').textContent = paymentMethodText;
    }

    // بيانات البطاقة إذا كانت متوفرة
    const cardInfoContainer = document.getElementById('receiptCardInfoContainer');
    if (cardInfoContainer) {
        if (bookingData.payment.method === 'electronic' && bookingData.payment.details && bookingData.payment.details.cardNumber) {
            cardInfoContainer.style.display = 'block';
            document.getElementById('receiptCardInfo').textContent = bookingData.payment.details.cardNumber;
        } else {
            cardInfoContainer.style.display = 'none';
        }
    }

    // معلومات الخدمة المفصلة
    if (document.getElementById('receiptServiceTypeDetail')) {
        let serviceType = '';
        if (bookingData.type === 'lab') {
            serviceType = 'تحليل طبي';
        } else if (bookingData.type === 'hospital') {
            serviceType = 'كشف طبي';
        } else {
            serviceType = 'خدمة أخرى';
        }
        document.getElementById('receiptServiceTypeDetail').textContent = serviceType;
    }

    if (document.getElementById('receiptProviderDetail')) {
        document.getElementById('receiptProviderDetail').textContent = bookingData.appointment.provider;
    }

    if (document.getElementById('receiptAddress')) {
        document.getElementById('receiptAddress').textContent = bookingData.appointment.location || 'مدينة العبور';
    }

    if (document.getElementById('receiptContactNumber')) {
        document.getElementById('receiptContactNumber').textContent = bookingData.phone || '19XXX';
    }

    // معلومات الطبيب والتخصص لحجوزات المستشفى
    const doctorContainer = document.getElementById('receiptDoctorContainer');
    const specialityContainer = document.getElementById('receiptSpecialityContainer');
    const durationContainer = document.getElementById('receiptDurationContainer');

    if (doctorContainer && specialityContainer) {
        if (bookingData.type === 'hospital' && bookingData.doctorName) {
            doctorContainer.style.display = 'block';
            specialityContainer.style.display = 'block';
            document.getElementById('receiptDoctor').textContent = bookingData.doctorName;
            document.getElementById('receiptSpeciality').textContent = bookingData.speciality || 'عام';
        } else {
            doctorContainer.style.display = 'none';
            specialityContainer.style.display = 'none';
        }
    }

    // إظهار/إخفاء مدة الكشف حسب نوع الحجز
    if (durationContainer) {
        // إزالة حقل المدة لحجوزات المستشفى فقط
        if (bookingData.type === 'hospital') {
            durationContainer.style.display = 'none';
        } else {
            durationContainer.style.display = 'block';
            if (document.getElementById('receiptDuration')) {
                document.getElementById('receiptDuration').textContent = bookingData.appointment.duration ?
                    `${bookingData.appointment.duration} دقيقة` : '30 دقيقة';
            }
        }
    }

    // المبلغ الإجمالي
    if (document.getElementById('receiptTotalAmount')) {
        document.getElementById('receiptTotalAmount').textContent = `${bookingData.payment.amount} ${bookingData.payment.currency}`;
    }

    // معلومات إضافية للإيصال
    if (document.getElementById('receiptOriginalPrice') && bookingData.payment.originalAmount) {
        document.getElementById('receiptOriginalPrice').textContent = `${bookingData.payment.originalAmount} ${bookingData.payment.currency}`;
    }

    if (document.getElementById('receiptDiscount')) {
        const discount = bookingData.payment.originalAmount - bookingData.payment.amount;
        document.getElementById('receiptDiscount').textContent = `${discount > 0 ? discount : 0} ${bookingData.payment.currency}`;
    }

    // إظهار/إخفاء الضريبة
    const taxContainer = document.getElementById('receiptTaxContainer');
    if (taxContainer) {
        // إظهار الضريبة فقط للخدمات التي تخضع للضريبة
        if (bookingData.payment.tax) {
            taxContainer.style.display = 'flex';
            document.getElementById('receiptTax').textContent = `${bookingData.payment.tax} ${bookingData.payment.currency}`;
        } else {
            taxContainer.style.display = 'none';
        }
    }

    // إظهار علامة الطوارئ إذا كان الحجز طارئاً
    if (document.getElementById('emergencyTag')) {
        if (bookingData.type === 'hospital' && isToday(bookingData.appointment.date)) {
            document.getElementById('emergencyTag').style.display = 'inline-flex';
        } else {
            document.getElementById('emergencyTag').style.display = 'none';
        }
    }

    // إضافة صورة الخدمة
    if (document.getElementById('receiptServiceImage')) {
        document.getElementById('receiptServiceImage').src = bookingData.image || 'img/booking-placeholder.jpg';
    }
}

// التحقق مما إذا كان التاريخ هو اليوم
function isToday(dateString) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);

    return date.getTime() === today.getTime();
}

// إنشاء رمز QR - نسخة محسنة
function generateQRCode(bookingData) {
    const qrCodeContainer = document.getElementById('qrCode');
    if (!qrCodeContainer) return;

    try {
        // إنشاء بيانات مفصلة لرمز QR
        const qrData = {
            // معلومات الحجز الأساسية
            id: bookingData.id,
            type: bookingData.type,
            title: bookingData.title,
            status: 'confirmed',
            createdAt: bookingData.createdAt,

            // معلومات المريض
            patient: {
                name: bookingData.patient.name,
                nationalId: bookingData.patient.nationalId,
                phone: bookingData.patient.phone,
                age: bookingData.patient.age,
                gender: bookingData.patient.gender
            },

            // معلومات الموعد
            appointment: {
                date: bookingData.appointment.date,
                time: bookingData.appointment.time,
                provider: bookingData.appointment.provider,
                location: bookingData.appointment.location
            },

            // معلومات الدفع
            payment: {
                amount: bookingData.payment.amount,
                currency: bookingData.payment.currency,
                method: bookingData.payment.method,
                transactionId: bookingData.payment.transactionId,
                date: bookingData.payment.date
            }
        };

        // إضافة معلومات إضافية حسب نوع الحجز
        if (bookingData.type === 'hospital') {
            // إضافة معلومات الطبيب والتخصص لحجوزات المستشفى
            qrData.appointment.doctorName = bookingData.doctorName || '';
            qrData.appointment.speciality = bookingData.speciality || '';
            qrData.isEmergency = bookingData.isEmergency || false;

            // إضافة معلومات طبية إذا كانت متوفرة
            if (bookingData.symptoms || bookingData.medicalHistory) {
                qrData.medicalInfo = {
                    symptoms: bookingData.symptoms || '',
                    medicalHistory: bookingData.medicalHistory || ''
                };
            }
        } else if (bookingData.type === 'lab') {
            // إضافة معلومات التحليل لحجوزات المعمل
            qrData.appointment.duration = bookingData.appointment.duration || '';
            qrData.testDetails = bookingData.testDetails || '';
        }

        // إضافة رابط للتحقق من صحة الحجز
        qrData.verificationUrl = `https://transitservices.com/verify?id=${bookingData.id}`;

        // تحويل البيانات إلى سلسلة JSON
        const qrDataString = JSON.stringify(qrData);

        // في التطبيق الحقيقي، سيتم إنشاء رمز QR باستخدام مكتبة مثل qrcode.js
        // للمحاكاة، سنضيف صورة QR جاهزة مع إضافة معرف الحجز للصورة
        qrCodeContainer.innerHTML = `
            <img src="img/qr-code-sample.png" alt="رمز QR للحجز ${bookingData.id}" style="width: 100%; height: 100%; object-fit: contain;">
            <div class="qr-data" style="display: none;">${qrDataString}</div>
        `;

        // إضافة معلومات الحجز كسمة بيانات
        qrCodeContainer.setAttribute('data-booking-id', bookingData.id);
        qrCodeContainer.setAttribute('data-transaction-id', bookingData.payment.transactionId);
    } catch (error) {
        console.error('خطأ في إنشاء رمز QR:', error);
        qrCodeContainer.innerHTML = `
            <div class="qr-error">حدث خطأ في إنشاء رمز QR</div>
        `;
    }
}

// إلغاء الدفع
function cancelPayment() {
    // إعادة التمرير إلى قسم الحجوزات
    document.getElementById('bookingsContainer').scrollIntoView({ behavior: 'smooth' });
}

// تأكيد حذف الحجز
function confirmDeleteBooking(booking) {
    if (confirm(`هل أنت متأكد من حذف الحجز: ${booking.title}?`)) {
        deleteBooking(booking.id);
    }
}

// حذف الحجز
function deleteBooking(bookingId) {
    // البحث عن مؤشر الحجز في المصفوفة
    const index = currentBookings.findIndex(booking => booking.id === bookingId);

    if (index === -1) {
        showToast('errorToast', 'لم يتم العثور على الحجز');
        return;
    }

    // حذف الحجز من المصفوفة الرئيسية
    currentBookings.splice(index, 1);

    // حذف الحجز من المصفوفة المناسبة حسب النوع
    const booking = findBookingById(bookingId);
    if (booking) {
        if (booking.type === 'lab') {
            const labIndex = labBookings.findIndex(b => b.id === bookingId);
            if (labIndex !== -1) labBookings.splice(labIndex, 1);
        } else if (booking.type === 'hospital') {
            const hospitalIndex = hospitalBookings.findIndex(b => b.id === bookingId);
            if (hospitalIndex !== -1) hospitalBookings.splice(hospitalIndex, 1);
        } else {
            const otherIndex = otherBookings.findIndex(b => b.id === bookingId);
            if (otherIndex !== -1) otherBookings.splice(otherIndex, 1);
        }
    }

    // حفظ التغييرات
    saveBookingsToStorage();

    // تحديث عدادات الحجوزات
    updateBookingCounts();

    // إعادة عرض الحجوزات
    renderBookings();

    // عرض رسالة نجاح
    showToast('successToast', 'تم حذف الحجز بنجاح');
}

// عرض نتائج التحاليل
function showResults(booking) {
    if (booking.type !== 'lab' || !booking.results || booking.results === 'غير متاح') {
        showToast('infoToast', 'النتائج غير متاحة حالياً');
        return;
    }

    // هنا يمكن إضافة كود لعرض نتائج التحاليل
    alert(`نتائج التحليل: ${booking.results}\n\nملاحظات الطبيب: ${booking.doctorNotes || 'لا توجد ملاحظات'}`);
}

// إعادة حجز موعد
function rebookAppointment(booking) {
    // إنشاء حجز جديد بناءً على الحجز السابق
    const newBooking = {
        ...booking,
        id: `${booking.type}-${Date.now()}`, // إنشاء معرف جديد
        status: 'pending',
        date: getNextAvailableDate(), // تاريخ متاح جديد
        paymentInfo: null
    };

    // إضافة الحجز الجديد
    currentBookings.push(newBooking);

    // إضافة الحجز إلى المصفوفة المناسبة حسب النوع
    if (newBooking.type === 'lab') {
        labBookings.push(newBooking);
    } else if (newBooking.type === 'hospital') {
        hospitalBookings.push(newBooking);
    } else {
        otherBookings.push(newBooking);
    }

    // حفظ التغييرات
    saveBookingsToStorage();

    // تحديث عدادات الحجوزات
    updateBookingCounts();

    // إعادة عرض الحجوزات
    renderBookings();

    // عرض رسالة نجاح
    showToast('successToast', 'تم إعادة الحجز بنجاح');

    // عرض نموذج الدفع للحجز الجديد
    showPaymentForm(newBooking);
}

// الحصول على التاريخ المتاح التالي (بعد أسبوع من اليوم)
function getNextAvailableDate() {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0]; // تنسيق YYYY-MM-DD
}

// تنسيق التاريخ
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
}

// إنشاء رقم حجز فريد بناءً على نوع الحجز
function generateBookingNumber(bookingType) {
    // الحصول على التاريخ الحالي
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // آخر رقمين من السنة
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // الشهر برقمين
    const day = now.getDate().toString().padStart(2, '0'); // اليوم برقمين

    // إنشاء رمز لنوع الحجز
    let typeCode = 'BK';
    if (bookingType === 'hospital') {
        typeCode = 'HS';
    } else if (bookingType === 'lab') {
        typeCode = 'LB';
    } else if (bookingType === 'pharmacy') {
        typeCode = 'PH';
    }

    // إنشاء رقم عشوائي من 6 أرقام
    const randomNum = Math.floor(100000 + Math.random() * 900000);

    // تجميع رقم الحجز بالتنسيق: رمز النوع-السنةالشهراليوم-رقم عشوائي
    return `${typeCode}-${year}${month}${day}-${randomNum}`;
}

// الحصول على نص الحالة
function getStatusText(status) {
    switch(status) {
        case 'pending':
            return 'قيد الانتظار';
        case 'confirmed':
            return 'مؤكد';
        case 'completed':
            return 'مكتمل';
        case 'cancelled':
            return 'ملغي';
        default:
            return status;
    }
}

// الحصول على نص النوع
function getTypeText(type) {
    switch(type) {
        case 'lab':
            return 'معمل تحاليل';
        case 'hospital':
            return 'مستشفى';
        case 'other':
            return 'خدمة أخرى';
        default:
            return type;
    }
}

// ترتيب الحجوزات
function sortBookings(bookings) {
    switch(sortOption) {
        case 'date-desc':
            bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-asc':
            bookings.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'price-asc':
            bookings.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            bookings.sort((a, b) => b.price - a.price);
            break;
        case 'status':
            bookings.sort((a, b) => {
                const statusOrder = { 'pending': 1, 'confirmed': 2, 'completed': 3, 'cancelled': 4 };
                return statusOrder[a.status] - statusOrder[b.status];
            });
            break;
    }
    return bookings;
}

// تطبيق الفلاتر
function applyFilters() {
    const searchTerm = document.getElementById('search')?.value?.toLowerCase() || '';
    const category = document.getElementById('category')?.value || 'all';
    const status = document.getElementById('status')?.value || 'all';
    const dateRange = document.getElementById('dateRange')?.value || 'all';
    const priceRange = document.getElementById('priceRange')?.value || 2000;

    let filteredBookings = [...currentBookings];

    // فلترة حسب البحث
    if (searchTerm) {
        filteredBookings = filteredBookings.filter(booking =>
            booking.title.toLowerCase().includes(searchTerm) ||
            booking.provider.toLowerCase().includes(searchTerm)
        );
    }

    // فلترة حسب الفئة
    if (category !== 'all') {
        filteredBookings = filteredBookings.filter(booking => booking.type === category);
    }

    // فلترة حسب الحالة
    if (status !== 'all') {
        filteredBookings = filteredBookings.filter(booking => booking.status === status);
    }

    // فلترة حسب التاريخ
    if (dateRange !== 'all') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay()); // بداية الأسبوع (الأحد)

        switch(dateRange) {
            case 'today':
                filteredBookings = filteredBookings.filter(booking => {
                    const bookingDate = new Date(booking.date);
                    bookingDate.setHours(0, 0, 0, 0);
                    return bookingDate.getTime() === today.getTime();
                });
                break;
            case 'week':
                filteredBookings = filteredBookings.filter(booking => {
                    const bookingDate = new Date(booking.date);
                    return bookingDate >= weekStart && bookingDate < new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
                });
                break;
            case 'month':
                filteredBookings = filteredBookings.filter(booking => {
                    const bookingDate = new Date(booking.date);
                    return bookingDate.getMonth() === today.getMonth() && bookingDate.getFullYear() === today.getFullYear();
                });
                break;
            case 'custom':
                const startDate = document.getElementById('startDate')?.value;
                const endDate = document.getElementById('endDate')?.value;

                if (startDate && endDate) {
                    filteredBookings = filteredBookings.filter(booking => {
                        return booking.date >= startDate && booking.date <= endDate;
                    });
                }
                break;
        }
    }

    // فلترة حسب السعر
    filteredBookings = filteredBookings.filter(booking => booking.price <= priceRange);

    // تحديث عرض الحجوزات
    const bookingsContainer = document.getElementById('bookingsContainer');
    if (!bookingsContainer) return;

    // ترتيب الحجوزات
    sortBookings(filteredBookings);

    // إذا لم تكن هناك حجوزات
    if (filteredBookings.length === 0) {
        bookingsContainer.innerHTML = `
            <div class="no-data-message">
                <i class="fas fa-filter"></i>
                <p>لا توجد حجوزات تطابق معايير البحث</p>
            </div>
        `;
        return;
    }

    // عرض الحجوزات
    let html = '';

    filteredBookings.forEach(booking => {
        html += createBookingCard(booking);
    });

    bookingsContainer.innerHTML = html;

    // إضافة أحداث للأزرار
    attachBookingCardEvents();
}

// إعادة ضبط الفلاتر
function resetFilters() {
    // إعادة ضبط حقول الفلترة
    document.getElementById('search').value = '';
    document.getElementById('category').value = 'all';
    document.getElementById('status').value = 'all';
    document.getElementById('dateRange').value = 'all';
    document.getElementById('priceRange').value = 2000;

    // إخفاء حقول التاريخ المخصص
    const customDateRange = document.getElementById('customDateRange');
    if (customDateRange) {
        customDateRange.style.display = 'none';
    }

    // تحديث عرض السعر
    const priceDisplay = document.getElementById('priceDisplay');
    if (priceDisplay) {
        priceDisplay.textContent = 'السعر: 2000';
    }

    // إعادة عرض جميع الحجوزات
    renderBookings();
}

// إخفاء مؤشر التحميل
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.classList.remove('show');
    }
}

// عرض مؤشر التحميل
function showLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.classList.add('show');
    }
}

// تهيئة زر العودة للأعلى
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    // إظهار الزر عند التمرير للأسفل
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // التمرير للأعلى عند النقر
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// تهيئة أحداث النوافذ المنبثقة
function setupModalEvents() {
    // نافذة العرض السريع
    const quickViewModal = document.getElementById('quickViewModal');
    const quickViewClose = document.getElementById('quickViewClose');
    const quickViewFavoriteBtn = document.getElementById('quickViewFavoriteBtn');

    if (quickViewModal && quickViewClose) {
        quickViewClose.addEventListener('click', function() {
            quickViewModal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === quickViewModal) {
                quickViewModal.style.display = 'none';
            }
        });
    }

    if (quickViewFavoriteBtn) {
        quickViewFavoriteBtn.addEventListener('click', function() {
            showToast('successToast', 'تمت إضافة الحجز إلى المفضلة');
        });
    }

    // نافذة تأكيد الدفع
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmationClose = document.getElementById('confirmationClose');
    const printReceiptBtn = document.getElementById('printReceiptBtn');
    const downloadReceiptBtn = document.getElementById('downloadReceiptBtn');
    const viewBookingsBtn = document.getElementById('viewBookingsBtn');

    if (confirmationModal && confirmationClose) {
        confirmationClose.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === confirmationModal) {
                confirmationModal.style.display = 'none';
            }
        });
    }

    if (printReceiptBtn) {
        printReceiptBtn.addEventListener('click', function() {
            // إنشاء نسخة قابلة للطباعة من الإيصال
            printReceipt();
        });
    }

    if (downloadReceiptBtn) {
        downloadReceiptBtn.addEventListener('click', function() {
            // تحميل الإيصال كملف PDF
            downloadReceipt();
        });
    }

    if (viewBookingsBtn) {
        viewBookingsBtn.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
            document.getElementById('bookingsContainer').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// عرض نافذة تأكيد الدفع (الإصدار القديم)
function showConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
        // التحقق من نوع النافذة المنبثقة
        if (confirmationModal.classList.contains('modern-receipt-modal')) {
            // إذا كانت النافذة من النوع الحديث
            confirmationModal.classList.add('show');
        } else {
            // النافذة القديمة
            confirmationModal.style.display = 'block';
        }
        document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
    }
}

// طباعة الإيصال - نسخة محسنة
function printReceipt() {
    try {
        // التحقق من وجود وظيفة الطباعة الحديثة
        if (typeof printModernReceipt === 'function') {
            // استخدام وظيفة الطباعة الحديثة
            printModernReceipt();
            return;
        }

        // الحصول على محتوى الإيصال (الإصدار القديم)
        const receiptContent = document.querySelector('.receipt-modal .confirmation-container');
        if (!receiptContent) {
            showToast('errorToast', 'لم يتم العثور على محتوى الإيصال');
            return;
        }

        // الحصول على معلومات الحجز للطباعة
        const qrCode = document.getElementById('qrCode');
        const bookingId = qrCode ? qrCode.getAttribute('data-booking-id') : 'unknown';
        const transactionId = qrCode ? qrCode.getAttribute('data-transaction-id') : 'unknown';
        const currentDate = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });

        // إنشاء نافذة طباعة جديدة
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (!printWindow) {
            showToast('errorToast', 'تم حظر النوافذ المنبثقة. يرجى السماح بها لهذا الموقع');
            return;
        }

        // إعداد محتوى الطباعة
        printWindow.document.write(`
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
                <title>إيصال الحجز #${bookingId}</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap');
                    body {
                        font-family: 'Rubik', sans-serif;
                        direction: rtl;
                        background-color: white;
                        padding: 0;
                        margin: 0;
                        color: #333;
                    }
                    .print-container {
                        max-width: 800px;
                        margin: 0 auto;
                        background-color: white;
                        padding: 20px;
                        position: relative;
                    }
                    .print-header {
                        text-align: center;
                        margin-bottom: 20px;
                        padding-bottom: 15px;
                        border-bottom: 2px dashed #eee;
                    }
                    .print-header h1 {
                        margin: 0 0 5px;
                        color: #7a1cac;
                        font-size: 24px;
                    }
                    .print-header p {
                        margin: 0;
                        color: #666;
                        font-size: 14px;
                    }
                    .print-info {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                        font-size: 14px;
                    }
                    .print-info-item {
                        flex: 1;
                    }
                    .print-info-item h3 {
                        margin: 0 0 5px;
                        font-size: 16px;
                        color: #7a1cac;
                    }
                    .print-info-item p {
                        margin: 0 0 3px;
                    }
                    .print-watermark {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(-45deg);
                        font-size: 100px;
                        color: rgba(122, 28, 172, 0.05);
                        pointer-events: none;
                        z-index: 0;
                        white-space: nowrap;
                    }
                    .receipt-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                        position: relative;
                        z-index: 1;
                    }
                    .receipt-logo img {
                        max-width: 150px;
                        height: auto;
                    }
                    .receipt-status {
                        display: flex;
                        align-items: center;
                    }
                    .status-icon {
                        font-size: 2rem;
                        color: #4CAF50;
                        margin-left: 10px;
                        background-color: rgba(76, 175, 80, 0.1);
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .receipt-body {
                        margin-bottom: 20px;
                        position: relative;
                        z-index: 1;
                    }
                    .receipt-service-info {
                        display: flex;
                        margin-bottom: 20px;
                        background-color: #f9f9f9;
                        border-radius: 8px;
                        padding: 15px;
                        border: 1px solid #eee;
                    }
                    .service-image img {
                        width: 100px;
                        height: 100px;
                        object-fit: cover;
                        border-radius: 8px;
                        margin-left: 15px;
                        border: 1px solid #eee;
                    }
                    .receipt-details-container {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 20px;
                        margin-bottom: 20px;
                    }
                    .receipt-column {
                        flex: 1;
                        min-width: 250px;
                    }
                    .receipt-section {
                        background-color: #f9f9f9;
                        border-radius: 8px;
                        padding: 15px;
                        margin-bottom: 15px;
                        border: 1px solid #eee;
                    }
                    .receipt-section h3 {
                        margin-top: 0;
                        color: #7a1cac;
                        font-size: 16px;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 8px;
                        margin-bottom: 10px;
                        display: flex;
                        align-items: center;
                    }
                    .receipt-section h3 i {
                        margin-left: 8px;
                    }
                    .receipt-info-item {
                        margin-bottom: 8px;
                        padding: 8px;
                        background-color: white;
                        border-radius: 4px;
                        border: 1px solid #f0f0f0;
                    }
                    .receipt-label {
                        font-weight: 500;
                        color: #555;
                        display: block;
                        margin-bottom: 3px;
                        font-size: 13px;
                    }
                    .receipt-value {
                        font-weight: 600;
                        color: #333;
                        font-size: 15px;
                    }
                    .receipt-summary {
                        background-color: #f9f9f9;
                        border-radius: 8px;
                        padding: 15px;
                        margin-bottom: 20px;
                        border: 1px solid #eee;
                    }
                    .receipt-summary-row {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 8px;
                        padding: 5px 0;
                    }
                    .receipt-summary-row.total {
                        font-weight: bold;
                        font-size: 18px;
                        color: #7a1cac;
                        border-top: 2px dashed #ddd;
                        padding-top: 10px;
                        margin-top: 10px;
                    }
                    .receipt-qr-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin: 30px 0;
                        position: relative;
                        z-index: 1;
                    }
                    .qr-code {
                        width: 150px;
                        height: 150px;
                        margin-bottom: 10px;
                        padding: 10px;
                        background-color: white;
                        border-radius: 8px;
                        border: 1px solid #eee;
                    }
                    .qr-code img {
                        width: 100%;
                        height: 100%;
                    }
                    .receipt-qr-container p {
                        margin: 5px 0;
                        font-size: 14px;
                        color: #666;
                    }
                    .receipt-footer {
                        border-top: 2px dashed #eee;
                        padding-top: 20px;
                        font-size: 14px;
                        position: relative;
                        z-index: 1;
                    }
                    .receipt-notes {
                        margin-bottom: 20px;
                    }
                    .receipt-notes h4 {
                        margin: 0 0 10px;
                        color: #7a1cac;
                        font-size: 16px;
                        display: flex;
                        align-items: center;
                    }
                    .receipt-notes h4 i {
                        margin-left: 8px;
                    }
                    .receipt-notes ul {
                        padding-right: 20px;
                        margin: 0;
                        list-style-type: none;
                    }
                    .receipt-notes li {
                        margin-bottom: 5px;
                        position: relative;
                        padding-right: 20px;
                    }
                    .receipt-notes li:before {
                        content: '\f058';
                        font-family: 'Font Awesome 5 Free';
                        font-weight: 900;
                        position: absolute;
                        right: 0;
                        color: #4CAF50;
                    }
                    .receipt-contact {
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        margin-top: 20px;
                        flex-wrap: wrap;
                    }
                    .contact-item {
                        display: flex;
                        align-items: center;
                        color: #666;
                    }
                    .contact-item i {
                        margin-left: 8px;
                        color: #7a1cac;
                    }
                    .print-footer {
                        text-align: center;
                        margin-top: 30px;
                        font-size: 12px;
                        color: #999;
                        border-top: 1px solid #eee;
                        padding-top: 15px;
                    }
                    @media print {
                        body {
                            background-color: white;
                            padding: 0;
                            margin: 0;
                        }
                        .print-container {
                            width: 100%;
                            max-width: 100%;
                            padding: 0;
                            margin: 0;
                        }
                        .receipt-actions, .close, .no-print {
                            display: none !important;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="print-container">
                    <div class="print-watermark">خدمات العبور</div>

                    <div class="print-header">
                        <h1>إيصال حجز خدمة</h1>
                        <p>رقم الإيصال: #${bookingId} | رقم العملية: ${transactionId}</p>
                    </div>

                    <div class="print-info">
                        <div class="print-info-item">
                            <h3>تاريخ الطباعة</h3>
                            <p>${currentDate}</p>
                        </div>
                        <div class="print-info-item" style="text-align: center;">
                            <h3>حالة الحجز</h3>
                            <p style="color: #4CAF50; font-weight: bold;">مؤكد</p>
                        </div>
                        <div class="print-info-item" style="text-align: left;">
                            <h3>موقع خدمات العبور</h3>
                            <p>www.transitservices.com</p>
                        </div>
                    </div>

                    ${receiptContent.outerHTML}

                    <div class="print-footer">
                        <p>هذا الإيصال صادر من موقع خدمات العبور ويعتبر إثباتاً رسمياً للحجز</p>
                        <p>&copy; ${new Date().getFullYear()} جميع الحقوق محفوظة لموقع خدمات العبور</p>
                    </div>
                </div>
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            setTimeout(function() {
                                window.close();
                            }, 500);
                        }, 500);
                    };
                </script>
            </body>
            </html>
        `);

        printWindow.document.close();
        showToast('successToast', 'جاري فتح نافذة الطباعة');
    } catch (error) {
        console.error('خطأ في طباعة الإيصال:', error);
        showToast('errorToast', 'حدث خطأ أثناء محاولة الطباعة');
    }
}

// تحميل الإيصال كملف PDF
function downloadReceipt() {
    try {
        // التحقق من وجود وظيفة التحميل الحديثة
        if (typeof downloadModernReceipt === 'function') {
            // استخدام وظيفة التحميل الحديثة
            downloadModernReceipt();
            return;
        }

        // عرض رسالة جاري التحميل
        showToast('infoToast', 'جاري تحميل الإيصال كملف PDF...');

        // الحصول على معرف الحجز لتسمية الملف
        const qrCode = document.getElementById('qrCode');
        const bookingId = qrCode ? qrCode.getAttribute('data-booking-id') : 'receipt';

        // في التطبيق الحقيقي، سيتم استخدام مكتبة مثل html2pdf.js لتحويل الإيصال إلى PDF
        // للمحاكاة، سنعرض رسالة نجاح بعد ثانيتين

        // محاكاة عملية التحميل
        setTimeout(() => {
            // إنشاء رابط تنزيل وهمي للمحاكاة
            const downloadLink = document.createElement('a');
            downloadLink.href = 'img/receipt-sample.pdf'; // مسار لملف PDF نموذجي إن وجد
            downloadLink.download = `receipt-${bookingId}.pdf`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            // عرض رسالة نجاح
            showToast('successToast', 'تم تحميل الإيصال بنجاح');
        }, 2000);
    } catch (error) {
        console.error('خطأ في تحميل الإيصال:', error);
        showToast('errorToast', 'حدث خطأ أثناء محاولة التحميل');
    }
}

// عرض رسالة تنبيه
function showToast(toastId, message) {
    const toast = document.getElementById(toastId);
    if (!toast) return;

    // تعيين الرسالة
    const contentElement = toast.querySelector('.toast-content span');
    if (contentElement) {
        contentElement.textContent = message;
    }

    // إظهار الرسالة
    toast.classList.add('show');

    // إخفاء الرسالة بعد 3 ثواني
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
}