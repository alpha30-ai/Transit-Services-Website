document.addEventListener("DOMContentLoaded", function() {
                const carMaintenanceFilter = document.getElementById("carMaintenanceFilter");
                const priceRange = document.getElementById("priceRange");
                const categoryFilter = document.getElementById("category");
                const availabilityFilter = document.getElementById("availability");
                const searchInput = document.getElementById("search");
                const carMaintenanceName = document.getElementById("carMaintenanceName");
                const carMaintenanceDescription = document.getElementById("carMaintenanceDescription");
                const carMaintenanceImg = document.getElementById("carMaintenanceImg");
                const carMaintenanceServices = document.getElementById("carMaintenanceServices");
                const defaultCarMaintenanceImage = "img/6863786378638763.jpg"; // صورة افتراضية
            
                const servicesData = [
                    // محل 1: أورجينال لفرش السيارات
                    {
                        name: "فرش السيارات",
                        description: "خدمة فرش السيارات بأفضل المواد.",
                        price: 250,
                        discountedPrice: 225,
                        category: "car-upholstery",
                        availability: "in-stock",
                        workshopId: "1",
                        image: "img/insidocar5-12-14 (9).jpg",
                        discount: "10%"
                    },
                    {
                        name: "تنظيف السيارة",
                        description: "خدمة تنظيف شاملة للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-upholstery",
                        availability: "in-stock",
                        workshopId: "1",
                        image: "img/insidocar5-12-14 (9).jpg",
                        discount: "10%"
                    },
                    {
                        name: "تلميع السيارة",
                        description: "خدمة تلميع للسيارة لإعطائها مظهرًا لامعًا.",
                        price: 200,
                        discountedPrice: 180,
                        category: "car-upholstery",
                        availability: "in-stock",
                        workshopId: "1",
                        image: "img/insidocar5-12-14 (9).jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الفرش",
                        description: "خدمة تغيير الفرش القديم بفرش جديد.",
                        price: 350,
                        discountedPrice: 315,
                        category: "car-upholstery",
                        availability: "in-stock",
                        workshopId: "1",
                        image: "img/insidocar5-12-14 (9).jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير السجاد",
                        description: "خدمة تغيير السجاد القديم بسجاد جديد.",
                        price: 200,
                        discountedPrice: 180,
                        category: "car-upholstery",
                        availability: "in-stock",
                        workshopId: "1",
                        image: "img/insidocar5-12-14 (9).jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الأثاث الداخلي",
                        description: "خدمة تغيير الأثاث الداخلي للسيارة.",
                        price: 400,
                        discountedPrice: 360,
                        category: "car-upholstery",
                        availability: "in-stock",
                        workshopId: "1",
                        image: "img/insidocar5-12-14 (9).jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الأقمشة",
                        description: "خدمة تغيير الأقمشة الداخلية للسيارة.",
                        price: 250,
                        discountedPrice: 225,
                        category: "car-upholstery",
                        availability: "in-stock",
                        workshopId: "1",
                        image: "img/insidocar5-12-14 (9).jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الجلود",
                        description: "خدمة تغيير الجلود الداخلية للسيارة.",
                        price: 300,
                        discountedPrice: 270,
                        category: "car-upholstery",
                        availability: "in-stock",
                        workshopId: "1",
                        image: "img/insidocar5-12-14 (9).jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير المقاعد",
                        description: "خدمة تغيير المقاعد القديمة بمقاعد جديدة.",
                        price: 500,
                        discountedPrice: 450,
                        category: "car-upholstery",
                        availability: "in-stock",
                        workshopId: "1",
                        image: "img/insidocar5-12-14 (9).jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الأبواب الداخلية",
                        description: "خدمة تغيير الأبواب الداخلية للسيارة.",
                        price: 200,
                        discountedPrice: 180,
                        category: "car-upholstery",
                        availability: "in-stock",
                        workshopId: "1",
                        image: "img/insidocar5-12-14 (9).jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير السقف الداخلي",
                        description: "خدمة تغيير السقف الداخلي للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-upholstery",
                        availability: "in-stock",
                        workshopId: "1",
                        image: "img/insidocar5-12-14 (9).jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الزجاج الداخلي",
                        description: "خدمة تغيير الزجاج الداخلي للسيارة.",
                        price: 100,
                        discountedPrice: 90,
                        category: "car-upholstery",
                        availability: "in-stock",
                        workshopId: "1",
                        image: "img/car-glass-change.jpg",
                        discount: "10%"
                    },
                    // محل 2: محمد راشد لقطع الغيار
                    {
                        name: "تغيير الزيت",
                        description: "خدمة تغيير الزيت للسيارة.",
                        price: 250,
                        discountedPrice: 225,
                        category: "car-parts",
                        availability: "in-stock",
                        workshopId: "2",
                        image: "img/oil-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الفلاتر",
                        description: "خدمة تغيير الفلاتر للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-parts",
                        availability: "in-stock",
                        workshopId: "2",
                        image: "img/filter-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير البطارية",
                        description: "خدمة تغيير البطارية للسيارة.",
                        price: 200,
                        discountedPrice: 180,
                        category: "car-parts",
                        availability: "in-stock",
                        workshopId: "2",
                        image: "img/battery-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الإطارات",
                        description: "خدمة تغيير الإطارات للسيارة.",
                        price: 350,
                        discountedPrice: 315,
                        category: "car-tires",
                        availability: "in-stock",
                        workshopId: "2",
                        image: "img/tire-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الفرامل",
                        description: "خدمة تغيير الفرامل للسيارة.",
                        price: 200,
                        discountedPrice: 180,
                        category: "car-parts",
                        availability: "in-stock",
                        workshopId: "2",
                        image: "img/brake-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الكفرات",
                        description: "خدمة تغيير الكفرات للسيارة.",
                        price: 400,
                        discountedPrice: 360,
                        category: "car-parts",
                        availability: "in-stock",
                        workshopId: "2",
                        image: "img/clutch-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير المكابح",
                        description: "خدمة تغيير المكابح للسيارة.",
                        price: 250,
                        discountedPrice: 225,
                        category: "car-parts",
                        availability: "in-stock",
                        workshopId: "2",
                        image: "img/brake-pad-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الصوت",
                        description: "خدمة تغيير نظام الصوت للسيارة.",
                        price: 300,
                        discountedPrice: 270,
                        category: "car-parts",
                        availability: "in-stock",
                        workshopId: "2",
                        image: "img/sound-system-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الأضواء",
                        description: "خدمة تغيير الأضواء للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-parts",
                        availability: "in-stock",
                        workshopId: "2",
                        image: "img/light-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير المرايا",
                        description: "خدمة تغيير المرايا للسيارة.",
                        price: 100,
                        discountedPrice: 90,
                        category: "car-parts",
                        availability: "in-stock",
                        workshopId: "2",
                        image: "img/mirror-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير العادم",
                        description: "خدمة تغيير العادم للسيارة.",
                        price: 200,
                        discountedPrice: 180,
                        category: "car-parts",
                        availability: "in-stock",
                        workshopId: "2",
                        image: "img/exhaust-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الرادياتور",
                        description: "خدمة تغيير الرادياتور للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-parts",
                        availability: "in-stock",
                        workshopId: "2",
                        image: "img/radiator-change.jpg",
                        discount: "10%"
                    },
                    // محل 3: الشافعي للإطارات
                    {
                        name: "تغيير الإطارات",
                        description: "خدمة تغيير الإطارات للسيارة.",
                        price: 350,
                        discountedPrice: 315,
                        category: "car-tires",
                        availability: "in-stock",
                        workshopId: "3",
                        image: "img/tire-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "توازن الإطارات",
                        description: "خدمة توازن الإطارات للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-tires",
                        availability: "in-stock",
                        workshopId: "3",
                        image: "img/tire-balancing.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الإطار الاحتياطي",
                        description: "خدمة تغيير الإطار الاحتياطي للسيارة.",
                        price: 200,
                        discountedPrice: 180,
                        category: "car-tires",
                        availability: "in-stock",
                        workshopId: "3",
                        image: "img/spare-tire-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الإطارات الأمامية",
                        description: "خدمة تغيير الإطارات الأمامية للسيارة.",
                        price: 300,
                        discountedPrice: 270,
                        category: "car-tires",
                        availability: "in-stock",
                        workshopId: "3",
                        image: "img/front-tire-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الإطارات الخلفية",
                        description: "خدمة تغيير الإطارات الخلفية للسيارة.",
                        price: 300,
                        discountedPrice: 270,
                        category: "car-tires",
                        availability: "in-stock",
                        workshopId: "3",
                        image: "img/rear-tire-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الإطارات الجانبية",
                        description: "خدمة تغيير الإطارات الجانبية للسيارة.",
                        price: 250,
                        discountedPrice: 225,
                        category: "car-tires",
                        availability: "in-stock",
                        workshopId: "3",
                        image: "img/side-tire-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الإطارات الداخلية",
                        description: "خدمة تغيير الإطارات الداخلية للسيارة.",
                        price: 200,
                        discountedPrice: 180,
                        category: "car-tires",
                        availability: "in-stock",
                        workshopId: "3",
                        image: "img/inner-tire-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الإطارات الخارجية",
                        description: "خدمة تغيير الإطارات الخارجية للسيارة.",
                        price: 200,
                        discountedPrice: 180,
                        category: "car-tires",
                        availability: "in-stock",
                        workshopId: "3",
                        image: "img/outer-tire-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الإطارات العلوية",
                        description: "خدمة تغيير الإطارات العلوية للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-tires",
                        availability: "in-stock",
                        workshopId: "3",
                        image: "img/top-tire-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الإطارات السفلية",
                        description: "خدمة تغيير الإطارات السفلية للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-tires",
                        availability: "in-stock",
                        workshopId: "3",
                        image: "img/bottom-tire-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الإطارات الوسطى",
                        description: "خدمة تغيير الإطارات الوسطى للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-tires",
                        availability: "in-stock",
                        workshopId: "3",
                        image: "img/middle-tire-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الإطارات الكبيرة",
                        description: "خدمة تغيير الإطارات الكبيرة للسيارة.",
                        price: 300,
                        discountedPrice: 270,
                        category: "car-tires",
                        availability: "in-stock",
                        workshopId: "3",
                        image: "img/large-tire-change.jpg",
                        discount: "10%"
                    },
                    // محل 4: العالمية لزجاج السيارات
                    {
                        name: "تغيير الزجاج الأمامي",
                        description: "خدمة تغيير الزجاج الأمامي للسيارة.",
                        price: 250,
                        discountedPrice: 225,
                        category: "car-glass",
                        availability: "in-stock",
                        workshopId: "4",
                        image: "img/windshield-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الزجاج الخلفي",
                        description: "خدمة تغيير الزجاج الخلفي للسيارة.",
                        price: 200,
                        discountedPrice: 180,
                        category: "car-glass",
                        availability: "in-stock",
                        workshopId: "4",
                        image: "img/rear-glass-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الزجاج الجانبي",
                        description: "خدمة تغيير الزجاج الجانبي للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-glass",
                        availability: "in-stock",
                        workshopId: "4",
                        image: "img/side-glass-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الزجاج العلوي",
                        description: "خدمة تغيير الزجاج العلوي للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-glass",
                        availability: "in-stock",
                        workshopId: "4",
                        image: "img/top-glass-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الزجاج السفلي",
                        description: "خدمة تغيير الزجاج السفلي للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-glass",
                        availability: "in-stock",
                        workshopId: "4",
                        image: "img/bottom-glass-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الزجاج الداخلي",
                        description: "خدمة تغيير الزجاج الداخلي للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-glass",
                        availability: "in-stock",
                        workshopId: "4",
                        image: "img/inner-glass-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الزجاج الخارجي",
                        description: "خدمة تغيير الزجاج الخارجي للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-glass",
                        availability: "in-stock",
                        workshopId: "4",
                        image: "img/outer-glass-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الزجاج الأمامي الداخلي",
                        description: "خدمة تغيير الزجاج الأمامي الداخلي للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-glass",
                        availability: "in-stock",
                        workshopId: "4",
                        image: "img/inner-front-glass-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الزجاج الأمامي الخارجي",
                        description: "خدمة تغيير الزجاج الأمامي الخارجي للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-glass",
                        availability: "in-stock",
                        workshopId: "4",
                        image: "img/outer-front-glass-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الزجاج الخلفي الداخلي",
                        description: "خدمة تغيير الزجاج الخلفي الداخلي للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-glass",
                        availability: "in-stock",
                        workshopId: "4",
                        image: "img/inner-rear-glass-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الزجاج الخلفي الخارجي",
                        description: "خدمة تغيير الزجاج الخلفي الخارجي للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-glass",
                        availability: "in-stock",
                        workshopId: "4",
                        image: "img/outer-rear-glass-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الزجاج الجانبي الداخلي",
                        description: "خدمة تغيير الزجاج الجانبي الداخلي للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-glass",
                        availability: "in-stock",
                        workshopId: "4",
                        image: "img/inner-side-glass-change.jpg",
                        discount: "10%"
                    },
                    {
                        name: "تغيير الزجاج الجانبي الخارجي",
                        description: "خدمة تغيير الزجاج الجانبي الخارجي للسيارة.",
                        price: 150,
                        discountedPrice: 135,
                        category: "car-glass",
                        availability: "in-stock",
                        workshopId: "4",
                        image: "img/outer-side-glass-change.jpg",
                        discount: "10%"
                    }
                ];
            
                // بيانات الورش
                const workshopsData = [
                    {
                        id: "1",
                        name: "أورجينال لفرش السيارات",
                        description: "ورشة متخصصة في فرش السيارات وتجديد الأثاث الداخلي.",
                        image: "img/IMG_20240124_161127.jpg"
                    },
                    {
                        id: "2",
                        name: "محمد راشد لقطع الغيار",
                        description: "ورشة متخصصة في توفير قطع غيار السيارات وخدمات الصيانة.",
                        image: "img/278348798_400029738310457_6383443979697600768_n.jpg"
                    },
                    {
                        id: "3",
                        name: "الشافعي للإطارات",
                        description: "ورشة متخصصة في تغيير الإطارات وتوازنها.",
                        image: "img/2022-05-25.jpg"
                    },
                    {
                        id: "4",
                        name: "الدولية لزجاج السيارات",
                        description: "ورشة متخصصة في تغيير الزجاج الأمامي والخلفي والجانبي.",
                        image: "img/WhatsApp Image 2025-02-14 at 16.01.36_4a6ea4b6.jpg"
                    }
                ];
            
                carMaintenanceFilter.addEventListener("change", function() {
                    const selectedWorkshopId = carMaintenanceFilter.value;
                    const selectedWorkshop = workshopsData.find(workshop => workshop.id === selectedWorkshopId);
            
                    if (selectedWorkshop) {
                        carMaintenanceName.textContent = selectedWorkshop.name;
                        carMaintenanceDescription.textContent = selectedWorkshop.description;
                        carMaintenanceImg.src = selectedWorkshop.image;
                        carMaintenanceImg.alt = selectedWorkshop.name;
                        filterServices();
                    } else {
                        carMaintenanceName.textContent = "اسم الورشة";
                        carMaintenanceDescription.textContent = "وصف الورشة يظهر هنا عند اختيار ورشة معينة.";
                        carMaintenanceImg.src = defaultCarMaintenanceImage;
                        carMaintenanceImg.alt = "الصورة الافتراضية";
                    }
                    filterServices();
                });
            
                function filterServices() {
                    const selectedWorkshopId = carMaintenanceFilter.value;
                    const selectedCategory = categoryFilter.value;
                    const selectedAvailability = availabilityFilter.value;
                    const maxPrice = priceRange.value;
            
                    const filteredServices = servicesData.filter(service => {
                        const matchesWorkshop = selectedWorkshopId === "0" || service.workshopId === selectedWorkshopId;
                        const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
                        const matchesAvailability = selectedAvailability === "all" || service.availability === selectedAvailability;
                        const matchesPrice = service.discountedPrice <= maxPrice;
            
                        return matchesWorkshop && matchesCategory && matchesAvailability && matchesPrice;
                    });
            
                    renderServices(filteredServices);
                }
            
                function renderServices(services) {
                    carMaintenanceServices.innerHTML = "";
            
                    if (services.length === 0) {
                        carMaintenanceServices.innerHTML = "<p>لا توجد خدمات تتناسب مع الفلاتر المحددة.</p>";
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
                                        <button class="add-to-favorite"><i class="fa-regular fa-heart"></i></button>
                                        <button class="add-to-cart"><i class="fa-solid fa-cart-plus"></i></button>
                                    </div>
                                </div>
                            `;
            
                            carMaintenanceServices.appendChild(serviceCard);
                        });
                    }
            
                    addEventListeners();
                }
            
                function addEventListeners() {
                    const cartButtons = document.querySelectorAll(".add-to-cart");
                    const favoriteButtons = document.querySelectorAll(".add-to-favorite");
                    const buyNowButtons = document.querySelectorAll(".buy-now");
                    const serviceImages = document.querySelectorAll(".service-image img");
            
                    cartButtons.forEach((button) => {
                        button.addEventListener("click", function () {
                            const serviceCard = this.closest(".service-card");
                            const service = {
                                image: serviceCard.querySelector(".service-image img").src,
                                name: serviceCard.querySelector("h3").textContent,
                                description: serviceCard.querySelector(".service-description").textContent,
                                originalPrice: serviceCard.querySelector(".original-price").textContent,
                                discountedPrice: serviceCard.querySelector(".discounted-price").textContent,
                                company: serviceCard.dataset.company, // تأكد من وجود هذا البيان في HTML
                                availability: serviceCard.dataset.availability, // تأكد من وجود هذا البيان في HTML
                                type: serviceCard.dataset.type, // تأكد من وجود هذا البيان في HTML
                                rating: serviceCard.dataset.rating // تأكد من وجود هذا البيان في HTML
                            };
            
                            let myCart = JSON.parse(localStorage.getItem("myCart")) || [];
                            const existingServiceIndex = myCart.findIndex(item => item.name === service.name);
            
                            if (existingServiceIndex !== -1) {
                                myCart[existingServiceIndex].quantity = (myCart[existingServiceIndex].quantity || 1) + 1;
                            } else {
                                service.quantity = 1;
                                myCart.push(service);
                            }
            
                            localStorage.setItem("myCart", JSON.stringify(myCart));
                            updateCartDisplay();
                            alert("تمت إضافة الخدمة إلى السلة!");
                        });
                    });
            
                    favoriteButtons.forEach((button) => {
                        button.addEventListener("click", function () {
                            const serviceCard = this.closest(".service-card");
                            const service = {
                                image: serviceCard.querySelector(".service-image img").src,
                                name: serviceCard.querySelector("h3").textContent,
                                description: serviceCard.querySelector(".service-description").textContent,
                                originalPrice: serviceCard.querySelector(".original-price").textContent,
                                discountedPrice: serviceCard.querySelector(".discounted-price").textContent,
                                company: serviceCard.dataset.company, // تأكد من وجود هذا البيان في HTML
                                availability: serviceCard.dataset.availability, // تأكد من وجود هذا البيان في HTML
                                type: serviceCard.dataset.type, // تأكد من وجود هذا البيان في HTML
                                rating: serviceCard.dataset.rating // تأكد من وجود هذا البيان في HTML
                            };
            
                            let myFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
                            const existingServiceIndex = myFavorites.findIndex(item => item.name === service.name);
            
                            if (existingServiceIndex !== -1) {
                                alert("الخدمة موجودة بالفعل في المفضلة!");
                            } else {
                                myFavorites.push(service);
                                localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
                                alert("تمت إضافة الخدمة إلى المفضلة!");
                            }
                        });
                    });
            
                    buyNowButtons.forEach((button) => {
                        button.addEventListener("click", function () {
                            const serviceCard = this.closest(".service-card");
                            const service = {
                                image: serviceCard.querySelector(".service-image img").src,
                                name: serviceCard.querySelector("h3").textContent,
                                description: serviceCard.querySelector(".service-description").textContent,
                                originalPrice: serviceCard.querySelector(".original-price").textContent,
                                discountedPrice: serviceCard.querySelector(".discounted-price").textContent,
                                company: serviceCard.dataset.company, // تأكد من وجود هذا البيان في HTML
                                availability: serviceCard.dataset.availability, // تأكد من وجود هذا البيان في HTML
                                type: serviceCard.dataset.type, // تأكد من وجود هذا البيان في HTML
                                rating: serviceCard.dataset.rating // تأكد من وجود هذا البيان في HTML
                            };
            
                            // Store the service in local storage or pass it through URL parameters
                            localStorage.setItem("quickBuyService", JSON.stringify(service));
            
                            // Redirect to the quick buy page
                            window.location.href = "quick-buy.html";
                        });
                    });
            
                    serviceImages.forEach((img) => {
                        img.addEventListener("click", function () {
                            const serviceCard = this.closest(".service-card");
                            const service = {
                                image: serviceCard.querySelector(".service-image img").src,
                                name: serviceCard.querySelector("h3").textContent,
                                description: serviceCard.querySelector(".service-description").textContent,
                                originalPrice: serviceCard.querySelector(".original-price") ? serviceCard.querySelector(".original-price").textContent : "N/A",
                                discountedPrice: serviceCard.querySelector(".discounted-price") ? serviceCard.querySelector(".discounted-price").textContent : "N/A",
                                company: serviceCard.dataset.company,
                                availability: serviceCard.dataset.availability,
                                type: serviceCard.dataset.type,
                                rating: serviceCard.dataset.rating
                            };
                    
                            console.log('Service Data to be Stored:', service); // تسجيل البيانات التي سيتم تخزينها
                    
                            localStorage.setItem("serviceDetails", JSON.stringify(service));
                            window.location.href = "order-details.html";
                        });
                    });
                    
                    
                }
            
                function updateCartDisplay() {
                    const cartCount = document.getElementById("cartCount");
                    if (cartCount) {
                        const myCart = JSON.parse(localStorage.getItem("myCart")) || [];
                        cartCount.textContent = myCart.length;
                    }
                }
            
                priceRange.addEventListener("input", function () {
                    filterServices();
                    document.getElementById('priceDisplay').textContent = 'السعر: ' + this.value;
                });
            
                categoryFilter.addEventListener("change", filterServices);
                availabilityFilter.addEventListener("change", filterServices);
            
                searchInput.addEventListener("input", function () {
                    const searchText = searchInput.value.trim().toLowerCase();
                    const serviceCards = document.querySelectorAll(".service-card");
            
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
            
                filterServices();
            });
            