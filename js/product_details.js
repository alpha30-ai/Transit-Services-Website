    // عند تحميل الصفحة، جلب بيانات المنتج من LocalStorage
    document.addEventListener("DOMContentLoaded", function () {
        const productDetails = JSON.parse(localStorage.getItem("productDetails"));

        if (productDetails) {
            document.getElementById("big-img").src = productDetails.image;
            document.getElementById("product-name").textContent = productDetails.name;
            document.getElementById("product-description").textContent = productDetails.description;
            document.getElementById("original-price").textContent = productDetails.originalPrice;
            document.getElementById("discounted-price").textContent = productDetails.discountedPrice;
            document.getElementById("availability").textContent = `أسرع - بقي ${productDetails.availability} منتجًا فقط في المخزن.`;
        } else {
            console.error("لا توجد بيانات منتج مخزنة.");
        }
    });

    