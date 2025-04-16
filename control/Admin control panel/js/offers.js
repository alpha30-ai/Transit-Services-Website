let offers = JSON.parse(localStorage.getItem("offers")) || []; // استعادة العروض من localStorage

// إضافة عرض جديد
document.getElementById("addOfferForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const offerCode = document.getElementById("offerCode").value;
    const offerTitle = document.getElementById("offerTitle").value;
    const offerType = document.getElementById("offerType").value;
    const offerAmount = document.getElementById("offerAmount").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    const newOffer = {
        code: offerCode,
        title: offerTitle,
        type: offerType,
        amount: offerAmount,
        startDate: startDate,
        endDate: endDate,
        id: offers.length + 1
    };

    offers.push(newOffer);
    localStorage.setItem("offers", JSON.stringify(offers)); // حفظ العروض في localStorage
    displayOffers();
    this.reset();
});

// عرض العروض في الجدول
function displayOffers() {
    const tableBody = document.getElementById("offersTableBody");
    tableBody.innerHTML = ""; // إعادة تعيين الجدول
    offers.forEach(offer => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${offer.id}</td>
            <td>${offer.code}</td>
            <td>${offer.title}</td>
            <td>${offer.type}</td>
            <td>${offer.amount}</td>
            <td>${offer.startDate}</td>
            <td>${offer.endDate}</td>
            <td>نشط</td>
            <td>
                <button onclick="openEditModal(${offer.id})">تعديل</button>
                <button onclick="deleteOffer(${offer.id})">حذف</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// فتح نافذة تعديل العرض
function openEditModal(id) {
    const offer = offers.find(o => o.id === id);
    document.getElementById("editOfferCode").value = offer.code;
    document.getElementById("editOfferTitle").value = offer.title;
    document.getElementById("editOfferType").value = offer.type;
    document.getElementById("editOfferAmount").value = offer.amount;
    document.getElementById("editStartDate").value = offer.startDate;
    document.getElementById("editEndDate").value = offer.endDate;
    document.getElementById("editOfferId").value = offer.id; // حفظ ID العرض
    document.getElementById("editOfferModal").style.display = "block"; // فتح النافذة المنبثقة
}

// تحديث العرض
function updateOffer(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById("editOfferId").value); // الحصول على ID العرض
    const index = offers.findIndex(o => o.id === id);
    if (index !== -1) {
        offers[index] = {
            code: document.getElementById("editOfferCode").value,
            title: document.getElementById("editOfferTitle").value,
            type: document.getElementById("editOfferType").value,
            amount: document.getElementById("editOfferAmount").value,
            startDate: document.getElementById("editStartDate").value,
            endDate: document.getElementById("editEndDate").value,
            id: id
        };
        localStorage.setItem("offers", JSON.stringify(offers)); // حفظ العروض في localStorage
        displayOffers();
        closeModal();
    }
}

// حذف العرض
function deleteOffer(id) {
    offers = offers.filter(o => o.id !== id);
    localStorage.setItem("offers", JSON.stringify(offers)); // حفظ العروض في localStorage
    displayOffers();
}

// إغلاق النافذة المنبثقة
function closeModal() {
    document.getElementById("editOfferModal").style.display = "none";
}

// البحث في العروض
document.getElementById("searchBtn").addEventListener("click", function() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const filteredOffers = offers.filter(offer => offer.title.toLowerCase().includes(query) || offer.code.toLowerCase().includes(query));
    displayFilteredOffers(filteredOffers);
});

function displayFilteredOffers(filteredOffers) {
    const tableBody = document.getElementById("offersTableBody");
    tableBody.innerHTML = ""; // إعادة تعيين الجدول
    filteredOffers.forEach(offer => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${offer.id}</td>
            <td>${offer.code}</td>
            <td>${offer.title}</td>
            <td>${offer.type}</td>
            <td>${offer.amount}</td>
            <td>${offer.startDate}</td>
            <td>${offer.endDate}</td>
            <td>نشط</td>
            <td>
                <button onclick="openEditModal(${offer.id})">تعديل</button>
                <button onclick="deleteOffer(${offer.id})">حذف</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// عرض العروض عند تحميل الصفحة
window.onload = displayOffers;
