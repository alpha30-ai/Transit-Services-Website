/**
 * نافذة العرض السريع
 */
document.addEventListener('DOMContentLoaded', function() {
    // إنشاء نافذة العرض السريع
    createQuickViewModal();
    
    // تهيئة أزرار العرض السريع
    initQuickViewButtons();
});

/**
 * إنشاء نافذة العرض السريع
 */
function createQuickViewModal() {
    // التحقق من وجود النافذة
    if (document.getElementById('quickViewModal')) return;
    
    // إنشاء عناصر النافذة
    const modal = document.createElement('div');
    modal.id = 'quickViewModal';
    modal.className = 'quick-view-modal';
    
    // محتوى النافذة
    modal.innerHTML = `
        <div class="quick-view-content">
            <div class="quick-view-close">
                <i class="fas fa-times"></i>
            </div>
            <div class="quick-view-body">
                <div class="quick-view-image">
                    <img src="" alt="صورة المنتج" id="quickViewImage">
                </div>
                <div class="quick-view-details">
                    <div class="quick-view-category" id="quickViewCategory"></div>
                    <h2 class="quick-view-title" id="quickViewTitle"></h2>
                    <div class="quick-view-rating" id="quickViewRating"></div>
                    <div class="quick-view-price">
                        <span class="quick-view-original-price" id="quickViewOriginalPrice"></span>
                        <span class="quick-view-discounted-price" id="quickViewDiscountedPrice"></span>
                        <span class="quick-view-discount" id="quickViewDiscount"></span>
                    </div>
                    <div class="quick-view-description" id="quickViewDescription"></div>
                    <div class="quick-view-availability">
                        <strong>الحالة:</strong>
                        <span id="quickViewAvailability"></span>
                    </div>
                    <div class="quick-view-actions">
                        <div class="quick-view-quantity">
                            <button class="quick-view-quantity-minus">-</button>
                            <input type="number" value="1" min="1" max="10" id="quickViewQuantity">
                            <button class="quick-view-quantity-plus">+</button>
                        </div>
                        <button class="quick-view-add-to-cart">
                            <i class="fas fa-cart-shopping"></i>
                            <span>إضافة للسلة</span>
                        </button>
                        <button class="quick-view-add-to-favorite">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // إضافة النافذة للصفحة
    document.body.appendChild(modal);
    
    // تهيئة أحداث النافذة
    initModalEvents();
}

/**
 * تهيئة أحداث النافذة
 */
function initModalEvents() {
    const modal = document.getElementById('quickViewModal');
    const closeBtn = modal.querySelector('.quick-view-close');
    const quantityMinus = modal.querySelector('.quick-view-quantity-minus');
    const quantityPlus = modal.querySelector('.quick-view-quantity-plus');
    const quantityInput = modal.querySelector('#quickViewQuantity');
    const addToCartBtn = modal.querySelector('.quick-view-add-to-cart');
    const addToFavoriteBtn = modal.querySelector('.quick-view-add-to-favorite');
    
    // إغلاق النافذة عند النقر على زر الإغلاق
    closeBtn.addEventListener('click', function() {
        closeQuickViewModal();
    });
    
    // إغلاق النافذة عند النقر خارج المحتوى
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeQuickViewModal();
        }
    });
    
    // تقليل الكمية
    quantityMinus.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    // زيادة الكمية
    quantityPlus.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value < 10) {
            quantityInput.value = value + 1;
        }
    });
    
    // إضافة للسلة
    addToCartBtn.addEventListener('click', function() {
        const title = document.getElementById('quickViewTitle').textContent;
        const quantity = document.getElementById('quickViewQuantity').value;
        alert(`تمت إضافة ${title} (الكمية: ${quantity}) إلى سلة التسوق`);
        closeQuickViewModal();
    });
    
    // إضافة للمفضلة
    addToFavoriteBtn.addEventListener('click', function() {
        const icon = addToFavoriteBtn.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            addToFavoriteBtn.classList.add('active');
            alert(`تمت إضافة ${document.getElementById('quickViewTitle').textContent} إلى المفضلة`);
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            addToFavoriteBtn.classList.remove('active');
            alert(`تمت إزالة ${document.getElementById('quickViewTitle').textContent} من المفضلة`);
        }
    });
}

/**
 * تهيئة أزرار العرض السريع
 */
function initQuickViewButtons() {
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            
            // الحصول على بيانات المنتج
            const image = productCard.querySelector('.product-image img').src;
            const category = productCard.querySelector('.product-category').textContent;
            const title = productCard.querySelector('h3').textContent;
            
            // الحصول على التقييم
            const ratingStars = productCard.querySelectorAll('.product-rating i');
            let ratingHTML = '';
            ratingStars.forEach(star => {
                ratingHTML += star.outerHTML;
            });
            ratingHTML += `<span>${productCard.querySelector('.product-rating span').textContent}</span>`;
            
            // الحصول على السعر
            const originalPrice = productCard.querySelector('.original-price').textContent;
            const discountedPrice = productCard.querySelector('.discounted-price').textContent;
            
            // الحصول على الخصم
            const discountElement = productCard.querySelector('.discount');
            const discount = discountElement ? discountElement.textContent : '';
            
            // الحصول على الوصف
            const description = productCard.querySelector('.product-description').textContent;
            
            // الحصول على حالة التوفر
            const availabilityElement = productCard.querySelector('.product-badge');
            const availability = availabilityElement ? availabilityElement.textContent : '';
            const isInStock = availabilityElement ? availabilityElement.classList.contains('in-stock') : false;
            
            // عرض النافذة مع بيانات المنتج
            openQuickViewModal({
                image,
                category,
                title,
                ratingHTML,
                originalPrice,
                discountedPrice,
                discount,
                description,
                availability,
                isInStock
            });
        });
    });
}

/**
 * فتح نافذة العرض السريع
 */
function openQuickViewModal(product) {
    const modal = document.getElementById('quickViewModal');
    
    // تعيين بيانات المنتج
    document.getElementById('quickViewImage').src = product.image;
    document.getElementById('quickViewCategory').textContent = product.category;
    document.getElementById('quickViewTitle').textContent = product.title;
    document.getElementById('quickViewRating').innerHTML = product.ratingHTML;
    document.getElementById('quickViewOriginalPrice').textContent = product.originalPrice;
    document.getElementById('quickViewDiscountedPrice').textContent = product.discountedPrice;
    
    // تعيين الخصم
    const discountElement = document.getElementById('quickViewDiscount');
    if (product.discount) {
        discountElement.textContent = product.discount;
        discountElement.style.display = 'inline-block';
    } else {
        discountElement.style.display = 'none';
    }
    
    // تعيين الوصف
    document.getElementById('quickViewDescription').textContent = product.description;
    
    // تعيين حالة التوفر
    const availabilityElement = document.getElementById('quickViewAvailability');
    availabilityElement.textContent = product.availability;
    if (product.isInStock) {
        availabilityElement.className = 'in-stock';
    } else {
        availabilityElement.className = 'out-of-stock';
    }
    
    // إعادة تعيين الكمية
    document.getElementById('quickViewQuantity').value = 1;
    
    // إعادة تعيين زر المفضلة
    const favoriteBtn = modal.querySelector('.quick-view-add-to-favorite');
    const favoriteIcon = favoriteBtn.querySelector('i');
    favoriteIcon.className = 'far fa-heart';
    favoriteBtn.classList.remove('active');
    
    // عرض النافذة
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

/**
 * إغلاق نافذة العرض السريع
 */
function closeQuickViewModal() {
    const modal = document.getElementById('quickViewModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}
