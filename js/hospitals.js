document.addEventListener("DOMContentLoaded", function() {
    const hospitalFilter = document.getElementById("hospitalFilter");
    const priceRange = document.getElementById("priceRange");
    const categoryFilter = document.getElementById("category");
    const availabilityFilter = document.getElementById("availability");
    const hospitalName = document.getElementById("hospitalName");
    const hospitalDescription = document.getElementById("hospitalDescription");
    const hospitalImg = document.getElementById("hospitalImg");
    const hospitalServices = document.getElementById("hospitalServices");
    const defaultHospitalImage = "img/portrait-man-woman-wearing-medical-gowns-holding-ct-scan.jpg";

    // تعريف مصفوفة المستشفيات
    const hospitals = [
        {
            id: "1",
            name: "مستشفى العبور التخصصي",
            address: "شارع الجامعة، مدينة العبور",
            phone: "01234567892",
            image: "img/hospital1.jpg",
            description: "مستشفى العبور التخصصي تقدم خدمات طبية متكاملة."
        },
        {
            id: "2",
            name: "مستشفى فريد حبيب",
            address: "شارع النصر، مدينة العبور",
            phone: "01234567893",
            image: "img/hospital2.jpg",
            description: "مستشفى فريد حبيب تقدم خدمات طبية متميزة."
        },
    ];

    const servicesData = [
        // مستشفى العبور التخصصي
        {
            name: "عمليات الطوارئ",
            description: "تقديم خدمات الطوارئ على مدار الساعة.",
            price: 500,
            discountedPrice: 450,
            category: "emergency",
            availability: "in-stock",
            hospitalId: "1",
            image: "img/foto_upload_3369331235.jpg",
            discount: "10%"
        },
        {
            name: "الجراحة العامة",
            description: "إجراء العمليات الجراحية العامة.",
            price: 1000,
            discountedPrice: 900,
            category: "surgery",
            availability: "in-stock",
            hospitalId: "1",
            image: "img/foto_upload_3369331235.jpg",
            discount: "10%"
        },
        {
            name: "طب الأطفال",
            description: "علاج الأطفال من جميع الأعمار.",
            price: 300,
            discountedPrice: 270,
            category: "pediatrics",
            availability: "in-stock",
            hospitalId: "1",
            image: "img/foto_upload_3369331235.jpg",
            discount: "10%"
        },
        {
            name: "العناية المركزة",
            description: "خدمات العناية المركزة للمرضى.",
            price: 1200,
            discountedPrice: 1080,
            category: "icu",
            availability: "in-stock",
            hospitalId: "1",
            image: "img/foto_upload_3369331235.jpg",
            discount: "10%"
        },
        {
            name: "العمليات التجميلية",
            description: "إجراء العمليات التجميلية للمرضى.",
            price: 1500,
            discountedPrice: 1350,
            category: "cosmetic-surgery",
            availability: "in-stock",
            hospitalId: "1",
            image: "img/foto_upload_3369331235.jpg",
            discount: "10%"
        },
        {
            name: "التحاليل الطبية",
            description: "إجراء تحاليل طبية متنوعة.",
            price: 100,
            discountedPrice: 90,
            category: "lab-tests",
            availability: "in-stock",
            hospitalId: "1",
            image: "img/foto_upload_3369331235.jpg",
            discount: "10%"
        },

        // مستشفى فريد حبيب
        {
            name: "عمليات الطوارئ",
            description: "تقديم خدمات الطوارئ على مدار الساعة.",
            price: 600,
            discountedPrice: 540,
            category: "emergency",
            availability: "in-stock",
            hospitalId: "2",
            image: "img/2897319.jpg",
            discount: "10%"
        },
        {
            name: "الجراحة العامة",
            description: "إجراء العمليات الجراحية العامة.",
            price: 1100,
            discountedPrice: 990,
            category: "surgery",
            availability: "in-stock",
            hospitalId: "2",
            image: "img/2897319.jpg",
            discount: "10%"
        },
        {
            name: "طب الأطفال",
            description: "علاج الأطفال من جميع الأعمار.",
            price: 350,
            discountedPrice: 315,
            category: "pediatrics",
            availability: "in-stock",
            hospitalId: "2",
            image: "img/2897319.jpg",
            discount: "10%"
        },
        {
            name: "العناية المركزة",
            description: "خدمات العناية المركزة للمرضى.",
            price: 1300,
            discountedPrice: 1170,
            category: "icu",
            availability: "in-stock",
            hospitalId: "2",
            image: "img/2897319.jpg",
            discount: "10%"
        },
        {
            name: "العمليات التجميلية",
            description: "إجراء العمليات التجميلية للمرضى.",
            price: 1600,
            discountedPrice: 1440,
            category: "cosmetic-surgery",
            availability: "in-stock",
            hospitalId: "2",
            image: "img/2897319.jpg",
            discount: "10%"
        },
        {
            name: "التحاليل الطبية",
            description: "إجراء تحاليل طبية متنوعة.",
            price: 120,
            discountedPrice: 108,
            category: "lab-tests",
            availability: "in-stock",
            hospitalId: "2",
            image: "img/2897319.jpg",
            discount: "10%"
        }
    ];

    const hospitalsData = [
        {
            id: "1",
            name: "مستشفى العبور التخصصي",
            description: "مستشفى متكامل يقدم خدمات الطوارئ، الجراحة، وطب الأطفال.",
            image: "img/hospital1.jpg"
        },
        {
            id: "2",
            name: "مستشفى فريد حبيب",
            description: "مستشفى متخصص في الطوارئ، الجراحة، وطب الأطفال.",
            image: "img/hospital2.jpg"
        }
    ];

    hospitalFilter.addEventListener("change", function() {
        const selectedHospitalId = hospitalFilter.value;
        const selectedHospital = hospitalsData.find(hospital => hospital.id === selectedHospitalId);

        if (selectedHospital) {
            hospitalName.textContent = selectedHospital.name;
            hospitalDescription.textContent = selectedHospital.description;
            hospitalImg.src = selectedHospital.image;
            hospitalImg.alt = selectedHospital.name;
        } else {
            hospitalName.textContent = "اسم المستشفى";
            hospitalDescription.textContent = "وصف المستشفى يظهر هنا عند اختيار مستشفى معين.";
            hospitalImg.src = defaultHospitalImage;
            hospitalImg.alt = "الصورة الافتراضية";
        }
        filterServices();
    });

    function filterServices() {
        const selectedHospitalId = hospitalFilter.value;
        const selectedCategory = categoryFilter.value;
        const selectedAvailability = availabilityFilter.value;
        const maxPrice = priceRange ? priceRange.value : 2000;
        const searchQuery = document.getElementById('search') ? document.getElementById('search').value.toLowerCase() : '';
        const doctorFilter = document.getElementById('doctor') ? document.getElementById('doctor').value : 'all';

        const filteredServices = servicesData.filter(service => {
            const matchesHospital = selectedHospitalId === "0" || service.hospitalId === selectedHospitalId;
            const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
            const matchesAvailability = selectedAvailability === "all" || service.availability === selectedAvailability;
            const matchesPrice = service.discountedPrice <= maxPrice;
            const matchesSearch = searchQuery === '' ||
                                service.name.toLowerCase().includes(searchQuery) ||
                                service.description.toLowerCase().includes(searchQuery);
            const matchesDoctor = doctorFilter === 'all' ||
                                (service.category === 'doctors' && service.name.includes(doctorFilter));

            return matchesHospital && matchesCategory && matchesAvailability && matchesPrice && matchesSearch && matchesDoctor;
        });

        renderServices(filteredServices);

        // تحديث عدد النتائج
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = filteredServices.length;
        }
    }

    function renderServices(services) {
        hospitalServices.innerHTML = "";

        if (services.length === 0) {
            hospitalServices.innerHTML = "<p>لا توجد خدمات تتناسب مع الفلاتر المحددة.</p>";
        } else {
            services.forEach(service => {
                const serviceCard = document.createElement("div");
                serviceCard.classList.add("service-card");

                serviceCard.innerHTML = `
                    <div class="service-image">
                        <img src="${service.image}" alt="${service.name}">
                        ${service.discount ? `<span class="discount">خصم ${service.discount}</span>` : ""}
                        <span class="service-tag">متاح</span>
                        <div class="service-actions-overlay">
                            <button class="quick-view-btn"><i class="fas fa-eye"></i></button>
                            <button class="add-to-favorite-btn"><i class="far fa-heart"></i></button>
                        </div>
                    </div>
                    <div class="service-info">
                        <div class="service-category">${getCategoryName(service.category)}</div>
                        <h3>${service.name}</h3>
                        <div class="service-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span>(${Math.floor(Math.random() * 50) + 10})</span>
                        </div>
                        <p class="service-description">${service.description}</p>
                        <div class="price">
                            <div class="price-info">
                                <span class="original-price">${service.price} جنيه</span>
                                <span class="discounted-price">${service.discountedPrice} جنيه</span>
                            </div>
                            <span class="service-badge available"><i class="fas fa-check-circle"></i> متاح</span>
                        </div>
                        <div class="service-actions">
                            <button class="book-now"><i class="fas fa-calendar-check"></i> حجز الآن</button>
                        </div>
                    </div>
                `;

                hospitalServices.appendChild(serviceCard);
            });
        }
    }

    // إضافة مستمعي الأحداث لجميع عناصر الفلتر
    if (priceRange) {
        priceRange.addEventListener("input", filterServices);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterServices);
    }

    if (availabilityFilter) {
        availabilityFilter.addEventListener("change", filterServices);
    }

    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener("input", filterServices);
    }

    const doctorFilter = document.getElementById('doctor');
    if (doctorFilter) {
        doctorFilter.addEventListener("change", filterServices);
    }

    // إضافة مستمع الحدث لقائمة الترتيب
    const sortServices = document.getElementById('sortServices');
    if (sortServices) {
        sortServices.addEventListener("change", function() {
            const sortValue = this.value;
            const filteredServices = servicesData.filter(service => {
                const selectedHospitalId = hospitalFilter.value;
                const selectedCategory = categoryFilter.value;
                const selectedAvailability = availabilityFilter.value;
                const maxPrice = priceRange ? priceRange.value : 2000;
                const searchQuery = document.getElementById('search') ? document.getElementById('search').value.toLowerCase() : '';
                const doctorFilter = document.getElementById('doctor') ? document.getElementById('doctor').value : 'all';

                const matchesHospital = selectedHospitalId === "0" || service.hospitalId === selectedHospitalId;
                const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
                const matchesAvailability = selectedAvailability === "all" || service.availability === selectedAvailability;
                const matchesPrice = service.discountedPrice <= maxPrice;
                const matchesSearch = searchQuery === '' ||
                                    service.name.toLowerCase().includes(searchQuery) ||
                                    service.description.toLowerCase().includes(searchQuery);
                const matchesDoctor = doctorFilter === 'all' ||
                                    (service.category === 'doctors' && service.name.includes(doctorFilter));

                return matchesHospital && matchesCategory && matchesAvailability && matchesPrice && matchesSearch && matchesDoctor;
            });

            // ترتيب الخدمات حسب الاختيار
            let sortedServices = [...filteredServices];

            switch(sortValue) {
                case 'price-asc':
                    sortedServices.sort((a, b) => a.discountedPrice - b.discountedPrice);
                    break;
                case 'price-desc':
                    sortedServices.sort((a, b) => b.discountedPrice - a.discountedPrice);
                    break;
                case 'newest':
                    // افتراضياً نعتبر الخدمات الأخيرة في المصفوفة هي الأحدث
                    sortedServices.reverse();
                    break;
                case 'popular':
                default:
                    // الترتيب الافتراضي هو حسب الشعبية
                    // يمكن إضافة منطق مخصص هنا للترتيب حسب الشعبية
                    break;
            }

            renderServices(sortedServices);
        });
    }

    // إضافة مستمع الحدث لزر إعادة ضبط الفلاتر
    const resetFiltersBtn = document.querySelector('.reset-filters-btn');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener("click", function() {
            if (hospitalFilter) hospitalFilter.value = "0";
            if (categoryFilter) categoryFilter.value = "all";
            if (availabilityFilter) availabilityFilter.value = "all";
            if (priceRange) {
                priceRange.value = 2000;
                document.getElementById('priceDisplay').textContent = 'السعر: 2000';
            }
            if (searchInput) searchInput.value = '';
            if (doctorFilter) doctorFilter.value = 'all';

            filterServices();
        });
    }

    // إضافة مستمع الحدث لزر تطبيق الفلاتر
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener("click", filterServices);
    }

    // إظهار مؤشر التحميل عند تحميل البيانات
    function showLoading() {
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.classList.add('show');
        }
    }

    // إخفاء مؤشر التحميل
    function hideLoading() {
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.classList.remove('show');
        }
    }

    // محاكاة تحميل البيانات
    showLoading();
    setTimeout(() => {
        filterServices();
        hideLoading();
        showToast('success', 'تم تحميل الخدمات بنجاح');
    }, 1000);

    hospitalServices.addEventListener("click", function(event) {
        // إذا تم النقر على زر الحجز
        if (event.target.closest(".book-now")) {
            const serviceCard = event.target.closest('.service-card');
            const serviceName = serviceCard.querySelector('h3').textContent;
            const originalPrice = serviceCard.querySelector('.original-price').textContent;
            const discountedPrice = serviceCard.querySelector('.discounted-price').textContent;

            const bookingDetails = {
                service: serviceName,
                originalPrice: originalPrice,
                discountedPrice: discountedPrice,
            };

            localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

            showToast('success', 'تم إضافة حجز الخدمة إلى صفحة الحجوزات');

            setTimeout(() => {
                window.location.href = "bookings-and-follow-up.html";
            }, 1500);
        }

        // إذا تم النقر على زر المفضلة
        if (event.target.closest(".add-to-favorite-btn")) {
            const favoriteBtn = event.target.closest('.add-to-favorite-btn');
            const serviceCard = favoriteBtn.closest('.service-card');
            const serviceName = serviceCard.querySelector('h3').textContent;
            const icon = favoriteBtn.querySelector('i');

            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showToast('success', 'تمت إضافة ' + serviceName + ' إلى المفضلة');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showToast('info', 'تمت إزالة ' + serviceName + ' من المفضلة');
            }
        }
    });

    document.getElementById('priceRange').addEventListener('input', function() {
        const priceValue = this.value;
        document.getElementById('priceDisplay').textContent = 'السعر: ' + priceValue;
    });

    // العرض السريع
    const quickViewModal = document.getElementById('quickViewModal');
    const quickViewClose = document.getElementById('quickViewClose');
    const quickViewImage = document.getElementById('quickViewImage');
    const quickViewCategory = document.getElementById('quickViewCategory');
    const quickViewTitle = document.getElementById('quickViewTitle');
    const quickViewDescription = document.getElementById('quickViewDescription');
    const quickViewOriginalPrice = document.getElementById('quickViewOriginalPrice');
    const quickViewDiscountedPrice = document.getElementById('quickViewDiscountedPrice');
    const quickViewAvailability = document.getElementById('quickViewAvailability');
    const quickViewBookBtn = document.getElementById('quickViewBookBtn');
    const quickViewFavoriteBtn = document.getElementById('quickViewFavoriteBtn');

    // إضافة مستمع الحدث لزر العرض السريع
    hospitalServices.addEventListener('click', function(event) {
        if (event.target.closest('.quick-view-btn')) {
            const serviceCard = event.target.closest('.service-card');
            const serviceName = serviceCard.querySelector('h3').textContent;
            const serviceDescription = serviceCard.querySelector('.service-description').textContent;
            const serviceImage = serviceCard.querySelector('img').src;
            const originalPrice = serviceCard.querySelector('.original-price').textContent;
            const discountedPrice = serviceCard.querySelector('.discounted-price').textContent;
            const serviceCategory = serviceCard.querySelector('.service-category') ?
                                    serviceCard.querySelector('.service-category').textContent : 'خدمة طبية';

            // تعبئة بيانات العرض السريع
            quickViewImage.src = serviceImage;
            quickViewImage.alt = serviceName;
            quickViewCategory.textContent = serviceCategory;
            quickViewTitle.textContent = serviceName;
            quickViewDescription.textContent = serviceDescription;
            quickViewOriginalPrice.textContent = originalPrice;
            quickViewDiscountedPrice.textContent = discountedPrice;

            // تحديث حالة التوفر
            const isAvailable = serviceCard.querySelector('.service-badge.available') !== null;
            if (isAvailable) {
                quickViewAvailability.textContent = 'متاح للحجز اليوم';
                quickViewAvailability.previousElementSibling.className = 'fas fa-check-circle';
                quickViewAvailability.previousElementSibling.style.color = 'var(--accent-color)';
                quickViewBookBtn.disabled = false;
            } else {
                quickViewAvailability.textContent = 'غير متاح حالياً';
                quickViewAvailability.previousElementSibling.className = 'fas fa-times-circle';
                quickViewAvailability.previousElementSibling.style.color = 'var(--danger-color)';
                quickViewBookBtn.disabled = true;
            }

            // عرض النافذة المنبثقة
            quickViewModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });

    // إغلاق النافذة المنبثقة
    quickViewClose.addEventListener('click', function() {
        quickViewModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    // إغلاق النافذة المنبثقة عند النقر خارجها
    quickViewModal.addEventListener('click', function(event) {
        if (event.target === quickViewModal) {
            quickViewModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // إضافة إلى المفضلة
    quickViewFavoriteBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        if (this.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            showToast('success', 'تمت إضافة الخدمة إلى المفضلة');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            showToast('info', 'تمت إزالة الخدمة من المفضلة');
        }
    });

    // حجز من العرض السريع
    quickViewBookBtn.addEventListener('click', function() {
        const bookingDetails = {
            service: quickViewTitle.textContent,
            originalPrice: quickViewOriginalPrice.textContent,
            discountedPrice: quickViewDiscountedPrice.textContent,
        };

        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
        showToast('success', 'تم إضافة حجز الخدمة إلى صفحة الحجوزات');

        setTimeout(() => {
            window.location.href = "bookings-and-follow-up.html";
        }, 1500);
    });

    // عرض رسالة منبثقة
    function showToast(type, message) {
        const toast = document.getElementById(`${type}Toast`);
        const toastMessage = toast.querySelector('span');
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // زر العودة للأعلى
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // الحصول على اسم الفئة بالعربية
    function getCategoryName(categoryKey) {
        const categories = {
            'emergency': 'طوارئ',
            'surgery': 'جراحة',
            'pediatrics': 'أطفال',
            'icu': 'عناية مركزة',
            'cosmetic-surgery': 'جراحة تجميلية',
            'lab-tests': 'تحاليل طبية'
        };
        return categories[categoryKey] || 'خدمة طبية';
    }

    // النشرة الإخبارية
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');

            if (emailInput.value.trim() === '') {
                showToast('warning', 'الرجاء إدخال بريدك الإلكتروني');
                return;
            }

            if (!isValidEmail(emailInput.value)) {
                showToast('error', 'الرجاء إدخال بريد إلكتروني صحيح');
                return;
            }

            showToast('success', 'تم الاشتراك في النشرة الإخبارية بنجاح');
            emailInput.value = '';
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // تحديث طريقة عرض الخدمات
    function renderServices(services) {
        hospitalServices.innerHTML = "";

        if (services.length === 0) {
            hospitalServices.innerHTML = `
                <div class="no-services-message">
                    <i class="fas fa-search"></i>
                    <p>لا توجد خدمات تتناسب مع الفلاتر المحددة.</p>
                    <button class="reset-filters-btn">إعادة ضبط الفلاتر</button>
                </div>
            `;

            document.querySelector('.reset-filters-btn').addEventListener('click', function() {
                hospitalFilter.value = "0";
                categoryFilter.value = "all";
                availabilityFilter.value = "all";
                priceRange.value = 2000;
                document.getElementById('priceDisplay').textContent = 'السعر: 2000';
                filterServices();
            });
        } else {
            services.forEach(service => {
                const serviceCard = document.createElement("div");
                serviceCard.classList.add("service-card");

                serviceCard.innerHTML = `
                    <div class="service-image">
                        <img src="${service.image}" alt="${service.name}">
                        ${service.discount ? `<span class="discount">خصم ${service.discount}</span>` : ""}
                        <span class="service-tag">متاح</span>
                        <div class="service-actions-overlay">
                            <button class="quick-view-btn"><i class="fas fa-eye"></i></button>
                            <button class="add-to-favorite-btn"><i class="far fa-heart"></i></button>
                        </div>
                    </div>
                    <div class="service-info">
                        <div class="service-category">${getCategoryName(service.category)}</div>
                        <h3>${service.name}</h3>
                        <div class="service-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span>(${Math.floor(Math.random() * 50) + 10})</span>
                        </div>
                        <p class="service-description">${service.description}</p>
                        <div class="price">
                            <div class="price-info">
                                <span class="original-price">${service.price} جنيه</span>
                                <span class="discounted-price">${service.discountedPrice} جنيه</span>
                            </div>
                            <span class="service-badge available"><i class="fas fa-check-circle"></i> متاح</span>
                        </div>
                        <div class="service-actions">
                            <button class="book-now" data-service-id="${service.name}" data-hospital-id="${service.hospitalId}"><i class="fas fa-calendar-check"></i> حجز الآن</button>
                        </div>
                    </div>
                `;

                hospitalServices.appendChild(serviceCard);
            });

            // إضافة معالج أحداث لأزرار الحجز
            attachBookingEvents();
        }
    }

    // إضافة معالج أحداث لأزرار الحجز
    function attachBookingEvents() {
        const bookButtons = document.querySelectorAll('.book-now');
        bookButtons.forEach(button => {
            button.addEventListener('click', function() {
                const serviceId = this.getAttribute('data-service-id');
                const hospitalId = this.getAttribute('data-hospital-id');

                // البحث عن الخدمة المحددة
                const selectedService = servicesData.find(service =>
                    service.name === serviceId && service.hospitalId === hospitalId
                );

                if (selectedService) {
                    // الحصول على اسم المستشفى
                    const hospital = hospitals.find(hospital => hospital.id === hospitalId);
                    const hospitalName = hospital ? hospital.name : 'مستشفى';

                    // إنشاء كائن بيانات الحجز
                    const bookingData = {
                        serviceName: selectedService.name,
                        hospitalName: hospitalName,
                        doctorName: selectedService.doctorName || 'د. محمد',
                        speciality: selectedService.speciality || 'عام',
                        price: selectedService.discountedPrice,
                        originalPrice: selectedService.price,
                        date: new Date().toISOString().split('T')[0], // اليوم
                        time: '09:00', // وقت افتراضي
                        image: selectedService.image || 'img/hospital.jpg',
                        symptoms: '',
                        medicalHistory: '',
                        address: hospital ? hospital.address : '',
                        phone: hospital ? hospital.phone : ''
                    };

                    // حفظ بيانات الحجز في التخزين المحلي
                    localStorage.setItem('newHospitalBooking', JSON.stringify(bookingData));

                    // عرض رسالة نجاح
                    alert('تم إضافة الحجز بنجاح! سيتم تحويلك إلى صفحة الحجوزات والمتابعة.');

                    // الانتقال إلى صفحة الحجوزات والمتابعة
                    window.location.href = 'bookings-and-follow-up.html';
                }
            });
        });
    }

    // الحصول على اسم الفئة بالعربية
    function getCategoryName(categoryKey) {
        const categories = {
            'emergency': 'طوارئ',
            'surgery': 'جراحة',
            'pediatrics': 'أطفال',
            'icu': 'عناية مركزة',
            'cosmetic-surgery': 'جراحة تجميلية',
            'lab-tests': 'تحاليل طبية'
        };
        return categories[categoryKey] || 'خدمة طبية';
    }
});
