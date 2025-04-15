// ملف التعامل مع نافذة العرض السريع

document.addEventListener('DOMContentLoaded', function() {
    // مستمع أحداث لأزرار العرض السريع
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('quick-view-btn') || event.target.closest('.quick-view-btn')) {
            // الحصول على الزر
            const button = event.target.classList.contains('quick-view-btn') ? event.target : event.target.closest('.quick-view-btn');
            
            // الحصول على بطاقة المنتج
            const productCard = button.closest('.product-card');
            
            if (productCard) {
                // استخراج معلومات المنتج
                const productImage = productCard.querySelector('.product-image img').src;
                const productCategory = productCard.querySelector('.product-category').textContent;
                const productName = productCard.querySelector('h3').textContent;
                const productDescription = productCard.querySelector('.product-description') ? 
                                          productCard.querySelector('.product-description').textContent : '';
                const originalPrice = productCard.querySelector('.original-price').textContent;
                const discountedPrice = productCard.querySelector('.discounted-price').textContent;
                const isAvailable = productCard.querySelector('.product-badge.in-stock') !== null;
                
                // إنشاء نافذة العرض السريع
                createQuickViewModal({
                    image: productImage,
                    category: productCategory,
                    name: productName,
                    description: productDescription,
                    originalPrice: originalPrice,
                    discountedPrice: discountedPrice,
                    isAvailable: isAvailable
                });
            }
        }
    });
    
    // إنشاء نافذة العرض السريع
    function createQuickViewModal(product) {
        // التحقق من وجود نافذة منبثقة سابقة وإزالتها
        const existingModal = document.getElementById('quickViewModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // تحديد نوع الزر بناءً على فئة المنتج
        let actionButtonText = '';
        let actionButtonIcon = '';
        
        if (product.category.includes('مستشفيات') || product.category.includes('معامل تحاليل')) {
            actionButtonText = 'حجز الآن';
            actionButtonIcon = 'fa-calendar-check';
        } else {
            actionButtonText = 'إضافة للسلة';
            actionButtonIcon = 'fa-cart-plus';
        }
        
        // إنشاء نافذة منبثقة جديدة
        const modal = document.createElement('div');
        modal.id = 'quickViewModal';
        modal.className = 'quick-view-modal';
        
        modal.innerHTML = `
            <div class="quick-view-content">
                <button class="quick-view-close"><i class="fas fa-times"></i></button>
                <div class="quick-view-grid">
                    <div class="quick-view-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="quick-view-details">
                        <div class="quick-view-category">${product.category}</div>
                        <h2 class="quick-view-title">${product.name}</h2>
                        <div class="quick-view-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span>(4.5)</span>
                        </div>
                        <div class="quick-view-price">
                            <span class="original-price">${product.originalPrice}</span>
                            <span class="discounted-price">${product.discountedPrice}</span>
                        </div>
                        <div class="quick-view-description">
                            <p>${product.description}</p>
                        </div>
                        <div class="quick-view-actions">
                            <button class="quick-view-action-btn ${product.isAvailable ? '' : 'disabled'}" ${product.isAvailable ? '' : 'disabled'}>
                                <i class="fas ${actionButtonIcon}"></i> ${actionButtonText}
                            </button>
                            <button class="quick-view-favorite-btn">
                                <i class="far fa-heart"></i> إضافة للمفضلة
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // إضافة النافذة المنبثقة إلى الصفحة
        document.body.appendChild(modal);
        
        // إظهار النافذة المنبثقة
        setTimeout(() => {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // منع التمرير في الصفحة الخلفية
        }, 10);
        
        // مستمع حدث لإغلاق النافذة المنبثقة
        const closeButton = modal.querySelector('.quick-view-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto'; // إعادة تمكين التمرير
                setTimeout(() => {
                    modal.remove();
                }, 300);
            });
        }
        
        // مستمع حدث للنقر خارج النافذة المنبثقة
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto'; // إعادة تمكين التمرير
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        });
        
        // مستمع حدث لزر الإجراء (حجز الآن أو إضافة للسلة)
        const actionButton = modal.querySelector('.quick-view-action-btn');
        if (actionButton) {
            actionButton.addEventListener('click', function() {
                if (product.category.includes('مستشفيات') || product.category.includes('معامل تحاليل')) {
                    // حفظ بيانات الحجز
                    const bookingDetails = {
                        service: product.name,
                        originalPrice: product.originalPrice,
                        discountedPrice: product.discountedPrice,
                    };
                    
                    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
                    alert('تم إضافة حجز الخدمة إلى صفحة الحجوزات');
                    
                    setTimeout(() => {
                        window.location.href = "bookings-and-follow-up.html";
                    }, 1500);
                } else {
                    // إضافة المنتج للسلة
                    alert('تمت إضافة المنتج إلى السلة بنجاح!');
                    modal.classList.remove('show');
                    document.body.style.overflow = 'auto';
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                }
            });
        }
        
        // مستمع حدث لزر المفضلة
        const favoriteButton = modal.querySelector('.quick-view-favorite-btn');
        if (favoriteButton) {
            favoriteButton.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    alert('تمت إضافة المنتج إلى المفضلة بنجاح!');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    alert('تمت إزالة المنتج من المفضلة!');
                }
            });
        }
    }
});
