document.addEventListener("DOMContentLoaded", function() {
    // تعريف عناصر الفلتر الرئيسية
    const labFilter = document.getElementById("labFilter");
    const priceRange = document.getElementById("priceRange");
    const categoryFilter = document.getElementById("category");
    const availabilityFilter = document.getElementById("availability");
    const labName = document.getElementById("labName");
    const labDescription = document.getElementById("labDescription");
    const labImg = document.getElementById("labImg");
    const labServices = document.getElementById("labServices");
    const defaultLabImage = "img/default-lab.jpg";

    // تعريف عناصر البحث واختيار المعمل في القسم الأول (البانر)
    const heroSearchInput = document.getElementById("heroSearch");
    const heroLabFilter = document.getElementById("heroLabFilter");
    const heroSearchBtn = document.querySelector(".search-btn");

    // تعريف مصفوفة المعامل
    const labs = [
        {
            id: "1",
            name: "معمل البرج",
            address: "شارع النصر، مدينة العبور",
            phone: "01234567890",
            image: "img/lab1.jpg",
            description: "معمل البرج هو معمل رائد في مجال التحاليل الطبية والأشعة."
        },
        {
            id: "2",
            name: "معمل الفا",
            address: "شارع العروبة، مدينة العبور",
            phone: "01234567891",
            image: "img/lab2.jpg",
            description: "معمل الفا يقدم خدمات التحاليل الطبية بأعلى جودة."
        },
        {
            id: "3",
            name: "معمل المختبر",
            address: "شارع الجامعة، مدينة العبور",
            phone: "01234567892",
            image: "img/lab3.jpg",
            description: "معمل المختبر يقدم خدمات التحاليل الطبية والأشعة بأسعار مناسبة."
        }
    ];

    const servicesData = [
        // معمل البرج
        {
            name: "تحليل الدم",
            description: "تحليل شامل للدم.",
            price: 200,
            discountedPrice: 180,
            category: "blood-tests",
            availability: "in-stock",
            labId: "1",
            image: "img/thumb-816x460-6.jpg",
            discount: "10%"
        },
        {
            name: "تحليل البول",
            description: "تحليل شامل للبول.",
            price: 150,
            discountedPrice: 135,
            category: "urine-tests",
            availability: "in-stock",
            labId: "1",
            image: "img/thumb-816x460-6.jpg",
            discount: "10%"
        },
        {
            name: "أشعة سي تي سكان",
            description: "أشعة سي تي سكان للكشف عن الأمراض.",
            price: 500,
            discountedPrice: 450,
            category: "ct-scan",
            availability: "in-stock",
            labId: "1",
            image: "img/thumb-816x460-6.jpg",
            discount: "10%"
        },
        {
            name: "أشعة إكس",
            description: "أشعة إكس للكشف عن الكسور والالتهابات.",
            price: 300,
            discountedPrice: 270,
            category: "x-ray",
            availability: "in-stock",
            labId: "1",
            image: "img/thumb-816x460-6.jpg",
            discount: "10%"
        },

        // معمل الفا
        {
            name: "تحليل الدم",
            description: "تحليل شامل للدم.",
            price: 210,
            discountedPrice: 189,
            category: "blood-tests",
            availability: "in-stock",
            labId: "2",
            image: "img/woman-working-laborator.jpg",
            discount: "10%"
        },
        {
            name: "تحليل البول",
            description: "تحليل شامل للبول.",
            price: 160,
            discountedPrice: 144,
            category: "urine-tests",
            availability: "in-stock",
            labId: "2",
            image: "img/woman-working-laborator.jpg",
            discount: "10%"
        },
        {
            name: "أشعة سي تي سكان",
            description: "أشعة سي تي سكان للكشف عن الأمراض.",
            price: 510,
            discountedPrice: 459,
            category: "ct-scan",
            availability: "in-stock",
            labId: "2",
            image: "img/woman-working-laborator.jpg",
            discount: "10%"
        },
        {
            name: "أشعة إكس",
            description: "أشعة إكس للكشف عن الكسور والالتهابات.",
            price: 310,
            discountedPrice: 279,
            category: "x-ray",
            availability: "in-stock",
            labId: "2",
            image: "img/woman-working-laborator.jpg",
            discount: "10%"
        },

        // معمل سلامتك
        {
            name: "تحليل الدم",
            description: "تحليل شامل للدم.",
            price: 220,
            discountedPrice: 198,
            category: "blood-tests",
            availability: "in-stock",
            labId: "3",
            image: "img/lab-at-home-768x513.jpg",
            discount: "10%"
        },
        {
            name: "تحليل البول",
            description: "تحليل شامل للبول.",
            price: 170,
            discountedPrice: 153,
            category: "urine-tests",
            availability: "in-stock",
            labId: "3",
            image: "img/lab-at-home-768x513.jpg",
            discount: "10%"
        },
        {
            name: "أشعة سي تي سكان",
            description: "أشعة سي تي سكان للكشف عن الأمراض.",
            price: 520,
            discountedPrice: 468,
            category: "ct-scan",
            availability: "in-stock",
            labId: "3",
            image: "img/lab-at-home-768x513.jpg",
            discount: "10%"
        },
        {
            name: "أشعة إكس",
            description: "أشعة إكس للكشف عن الكسور والالتهابات.",
            price: 320,
            discountedPrice: 288,
            category: "x-ray",
            availability: "in-stock",
            labId: "3",
            image: "img/lab-at-home-768x513.jpg",
            discount: "10%"
        }
    ];

    const labsData = [
        {
            id: "1",
            name: "معمل البرج",
            description: "معمل متكامل يقدم خدمات تحليل الدم، البول، والأشعة.",
            image: "img/lab1.jpg"
        },
        {
            id: "2",
            name: "معمل الفا",
            description: "معمل متخصص في تحليل الدم، البول، والأشعة.",
            image: "img/lab2.jpg"
        },
        {
            id: "3",
            name: "معمل سلامتك",
            description: "معمل متكامل يقدم خدمات تحليل الدم، البول، والأشعة.",
            image: "img/lab3.jpg"
        }
    ];

    labFilter.addEventListener("change", function() {
        console.log('labFilter change event triggered');
        const selectedLabId = labFilter.value;
        console.log('Selected Lab ID:', selectedLabId);
        const selectedLab = labsData.find(lab => lab.id === selectedLabId);
        console.log('Selected Lab:', selectedLab);

        if (selectedLab) {
            labName.textContent = selectedLab.name;
            labDescription.textContent = selectedLab.description;
            labImg.src = selectedLab.image;
            labImg.alt = selectedLab.name;

            // تحديث القائمة المنسدلة في القسم الأول (البانر) إذا كانت موجودة
            if (heroLabFilter && heroLabFilter.value !== selectedLabId) {
                heroLabFilter.value = selectedLabId;
            }
        } else {
            labName.textContent = "اسم المعمل";
            labDescription.textContent = "وصف المعمل يظهر هنا عند اختيار معمل معين.";
            labImg.src = defaultLabImage;
            labImg.alt = "الصورة الافتراضية";
        }
        filterServices();
    });

    function filterServices() {
        console.log('filterServices called');
        const selectedLabId = labFilter.value;
        console.log('selectedLabId:', selectedLabId);
        const selectedCategory = categoryFilter.value;
        const selectedAvailability = availabilityFilter.value;
        const maxPrice = priceRange ? priceRange.value : 2000;

        // نحصل على قيمة البحث من حقل البحث الرئيسي أو حقل البحث في القسم الأول
        let searchQuery = '';
        const mainSearchInput = document.getElementById('search');

        if (mainSearchInput && mainSearchInput.value.trim() !== '') {
            searchQuery = mainSearchInput.value.toLowerCase();
            console.log('searchQuery from mainSearchInput:', searchQuery);
        } else if (heroSearchInput && heroSearchInput.value.trim() !== '') {
            searchQuery = heroSearchInput.value.toLowerCase();
            console.log('searchQuery from heroSearchInput:', searchQuery);
            // نقوم بتحديث حقل البحث الرئيسي إذا كان موجوداً
            if (mainSearchInput) {
                mainSearchInput.value = heroSearchInput.value;
            }
        }

        const doctorFilter = document.getElementById('doctor') ? document.getElementById('doctor').value : 'all';

        const filteredServices = servicesData.filter(service => {
            const matchesLab = selectedLabId === "0" || service.labId === selectedLabId;
            const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
            const matchesAvailability = selectedAvailability === "all" || service.availability === selectedAvailability;
            const matchesPrice = service.discountedPrice <= maxPrice;
            const matchesSearch = searchQuery === '' ||
                                service.name.toLowerCase().includes(searchQuery) ||
                                service.description.toLowerCase().includes(searchQuery);
            const matchesDoctor = doctorFilter === 'all' ||
                                (service.category === 'doctors' && service.name.includes(doctorFilter));

            return matchesLab && matchesCategory && matchesAvailability && matchesPrice && matchesSearch && matchesDoctor;
        });

        renderServices(filteredServices);

        // تحديث عدد النتائج
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = filteredServices.length;
        }

        // إذا كانت هناك نتائج وتم البحث من القسم الأول، نقوم بالتمرير إلى قسم الخدمات
        if (filteredServices.length > 0 && heroSearchInput && heroSearchInput.value.trim() !== '') {
            console.log('Scrolling to lab-services-section after search');
            const labServicesSection = document.querySelector('.lab-services-section');
            if (labServicesSection) {
                labServicesSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.log('lab-services-section not found for scrolling!');
            }
        }
    }

    function renderServices(services) {
        labServices.innerHTML = "";

        if (services.length === 0) {
            labServices.innerHTML = "<p>لا توجد خدمات تتناسب مع الفلاتر المحددة.</p>";
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

                labServices.appendChild(serviceCard);
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

    // إضافة مستمعي الأحداث لعناصر القسم الأول (البانر)
    if (heroSearchInput) {
        console.log('heroSearchInput found:', heroSearchInput);
        heroSearchInput.addEventListener("input", function() {
            console.log('heroSearchInput input event triggered');
            console.log('heroSearchInput value:', this.value);
            // نقوم بتحديث قيمة حقل البحث الرئيسي بقيمة حقل البحث في القسم الأول
            const mainSearchInput = document.getElementById('search');
            if (mainSearchInput) {
                mainSearchInput.value = this.value;
                console.log('Updated mainSearchInput value:', mainSearchInput.value);
                // نقوم بتشغيل وظيفة الفلترة
                filterServices();
            }
        });
    } else {
        console.log('heroSearchInput not found!');
    }

    if (heroLabFilter) {
        console.log('heroLabFilter found:', heroLabFilter);
        heroLabFilter.addEventListener("change", function() {
            console.log('heroLabFilter change event triggered');
            console.log('heroLabFilter value:', this.value);
            // نقوم بتحديث قيمة حقل اختيار المعمل الرئيسي بقيمة حقل اختيار المعمل في القسم الأول
            if (labFilter) {
                labFilter.value = this.value;
                console.log('Updated labFilter value:', labFilter.value);
                // نقوم بتشغيل وظيفة تغيير المعمل
                const event = new Event('change');
                labFilter.dispatchEvent(event);
            }
        });
    } else {
        console.log('heroLabFilter not found!');
    }

    if (heroSearchBtn) {
        console.log('heroSearchBtn found:', heroSearchBtn);
        heroSearchBtn.addEventListener("click", function() {
            console.log('heroSearchBtn click event triggered');
            // نقوم بتشغيل وظيفة الفلترة
            filterServices();
            // نقوم بالتمرير إلى قسم الخدمات
            const labServicesSection = document.querySelector('.lab-services-section');
            if (labServicesSection) {
                console.log('Scrolling to lab-services-section');
                labServicesSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.log('lab-services-section not found!');
            }
        });
    } else {
        console.log('heroSearchBtn not found!');
    }

    // إضافة مستمع الحدث لقائمة الترتيب
    const sortServices = document.getElementById('sortServices');
    if (sortServices) {
        sortServices.addEventListener("change", function() {
            const sortValue = this.value;
            const filteredServices = servicesData.filter(service => {
                const selectedLabId = labFilter.value;
                const selectedCategory = categoryFilter.value;
                const selectedAvailability = availabilityFilter.value;
                const maxPrice = priceRange ? priceRange.value : 2000;
                const searchQuery = document.getElementById('search') ? document.getElementById('search').value.toLowerCase() : '';
                const doctorFilter = document.getElementById('doctor') ? document.getElementById('doctor').value : 'all';

                const matchesLab = selectedLabId === "0" || service.labId === selectedLabId;
                const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
                const matchesAvailability = selectedAvailability === "all" || service.availability === selectedAvailability;
                const matchesPrice = service.discountedPrice <= maxPrice;
                const matchesSearch = searchQuery === '' ||
                                    service.name.toLowerCase().includes(searchQuery) ||
                                    service.description.toLowerCase().includes(searchQuery);
                const matchesDoctor = doctorFilter === 'all' ||
                                    (service.category === 'doctors' && service.name.includes(doctorFilter));

                return matchesLab && matchesCategory && matchesAvailability && matchesPrice && matchesSearch && matchesDoctor;
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
            if (labFilter) labFilter.value = "0";
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

    labServices.addEventListener("click", function(event) {
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
    labServices.addEventListener('click', function(event) {
        if (event.target.closest('.quick-view-btn')) {
            const serviceCard = event.target.closest('.service-card');
            const serviceName = serviceCard.querySelector('h3').textContent;
            const serviceDescription = serviceCard.querySelector('.service-description').textContent;
            const serviceImage = serviceCard.querySelector('img').src;
            const originalPrice = serviceCard.querySelector('.original-price').textContent;
            const discountedPrice = serviceCard.querySelector('.discounted-price').textContent;
            const serviceCategory = serviceCard.querySelector('.service-category') ?
                                    serviceCard.querySelector('.service-category').textContent : 'خدمة تحليل';

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
            'blood-tests': 'تحاليل الدم',
            'urine-tests': 'تحاليل البول',
            'ct-scan': 'أشعة سي تي سكان',
            'x-ray': 'أشعة إكس'
        };
        return categories[categoryKey] || 'خدمة تحليل';
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
        labServices.innerHTML = "";

        if (services.length === 0) {
            labServices.innerHTML = `
                <div class="no-services-message">
                    <i class="fas fa-search"></i>
                    <p>لا توجد خدمات تتناسب مع الفلاتر المحددة.</p>
                    <button class="reset-filters-btn">إعادة ضبط الفلاتر</button>
                </div>
            `;

            document.querySelector('.reset-filters-btn').addEventListener('click', function() {
                labFilter.value = "0";
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
                            <button class="book-now" data-service-id="${service.name}" data-lab-id="${service.labId}"><i class="fas fa-calendar-check"></i> حجز الآن</button>
                        </div>
                    </div>
                `;

                labServices.appendChild(serviceCard);
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
                const labId = this.getAttribute('data-lab-id');

                // البحث عن الخدمة المحددة
                const selectedService = servicesData.find(service =>
                    service.name === serviceId && service.labId === labId
                );

                if (selectedService) {
                    // الحصول على اسم المعمل
                    const lab = labs.find(lab => lab.id === labId);
                    const labName = lab ? lab.name : 'معمل تحاليل';

                    // إنشاء كائن بيانات الحجز
                    const bookingData = {
                        testName: selectedService.name,
                        labName: labName,
                        price: selectedService.discountedPrice,
                        originalPrice: selectedService.price,
                        date: new Date().toISOString().split('T')[0], // اليوم
                        time: '10:00', // وقت افتراضي
                        image: selectedService.image,
                        testDetails: selectedService.description,
                        address: lab ? lab.address : '',
                        phone: lab ? lab.phone : ''
                    };

                    // حفظ بيانات الحجز في التخزين المحلي
                    localStorage.setItem('newLabBooking', JSON.stringify(bookingData));

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
            'blood-tests': 'تحاليل الدم',
            'urine-tests': 'تحاليل البول',
            'ct-scan': 'أشعة سي تي سكان',
            'x-ray': 'أشعة إكس'
        };
        return categories[categoryKey] || 'خدمة تحليل';
    }
});
