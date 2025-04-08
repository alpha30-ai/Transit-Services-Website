function toggleSettingsMenu() {
    const settingsMenu = document.getElementById('settings-menu');
    settingsMenu.classList.toggle('hidden');
}

function toggleLanguage() {
    const currentLanguage = document.getElementById('language-button').innerText;
    document.getElementById('language-button').innerText = currentLanguage === 'العربية' ? 'English' : 'العربية';
    // يمكنك هنا إضافة الكود لتغيير النصوص إلى اللغة المختارة
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

function saveVendorData(event) {
    event.preventDefault();

    // هنا يمكنك إضافة كود لتخزين بيانات التاجر (مثلاً في قاعدة بيانات أو محلياً)
    document.getElementById('success-message').style.display = 'block';
}
function saveVendorData(event) {
    event.preventDefault(); // Prevent default form submission

    const vendorName = document.querySelector('input[placeholder="أدخل اسم التاجر"]').value;
    const storeName = document.querySelector('input[placeholder="أدخل اسم المتجر"]').value;
    const email = document.querySelector('input[placeholder="أدخل بريدك الإلكتروني"]').value;
    const phoneNumber = document.querySelector('input[placeholder="أدخل رقم الهاتف"]').value;
    const address = document.querySelector('input[placeholder="أدخل العنوان"]').value;
    
    // Save data to local storage
    const vendorData = {
        vendorName,
        storeName,
        email,
        phoneNumber,
        address
    };
    
    localStorage.setItem('vendorData', JSON.stringify(vendorData));

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}
// تحديد النموذج
const vendorForm = document.querySelector('.vendor-registration-form');

// تفعيل الوضع الليلي وإخفاء النموذج بناءً على ذلك
function toggleNightMode() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        vendorForm.style.display = 'none'; // إخفاء النموذج في الوضع الليلي
    } else {
        vendorForm.style.display = 'block'; // إظهار النموذج في الوضع النهاري
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // الحصول على النموذج
    const form = document.querySelector('.seller-registration-form form');
    const sellersTableBody = document.querySelector('.sellers-table tbody');
    const sellers = []; // مصفوفة لتخزين بيانات البائعين

    // إضافة حدث الإرسال للنموذج
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // منع إرسال النموذج بالطريقة الافتراضية

        // الحصول على بيانات المدخلات
        const traderName = document.getElementById('traderName').value;
        const storeName = document.getElementById('storeName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const storeImage = document.getElementById('storeImage').files[0];
        const ownerImage = document.getElementById('ownerImage').files[0];

        // إضافة البيانات إلى المصفوفة
        sellers.push({
            traderName,
            storeName,
            email,
            phone,
            address,
            registrationDate: new Date().toLocaleDateString(), // تاريخ التسجيل
            storeImage,
            ownerImage
        });

        // تحديث الجدول لعرض البائعين
        updateSellersTable();
        
        // إعادة تعيين النموذج
        form.reset();
    });

    // دالة لتحديث الجدول
    function updateSellersTable() {
        // مسح محتويات الجدول
        sellersTableBody.innerHTML = '';

        // إضافة كل بائع إلى الجدول
        sellers.forEach(seller => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${seller.traderName}</td>
                <td>${seller.storeName}</td>
                <td>${seller.email}</td>
                <td>${seller.phone}</td>
                <td>${seller.address}</td>
                <td>${seller.registrationDate}</td>
            `;
            sellersTableBody.appendChild(row);
        });
    }
});
