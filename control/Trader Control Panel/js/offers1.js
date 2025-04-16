// بيانات العروض (كمثال، يمكنك تحميلها من قاعدة بيانات أو LocalStorage)
const offers = [
    { id: 1, status: 'active', discount: 100 },
    { id: 2, status: 'expired', discount: 200 },
    { id: 3, status: 'active', discount: 150 },
    { id: 4, status: 'expired', discount: 300 },
    { id: 5, status: 'active', discount: 250 },
    { id: 6, status: 'special', discount: 500 },
    // يمكنك إضافة المزيد من العروض هنا
];

// حساب الإحصائيات
function updateStatistics() {
    const totalOffers = offers.length;  // إجمالي العروض
    const activeOffers = offers.filter(offer => offer.status === 'active').length;  // العروض النشطة
    const expiredOffers = offers.filter(offer => offer.status === 'expired').length;  // العروض المنتهية
    const totalDiscounts = offers.reduce((sum, offer) => sum + offer.discount, 0);  // إجمالي الخصومات
    const specialOffers = offers.filter(offer => offer.status === 'special').length;  // العروض الخاصة

    // عرض الإحصائيات في الصفحة
    document.getElementById("totalOffersDisplay").textContent = totalOffers;
    document.getElementById("activeOffersDisplay").textContent = activeOffers;
    document.getElementById("expiredOffersDisplay").textContent = expiredOffers;
    document.getElementById("totalDiscountsDisplay").textContent = totalDiscounts;
    document.getElementById("specialOffersDisplay").textContent = specialOffers;
}

// تحديث الإحصائيات عند تحميل الصفحة
window.onload = updateStatistics;
