document.addEventListener("DOMContentLoaded", function() {
            const pharmacyFilter = document.getElementById("pharmacyFilter");
            const priceRange = document.getElementById("priceRange");
            const categoryFilter = document.getElementById("category");
            const availabilityFilter = document.getElementById("availability");
            const searchInput = document.getElementById("search");
            const pharmacyName = document.getElementById("pharmacyName");
            const pharmacyDescription = document.getElementById("pharmacyDescription");
            const pharmacyImg = document.getElementById("pharmacyImg");
            const pharmacyProducts = document.getElementById("pharmacyProducts");
            const defaultPharmacyImage = "img/75867863.jpg"; // صورة افتراضية
        
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
                pharmacyProducts.innerHTML = "";  // مسح المنتجات السابقة
        
                if (products.length === 0) {
                    pharmacyProducts.innerHTML = "<p>لا توجد منتجات تتناسب مع الفلاتر المحددة.</p>";
                } else {
                    products.forEach(product => {
                        const productCard = document.createElement("div");
                        productCard.classList.add("product-card");
        
                        productCard.innerHTML = `
                            <div class="product-image">
                                <img src="${product.image}" alt="${product.name}">
                                ${product.discount ? `<span class="discount">خصم ${product.discount}</span>` : ""}
                            </div>
                            <div class="product-info">
                                <h3>${product.name}</h3>
                                <p class="product-description">${product.description}</p>
                                <div class="price">
                                    <span class="original-price">${product.price} جنيه</span>
                                    <span class="discounted-price">${product.discountedPrice} جنيه</span>
                                </div>
                                <div class="product-actions">
                                    <button class="add-to-favorite"><i class="fa-regular fa-heart"></i></button>
                                    <button class="add-to-cart"><i class="fa-solid fa-cart-plus"></i></button>
                                </div>
                            </div>
                        `;
        
                        pharmacyProducts.appendChild(productCard);
                    });
                }
        
                addEventListeners(); // إعادة تعيين مستمعي الأحداث لأزرار السلة والمفضلة
            }
        
            function addEventListeners() {
                const cartButtons = document.querySelectorAll(".add-to-cart");
                const favoriteButtons = document.querySelectorAll(".add-to-favorite");
                const buyNowButtons = document.querySelectorAll(".buy-now");
                const productImages = document.querySelectorAll(".product-image img");
        
                cartButtons.forEach((button) => {
                    button.addEventListener("click", function () {
                        const productCard = this.closest(".product-card");
                        const product = {
                            image: productCard.querySelector(".product-image img").src,
                            name: productCard.querySelector("h3").textContent,
                            description: productCard.querySelector(".product-description").textContent,
                            originalPrice: productCard.querySelector(".original-price").textContent,
                            discountedPrice: productCard.querySelector(".discounted-price").textContent
                        };
        
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
                        alert("تمت إضافة المنتج إلى السلة!");
                    });
                });
        
                favoriteButtons.forEach((button) => {
                    button.addEventListener("click", function () {
                        const productCard = this.closest(".product-card");
                        const product = {
                            image: productCard.querySelector(".product-image img").src,
                            name: productCard.querySelector("h3").textContent,
                            description: productCard.querySelector(".product-description").textContent,
                            originalPrice: productCard.querySelector(".original-price").textContent,
                            discountedPrice: productCard.querySelector(".discounted-price").textContent
                        };
        
                        let myFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
                        const existingProductIndex = myFavorites.findIndex(item => item.name === product.name);
        
                        if (existingProductIndex !== -1) {
                            alert("المنتج موجود بالفعل في المفضلة!");
                        } else {
                            myFavorites.push(product);
                            localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
                            alert("تمت إضافة المنتج إلى المفضلة!");
                        }
                    });
                });
        
                buyNowButtons.forEach((button) => {
                    button.addEventListener("click", function () {
                        const productCard = this.closest(".product-card");
                        const product = {
                            image: productCard.querySelector(".product-image img").src,
                            name: productCard.querySelector("h3").textContent,
                            description: productCard.querySelector(".product-description").textContent,
                            originalPrice: productCard.querySelector(".original-price").textContent,
                            discountedPrice: productCard.querySelector(".discounted-price").textContent
                        };
        
                        // Store the product in local storage or pass it through URL parameters
                        localStorage.setItem("quickBuyProduct", JSON.stringify(product));
        
                        // Redirect to the quick buy page
                        window.location.href = "quick-buy.html";
                    });
                });
        
                productImages.forEach((img) => {
                    img.addEventListener("click", function () {
                        const productCard = this.closest(".product-card");
                        const product = {
                            image: productCard.querySelector(".product-image img").src,
                            name: productCard.querySelector("h3").textContent,
                            description: productCard.querySelector(".product-description").textContent,
                            originalPrice: productCard.querySelector(".original-price").textContent,
                            discountedPrice: productCard.querySelector(".discounted-price").textContent
                        };
        
                        // Store the product in local storage
                        localStorage.setItem("productDetails", JSON.stringify(product));
        
                        // Redirect to the product details page
                        window.location.href = "product_details.html";
                    });
                });
            }
        
            function updateCartDisplay() {
                const cartCount = document.getElementById("cartCount");
                if (cartCount) {
                    const myCart = JSON.parse(localStorage.getItem("myCart")) || [];
                    cartCount.textContent = myCart.length;
                }
            }
        
            function updateFavoritesDisplay() {
                const favoritesCount = document.getElementById("favoritesCount");
                if (favoritesCount) {
                    const myFavorites = JSON.parse(localStorage.getItem("myFavorites")) || [];
                    favoritesCount.textContent = myFavorites.length;
                }
            }
        
            priceRange.addEventListener("input", function () {
                filterProducts();
                document.getElementById('priceDisplay').textContent = 'السعر: ' + this.value;
            });
        
            categoryFilter.addEventListener("change", filterProducts);
            availabilityFilter.addEventListener("change", filterProducts);
        
            searchInput.addEventListener("input", function () {
                const searchText = searchInput.value.trim().toLowerCase();
                const productCards = document.querySelectorAll(".product-card");
        
                productCards.forEach((card) => {
                    const productName = card.querySelector("h3")?.textContent.trim().toLowerCase() || "";
                    const productDescription = card.querySelector("p")?.textContent.trim().toLowerCase() || "";
        
                    if (productName.includes(searchText) || productDescription.includes(searchText)) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        
            filterProducts();
        });
        
        document.getElementById('priceRange').addEventListener('input', function() {
            var priceValue = this.value;
            document.getElementById('priceDisplay').textContent = 'السعر: ' + priceValue;
        });
        