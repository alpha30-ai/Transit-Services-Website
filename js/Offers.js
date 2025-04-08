document.addEventListener("DOMContentLoaded", function() {
  const categoryFilter = document.getElementById("categoryFilter");
  const priceRange = document.getElementById("priceRange");
  const availabilityFilter = document.getElementById("availability");
  const searchInput = document.getElementById("search");
  const productProducts = document.getElementById("productProducts");
  const defaultProductImage = "img/default.jpg"; // Default image

  const productsData = [
    // Car Accessories (فرش سيارات)
    {
        name: "فرش سيارات عالي الجودة",
        description: "فرش سيارات عالي الجودة.",
        price: 150,
        discountedPrice: 135,
        category: "car-accessories",
        availability: "in-stock",
        image: "img/687374866.jpg",
        discount: "10%"
    },
    {
        name: "فرش سيارات قابلة للتعديل",
        description: "فرش سيارات يمكن تعديل ارتفاعها.",
        price: 180,
        discountedPrice: 162,
        category: "car-accessories",
        availability: "in-stock",
        image: "img/687374866.jpg",
        discount: "10%"
    },
    {
        name: "فرش سيارات مضادة للتسرب",
        description: "فرش سيارات تمنع تسرب المياه.",
        price: 200,
        discountedPrice: 180,
        category: "car-accessories",
        availability: "in-stock",
        image: "img/687374866.jpg",
        discount: "10%"
    },
    {
        name: "فرش سيارات للطقس البارد",
        description: "فرش سيارات مصممة للطقس البارد.",
        price: 220,
        discountedPrice: 198,
        category: "car-accessories",
        availability: "in-stock",
        image: "img/687374866.jpg",
        discount: "10%"
    },
    {
        name: "فرش سيارات للطقس الحار",
        description: "فرش سيارات مصممة للطقس الحار.",
        price: 210,
        discountedPrice: 189,
        category: "car-accessories",
        availability: "in-stock",
        image: "img/687374866.jpg",
        discount: "10%"
    },
    {
        name: "فرش سيارات مضادة للغبار",
        description: "فرش سيارات تمنع تراكم الغبار.",
        price: 190,
        discountedPrice: 171,
        category: "car-accessories",
        availability: "in-stock",
        image: "img/687374866.jpg",
        discount: "10%"
    },
    // Car Parts (قطع غيار سيارات)
    {
        name: "فلاتر زيت",
        description: "فلاتر زيت لجميع أنواع السيارات.",
        price: 100,
        discountedPrice: 90,
        category: "car-parts",
        availability: "in-stock",
        image: "img/61971183865788.jpg",
        discount: "10%"
    },
    {
        name: "فلاتر هواء",
        description: "فلاتر هواء لجميع أنواع السيارات.",
        price: 80,
        discountedPrice: 72,
        category: "car-parts",
        availability: "in-stock",
        image: "img/61971183865788.jpg",
        discount: "10%"
    },
    {
        name: "فلاتر وقود",
        description: "فلاتر وقود لجميع أنواع السيارات.",
        price: 90,
        discountedPrice: 81,
        category: "car-parts",
        availability: "in-stock",
        image: "img/61971183865788.jpg",
        discount: "10%"
    },
    {
        name: "بطاريات سيارات",
        description: "بطاريات سيارات عالية الجودة.",
        price: 300,
        discountedPrice: 270,
        category: "car-parts",
        availability: "in-stock",
        image: "img/61971183865788.jpg",
        discount: "10%"
    },
    {
        name: "كابلات بطارية",
        description: "كابلات بطارية للسيارات.",
        price: 50,
        discountedPrice: 45,
        category: "car-parts",
        availability: "in-stock",
        image: "img/61971183865788.jpg",
        discount: "10%"
    },
    {
        name: "مكابح",
        description: "مكابح لجميع أنواع السيارات.",
        price: 200,
        discountedPrice: 180,
        category: "car-parts",
        availability: "in-stock",
        image: "img/61971183865788.jpg",
        discount: "10%"
    },
    // Car Glass (زجاج سيارات)
    {
        name: "زجاج أمامي مضاد للانعكاس",
        description: "زجاج أمامي يقلل من الوهج ويحسن الرؤية.",
        price: 450,
        discountedPrice: 405,
        category: "car-glass",
        availability: "in-stock",
        image: "img/pngwing.com-1-e1662888438621-optimized.jpg",
        discount: "10%"
    },
    {
        name: "زجاج جانبي مقوى",
        description: "زجاج جانبي يوفر حماية إضافية.",
        price: 300,
        discountedPrice: 270,
        category: "car-glass",
        availability: "in-stock",
        image: "img/pngwing.com-1-e1662888438621-optimized.jpg",
        discount: "10%"
    },
    {
        name: "زجاج خلفي مدفأ",
        description: "زجاج خلفي يتميز بخاصية التدفئة لإزالة الضباب.",
        price: 380,
        discountedPrice: 342,
        category: "car-glass",
        availability: "in-stock",
        image: "img/pngwing.com-1-e1662888438621-optimized.jpg",
        discount: "10%"
    },
    {
        name: "زجاج مكيف",
        description: "زجاج مكيف للسيارات.",
        price: 150,
        discountedPrice: 135,
        category: "car-glass",
        availability: "in-stock",
        image: "img/pngwing.com-1-e1662888438621-optimized.jpg",
        discount: "10%"
    },
    {
        name: "زجاج مائي",
        description: "زجاج مائي للسيارات.",
        price: 200,
        discountedPrice: 180,
        category: "car-glass",
        availability: "in-stock",
        image: "img/pngwing.com-1-e1662888438621-optimized.jpg",
        discount: "10%"
    },
    {
        name: "زجاج مقاوم للكسر",
        description: "زجاج مقاوم للكسر للسيارات.",
        price: 500,
        discountedPrice: 450,
        category: "car-glass",
        availability: "in-stock",
        image: "img/pngwing.com-1-e1662888438621-optimized.jpg",
        discount: "10%"
    },
    // Car Tires (إطارات سيارات)
    {
        name: "إطارات عالية الأداء",
        description: "إطارات مصممة لتحسين الأداء على الطرق السريعة.",
        price: 350,
        discountedPrice: 315,
        category: "car-tires",
        availability: "in-stock",
        image: "img/6948861784.jpg",
        discount: "10%"
    },
    {
        name: "إطارات مقاومة للانفجار",
        description: "إطارات توفر حماية إضافية ضد الانفجارات.",
        price: 400,
        discountedPrice: 360,
        category: "car-tires",
        availability: "in-stock",
        image: "img/6948861784.jpg",
        discount: "10%"
    },
    {
        name: "إطارات للطقس المتطرف",
        description: "إطارات مثالية للظروف الجوية القاسية.",
        price: 420,
        discountedPrice: 378,
        category: "car-tires",
        availability: "in-stock",
        image: "img/6948861784.jpg",
        discount: "10%"
    },
    {
        name: "إطارات صيفية",
        description: "إطارات صيفية لجميع أنواع السيارات.",
        price: 300,
        discountedPrice: 270,
        category: "car-tires",
        availability: "in-stock",
        image: "img/6948861784.jpg",
        discount: "10%"
    },
    {
        name: "إطارات شتوية",
        description: "إطارات شتوية لجميع أنواع السيارات.",
        price: 350,
        discountedPrice: 315,
        category: "car-tires",
        availability: "in-stock",
        image: "img/6948861784.jpg",
        discount: "10%"
    },
    {
        name: "إطارات للطرق الوعرة",
        description: "إطارات للطرق الوعرة.",
        price: 400,
        discountedPrice: 360,
        category: "car-tires",
        availability: "in-stock",
        image: "img/6948861784.jpg",
        discount: "10%"
    },
    // Hypermarket (هايبر ماركت)
    {
        name: "مشروبات غازية",
        description: "مشروبات غازية متنوعة.",
        price: 10,
        discountedPrice: 9,
        category: "hypermarket",
        image: "img/74519534a6a6ec6b494108d7a843d6dd.jpg",
        discount: "10%"
    },
    {
        name: "مشروبات عصير",
        description: "مشروبات عصير طبيعي.",
        price: 15,
        discountedPrice: 13.5,
        category: "hypermarket",
        availability: "in-stock",
        image: "img/74519534a6a6ec6b494108d7a843d6dd.jpg",
        discount: "10%"
    },
    {
        name: "فلافل",
        description: "فلافل مصرية لذيذة.",
        price: 10,
        discountedPrice: 9,
        category: "hypermarket",
        availability: "in-stock",
        image: "img/524723786374.jpg",
        discount: "10%"
    },
    {
        name: "فول",
        description: "فول مدمس مصري.",
        price: 12,
        discountedPrice: 10.8,
        category: "hypermarket",
        availability: "in-stock",
        image: "img/524723786374.jpg",
        discount: "10%"
    },
    {
        name: "طعمية",
        description: "طعمية مصرية لذيذة.",
        price: 15,
        discountedPrice: 13.5,
        category: "hypermarket",
        availability: "in-stock",
        image: "img/524723786374.jpg",
        discount: "10%"
    },
    {
        name: "كفتة",
        description: "كفتة مصرية لذيذة.",
        price: 20,
        discountedPrice: 18,
        category: "hypermarket",
        availability: "in-stock",
        image: "img/524723786374.jpg",
        discount: "10%"
    },
    // Restaurants (مطاعم)
    {
        name: "برغر",
        description: "برغر لذيذ مع البطاطس.",
        price: 50,
        discountedPrice: 45,
        category: "restaurants",
        availability: "in-stock",
        image: "img/524723786374.jpg",
        discount: "10%"
    },
    {
        name: "بيتزا",
        description: "بيتزا متنوعة النكهات.",
        price: 70,
        discountedPrice: 63,
        category: "restaurants",
        availability: "in-stock",
        image: "img/524723786374.jpg",
        discount: "10%"
    },
    {
        name: "ساندويتشات",
        description: "ساندويتشات متنوعة.",
        price: 40,
        discountedPrice: 36,
        category: "restaurants",
        availability: "in-stock",
        image: "img/524723786374.jpg",
        discount: "10%"
    },
    {
        name: "سلطات",
        description: "سلطات طازجة.",
        price: 30,
        discountedPrice: 27,
        category: "restaurants",
        availability: "in-stock",
        image: "img/524723786374.jpg",
        discount: "10%"
    },
    {
        name: "وجبات سريعة",
        description: "وجبات سريعة متنوعة.",
        price: 60,
        discountedPrice: 54,
        category: "restaurants",
        availability: "in-stock",
        image: "img/524723786374.jpg",
        discount: "10%"
    },
    {
        name: "عصائر طبيعية",
        description: "عصائر طبيعية متنوعة.",
        price: 20,
        discountedPrice: 18,
        category: "restaurants",
        availability: "in-stock",
        image: "img/74519534a6a6ec6b494108d7a843d6dd.jpg",
        discount: "10%"
    },
    // Pharmacies (صيدليات)
    {
        name: "فيتامينات متعددة",
        description: "مكملات غذائية تحتوي على مجموعة من الفيتامينات.",
        price: 40,
        discountedPrice: 36,
        category: "pharmacy",
        availability: "in-stock",
        image: "img/vitamin-d.jpg",
        discount: "10%"
    },
    {
        name: "أقراص منومة",
        description: "أقراص تساعد على النوم الجيد.",
        price: 30,
        discountedPrice: 27,
        category: "pharmacy",
        availability: "in-stock",
        image: "img/vitamin-d.jpg",
        discount: "10%"
    },
    {
        name: "مراهم مضادة للالتهابات",
        description: "مراهم لعلاج الالتهابات الجلدية.",
        price: 25,
        discountedPrice: 22.5,
        category: "pharmacy",
        availability: "in-stock",
        image: "img/vitamin-d.jpg",
        discount: "10%"
    },
    {
        name: "باراسيتامول",
        description: "مسكن للألم وخافض للحرارة.",
        price: 25,
        discountedPrice: 22.5,
        category: "pharmacy",
        availability: "in-stock",
        image: "img/vitamin-d.jpg",
        discount: "10%"
    },
    {
        name: "أسبرين",
        description: "مسكن للألم ومضاد للتجلط.",
        price: 15,
        discountedPrice: 13.5,
        category: "pharmacy",
        availability: "in-stock",
        image: "img/vitamin-d.jpg",
        discount: "10%"
    },
    {
        name: "مضاد حيوي",
        description: "مضاد حيوي لعلاج العدوى البكتيرية.",
        price: 40,
        discountedPrice: 36,
        category: "pharmacy",
        availability: "in-stock",
        image: "img/vitamin-d.jpg",
        discount: "10%"
    }
];

  categoryFilter.addEventListener("change", function () {
      console.log("Category filter changed");
      filterProducts();
      addEventListeners(); // Re-assign event listeners for cart and favorite buttons
  });

  priceRange.addEventListener("input", function () {
      console.log("Price range changed");
      filterProducts();
      document.getElementById('priceDisplay').textContent = 'السعر: ' + this.value;
  });

  availabilityFilter.addEventListener("change", function () {
      console.log("Availability filter changed");
      filterProducts();
  });

  searchInput.addEventListener("input", function () {
      console.log("Search input changed");
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

  function filterProducts() {
      const selectedCategory = categoryFilter.value;
      const selectedAvailability = availabilityFilter.value;
      const maxPrice = priceRange.value;

      const filteredProducts = productsData.filter(product => {
          const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
          const matchesAvailability = selectedAvailability === "all" || product.availability === selectedAvailability;
          const matchesPrice = product.discountedPrice <= maxPrice;

          return matchesCategory && matchesAvailability && matchesPrice;
      });

      console.log("Filtered products:", filteredProducts);
      renderProducts(filteredProducts);
  }

  function renderProducts(products) {
      productProducts.innerHTML = "";  // Clear previous products

      if (products.length === 0) {
          productProducts.innerHTML = "<p>لا توجد منتجات تتناسب مع الفلاتر المحددة.</p>";
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

              productProducts.appendChild(productCard);
          });
      }

      addEventListeners(); // Re-assign event listeners for cart and favorite buttons
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
                  discountedPrice: productCard.querySelector(".discounted-price").textContent
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
                  discountedPrice: productCard.querySelector(".discounted-price").textContent
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
                  discountedPrice: productCard.querySelector(".discounted-price").textContent
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
                  discountedPrice: productCard.querySelector(".discounted-price").textContent
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

  function updateFavoritesDisplay() {
      const favoritesCount = document.getElementById("favoritesCount");
      if (favoritesCount) {
          const myFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
          favoritesCount.textContent = myFavorites.length;
      }
  }

  categoryFilter.addEventListener("change", filterProducts);
  availabilityFilter.addEventListener("change", filterProducts);

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
