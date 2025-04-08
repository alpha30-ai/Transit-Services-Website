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
            image: "img/emergency.jpg",
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
            image: "img/surgery.jpg",
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
            image: "img/pediatrics.jpg",
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
            image: "img/icu.jpg",
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
            image: "img/cosmetic-surgery.jpg",
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
            image: "img/lab-tests.jpg",
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
            image: "img/emergency.jpg",
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
            image: "img/surgery.jpg",
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
            image: "img/pediatrics.jpg",
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
            image: "img/icu.jpg",
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
            image: "img/cosmetic-surgery.jpg",
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
            image: "img/lab-tests.jpg",
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
        const maxPrice = priceRange.value;

        const filteredServices = servicesData.filter(service => {
            const matchesHospital = selectedHospitalId === "0" || service.hospitalId === selectedHospitalId;
            const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
            const matchesAvailability = selectedAvailability === "all" || service.availability === selectedAvailability;
            const matchesPrice = service.discountedPrice <= maxPrice;

            return matchesHospital && matchesCategory && matchesAvailability && matchesPrice;
        });

        renderServices(filteredServices);
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
                    </div>
                    <div class="service-info">
                        <h3>${service.name}</h3>
                        <p class="service-description">${service.description}</p>
                        <div class="price">
                            <span class="original-price">${service.price} جنيه</span>
                            <span class="discounted-price">${service.discountedPrice} جنيه</span>
                        </div>
                        <div class="service-actions">
                            <button class="book-now" onclick="confirmBooking('${service.name}')"><i class="fa-solid fa-calendar-check"></i> حجز الآن</button>
                        </div>
                    </div>
                `;

                hospitalServices.appendChild(serviceCard);
            });
        }
    }

    priceRange.addEventListener("input", filterServices);
    categoryFilter.addEventListener("change", filterServices);
    availabilityFilter.addEventListener("change", filterServices);

    filterServices();

    hospitalServices.addEventListener("click", function(event) {
        if (event.target.classList.contains("book-now")) {
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

            alert("تم إضافة حجز الخدمة إلى صفحة الحجوزات. قم بالزيارة الآن من أجل إتمام عملية الحجز.");

            window.location.href = "bookings-and-follow-up.html";
        }
    });

    document.getElementById('priceRange').addEventListener('input', function() {
        const priceValue = this.value;
        document.getElementById('priceDisplay').textContent = 'السعر: ' + priceValue;
    });
});
