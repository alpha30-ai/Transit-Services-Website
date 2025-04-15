document.addEventListener("DOMContentLoaded", function() {
            // العناصر الرئيسية في الصفحة
            const pharmacyFilter = document.getElementById("pharmacyFilter");
            const heroPharmacyFilter = document.getElementById("heroPharmacyFilter");
            const priceRange = document.getElementById("priceRange");
            const categoryFilter = document.getElementById("category");
            const availabilityFilter = document.getElementById("availability");
            const searchInput = document.getElementById("search");
            const heroSearchInput = document.getElementById("heroSearch");
            const pharmacyName = document.getElementById("pharmacyName");
            const pharmacyDescription = document.getElementById("pharmacyDescription");
            const pharmacyImg = document.getElementById("pharmacyImg");
            const pharmacyProducts = document.getElementById("pharmacyProducts");
            const defaultPharmacyImage = "img/75867863.jpg"; // صورة افتراضية

            // عناصر الواجهة المحسنة
            const backToTopBtn = document.getElementById("backToTop");
            const successToast = document.getElementById("successToast");
            const errorToast = document.getElementById("errorToast");
            const warningToast = document.getElementById("warningToast");
            const loadingIndicator = document.getElementById("loadingIndicator");
            const filterTags = document.querySelectorAll(".pharmacy-filter-tag");
            const resetFiltersBtn = document.querySelector(".reset-filters-btn");
            const applyFiltersBtn = document.querySelector(".apply-filters-btn");
            const paginationButtons = document.querySelectorAll(".pagination-btn");

            // تفعيل التبديل بين المنتجات عند الضغط على أزرار الترقيم
            paginationButtons.forEach(button => {
                button.addEventListener("click", function() {
                    // إزالة الفئة النشطة من جميع الأزرار
                    paginationButtons.forEach(btn => btn.classList.remove("active"));

                    // إضافة الفئة النشطة للزر المضغوط
                    if (!this.classList.contains("prev") && !this.classList.contains("next")) {
                        this.classList.add("active");

                        // إظهار مؤشر التحميل
                        loadingIndicator.classList.add("show");

                        // محاكاة تحميل البيانات
                        setTimeout(() => {
                            loadingIndicator.classList.remove("show");

                            // إظهار رسالة نجاح بشكل أكثر احترافية
                            showToast(successToast, "تم عرض المنتجات - الصفحة " + this.textContent);

                            // تمرير تلقائي للأعلى
                            window.scrollTo({
                                top: document.querySelector(".pharmacy-products").offsetTop - 100,
                                behavior: "smooth"
                            });

                            // إظهار تأثير انتقالي للمنتجات عند تغيير الصفحة
                            const productCards = document.querySelectorAll(".product-card");

                            // إخفاء المنتجات بشكل متتالي
                            productCards.forEach((card, index) => {
                                card.style.opacity = "0";
                                card.style.transform = "translateY(20px)";

                                // إظهار المنتجات بشكل متتالي مع تأخير مختلف لكل منتج
                                setTimeout(() => {
                                    card.style.transition = "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.5)";
                                    card.style.opacity = "1";
                                    card.style.transform = "translateY(0)";
                                }, 100 + (index * 50));
                            });
                        }, 800);
                    }
                });
            });

            // دالة لعرض الإشعارات
            function showToast(toastElement, message = null) {
                if (message) {
                    const messageSpan = toastElement.querySelector("span");
                    if (messageSpan) {
                        messageSpan.textContent = message;
                    }
                }

                toastElement.classList.add("show");
                setTimeout(() => {
                    toastElement.classList.remove("show");
                }, 3000);
            }

            // لا نقوم بالتحويل التلقائي إلى الصفحة رقم 2
            // نترك للمستخدم حرية التنقل بين الصفحات

            const productsData = [
                // صيدلية 1
                {
                    name: "باراسيتامول",
                    description: "مسكن للألم وخافض للحرارة.",
                    price: 25,
                    discountedPrice: 22.5,
                    category: "medicines",
                    availability: "in-stock",
                    pharmacyId: "1",
                    image: "img/paracetamol-extra-en.jpg",
                    discount: "10%"
                },
                {
                    name: "أسبرين",
                    description: "مسكن للألم ومضاد للتجلط.",
                    price: 15,
                    discountedPrice: 13.5,
                    category: "medicines",
                    availability: "out-of-stock",
                    pharmacyId: "1",
                    image: "img/prod-packshot-aspirin-protect-ar2 (1).png",
                    discount: "5%"
                },
                {
                    name: "مراهم للحروق",
                    description: "مراهم لعلاج الحروق والتهيج.",
                    price: 20,
                    discountedPrice: 18,
                    category: "medicines",
                    availability: "in-stock",
                    pharmacyId: "1",
                    image: "img/61PUJAOhQoL.jpg",
                    discount: "0%"
                },
                {
                    name: "بروبيوتيك",
                    description: "مكمل غذائي يحسن صحة الجهاز الهضمي.",
                    price: 35,
                    discountedPrice: 31.5,
                    category: "medicines",
                    availability: "in-stock",
                    pharmacyId: "1",
                    image: "img/10Bo_grande.webp",
                    discount: "10%"
                },
                {
                    name: "فيتامين D",
                    description: "مكمل غذائي لتعزيز صحة العظام.",
                    price: 20,
                    discountedPrice: 18,
                    category: "supplements",
                    availability: "in-stock",
                    pharmacyId: "1",
                    image: "img/vitamin-d.jpg",
                    discount: "10%"
                },
                {
                    name: "مضاد حيوي",
                    description: "مضاد حيوي لعلاج العدوى البكتيرية.",
                    price: 40,
                    discountedPrice: 36,
                    category: "medicines",
                    availability: "in-stock",
                    pharmacyId: "1",
                    image: "img/antibiotic.png",
                    discount: "10%"
                },
                {
                    name: "مسكن للحساسية",
                    description: "مسكن لأعراض الحساسية.",
                    price: 25,
                    discountedPrice: 22.5,
                    category: "medicines",
                    availability: "in-stock",
                    pharmacyId: "1",
                    image: "img/allergy-relief.webp",
                    discount: "10%"
                },
                {
                    name: "مرهم للجروح",
                    description: "مرهم لعلاج الجروح والكدمات.",
                    price: 15,
                    discountedPrice: 13.5,
                    category: "medicines",
                    availability: "in-stock",
                    pharmacyId: "1",
                    image: "img/wound-cream.jpg",
                    discount: "10%"
                },
                {
                    name: "مسكن للسعال",
                    description: "مسكن للسعال والتهابات الحلق.",
                    price: 20,
                    discountedPrice: 18,
                    category: "medicines",
                    availability: "in-stock",
                    pharmacyId: "1",
                    image: "img/cough-syrup.webp",
                    discount: "10%"
                },
                {
                    name: "مضاد للاكتئاب",
                    description: "دواء لعلاج الاكتئاب.",
                    price: 50,
                    discountedPrice: 45,
                    category: "medicines",
                    availability: "in-stock",
                    pharmacyId: "1",
                    image: "img/antidepressant.png",
                    discount: "10%"
                },
                {
                    name: "كريم مرطب للبشرة",
                    description: "كريم مرطب ومغذي للبشرة الجافة.",
                    price: 30,
                    discountedPrice: 28,
                    category: "cosmetics",
                    availability: "in-stock",
                    pharmacyId: "1",
                    image: "img/c16bda81-6a8e-42b8-b97c-2df4c33574dc.jpg",
                    discount: "0%"
                },
                {
                    name: "شامبو ضد القشرة",
                    description: "شامبو فعال ضد القشرة والشعر الجاف.",
                    price: 40,
                    discountedPrice: 38,
                    category: "cosmetics",
                    availability: "out-of-stock",
                    pharmacyId: "1",
                    image: "img/tm-23057-head-shoulders.jpg",
                    discount: "5%"
                },
                {
                    name: "مضاد للالتهابات",
                    description: "دواء لعلاج الالتهابات المختلفة.",
                    availability: "out-of-stock",
                    pharmacyId: "1",
                    image: "img/anti-inflammatory.jpg",
                    discount: "0%"
                },
                {
                    name: "مرهم للالتهابات الجلدية",
                    description: "مرهم لعلاج الالتهابات الجلدية والطفح الجلدي.",
                    availability: "out-of-stock",
                    pharmacyId: "1",
                    image: "img/skin-inflammation-cream.jpg",
                    discount: "0%"
                },
                {
                    name: "مسكن للصداع",
                    description: "دواء لعلاج الصداع الشديد.",
                    availability: "out-of-stock",
                    pharmacyId: "1",
                    image: "img/headache-relief.jpg",
                    discount: "0%"
                },
                {
                    name: "مرهم للتهاب المفاصل",
                    description: "مرهم لعلاج التهاب المفاصل والألم المفصلي.",
                    availability: "out-of-stock",
                    pharmacyId: "1",
                    image: "img/joint-pain-cream.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للقلب",
                    description: "مكمل غذائي لتعزيز صحة القلب والأوعية الدموية.",
                    availability: "out-of-stock",
                    pharmacyId: "1",
                    image: "img/heart-health-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للجهاز الهضمي",
                    description: "مكمل غذائي يحتوي على ألياف لتحسين صحة الجهاز الهضمي.",
                    availability: "out-of-stock",
                    pharmacyId: "1",
                    image: "img/digestive-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للجلد",
                    description: "مكمل غذائي يحتوي على كولاجين لتحسين صحة الجلد.",
                    availability: "out-of-stock",
                    pharmacyId: "1",
                    image: "img/skin-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للعيون",
                    description: "مكمل غذائي يحتوي على فيتامينات لتحسين صحة العيون.",
                    availability: "out-of-stock",
                    pharmacyId: "1",
                    image: "img/eye-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للمفاصل",
                    description: "مكمل غذائي يحتوي على غلوكوزامين لتحسين صحة المفاصل.",
                    availability: "out-of-stock",
                    pharmacyId: "1",
                    image: "img/joint-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للطاقة",
                    description: "مكمل غذائي يحتوي على فيتامينات لزيادة الطاقة.",
                    availability: "out-of-stock",
                    pharmacyId: "1",
                    image: "img/energy-supplement.jpg",
                    discount: "0%"
                },
                // صيدلية 2
                {
                    name: "كريم مرطب للبشرة",
                    description: "كريم مرطب ومغذي للبشرة الجافة.",
                    price: 30,
                    discountedPrice: 28,
                    category: "cosmetics",
                    availability: "in-stock",
                    pharmacyId: "2",
                    image: "img/c16bda81-6a8e-42b8-b97c-2df4c33574dc.jpg",
                    discount: "0%"
                },
                {
                    name: "شامبو ضد القشرة",
                    description: "شامبو فعال ضد القشرة والشعر الجاف.",
                    price: 40,
                    discountedPrice: 38,
                    category: "cosmetics",
                    availability: "out-of-stock",
                    pharmacyId: "2",
                    image: "img/tm-23057-head-shoulders.jpg",
                    discount: "5%"
                },
                {
                    name: "كريم ضد التجاعيد",
                    description: "كريم فعال لمكافحة علامات التقدم في السن.",
                    price: 80,
                    discountedPrice: 75,
                    category: "cosmetics",
                    availability: "in-stock",
                    pharmacyId: "2",
                    image: "img/Vichy-liftaciv-collagen-specialist-cream.jpg",
                    discount: "10%"
                },
                {
                    name: "كريم تفتيح",
                    description: "كريم لتفتيح البشرة وإزالة العيوب.",
                    price: 50,
                    discountedPrice: 45,
                    category: "cosmetics",
                    availability: "in-stock",
                    pharmacyId: "2",
                    image: "img/skin-lightening-cream.webp",
                    discount: "10%"
                },
                {
                    name: "مزيل المكياج",
                    description: "مزيل مكياج فعال لجميع أنواع البشرة.",
                    price: 25,
                    discountedPrice: 22.5,
                    category: "cosmetics",
                    availability: "in-stock",
                    pharmacyId: "2",
                    image: "img/makeup-remover.webp",
                    discount: "10%"
                },
                {
                    name: "كريم حماية من الشمس",
                    description: "كريم حماية من أشعة الشمس بعامل حماية عالي.",
                    price: 35,
                    discountedPrice: 31.5,
                    category: "cosmetics",
                    availability: "in-stock",
                    pharmacyId: "2",
                    image: "img/sunscreen.jpg",
                    discount: "10%"
                },
                {
                    name: "مرطب للشفاه",
                    description: "مرطب للشفاه بنكهات متعددة.",
                    price: 10,
                    discountedPrice: 9,
                    category: "cosmetics",
                    availability: "in-stock",
                    pharmacyId: "2",
                    image: "img/lip-balm.jpg",
                    discount: "10%"
                },
                {
                    name: "كريم لليدين",
                    description: "كريم مرطب ومغذي لليدين الجافة.",
                    price: 20,
                    discountedPrice: 18,
                    category: "cosmetics",
                    availability: "in-stock",
                    pharmacyId: "2",
                    image: "img/hand-cream.webp",
                    discount: "10%"
                },
                {
                    name: "مسكرة للرموش",
                    description: "مسكرة رموش تعزز من طول وكثافة الرموش.",
                    price: 30,
                    discountedPrice: 27,
                    category: "cosmetics",
                    availability: "in-stock",
                    pharmacyId: "2",
                    image: "img/mascara.jpg",
                    discount: "10%"
                },
                {
                    name: "أحمر شفاه",
                    description: "أحمر شفاه بألوان متعددة وطويل التحمل.",
                    price: 25,
                    discountedPrice: 22.5,
                    category: "cosmetics",
                    availability: "in-stock",
                    pharmacyId: "2",
                    image: "img/lipstick.jpg",
                    discount: "10%"
                },
                {
                    name: "مرهم للبشرة الدهنية",
                    description: "مرهم للبشرة الدهنية يساعد في التخلص من الزيوت الزائدة.",
                    price: 30,
                    discountedPrice: 27,
                    category: "cosmetics",
                    availability: "in-stock",
                    pharmacyId: "2",
                    image: "img/oily-skin-cream.jpg",
                    discount: "10%"
                },
                {
                    name: "مرهم للبشرة الحساسة",
                    description: "مرهم للبشرة الحساسة يساعد في تهدئة البشرة.",
                    price: 35,
                    discountedPrice: 31.5,
                    category: "cosmetics",
                    availability: "in-stock",
                    pharmacyId: "2",
                    image: "img/sensitive-skin-cream.webp",
                    discount: "10%"
                },
                {
                    name: "مرهم للالتهابات الجلدية",
                    description: "مرهم لعلاج الالتهابات الجلدية والطفح الجلدي.",
                    availability: "out-of-stock",
                    pharmacyId: "2",
                    image: "img/skin-inflammation-cream.webp",
                    discount: "0%"
                },
                {
                    name: "مسكن للصداع",
                    description: "دواء لعلاج الصداع الشديد.",
                    availability: "out-of-stock",
                    pharmacyId: "2",
                    image: "img/headache-relief.webp",
                    discount: "0%"
                },
                {
                    name: "مرهم للتهاب المفاصل",
                    description: "مرهم لعلاج التهاب المفاصل والألم المفصلي.",
                    availability: "out-of-stock",
                    pharmacyId: "2",
                    image: "img/joint-pain-cream.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للقلب",
                    description: "مكمل غذائي لتعزيز صحة القلب والأوعية الدموية.",
                    availability: "out-of-stock",
                    pharmacyId: "2",
                    image: "img/heart-health-supplement.webp",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للجهاز الهضمي",
                    description: "مكمل غذائي يحتوي على ألياف لتحسين صحة الجهاز الهضمي.",
                    availability: "out-of-stock",
                    pharmacyId: "2",
                    image: "img/digestive-supplement.webp",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للجلد",
                    description: "مكمل غذائي يحتوي على كولاجين لتحسين صحة الجلد.",
                    availability: "out-of-stock",
                    pharmacyId: "2",
                    image: "img/skin-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للعيون",
                    description: "مكمل غذائي يحتوي على فيتامينات لتحسين صحة العيون.",
                    availability: "out-of-stock",
                    pharmacyId: "2",
                    image: "img/vitabar-vision-en.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للمفاصل",
                    description: "مكمل غذائي يحتوي على غلوكوزامين لتحسين صحة المفاصل.",
                    availability: "out-of-stock",
                    pharmacyId: "2",
                    image: "img/joint-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للطاقة",
                    description: "مكمل غذائي يحتوي على فيتامينات لزيادة الطاقة.",
                    availability: "out-of-stock",
                    pharmacyId: "2",
                    image: "img/energy-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للشعر",
                    description: "مكمل غذائي يحتوي على فيتامينات لتحسين صحة الشعر.",
                    availability: "out-of-stock",
                    pharmacyId: "2",
                    image: "img/hair-supplement.webp",
                    discount: "0%"
                },
                // صيدلية 3
                {
                    name: "فيتامين C",
                    description: "سي-ريتارد (فيتامين سي) 500 مغ 10 كبسولات",
                    price: 50,
                    discountedPrice: 45,
                    category: "supplements",
                    availability: "in-stock",
                    pharmacyId: "3",
                    image: "img/vitc_1.jpg",
                    discount: "10%"
                },
                {
                    name: "مكمل غذائي للعضلات",
                    description: "بودي بيلدر مكمل غذائي لبناء العضلات بنكهة الشوكولاتة - 4.5 كجم",
                    price: 120,
                    discountedPrice: 110,
                    category: "supplements",
                    availability: "out-of-stock",
                    pharmacyId: "3",
                    image: "img/1000026639_1.jpg",
                    discount: "10%"
                },
                {
                    name: "حبوب مغذية للشعر",
                    description: "حبوب تساعد على تحسين نمو الشعر.",
                    price: 60,
                    discountedPrice: 55,
                    category: "supplements",
                    availability: "in-stock",
                    pharmacyId: "3",
                    image: "img/Untitled-design-2024-03-17T022743.547.webp",
                    discount: "5%"
                },
                {
                    name: "أوميجا 3",
                    description: "مكمل غذائي يحتوي على أحماض دهنية أوميجا 3.",
                    price: 40,
                    discountedPrice: 36,
                    category: "supplements",
                    availability: "in-stock",
                    pharmacyId: "3",
                    image: "img/omega-3.jpg",
                    discount: "10%"
                },
                {
                    name: "مكمل غذائي للكالسيوم",
                    description: "مكمل غذائي يحتوي على الكالسيوم وفيتامين D.",
                    price: 30,
                    discountedPrice: 27,
                    category: "supplements",
                    availability: "in-stock",
                    pharmacyId: "3",
                    image: "img/calcium-supplement.webp",
                    discount: "10%"
                },
                {
                    name: "مكمل غذائي للحديد",
                    description: "مكمل غذائي يحتوي على الحديد لعلاج فقر الدم.",
                    price: 25,
                    discountedPrice: 22.5,
                    category: "supplements",
                    availability: "in-stock",
                    pharmacyId: "3",
                    image: "img/iron-supplement.jpg",
                    discount: "10%"
                },
                {
                    name: "مكمل غذائي للمغنيسيوم",
                    description: "مكمل غذائي يحتوي على المغنيسيوم لتحسين صحة العظام.",
                    price: 20,
                    discountedPrice: 18,
                    category: "supplements",
                    availability: "in-stock",
                    pharmacyId: "3",
                    image: "img/magnesium-supplement.webp",
                    discount: "10%"
                },
                {
                    name: "مكمل غذائي للزنك",
                    description: "مكمل غذائي يحتوي على الزنك لتعزيز المناعة.",
                    price: 15,
                    discountedPrice: 13.5,
                    category: "supplements",
                    availability: "in-stock",
                    pharmacyId: "3",
                    image: "img/zinc-supplement.webp",
                    discount: "10%"
                },
                {
                    name: "مكمل غذائي للبروتين",
                    description: "مكمل غذائي يحتوي على البروتين لبناء العضلات.",
                    price: 50,
                    discountedPrice: 45,
                    category: "supplements",
                    availability: "in-stock",
                    pharmacyId: "3",
                    image: "img/protein-supplement.webp",
                    discount: "10%"
                },
                {
                    name: "مكمل غذائي للفيتامينات المتعددة",
                    description: "مكمل غذائي يحتوي على مجموعة من الفيتامينات والمعادن.",
                    price: 40,
                    discountedPrice: 36,
                    category: "supplements",
                    availability: "in-stock",
                    pharmacyId: "3",
                    image: "img/multivitamin-supplement.jpg",
                    discount: "10%"
                },
                {
                    name: "مكمل غذائي للقلب",
                    description: "مكمل غذائي لتعزيز صحة القلب والأوعية الدموية.",
                    availability: "out-of-stock",
                    pharmacyId: "3",
                    image: "img/heart-health-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للجهاز الهضمي",
                    description: "مكمل غذائي يحتوي على ألياف لتحسين صحة الجهاز الهضمي.",
                    availability: "out-of-stock",
                    pharmacyId: "3",
                    image: "img/digestive-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للجلد",
                    description: "مكمل غذائي يحتوي على كولاجين لتحسين صحة الجلد.",
                    availability: "out-of-stock",
                    pharmacyId: "3",
                    image: "img/skin-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للعيون",
                    description: "مكمل غذائي يحتوي على فيتامينات لتحسين صحة العيون.",
                    availability: "out-of-stock",
                    pharmacyId: "3",
                    image: "img/eye-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للمفاصل",
                    description: "مكمل غذائي يحتوي على غلوكوزامين لتحسين صحة المفاصل.",
                    availability: "out-of-stock",
                    pharmacyId: "3",
                    image: "img/joint-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للطاقة",
                    description: "مكمل غذائي يحتوي على فيتامينات لزيادة الطاقة.",
                    availability: "out-of-stock",
                    pharmacyId: "3",
                    image: "img/energy-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للشعر",
                    description: "مكمل غذائي يحتوي على فيتامينات لتحسين صحة الشعر.",
                    availability: "out-of-stock",
                    pharmacyId: "3",
                    image: "img/hair-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للأظافر",
                    description: "مكمل غذائي يحتوي على فيتامينات لتحسين صحة الأظافر.",
                    availability: "out-of-stock",
                    pharmacyId: "3",
                    image: "img/nail-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للجلد الدهني",
                    description: "مكمل غذائي يحتوي على فيتامينات لتحسين صحة الجلد الدهني.",
                    availability: "out-of-stock",
                    pharmacyId: "3",
                    image: "img/oily-skin-supplement.jpg",
                    discount: "0%"
                },
                {
                    name: "مكمل غذائي للجلد الحساس",
                    description: "مكمل غذائي يحتوي على فيتامينات لتحسين صحة الجلد الحساس.",
                    availability: "out-of-stock",
                    pharmacyId: "3",
                    image: "img/sensitive-skin-supplement.jpg",
                    discount: "0%"
                }
            ];

            // بيانات الصيدليات
            const pharmaciesData = [
                {
                    id: "1",
                    name: "صيدلية الشفاء",
                    description: "صيدلية متكاملة تحتوي على أدوية متنوعة والمكملات الغذائية.",
                    image: "img/pharmacy1.jpg"
                },
                {
                    id: "2",
                    name: "صيدلية لؤي",
                    description: "صيدلية متخصصة في المستحضرات التجميلية والمكملات الصحية.",
                    image: "img/pharmacy2.jpg"
                },
                {
                    id: "3",
                    name: "صيدلية مستشفى العبور",
                    description: "صيدلية متكاملة تابعة لمستشفى العبور تحتوي على أدوية وعلاجات متنوعة.",
                    image: "img/pharmacy3.jpg"
                }
            ];

            pharmacyFilter.addEventListener("change", function () {
                filterProducts();
                addEventListeners(); // إعادة تعيين مستمعي الأحداث لأزرار السلة والمفضلة
            });

            function filterProducts() {
                const selectedPharmacyId = pharmacyFilter.value;
                const selectedCategory = categoryFilter.value;
                const selectedAvailability = availabilityFilter.value;
                const maxPrice = priceRange.value;

                const filteredProducts = productsData.filter(product => {
                    const matchesPharmacy = selectedPharmacyId === "0" || product.pharmacyId === selectedPharmacyId;
                    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
                    const matchesAvailability = selectedAvailability === "all" || product.availability === selectedAvailability;
                    const matchesPrice = product.discountedPrice <= maxPrice;

                    return matchesPharmacy && matchesCategory && matchesAvailability && matchesPrice;
                });

                renderProducts(filteredProducts);
            }

            function renderProducts(products) {
                // إظهار مؤشر التحميل
                loadingIndicator.classList.add('show');

                // مسح المنتجات السابقة
                pharmacyProducts.innerHTML = "";

                setTimeout(() => {
                    if (products.length === 0) {
                        pharmacyProducts.innerHTML = `
                            <div class="no-products-message">
                                <i class="fas fa-search"></i>
                                <p>لا توجد منتجات تتناسب مع الفلاتر المحددة.</p>
                                <button class="reset-filters-btn" id="resetFilters">إعادة ضبط الفلاتر</button>
                            </div>
                        `;

                        // إضافة حدث لزر إعادة الضبط
                        document.getElementById('resetFilters').addEventListener('click', resetAllFilters);
                    } else {
                        products.forEach(product => {
                            const productCard = document.createElement("div");
                            productCard.classList.add("product-card");

                            // تحديد حالة المنتج (متوفر أو غير متوفر)
                            const availabilityClass = product.availability === "in-stock" ? "in-stock" : "out-of-stock";
                            const availabilityText = product.availability === "in-stock" ? "متوفر" : "غير متوفر";

                            productCard.innerHTML = `
                                <div class="product-image">
                                    <img src="${product.image}" alt="${product.name}">
                                    ${product.discount && product.discount !== "0%" ? `<span class="discount">خصم ${product.discount}</span>` : ""}
                                </div>
                                <div class="product-info">
                                    <h3>${product.name}</h3>
                                    <p class="product-description">${product.description}</p>
                                    <div class="price">
                                        <div class="price-info">
                                            <span class="original-price">${product.price} جنيه</span>
                                            <span class="discounted-price">${product.discountedPrice} جنيه</span>
                                        </div>
                                        <span class="product-badge ${availabilityClass}">${availabilityText}</span>
                                    </div>
                                    <div class="product-actions">
                                        <button class="add-to-favorite"><i class="fa-regular fa-heart"></i> المفضلة</button>
                                        <button class="add-to-cart" ${product.availability !== "in-stock" ? 'disabled' : ''}>
                                            <i class="fa-solid fa-cart-plus"></i> إضافة للسلة
                                        </button>
                                    </div>
                                </div>
                            `;

                            pharmacyProducts.appendChild(productCard);
                        });
                    }

                    // إخفاء مؤشر التحميل
                    loadingIndicator.classList.remove('show');

                    // إعادة تعيين مستمعي الأحداث لأزرار السلة والمفضلة
                    addEventListeners();
                }, 500); // تأخير بسيط لإظهار مؤشر التحميل
            }

            // وظيفة إعادة ضبط جميع الفلاتر
            function resetAllFilters() {
                pharmacyFilter.value = "0";
                heroPharmacyFilter.value = "0";
                priceRange.value = priceRange.max;
                categoryFilter.value = "all";
                availabilityFilter.value = "all";
                searchInput.value = "";
                heroSearchInput.value = "";
                document.getElementById('priceDisplay').textContent = 'السعر: ' + priceRange.value;

                filterProducts();
                showToast(successToast, 'تم إعادة ضبط جميع الفلاتر');
            }

            function addEventListeners() {
                const cartButtons = document.querySelectorAll(".add-to-cart");
                const favoriteButtons = document.querySelectorAll(".add-to-favorite");
                const productImages = document.querySelectorAll(".product-image img");

                cartButtons.forEach((button) => {
                    if (button.disabled) return; // تخطي الأزرار المعطلة

                    button.addEventListener("click", function () {
                        const productCard = this.closest(".product-card");
                        const product = {
                            id: Date.now().toString(), // إضافة معرف فريد للمنتج
                            image: productCard.querySelector(".product-image img").src,
                            name: productCard.querySelector("h3").textContent,
                            description: productCard.querySelector(".product-description").textContent,
                            originalPrice: productCard.querySelector(".price-info .original-price").textContent,
                            price: parseFloat(productCard.querySelector(".price-info .discounted-price").textContent.replace(/[^\d.]/g, "")),
                            service: "pharmacy", // إضافة نوع الخدمة
                            category: "supplements", // إضافة فئة افتراضية
                            dateAdded: new Date().getTime() // إضافة وقت الإضافة
                        };

                        // إظهار مؤشر التحميل
                        loadingIndicator.classList.add('show');

                        setTimeout(() => {
                            let myCart = JSON.parse(localStorage.getItem("myCart")) || [];
                            const existingProductIndex = myCart.findIndex(item => item.name === product.name);

                            if (existingProductIndex !== -1) {
                                myCart[existingProductIndex].quantity = (myCart[existingProductIndex].quantity || 1) + 1;
                            } else {
                                product.quantity = 1;
                                myCart.push(product);
                            }

                            localStorage.setItem("myCart", JSON.stringify(myCart));
                            updateCartDisplay();

                            // إخفاء مؤشر التحميل وإظهار رسالة نجاح
                            loadingIndicator.classList.remove('show');
                            showToast(successToast, 'تمت إضافة المنتج إلى السلة!');
                        }, 500);
                    });
                });

                favoriteButtons.forEach((button) => {
                    button.addEventListener("click", function () {
                        const productCard = this.closest(".product-card");
                        const product = {
                            id: Date.now().toString(), // إضافة معرف فريد للمنتج
                            image: productCard.querySelector(".product-image img").src,
                            name: productCard.querySelector("h3").textContent,
                            description: productCard.querySelector(".product-description").textContent,
                            originalPrice: productCard.querySelector(".price-info .original-price").textContent,
                            price: parseFloat(productCard.querySelector(".price-info .discounted-price").textContent.replace(/[^\d.]/g, "")),
                            discountedPrice: parseFloat(productCard.querySelector(".price-info .discounted-price").textContent.replace(/[^\d.]/g, "")),
                            service: "pharmacy", // إضافة نوع الخدمة
                            category: "supplements", // إضافة فئة افتراضية
                            rating: 4.5, // إضافة تقييم افتراضي
                            ratingCount: 10, // إضافة عدد تقييمات افتراضي
                            availability: "in-stock", // إضافة حالة توفر افتراضية
                            dateAdded: new Date().getTime() // إضافة وقت الإضافة
                        };

                        // إظهار مؤشر التحميل
                        loadingIndicator.classList.add('show');

                        setTimeout(() => {
                            let myFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
                            const existingProductIndex = myFavorites.findIndex(item => item.name === product.name);

                            if (existingProductIndex !== -1) {
                                // إزالة المنتج من المفضلة إذا كان موجوداً بالفعل
                                myFavorites.splice(existingProductIndex, 1);
                                localStorage.setItem("myFavorites", JSON.stringify(myFavorites));

                                // تغيير شكل الزر
                                this.innerHTML = '<i class="fa-regular fa-heart"></i> المفضلة';

                                loadingIndicator.classList.remove('show');
                                showToast(successToast, 'تمت إزالة المنتج من المفضلة');
                            } else {
                                myFavorites.push(product);
                                localStorage.setItem("myFavorites", JSON.stringify(myFavorites));

                                // تغيير شكل الزر
                                this.innerHTML = '<i class="fa-solid fa-heart"></i> المفضلة';

                                loadingIndicator.classList.remove('show');
                                showToast(successToast, 'تمت إضافة المنتج إلى المفضلة!');
                            }

                            updateFavoritesDisplay();
                        }, 500);
                    });
                });

                productImages.forEach((img) => {
                    img.addEventListener("click", function () {
                        const productCard = this.closest(".product-card");
                        const product = {
                            image: productCard.querySelector(".product-image img").src,
                            name: productCard.querySelector("h3").textContent,
                            description: productCard.querySelector(".product-description").textContent,
                            originalPrice: productCard.querySelector(".price-info .original-price").textContent,
                            discountedPrice: productCard.querySelector(".price-info .discounted-price").textContent
                        };

                        // إظهار مؤشر التحميل
                        loadingIndicator.classList.add('show');

                        // تخزين المنتج في التخزين المحلي
                        localStorage.setItem("productDetails", JSON.stringify(product));

                        // الانتقال إلى صفحة تفاصيل المنتج
                        setTimeout(() => {
                            window.location.href = "product_details.html";
                        }, 300);
                    });
                });
            }

            // وظيفة لإظهار الرسائل المنبثقة
            function showToast(toastElement, message = null) {
                // إغلاق أي إشعارات مفتوحة
                const activeToasts = document.querySelectorAll('.toast-notification.show');
                activeToasts.forEach(toast => {
                    toast.classList.remove('show');
                });

                // تحديث نص الإشعار إذا تم توفيره
                if (message) {
                    toastElement.querySelector('span').textContent = message;
                }

                // إضافة فئة العرض
                toastElement.classList.add('show');

                // إعادة تعيين الرسوم المتحركة للمؤقت
                const timerBar = toastElement.querySelector('::after');
                if (timerBar) {
                    timerBar.style.animation = 'none';
                    setTimeout(() => {
                        timerBar.style.animation = '';
                    }, 10);
                }

                // إضافة زر إغلاق مؤقتاً إذا لم يكن موجوداً
                if (!toastElement.querySelector('.close-toast')) {
                    const closeBtn = document.createElement('button');
                    closeBtn.className = 'close-toast';
                    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                    closeBtn.addEventListener('click', () => {
                        toastElement.classList.remove('show');
                    });
                    toastElement.appendChild(closeBtn);
                }

                // إغلاق الإشعار تلقائياً بعد فترة زمنية
                let duration = 5000; // المدة الافتراضية

                // تحديد مدة مختلفة حسب نوع الإشعار
                if (toastElement.classList.contains('success')) {
                    duration = 5000;
                } else if (toastElement.classList.contains('error')) {
                    duration = 7000;
                } else if (toastElement.classList.contains('warning')) {
                    duration = 6000;
                }

                // إضافة تأثير صوتي للإشعار
                const audio = new Audio();
                if (toastElement.classList.contains('success')) {
                    audio.src = 'sounds/success.mp3';
                } else if (toastElement.classList.contains('error')) {
                    audio.src = 'sounds/error.mp3';
                } else if (toastElement.classList.contains('warning')) {
                    audio.src = 'sounds/warning.mp3';
                }
                audio.volume = 0.5;
                audio.play().catch(e => console.log('Audio play failed:', e));

                // إغلاق الإشعار بعد المدة المحددة
                clearTimeout(toastElement.timeoutId);
                toastElement.timeoutId = setTimeout(() => {
                    toastElement.classList.remove('show');
                }, duration);
            }

            function updateCartDisplay() {
                const cartCount = document.getElementById("cartCount");
                if (cartCount) {
                    const myCart = JSON.parse(localStorage.getItem("myCart")) || [];
                    const totalItems = myCart.reduce((total, item) => total + (item.quantity || 1), 0);
                    cartCount.textContent = totalItems;

                    // إضافة تأثير لعدد المنتجات في السلة
                    cartCount.classList.add('animate-count');
                    setTimeout(() => {
                        cartCount.classList.remove('animate-count');
                    }, 500);
                }

                // تحديث إجمالي سعر السلة
                const cartTotalPrice = document.getElementById('cartTotalPrice');
                if (cartTotalPrice) {
                    const myCart = JSON.parse(localStorage.getItem("myCart")) || [];
                    const totalPrice = myCart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0);
                    cartTotalPrice.textContent = `${totalPrice.toFixed(2)} جنيه`;
                }
            }

            function updateFavoritesDisplay() {
                const favoritesCount = document.getElementById("favoritesCount");
                if (favoritesCount) {
                    const myFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
                    favoritesCount.textContent = myFavorites.length;
                }
            }

            // ربط فلتر البانر الرئيسي مع فلتر المنتجات
            if (heroPharmacyFilter) {
                heroPharmacyFilter.addEventListener("change", function() {
                    pharmacyFilter.value = this.value;
                    filterProducts();
                });
            }

            // ربط بحث البانر الرئيسي مع بحث المنتجات
            if (heroSearchInput) {
                heroSearchInput.addEventListener("input", function() {
                    searchInput.value = this.value;
                    searchProducts();
                });
            }

            // مستمع حدث لشريط السعر
            priceRange.addEventListener("input", function () {
                filterProducts();
                document.querySelector('#priceDisplay span:last-child').textContent = this.value + ' جنيه';
            });

            // مستمعات أحداث للفلاتر
            categoryFilter.addEventListener("change", filterProducts);
            availabilityFilter.addEventListener("change", filterProducts);
            searchInput.addEventListener("input", searchProducts);

            // مستمعات أحداث لأزرار الفلتر
            if (resetFiltersBtn) {
                resetFiltersBtn.addEventListener('click', resetAllFilters);
            }

            if (applyFiltersBtn) {
                applyFiltersBtn.addEventListener('click', function() {
                    filterProducts();
                    showToast(successToast, 'تم تطبيق الفلاتر بنجاح');
                });
            }

            // مستمعات أحداث لشارات الفلتر
            if (filterTags) {
                filterTags.forEach(tag => {
                    tag.addEventListener('click', function() {
                        // إزالة الشارة عند النقر عليها
                        this.style.display = 'none';
                        // إعادة تطبيق الفلاتر
                        filterProducts();
                        // إظهار رسالة نجاح
                        showToast(successToast, 'تمت إزالة الفلتر: ' + this.querySelector('span').textContent);
                    });
                });
            }

            // زر العودة للأعلى
            if (backToTopBtn) {
                // إظهار الزر عند التمرير لأسفل
                window.addEventListener('scroll', function() {
                    if (window.scrollY > 300) {
                        backToTopBtn.classList.add('visible');
                    } else {
                        backToTopBtn.classList.remove('visible');
                    }
                });

                // العودة للأعلى عند النقر
                backToTopBtn.addEventListener('click', function() {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }

            // وظيفة البحث في المنتجات
            function searchProducts() {
                const searchText = searchInput.value.trim().toLowerCase();
                const productCards = document.querySelectorAll(".product-card");

                if (searchText === "") {
                    // إذا كان البحث فارغاً، أعد تطبيق الفلاتر
                    filterProducts();
                    return;
                }

                productCards.forEach((card) => {
                    const productName = card.querySelector("h3")?.textContent.trim().toLowerCase() || "";
                    const productDescription = card.querySelector(".product-description")?.textContent.trim().toLowerCase() || "";

                    if (productName.includes(searchText) || productDescription.includes(searchText)) {
                        card.style.display = "";
                    } else {
                        card.style.display = "none";
                    }
                });

                // إذا لم يتم العثور على نتائج
                const visibleCards = document.querySelectorAll(".product-card[style='']:not([style='display: none'])");
                if (visibleCards.length === 0) {
                    if (!document.querySelector('.no-search-results')) {
                        const noResults = document.createElement('div');
                        noResults.className = 'no-search-results';
                        noResults.innerHTML = `
                            <i class="fas fa-search"></i>
                            <p>لا توجد نتائج للبحث عن "${searchText}"</p>
                            <button class="reset-search-btn" id="resetSearch">مسح البحث</button>
                        `;
                        pharmacyProducts.appendChild(noResults);

                        document.getElementById('resetSearch').addEventListener('click', function() {
                            searchInput.value = '';
                            heroSearchInput.value = '';
                            filterProducts();
                        });
                    }
                } else {
                    const noResults = document.querySelector('.no-search-results');
                    if (noResults) {
                        noResults.remove();
                    }
                }
            }

            // تهيئة الصفحة عند التحميل
            filterProducts();

            // إظهار رسالة ترحيبية
            setTimeout(() => {
                showToast(successToast, 'مرحباً بك في صيدليات مدينة العبور!');
            }, 1000);
        });
