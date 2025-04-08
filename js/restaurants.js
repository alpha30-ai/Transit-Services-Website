document.addEventListener("DOMContentLoaded", function() {
            const restaurantFilter = document.getElementById("restaurantFilter");
            const priceRange = document.getElementById("priceRange");
            const categoryFilter = document.getElementById("category");
            const availabilityFilter = document.getElementById("availability");
            const restaurantName = document.getElementById("restaurantName");
            const restaurantDescription = document.getElementById("restaurantDescription");
            const restaurantImg = document.getElementById("restaurantImg");
            const restaurantProducts = document.getElementById("restaurantProducts");
            const defaultRestaurantImage = "img/default-restaurant.jpg"; // صورة افتراضية
        
            const productsData = [
                // مطعم الماحي
                {
                    name: "ورق عنب",
                    description: "ورق عنب",
                    price: 30,
                    discountedPrice: 27,
                    category: "sandwiches",
                    availability: "in-stock",
                    restaurantId: "1",
                    image: "img/shawarma.jpg",
                    discount: "10%"
                },
                {
                    name: "كفتة كندوز",
                    description: "كفتة كندوز 1 ك",
                    price: 320,
                    discountedPrice: 300,
                    category: "burgers",
                    availability: "in-stock",
                    restaurantId: "1",
                    image: "img/burger.jpg",
                    discount: "5%"
                },
                {
                    name: "نصف فرخة مشوية",
                    description: "نصف فرخة مشوية على الفحم",
                    price: 120,
                    discountedPrice: 120,
                    category: "pizza",
                    availability: "in-stock",
                    restaurantId: "1",
                    image: "img/pizza.jpg",
                    discount: "0%"
                },
                {
                    name: "صينية الماحي",
                    description: "1/4 كباب ضانى، 1/2 كفتة كندوز، 1/4 كبد وكلاوي، 1/4 شيش طاووق، 1/4 ممبار كندوز، 1/4 طرب كندوز وفرخة",
                    price: 900,
                    discountedPrice: 880,
                    category: "sandwiches",
                    availability: "in-stock",
                    restaurantId: "1",
                    image: "img/chicken-sandwich.jpg",
                    discount: "10%"
                },
                {
                    name: "سلطة خضراء",
                    description: "سلطة خضراء متنوعة.",
                    price: 20,
                    discountedPrice: 18,
                    category: "salads",
                    availability: "in-stock",
                    restaurantId: "1",
                    image: "img/green-salad.jpg",
                    discount: "10%"
                },
                {
                    name: "عصير فراولة",
                    description: "عصير فراولة طازج.",
                    price: 15,
                    discountedPrice: 13.5,
                    category: "drinks",
                    availability: "in-stock",
                    restaurantId: "1",
                    image: "img/strawberry-juice.jpg",
                    discount: "10%"
                },
                // مطعم كشري الخديوي
                {
                    name: "كشري",
                    description: "كشري مصري تقليدي.",
                    price: 20,
                    discountedPrice: 18,
                    category: "main-dishes",
                    availability: "in-stock",
                    restaurantId: "2",
                    image: "img/koshary.jpg",
                    discount: "10%"
                },
                {
                    name: "ملوخية",
                    description: "ملوخية مع دجاج.",
                    price: 35,
                    discountedPrice: 31.5,
                    category: "main-dishes",
                    availability: "in-stock",
                    restaurantId: "2",
                    image: "img/molokhia.jpg",
                    discount: "10%"
                },
                {
                    name: "فتة",
                    description: "فتة مع لحم.",
                    price: 45,
                    discountedPrice: 40.5,
                    category: "main-dishes",
                    availability: "in-stock",
                    restaurantId: "2",
                    image: "img/fatta.jpg",
                    discount: "10%"
                },
                {
                    name: "كفتة",
                    description: "كفتة مشوية.",
                    price: 50,
                    discountedPrice: 45,
                    category: "main-dishes",
                    availability: "in-stock",
                    restaurantId: "2",
                    image: "img/kofta.jpg",
                    discount: "10%"
                },
                {
                    name: "سلطة طحينة",
                    description: "سلطة طحينة مع خضروات.",
                    price: 15,
                    discountedPrice: 13.5,
                    category: "salads",
                    availability: "in-stock",
                    restaurantId: "2",
                    image: "img/tahini-salad.jpg",
                    discount: "10%"
                },
                {
                    name: "عصير ليمون",
                    description: "عصير ليمون طازج.",
                    price: 10,
                    discountedPrice: 9,
                    category: "drinks",
                    availability: "in-stock",
                    restaurantId: "2",
                    image: "img/lemon-juice.jpg",
                    discount: "10%"
                },
                // مطعم الفلافل المصري
                {
                    name: "فلافل",
                    description: "فلافل مع سلطة.",
                    price: 15,
                    discountedPrice: 13.5,
                    category: "sandwiches",
                    availability: "in-stock",
                    restaurantId: "3",
                    image: "img/falafel.jpg",
                    discount: "10%"
                },
                {
                    name: "شوربة عدس",
                    description: "شوربة عدس ساخنة.",
                    price: 10,
                    discountedPrice: 9,
                    category: "soups",
                    availability: "in-stock",
                    restaurantId: "3",
                    image: "img/lentil-soup.jpg",
                    discount: "10%"
                },
                {
                    name: "ساندويتش فلافل",
                    description: "ساندويتش فلافل مع خضروات.",
                    price: 20,
                    discountedPrice: 18,
                    category: "sandwiches",
                    availability: "in-stock",
                    restaurantId: "3",
                    image: "img/falafel-sandwich.jpg",
                    discount: "10%"
                },
                {
                    name: "سلطة بابا غنوج",
                    description: "سلطة بابا غنوج مع خبز.",
                    price: 25,
                    discountedPrice: 22.5,
                    category: "salads",
                    availability: "in-stock",
                    restaurantId: "3",
                    image: "img/baba-ganoush.jpg",
                    discount: "10%"
                },
                {
                    name: "عصير جزر",
                    description: "عصير جزر طازج.",
                    price: 12,
                    discountedPrice: 10.8,
                    category: "drinks",
                    availability: "in-stock",
                    restaurantId: "3",
                    image: "img/carrot-juice.jpg",
                    discount: "10%"
                },
                {
                    name: "كبدة",
                    description: "كبدة مشوية.",
                    price: 30,
                    discountedPrice: 27,
                    category: "main-dishes",
                    availability: "in-stock",
                    restaurantId: "3",
                    image: "img/kebda.jpg",
                    discount: "10%"
                },
                // مطعم دلعين السوري
                {
                    name: "ساندوتش شاورما دجاج سورى",
                    description: "شاورما سوري تقليدي.",
                    price: 80,
                    discountedPrice: 75,
                    category: "sandwiches",
                    availability: "in-stock",
                    restaurantId: "4",
                    image: "img/syrian-shawarma.jpg",
                    discount: "10%"
                },
                {
                    name: "ساندوتش شاورما دجاج دبل",
                    description: "دجاج دبل",
                    price: 100,
                    discountedPrice: 90,
                    category: "main-dishes",
                    availability: "in-stock",
                    restaurantId: "4",
                    image: "img/syrian-fatta.jpg",
                    discount: "10%"
                },
                {
                    name: "ساندوتش شاورما دجاج سياحى",
                    description: "ساندوتش شاورما دجاج",
                    price: 85,
                    discountedPrice: 80,
                    category: "main-dishes",
                    availability: "in-stock",
                    restaurantId: "4",
                    image: "img/aleppo-kebab.jpg",
                    discount: "10%"
                },
                {
                    name: "ساندوتش شاورما دجاج كيزر",
                    description: "ساندوتش شاورما",
                    price: 60,
                    discountedPrice: 54,
                    category: "main-dishes",
                    availability: "in-stock",
                    restaurantId: "4",
                    image: "img/mansaf.jpg",
                    discount: "10%"
                },
                {
                    name: "ساندوتش شاورما لحم دبل",
                    description: "ساندوتش شاورما لحم",
                    price: 120,
                    discountedPrice: 115,
                    category: "salads",
                    availability: "in-stock",
                    restaurantId: "4",
                    image: "img/fattoush-salad.jpg",
                    discount: "10%"
                },
                {
                    name: "ساندوتش شاورما لحم سورى",
                    description: "ساندوتش شاورما لحم",
                    price: 100,
                    discountedPrice: 85,
                    category: "drinks",
                    availability: "in-stock",
                    restaurantId: "4",
                    image: "img/pomegranate-juice.jpg",
                    discount: "10%"
                }
            ];
        
            // بيانات المطاعم
            const restaurantsData = [
                {
                    id: "1",
                    name: "مطعم الماحي",
                    description: "مطعم يقدم مجموعة متنوعة من الوجبات السريعة والبرجر.",
                    image: "img/restaurant1.jpg"
                },
                {
                    id: "2",
                    name: "مطعم كشري الخديوي",
                    description: "مطعم متخصص في الأكلات المصرية التقليدية.",
                    image: "img/restaurant2.jpg"
                },
                {
                    id: "3",
                    name: "مطعم الفلافل المصري",
                    description: "مطعم يقدم أشهى أنواع الفلافل والأطباق النباتية.",
                    image: "img/restaurant3.jpg"
                },
                {
                    id: "4",
                    name: "مطعم دلعين السوري",
                    description: "مطعم يقدم المأكولات السورية التقليدية.",
                    image: "img/restaurant4.jpg"
                }
            ];
        
            restaurantFilter.addEventListener("change", function () {
                const selectedRestaurantId = restaurantFilter.value;
                const selectedRestaurant = restaurantsData.find(restaurant => restaurant.id === selectedRestaurantId);
        
                if (selectedRestaurant) {
                    restaurantName.textContent = selectedRestaurant.name;
                    restaurantDescription.textContent = selectedRestaurant.description;
                    restaurantImg.src = selectedRestaurant.image;
                    restaurantImg.alt = selectedRestaurant.name;
                    filterProducts();  // إعادة تصفية المنتجات عند تغيير المطعم
                } else {
                    restaurantName.textContent = "اسم المطعم";
                    restaurantDescription.textContent = "وصف المطعم يظهر هنا عند اختيار مطعم معين.";
                    restaurantImg.src = defaultRestaurantImage;
                    restaurantImg.alt = "الصورة الافتراضية";
                }
            });
        
            function filterProducts() {
                const selectedRestaurantId = restaurantFilter.value;
                const selectedCategory = categoryFilter.value;
                const selectedAvailability = availabilityFilter.value;
                const maxPrice = priceRange.value;
        
                const filteredProducts = productsData.filter(product => {
                    const matchesRestaurant = selectedRestaurantId === "0" || product.restaurantId === selectedRestaurantId;
                    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
                    const matchesAvailability = selectedAvailability === "all" || product.availability === selectedAvailability;
                    const matchesPrice = product.discountedPrice <= maxPrice;
        
                    return matchesRestaurant && matchesCategory && matchesAvailability && matchesPrice;
                });
        
                renderProducts(filteredProducts);
            }
        
            function renderProducts(products) {
                restaurantProducts.innerHTML = "";  // مسح المنتجات السابقة
        
                if (products.length === 0) {
                    restaurantProducts.innerHTML = "<p>لا توجد منتجات تتناسب مع الفلاتر المحددة.</p>";
                } else {
                    products.forEach(product => {
                        const productCard = document.createElement("div");
                        productCard.classList.add("product-card");
        
                        productCard.innerHTML = `
                            <div class="product-image">
                                <img src="${product.image}" alt="${product.name}">
                                ${product.discount ? `<span class="discount">خصم ${product.discount}</span>` : ""}
                            </div>
                            <div class="product-info">
                                <h3>${product.name}</h3>
                                <p class="product-description">${product.description}</p>
                                <div class="price">
                                    <span class="original-price">${product.price} جنيه</span>
                                    <span class="discounted-price">${product.discountedPrice} جنيه</span>
                                </div>
                                <div class="product-actions">
                                    <button class="add-to-favorite"><i class="fa-regular fa-heart"></i></button>
                                    <button class="add-to-cart"><i class="fa-solid fa-cart-plus"></i></button>
                                </div>
                            </div>
                        `;
        
                        restaurantProducts.appendChild(productCard);
                    });
                }
        
                addEventListeners(); // إضافة مستمعي الأحداث لأزرار السلة والمفضلة
            }
        
            function addEventListeners() {
                const cartButtons = document.querySelectorAll(".add-to-cart");
                const favoriteButtons = document.querySelectorAll(".add-to-favorite");
                const buyNowButtons = document.querySelectorAll(".buy-now");
                const productImages = document.querySelectorAll(".product-image img");
        
                cartButtons.forEach((button) => {
                    button.addEventListener("click", function () {
                        const productCard = this.closest(".product-card");
                        const product = {
                            image: productCard.querySelector(".product-image img").src,
                            name: productCard.querySelector("h3").textContent,
                            description: productCard.querySelector(".product-description").textContent,
                            originalPrice: productCard.querySelector(".original-price").textContent,
                            discountedPrice: productCard.querySelector(".discounted-price").textContent,
                            company: productCard.dataset.company, // تأكد من وجود هذا البيان في HTML
                            availability: productCard.dataset.availability, // تأكد من وجود هذا البيان في HTML
                            type: productCard.dataset.type, // تأكد من وجود هذا البيان في HTML
                            rating: productCard.dataset.rating // تأكد من وجود هذا البيان في HTML
                        };
        
                        let myCart = JSON.parse(localStorage.getItem("myCart")) || [];
                        const existingProductIndex = myCart.findIndex(item => item.name === product.name);
        
                        if (existingProductIndex !== -1) {
                            myCart[existingProductIndex].quantity = (myCart[existingProductIndex].quantity || 1) + 1;
                        } else {
                            product.quantity = 1;
                            myCart.push(product);
                        }
        
                        localStorage.setItem("myCart", JSON.stringify(myCart));
                        updateCartDisplay();
                        alert("تمت إضافة المنتج إلى السلة!");
                    });
                });
        
                favoriteButtons.forEach((button) => {
                    button.addEventListener("click", function () {
                        const productCard = this.closest(".product-card");
                        const product = {
                            image: productCard.querySelector(".product-image img").src,
                            name: productCard.querySelector("h3").textContent,
                            description: productCard.querySelector(".product-description").textContent,
                            originalPrice: productCard.querySelector(".original-price").textContent,
                            discountedPrice: productCard.querySelector(".discounted-price").textContent,
                            company: productCard.dataset.company, // تأكد من وجود هذا البيان في HTML
                            availability: productCard.dataset.availability, // تأكد من وجود هذا البيان في HTML
                            type: productCard.dataset.type, // تأكد من وجود هذا البيان في HTML
                            rating: productCard.dataset.rating // تأكد من وجود هذا البيان في HTML
                        };
        
                        let myFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
                        const existingProductIndex = myFavorites.findIndex(item => item.name === product.name);
        
                        if (existingProductIndex !== -1) {
                            alert("المنتج موجود بالفعل في المفضلة!");
                        } else {
                            myFavorites.push(product);
                            localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
                            alert("تمت إضافة المنتج إلى المفضلة!");
                        }
                    });
                });
        
                buyNowButtons.forEach((button) => {
                    button.addEventListener("click", function () {
                        const productCard = this.closest(".product-card");
                        const product = {
                            image: productCard.querySelector(".product-image img").src,
                            name: productCard.querySelector("h3").textContent,
                            description: productCard.querySelector(".product-description").textContent,
                            originalPrice: productCard.querySelector(".original-price").textContent,
                            discountedPrice: productCard.querySelector(".discounted-price").textContent,
                            company: productCard.dataset.company, // تأكد من وجود هذا البيان في HTML
                            availability: productCard.dataset.availability, // تأكد من وجود هذا البيان في HTML
                            type: productCard.dataset.type, // تأكد من وجود هذا البيان في HTML
                            rating: productCard.dataset.rating // تأكد من وجود هذا البيان في HTML
                        };
        
                        // Store the product in local storage or pass it through URL parameters
                        localStorage.setItem("quickBuyProduct", JSON.stringify(product));
        
                        // Redirect to the quick buy page
                        window.location.href = "quick-buy.html";
                    });
                });
        
                productImages.forEach((img) => {
                    img.addEventListener("click", function () {
                        const productCard = this.closest(".product-card");
                        const product = {
                            image: productCard.querySelector(".product-image img").src,
                            name: productCard.querySelector("h3").textContent,
                            description: productCard.querySelector(".product-description").textContent,
                            originalPrice: productCard.querySelector(".original-price").textContent,
                            discountedPrice: productCard.querySelector(".discounted-price").textContent,
                            company: productCard.dataset.company, // تأكد من وجود هذا البيان في HTML
                            availability: productCard.dataset.availability, // تأكد من وجود هذا البيان في HTML
                            type: productCard.dataset.type, // تأكد من وجود هذا البيان في HTML
                            rating: productCard.dataset.rating // تأكد من وجود هذا البيان في HTML
                        };
        
                        // Store the product in local storage
                        localStorage.setItem("productDetails", JSON.stringify(product));
        
                        // Redirect to the product details page
                        window.location.href = "product_details.html";
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
                filterProducts();
                document.getElementById('priceDisplay').textContent = 'السعر: ' + this.value;
            });
        
            categoryFilter.addEventListener("change", filterProducts);
            availabilityFilter.addEventListener("change", filterProducts);
        
            const searchInput = document.getElementById("search");
            searchInput.addEventListener("input", function () {
                const searchText = searchInput.value.trim().toLowerCase();
                const productCards = document.querySelectorAll(".product-card");
        
                productCards.forEach((card) => {
                    const productName = card.querySelector("h3")?.textContent.trim().toLowerCase() || "";
                    const productDescription = card.querySelector("p")?.textContent.trim().toLowerCase() || "";
        
                    if (productName.includes(searchText) || productDescription.includes(searchText)) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        
            filterProducts();
        });
        
        document.getElementById('priceRange').addEventListener('input', function() {
            var priceValue = this.value;
            document.getElementById('priceDisplay').textContent = 'السعر: ' + priceValue;
        });
        