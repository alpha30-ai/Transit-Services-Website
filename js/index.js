document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.getElementById('cart-items');
    const favoritesContainer = document.getElementById('favoritesContainer');

    if (cartContainer) {
        displayCartItems();
    }

    if (favoritesContainer) {
        displayFavorites();
    }

    function displayCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = '';
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>السلة فارغة.</p>";
            document.getElementById('total-amount').textContent = "0 جنيه";
            document.getElementById('final-amount').textContent = "0 جنيه";
            return;
        }

        let totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
        let discountPercentage = getDiscountPercentage(totalQuantity);

        let totalPrice = 0;

        cart.forEach((product, index) => {
            let discountedPrice = calculateDiscountedPrice(product, discountPercentage);
            let productTotal = parseFloat(discountedPrice) * product.quantity;
            totalPrice += productTotal;

            const productElement = createProductElement(product, index, 'cart');
            cartContainer.appendChild(productElement);
        });

        document.getElementById('total-amount').textContent = `${(totalPrice + 200).toFixed(2)} جنيه`;
        document.getElementById('final-amount').textContent = `${totalPrice.toFixed(2)} جنيه`;
    }

    function displayFavorites() {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favoritesContainer.innerHTML = '';
        if (favorites.length === 0) {
            favoritesContainer.innerHTML = "<p>لا توجد منتجات في المفضلة حتى الآن.</p>";
            return;
        }

        favorites.forEach((product, index) => {
            const productElement = createProductElement(product, index, 'favorites');
            favoritesContainer.appendChild(productElement);
        });

        document.getElementById('deleteAllButton').addEventListener('click', function () {
            localStorage.removeItem('favorites');
            favoritesContainer.innerHTML = "<p>لا توجد منتجات في المفضلة حتى الآن.</p>";
        });
    }

    function getDiscountPercentage(totalQuantity) {
        const discountTiers = [
            { minQuantity: 0, discountPercentage: 0 },
            { minQuantity: 5, discountPercentage: 5 },
            { minQuantity: 10, discountPercentage: 10 },
            { minQuantity: 20, discountPercentage: 15 }
        ];
        for (let i = discountTiers.length - 1; i >= 0; i--) {
            if (totalQuantity >= discountTiers[i].minQuantity) {
                return discountTiers[i].discountPercentage;
            }
        }
        return 0;
    }

    function calculateDiscountedPrice(product, discountPercentage) {
        let originalPrice = parseFloat(product.price.replace(/[^\d.]/g, ""));
        let discount = discountPercentage / 100;
        let discountedPrice = originalPrice * (1 - discount);
        return discountedPrice.toFixed(2);
    }

    function createProductElement(product, index, type) {
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');

        let actionsHtml = '';
        if (type === 'cart') {
            actionsHtml = `
                <div class="product-actions">
                    <button onclick="updateQuantity(${index}, 'decrease')">-</button>
                    <input type="number" value="${product.quantity}" readonly>
                    <button onclick="updateQuantity(${index}, 'increase')">+</button>
                    <button onclick="removeFromCart(${index})"><i class="fa-solid fa-trash-alt"></i></button>
                </div>
            `;
        } else if (type === 'favorites') {
            actionsHtml = `
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}"><i class="fa-solid fa-cart-plus"></i></button>
                    <button onclick="removeFromFavorites(${index})"><i class="fa-solid fa-ban"></i></button>
                </div>
            `;
        }

        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="price">
                    <span class="original-price">${product.price}</span>
                </div>
                ${actionsHtml}
            </div>
        `;

        return productElement;
    }

    window.updateQuantity = function (index, action) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (action === 'increase') {
            cart[index].quantity++;
        } else if (action === 'decrease' && cart[index].quantity > 1) {
            cart[index].quantity--;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    };

    window.removeFromCart = function (index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    };

    window.removeFromFavorites = function (index) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavorites();
    };
});
