window.addEventListener('load', function() {
    const serviceDetails = JSON.parse(localStorage.getItem('serviceDetails'));
    if (serviceDetails) {
        console.log('Service Details:', serviceDetails); // تسجيل البيانات المسترجعة

        if (serviceDetails.name) {
            const productItemLink = document.querySelector('.product-item-link');
            if (productItemLink) {
                productItemLink.textContent = serviceDetails.name;
            }
        }
        if (serviceDetails.discountedPrice && serviceDetails.discountedPrice !== "N/A") {
            const priceSpan = document.querySelector('.price span');
            if (priceSpan) {
                priceSpan.textContent = serviceDetails.discountedPrice;
            } else {
                console.error('Price span not found.');
            }
        }
        if (serviceDetails.originalPrice && serviceDetails.originalPrice !== "N/A") {
            const originalPriceSpan = document.querySelector('.price del');
            if (originalPriceSpan) {
                originalPriceSpan.textContent = serviceDetails.originalPrice;
            } else {
                console.error('Original price span not found.');
            }
        }
        if (serviceDetails.company) {
            const companySpan = document.querySelector('.stock-model p:nth-child(1) span');
            if (companySpan) {
                companySpan.textContent = serviceDetails.company;
            }
        }
        if (serviceDetails.availability) {
            const availabilitySpan = document.querySelector('.stock-model p:nth-child(2) span');
            if (availabilitySpan) {
                availabilitySpan.textContent = serviceDetails.availability;
            }
        }
        if (serviceDetails.type) {
            const typeSpan = document.querySelector('.stock-model p:nth-child(3) span');
            if (typeSpan) {
                typeSpan.textContent = serviceDetails.type;
            }
        }
        if (serviceDetails.description) {
            const productText = document.querySelector('.product-text');
            if (productText) {
                productText.textContent = serviceDetails.description;
            }
        }
        if (serviceDetails.image) {
            const bigImg = document.querySelector('#big-img');
            if (bigImg) {
                bigImg.src = serviceDetails.image;
            }
        }
    } else {
        console.error('Service details not found in localStorage.');
    }
});




document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    if (name && phone && address) {
        showPopup('انتظر قليلا يتم اتمام عملية الشراء...');
        setTimeout(() => {
            showPopup('تم اتمام عملية الشراء بنجاح! ✅', true);
        }, 2000);
    } else {
        showPopup('يرجى ملء جميع الحقول.');
    }
});

function showPopup(message, success = false) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    popupMessage.textContent = message;
    popup.classList.remove('hidden');

    if (success) {
        setTimeout(() => {
            window.location.href = 'index.html'; // Redirect to homepage
        }, 2000);
    }
}