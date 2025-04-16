// فتح النموذج كنافذة منبثقة
function editService(button) {
    currentRow = button.closest("tr"); // حفظ الصف الحالي المحدد للتعديل
    const cells = currentRow.querySelectorAll("td");

    // تعبئة الحقول بالبيانات الحالية من الصف
    document.getElementById("editServiceName").value = cells[0].innerText;
    document.getElementById("editServiceDescription").value = cells[1].innerText;
    document.getElementById("editCategory").value = cells[2].innerText;
    document.getElementById("editCost").value = cells[3].innerText;
    document.getElementById("editServiceImage").value = cells[4].querySelector('img').src; // تعبئة حقل الصورة

    document.getElementById("editServiceModal").style.display = "flex"; // عرض النافذة
}

// إغلاق النافذة عند الضغط على زر الإغلاق
function closeModal() {
    document.getElementById("editServiceModal").style.display = "none"; // إخفاء النافذة
}

// تحديث الخدمة وإغلاق النافذة عند الإرسال
function updateService(event) {
    event.preventDefault(); // منع إرسال النموذج الافتراضي

    if (currentRow) {
        const cells = currentRow.querySelectorAll("td");

        // الحصول على القيم المعدلة من النموذج
        const updatedService = {
            serviceName: document.getElementById("editServiceName").value,
            serviceDescription: document.getElementById("editServiceDescription").value,
            category: document.getElementById("editCategory").value,
            cost: document.getElementById("editCost").value,
            serviceImage: document.getElementById("editServiceImage").files[0] // الحصول على الصورة المحدثة
        };

        // تحديث الخلايا في الصف الحالي
        cells[0].innerText = updatedService.serviceName;
        cells[1].innerText = updatedService.serviceDescription;
        cells[2].innerText = updatedService.category;
        cells[3].innerText = updatedService.cost;

        // تحديث عرض الصورة
        if (updatedService.serviceImage) {
            const reader = new FileReader();
            reader.onload = function(e) {
                cells[4].querySelector('img').src = e.target.result;
            };
            reader.readAsDataURL(updatedService.serviceImage);
        }

        // تحديث Local Storage
        let services = JSON.parse(localStorage.getItem("services")) || [];
        const rowId = currentRow.dataset.id - 1; // الحصول على المعرف كفهرس في المصفوفة
        services[rowId] = { ...updatedService, serviceImage: cells[4].querySelector('img').src }; // تحديث الخدمة المعدلة في المصفوفة
        localStorage.setItem("services", JSON.stringify(services)); // حفظ التحديثات في Local Storage

        currentRow = null; // مسح الصف الحالي بعد التحديث
    }

    closeModal(); // إغلاق النافذة بعد التحديث
}

document.addEventListener("DOMContentLoaded", () => {
    const services = JSON.parse(localStorage.getItem("services")) || [];
    const tableBody = document.getElementById("servicesTableBody");

    services.forEach((service, index) => {
        const row = document.createElement("tr");
        row.dataset.id = index + 1; // تحديد معرف لكل صف

        row.innerHTML = `
            <td>${service.serviceName}</td>
            <td>${service.serviceDescription}</td>
            <td>${service.category}</td>
            <td>${service.cost}</td>
            <td><img src="${service.serviceImage}" alt="صورة الخدمة" width="50"></td>
            <td>
                <button class="btn btn-edit" onclick="editService(this)">تعديل</button>
                <button class="btn btn-delete" onclick="deleteService(this)">حذف</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
});

// دالة الحذف مع تحديث Local Storage
function deleteService(button) {
    const row = button.closest("tr");
    const id = row.dataset.id - 1; // تحويل المعرف إلى فهرس

    // جلب الخدمات من Local Storage
    let services = JSON.parse(localStorage.getItem("services")) || [];

    // حذف الخدمة المحددة بناءً على فهرسها
    services.splice(id, 1);

    // تحديث Local Storage بعد الحذف
    localStorage.setItem("services", JSON.stringify(services));

    // إزالة الصف من الجدول
    row.remove();
}

document.querySelector(".add-service-form").addEventListener("submit", addService);

function addService(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const serviceImage = document.getElementById("serviceImage").files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const newService = {
            id: Date.now(), // معرف فريد للخدمة باستخدام الوقت الحالي
            serviceName: document.getElementById("serviceName").value,
            serviceDescription: document.getElementById("serviceDescription").value,
            category: document.getElementById("category").value,
            cost: document.getElementById("cost").value,
            serviceImage: e.target.result // تخزين مسار الصورة
        };

        // جلب الخدمات الحالية من Local Storage
        let services = JSON.parse(localStorage.getItem("services")) || [];
        services.push(newService); // إضافة الخدمة الجديدة إلى القائمة
        localStorage.setItem("services", JSON.stringify(services)); // حفظ القائمة المحدثة

        // إعادة التوجيه إلى صفحة الخدمات
        window.location.href = "services.html";
    };

    reader.readAsDataURL(serviceImage);
}
