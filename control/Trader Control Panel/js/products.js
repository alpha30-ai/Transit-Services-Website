let currentRow = null;

// فتح نافذة التعديل وتعبئة البيانات
function editProduct(button) {
    currentRow = button.closest("tr");
    const cells = currentRow.querySelectorAll("td");

    document.getElementById("editProductName").value = cells[0].innerText;
    document.getElementById("editProductDescription").value = cells[1].innerText;
    document.getElementById("editCategory").value = cells[2].innerText;
    document.getElementById("editPrice").value = cells[3].innerText;
    document.getElementById("editStock").value = cells[4].innerText;

    document.getElementById("editProductModal").style.display = "flex"; // إظهار النافذة
}

// حفظ التعديلات
function updateProduct(event) {
    event.preventDefault();

    // التحقق من أن الصف الحالي موجود
    if (currentRow) {
        const updatedProduct = {
            productName: document.getElementById("editProductName").value,
            productDescription: document.getElementById("editProductDescription").value,
            category: document.getElementById("editCategory").value,
            price: document.getElementById("editPrice").value,
            stock: document.getElementById("editStock").value
        };

        const cells = currentRow.querySelectorAll("td");

        // تحديث الصف في الجدول
        cells[0].innerText = updatedProduct.productName;
        cells[1].innerText = updatedProduct.productDescription;
        cells[2].innerText = updatedProduct.category;
        cells[3].innerText = updatedProduct.price;
        cells[4].innerText = updatedProduct.stock;

        // حفظ البيانات المعدلة في LocalStorage
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const rowId = currentRow.dataset.id - 1;
        products[rowId] = updatedProduct; // تحديث البيانات في المصفوفة
        localStorage.setItem("products", JSON.stringify(products));

        closeModal(); // إغلاق النافذة
        currentRow = null; // إعادة تعيين الصف الحالي
    }
}

// إغلاق النافذة المنبثقة
function closeModal() {
    document.getElementById("editProductModal").style.display = "none";
}

// تحميل المنتجات من LocalStorage عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const tableBody = document.getElementById("productsTableBody");

    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.dataset.id = index + 1; // تعيين المعرف للصف
        row.innerHTML = `
            <td>${product.productName}</td>
            <td>${product.productDescription}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <!-- إضافة رابط حول الرمز التعريفي -->
            <td><a href="product-details.html?productId=${product.productId}">${product.productId}</a></td>
            <td>
                <button class="btn btn-edit" onclick="editProduct(this)">تعديل</button>
                <button class="btn btn-delete" onclick="deleteProduct(this)">حذف</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
});

// الدالة التي يتم استدعاؤها عند الضغط على المنتج في قائمة المنتجات
function selectProduct(product) {
    // تخزين معلومات المنتج في localStorage
    localStorage.setItem('invoiceProduct', JSON.stringify(product));
    // توجيه المستخدم إلى صفحة الفاتورة
    window.location.href = 'invoice.html'; // تأكد من أن الرابط يتوجه إلى صفحة الفاتورة
}
