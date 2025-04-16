function editService() {
    alert("تعديل الخدمة");
    // هنا يمكنك إضافة الكود اللازم لتعديل الخدمة
}

function deleteService() {
    if (confirm("هل أنت متأكد أنك تريد حذف هذه الخدمة؟")) {
        // هنا يمكنك إضافة الكود اللازم لحذف الخدمة
        alert("تم حذف الخدمة");
    }
}
// فتح النموذج كنافذة منبثقة
function editService() {
    document.getElementById("editServiceModal").style.display = "flex"; // عرض النافذة
}

// إغلاق النافذة عند الضغط على زر الإغلاق
function closeModal() {
    document.getElementById("editServiceModal").style.display = "none"; // إخفاء النافذة
}

// تحديث الخدمة وإغلاق النافذة عند الإرسال
function updateService(event) {
    event.preventDefault(); // منع إرسال النموذج الافتراضي
    console.log("تم تحديث الخدمة"); // يمكنك استبدالها بالكود المناسب
    closeModal(); // إغلاق النافذة بعد التحديث
}
let currentRow = null;

// فتح النموذج كنافذة منبثقة وتعبئة البيانات عند الضغط على زر "تعديل"
function editService(button) {
    currentRow = button.closest("tr"); // حفظ الصف الحالي المحدد للتعديل
    const cells = currentRow.querySelectorAll("td");

    // تعبئة الحقول بالبيانات الحالية من الصف
    document.getElementById("serviceName").value = cells[0].innerText;
    document.getElementById("serviceDescription").value = cells[1].innerText;
    document.getElementById("category").value = cells[2].innerText;
    document.getElementById("cost").value = cells[3].innerText;
    document.getElementById("duration").value = cells[4].innerText;
    document.getElementById("requirements").value = cells[5].innerText;
    document.getElementById("paymentMethods").value = cells[6].innerText;
    document.getElementById("contactInfo").value = cells[7].innerText;

    document.getElementById("editServiceModal").style.display = "flex"; // عرض النافذة
}

// تحديث بيانات الخدمة في الصف المحدد وحفظها تلقائيًا في localStorage
function updateService(event) {
    event.preventDefault();
    
    if (currentRow) {
        const cells = currentRow.querySelectorAll("td");
        
        // الحصول على القيم المعدلة من النموذج
        const updatedService = {
            serviceName: document.getElementById("serviceName").value,
            serviceDescription: document.getElementById("serviceDescription").value,
            category: document.getElementById("category").value,
            cost: document.getElementById("cost").value,
            duration: document.getElementById("duration").value,
            requirements: document.getElementById("requirements").value,
            paymentMethods: document.getElementById("paymentMethods").value,
            contactInfo: document.getElementById("contactInfo").value
        };

        // تحديث الخلايا في الصف الحالي
        cells[0].innerText = updatedService.serviceName;
        cells[1].innerText = updatedService.serviceDescription;
        cells[2].innerText = updatedService.category;
        cells[3].innerText = updatedService.cost;
        cells[4].innerText = updatedService.duration;
        cells[5].innerText = updatedService.requirements;
        cells[6].innerText = updatedService.paymentMethods;
        cells[7].innerText = updatedService.contactInfo;

        // تحديث Local Storage
        let services = JSON.parse(localStorage.getItem("services")) || [];
        const rowId = currentRow.dataset.id - 1; // الحصول على المعرف كفهرس في المصفوفة
        services[rowId] = updatedService; // تحديث الخدمة المعدلة في المصفوفة
        localStorage.setItem("services", JSON.stringify(services)); // حفظ التحديثات في Local Storage

        currentRow = null; // مسح الصف الحالي بعد التحديث
    }

    closeModal(); // إغلاق النافذة بعد التحديث
}

// تحميل الخدمات من Local Storage عند تحميل الصفحة
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
            <td>${service.duration}</td>
            <td>${service.requirements}</td>
            <td>${service.paymentMethods}</td>
            <td>${service.contactInfo}</td>
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

    const newService = {
        id: Date.now(), // معرف فريد للخدمة باستخدام الوقت الحالي
        serviceName: document.getElementById("serviceName").value,
        serviceDescription: document.getElementById("serviceDescription").value,
        category: document.getElementById("category").value,
        cost: document.getElementById("cost").value,
        duration: document.getElementById("duration").value,
        requirements: document.getElementById("requirements").value,
        paymentMethods: document.getElementById("paymentMethods").value,
        contactInfo: document.getElementById("contactInfo").value
    };

    // جلب الخدمات الحالية من Local Storage
    let services = JSON.parse(localStorage.getItem("services")) || [];
    services.push(newService); // إضافة الخدمة الجديدة إلى القائمة
    localStorage.setItem("services", JSON.stringify(services)); // حفظ القائمة المحدثة

    // تخزين معرف الخدمة الجديدة في Local Storage لتمييزها في صفحة الخدمات
    localStorage.setItem("newServiceId", newService.id);

    // إعادة التوجيه إلى صفحة الخدمات
    window.location.href = "services.html";
}
