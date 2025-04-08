document.addEventListener("DOMContentLoaded", function() {
    const favoritesContainer = document.getElementById("favoritesContainer");

    // استرجاع المفضلة من localStorage
    const myFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];

    if (myFavorites.length === 0) {
        favoritesContainer.innerHTML = "<p>لا توجد منتجات في المفضلة حتى الآن.</p>";
    } else {
        myFavorites.forEach((product, index) => {
            const favoriteCard = document.createElement("div");
            favoriteCard.classList.add("product-card");

            favoriteCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <span class="discount">${product.discount || ''}</span>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="price">
                        <span class="original-price">${product.originalPrice}</span>
                        <span class="discounted-price">${product.discountedPrice}</span>
                    </div>
                    <div class="product-actions">
                        <button class="ban-btn" data-index="${index}"><i class="fa-solid fa-ban"></i></button>
                        <button class="add-to-cart"><i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                </div>
            `;

            favoritesContainer.appendChild(favoriteCard);
        });

        // إضافة مستمعي الأحداث للأزرار
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest(".product-card");
                const product = {
                    image: productCard.querySelector("img").src,
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
                alert("تمت إضافة المنتج إلى السلة!");
            });
        });

        document.querySelectorAll('.ban-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                myFavorites.splice(index, 1);
                localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
                renderFavorites(); // إعادة تقديم المفضلة بدون إعادة تحميل الصفحة
            });
        });
    }

    function renderFavorites() {
        favoritesContainer.innerHTML = "";
        myFavorites.forEach((product, index) => {
            const favoriteCard = document.createElement("div");
            favoriteCard.classList.add("product-card");

            favoriteCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <span class="discount">${product.discount || ''}</span>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="price">
                        <span class="original-price">${product.originalPrice}</span>
                        <span class="discounted-price">${product.discountedPrice}</span>
                    </div>
                    <div class="product-actions">
                        <button class="ban-btn" data-index="${index}"><i class="fa-solid fa-ban"></i></button>
                        <button class="add-to-cart"><i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                </div>
            `;

            favoritesContainer.appendChild(favoriteCard);
        });

        // إضافة مستمعي الأحداث للأزرار مرة أخرى
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest(".product-card");
                const product = {
                    image: productCard.querySelector("img").src,
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
                alert("تمت إضافة المنتج إلى السلة!");
            });
        });

        document.querySelectorAll('.ban-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                myFavorites.splice(index, 1);
                localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
                renderFavorites();
            });
        });
    }
});

document.getElementById('deleteAllButton').addEventListener('click', function() {
    // حذف جميع العناصر من القائمة
    document.getElementById('favoritesContainer').innerHTML = '';
});