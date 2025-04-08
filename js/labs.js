document.addEventListener("DOMContentLoaded", function() {
    const labFilter = document.getElementById("labFilter");
    const priceRange = document.getElementById("priceRange");
    const categoryFilter = document.getElementById("category");
    const availabilityFilter = document.getElementById("availability");
    const labName = document.getElementById("labName");
    const labDescription = document.getElementById("labDescription");
    const labImg = document.getElementById("labImg");
    const labServices = document.getElementById("labServices");
    const defaultLabImage = "img/lab1.jpg";

    const servicesData = [
        // معمل البرج
        {
            name: "تحليل السكر",
            description: "تحليل لمستوى السكر في الدم.",
            price: 50,
            discountedPrice: 45,
            category: "blood-tests",
            availability: "in-stock",
            labId: "1",
            image: "img/blood-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الكوليسترول",
            description: "تحليل لمستوى الكوليسترول في الدم.",
            price: 60,
            discountedPrice: 54,
            category: "blood-tests",
            availability: "in-stock",
            labId: "1",
            image: "img/cholesterol-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الهرمونات",
            description: "تحليل لمستوى الهرمونات في الدم.",
            price: 70,
            discountedPrice: 63,
            category: "hormone-tests",
            availability: "in-stock",
            labId: "1",
            image: "img/hormone-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الكبد",
            description: "تحليل لوظائف الكبد.",
            price: 80,
            discountedPrice: 72,
            category: "general-tests",
            availability: "in-stock",
            labId: "1",
            image: "img/liver-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الكلى",
            description: "تحليل لوظائف الكلى.",
            price: 90,
            discountedPrice: 81,
            category: "general-tests",
            availability: "in-stock",
            labId: "1",
            image: "img/kidney-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الدم الشامل",
            description: "تحليل شامل للدم.",
            price: 100,
            discountedPrice: 90,
            category: "blood-tests",
            availability: "in-stock",
            labId: "1",
            image: "img/complete-blood-test.jpg",
            discount: "10%"
        },
        // معمل الفا
        {
            name: "تحليل السكر",
            description: "تحليل لمستوى السكر في الدم.",
            price: 50,
            discountedPrice: 45,
            category: "blood-tests",
            availability: "in-stock",
            labId: "2",
            image: "img/blood-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الكوليسترول",
            description: "تحليل لمستوى الكوليسترول في الدم.",
            price: 60,
            discountedPrice: 54,
            category: "blood-tests",
            availability: "in-stock",
            labId: "2",
            image: "img/cholesterol-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الهرمونات",
            description: "تحليل لمستوى الهرمونات في الدم.",
            price: 70,
            discountedPrice: 63,
            category: "hormone-tests",
            availability: "in-stock",
            labId: "2",
            image: "img/hormone-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الكبد",
            description: "تحليل لوظائف الكبد.",
            price: 80,
            discountedPrice: 72,
            category: "general-tests",
            availability: "in-stock",
            labId: "2",
            image: "img/liver-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الكلى",
            description: "تحليل لوظائف الكلى.",
            price: 90,
            discountedPrice: 81,
            category: "general-tests",
            availability: "in-stock",
            labId: "2",
            image: "img/kidney-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الدم الشامل",
            description: "تحليل شامل للدم.",
            price: 100,
            discountedPrice: 90,
            category: "blood-tests",
            availability: "in-stock",
            labId: "2",
            image: "img/complete-blood-test.jpg",
            discount: "10%"
        },
        // معمل سلامتك
        {
            name: "تحليل السكر",
            description: "تحليل لمستوى السكر في الدم.",
            price: 50,
            discountedPrice: 45,
            category: "blood-tests",
            availability: "in-stock",
            labId: "3",
            image: "img/blood-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الكوليسترول",
            description: "تحليل لمستوى الكوليسترول في الدم.",
            price: 60,
            discountedPrice: 54,
            category: "blood-tests",
            availability: "in-stock",
            labId: "3",
            image: "img/cholesterol-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الهرمونات",
            description: "تحليل لمستوى الهرمونات في الدم.",
            price: 70,
            discountedPrice: 63,
            category: "hormone-tests",
            availability: "in-stock",
            labId: "3",
            image: "img/hormone-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الكبد",
            description: "تحليل لوظائف الكبد.",
            price: 80,
            discountedPrice: 72,
            category: "general-tests",
            availability: "in-stock",
            labId: "3",
            image: "img/liver-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الكلى",
            description: "تحليل لوظائف الكلى.",
            price: 90,
            discountedPrice: 81,
            category: "general-tests",
            availability: "in-stock",
            labId: "3",
            image: "img/kidney-test.jpg",
            discount: "10%"
        },
        {
            name: "تحليل الدم الشامل",
            description: "تحليل شامل للدم.",
            price: 100,
            discountedPrice: 90,
            category: "blood-tests",
            availability: "in-stock",
            labId: "3",
            image: "img/complete-blood-test.jpg",
            discount: "10%"
        }
    ];

    const labsData = [
        {
            id: "1",
            name: "معمل البرج",
            description: "معمل متكامل يقدم تحاليل الدم والهرمونات والكبد والكلى.",
            image: "img/lab1.jpg"
        },
        {
            id: "2",
            name: "معمل الفا",
            description: "معمل متخصص في تحاليل الدم والهرمونات والكبد والكلى.",
            image: "img/lab2.jpg"
        },
        {
            id: "3",
            name: "معمل سلامتك",
            description: "معمل متكامل يقدم تحاليل الدم والهرمونات والكبد والكلى.",
            image: "img/lab3.jpg"
        }
    ];
    labFilter.addEventListener("change", function() {
        const selectedLabId = labFilter.value;
        const selectedLab = labsData.find(lab => lab.id === selectedLabId);

        if (selectedLab) {
            labName.textContent = selectedLab.name;
            labDescription.textContent = selectedLab.description;
            labImg.src = selectedLab.image;
            labImg.alt = selectedLab.name;
        } else {
            labName.textContent = "اسم المعمل";
            labDescription.textContent = "وصف المعمل يظهر هنا عند اختيار معمل معين.";
            labImg.src = defaultLabImage;
            labImg.alt = "الصورة الافتراضية";
        }
        filterServices();
    });

    function filterServices() {
        const selectedLabId = labFilter.value;
        const selectedCategory = categoryFilter.value;
        const selectedAvailability = availabilityFilter.value;
        const maxPrice = priceRange.value;

        const filteredServices = servicesData.filter(service => {
            const matchesLab = selectedLabId === "0" || service.labId === selectedLabId;
            const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
            const matchesAvailability = selectedAvailability === "all" || service.availability === selectedAvailability;
            const matchesPrice = service.discountedPrice <= maxPrice;

            return matchesLab && matchesCategory && matchesAvailability && matchesPrice;
        });

        renderServices(filteredServices);
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
                    </div>
                    <div class="service-info">
                        <h3>${service.name}</h3>
                        <p class="service-description">${service.description}</p>
                        <div class="price">
                            <span class="original-price">${service.price} جنيه</span>
                            <span class="discounted-price">${service.discountedPrice} جنيه</span>
                        </div>
                        <div class="service-actions">
                            <button class="book-now"><i class="fa-solid fa-calendar-check"></i> حجز الآن</button>
                        </div>
                    </div>
                `;

                labServices.appendChild(serviceCard);
            });
        }
    }

    priceRange.addEventListener("input", filterServices);
    categoryFilter.addEventListener("change", filterServices);
    availabilityFilter.addEventListener("change", filterServices);

    filterServices();

    labServices.addEventListener("click", function(event) {
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

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const serviceCards = document.querySelectorAll(".service-card");

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.trim().toLowerCase();

        serviceCards.forEach((card) => {
            const serviceName = card.querySelector("h3")?.textContent.trim().toLowerCase() || "";
            const serviceDescription = card.querySelector("p")?.textContent.trim().toLowerCase() || "";

            if (serviceName.includes(searchText) || serviceDescription.includes(searchText)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
