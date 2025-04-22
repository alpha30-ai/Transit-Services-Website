const reviews = [
    {
        name: "أحمد علي",
        rating: 5,
        review: "خدمة رائعة وسريعة جدًا، أنصح الجميع بها! تعاملت مع فريق الدعم وكانوا محترفين للغاية وقدموا لي حلولًا سريعة لجميع استفساراتي. سأستمر بالتعامل معهم في المستقبل.",
        img: "https://randomuser.me/api/portraits/men/1.jpg",
        date: "15 مايو 2023",
        service: "توصيل طلبات",
        verified: true,
        likes: 24,
        serviceType: "delivery"
    },
    {
        name: "منى حسن",
        rating: 4,
        review: "تجربة رائعة مع خدمات العبور، المنتجات ذات جودة عالية والتوصيل كان في الوقت المحدد. أعطي 4 نجوم فقط لأن هناك مجال لتحسين سرعة الاستجابة على الاستفسارات.",
        img: "https://randomuser.me/api/portraits/women/2.jpg",
        date: "3 يونيو 2023",
        service: "تسوق إلكتروني",
        verified: true,
        likes: 18,
        serviceType: "shopping"
    },
    {
        name: "خالد عبد الله",
        rating: 5,
        review: "أفضل خدمة صيانة تلقيتها حتى الآن! الفني كان محترفًا للغاية وأصلح المشكلة في وقت قياسي. السعر كان مناسبًا جدًا مقارنة بالخدمة الممتازة التي حصلت عليها. شكراً لكم!",
        img: "https://randomuser.me/api/portraits/men/3.jpg",
        date: "20 يوليو 2023",
        service: "صيانة أجهزة",
        verified: true,
        likes: 32,
        serviceType: "maintenance"
    },
    {
        name: "سارة محمد",
        rating: 3,
        review: "الخدمة جيدة بشكل عام ولكن أواجه بعض المشاكل في تطبيق الهاتف. أحيانًا يتوقف عن العمل أثناء إتمام عملية الدفع. أتمنى أن يتم إصلاح هذه المشكلة في التحديثات القادمة.",
        img: "https://randomuser.me/api/portraits/women/4.jpg",
        date: "5 أغسطس 2023",
        service: "تطبيق الهاتف",
        verified: true,
        likes: 7,
        serviceType: "app"
    },
    {
        name: "يوسف كريم",
        rating: 4,
        review: "خدمة ممتازة وتعامل راقي جداً من فريق خدمة العملاء. استجابوا لطلبي بسرعة وقدموا لي عدة خيارات. المنتج وصل بحالة ممتازة والتغليف كان آمنًا جدًا.",
        img: "https://randomuser.me/api/portraits/men/5.jpg",
        date: "12 سبتمبر 2023",
        service: "شراء منتجات",
        verified: true,
        likes: 15,
        serviceType: "shopping"
    },
    {
        name: "ليلى عمر",
        rating: 5,
        review: "تجربتي مع خدمات العبور كانت استثنائية! الطعام كان لذيذًا والتوصيل سريع جدًا. الطلب وصل ساخنًا وكان التغليف أنيقًا. سأكرر التجربة قريبًا بالتأكيد!",
        img: "https://randomuser.me/api/portraits/women/6.jpg",
        date: "28 سبتمبر 2023",
        service: "توصيل طعام",
        verified: true,
        likes: 29,
        serviceType: "food"
    },
    {
        name: "محمود السيد",
        rating: 4,
        review: "خدمة الصيانة المنزلية كانت جيدة جدًا. الفني وصل في الموعد المحدد وأنجز العمل باحترافية. هناك بعض التفاصيل الصغيرة التي يمكن تحسينها مثل التنظيف بعد الانتهاء من العمل.",
        img: "https://randomuser.me/api/portraits/men/7.jpg",
        date: "10 أكتوبر 2023",
        service: "صيانة منزلية",
        verified: false,
        likes: 11,
        serviceType: "maintenance"
    },
    {
        name: "هدى إبراهيم",
        rating: 5,
        review: "خدمة ممتازة وسريعة! أنصح بها للجميع. طلبت أدوية لوالدتي المريضة وتم توصيلها خلال ساعة واحدة فقط. الصيدلي كان متعاونًا جدًا وقدم لي نصائح مفيدة حول الجرعات.",
        img: "https://randomuser.me/api/portraits/women/8.jpg",
        date: "15 نوفمبر 2023",
        service: "صيدلية",
        verified: true,
        likes: 41,
        serviceType: "pharmacy"
    },
    {
        name: "عمر خالد",
        rating: 3,
        review: "الخدمة لا بأس بها، ولكن تحتاج لبعض التحسينات. المنتج الذي وصلني كان مختلفًا قليلاً عن الصورة المعروضة في الموقع. أتمنى أن تكون الصور أكثر دقة في المستقبل.",
        img: "https://randomuser.me/api/portraits/men/9.jpg",
        date: "3 ديسمبر 2023",
        service: "تسوق إلكتروني",
        verified: true,
        likes: 5,
        serviceType: "shopping"
    },
    {
        name: "نادية سامي",
        rating: 5,
        review: "تعامل راقي وسريع من فريق خدمة العملاء! واجهت مشكلة في طلبي وتم حلها خلال دقائق. المنتجات ذات جودة عالية والأسعار منافسة جدًا. شكراً لكم على الخدمة الرائعة!",
        img: "https://randomuser.me/api/portraits/women/10.jpg",
        date: "20 ديسمبر 2023",
        service: "خدمة عملاء",
        verified: true,
        likes: 27,
        serviceType: "support"
    },
    {
        name: "سمير فوزي",
        rating: 4,
        review: "خدمة رائعة وممتازة من مطعم البيت السوري! الطعام لذيذ جدًا والكميات وفيرة. التوصيل كان سريعًا والسائق كان مهذبًا. سأعود للطلب مرة أخرى بالتأكيد!",
        img: "https://randomuser.me/api/portraits/men/11.jpg",
        date: "5 يناير 2024",
        service: "مطاعم",
        verified: false,
        likes: 19,
        serviceType: "food"
    },
    {
        name: "ريم الجندي",
        rating: 5,
        review: "أفضل تجربة تسوق إلكتروني! المنتجات أصلية 100% والأسعار أقل من السوق. التوصيل كان سريعًا والتغليف ممتاز. تعامل راقي واحترافي من الجميع. سأظل عميلة دائمة لديكم!",
        img: "https://randomuser.me/api/portraits/women/12.jpg",
        date: "18 فبراير 2024",
        service: "هايبر ماركت",
        verified: true,
        likes: 38,
        serviceType: "shopping"
    },
    {
        name: "فاطمة الزهراء",
        rating: 5,
        review: "تجربة رائعة مع خدمة توصيل الأدوية! كنت بحاجة ماسة لدواء في وقت متأخر من الليل، وتمكنت من طلبه بسهولة عبر التطبيق. وصل الدواء خلال 30 دقيقة فقط. خدمة ممتازة أنقذت موقفي!",
        img: "https://randomuser.me/api/portraits/women/14.jpg",
        date: "5 مارس 2024",
        service: "صيدلية",
        verified: true,
        likes: 45,
        serviceType: "pharmacy"
    },
    {
        name: "كريم محمود",
        rating: 4,
        review: "استخدمت خدمة صيانة السيارات وكانت تجربة جيدة. الفني كان محترفًا وشرح لي المشكلة بالتفصيل. الأسعار معقولة والخدمة سريعة. أنصح بها لمن يبحث عن صيانة موثوقة.",
        img: "https://randomuser.me/api/portraits/men/15.jpg",
        date: "12 مارس 2024",
        service: "صيانة سيارات",
        verified: true,
        likes: 22,
        serviceType: "maintenance"
    },
    {
        name: "رانيا أحمد",
        rating: 5,
        review: "خدمة التحاليل المنزلية كانت مريحة جدًا! الفني كان محترفًا ولطيفًا، والنتائج وصلت بسرعة عبر البريد الإلكتروني. سعيدة جدًا بهذه الخدمة التي وفرت علي عناء الذهاب للمعمل.",
        img: "https://randomuser.me/api/portraits/women/16.jpg",
        date: "20 مارس 2024",
        service: "معامل تحاليل",
        verified: true,
        likes: 31,
        serviceType: "medical"
    }
];

function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? "★" : "☆";
    }
    return stars;
}

// فلترة التقييمات حسب النوع
function filterReviews(filterType = 'all') {
    const container = document.getElementById("reviewsContainer");
    container.innerHTML = '';

    let filteredReviews = reviews;

    if (filterType !== 'all') {
        if (filterType === '5' || filterType === '4' || filterType === '3') {
            // فلترة حسب عدد النجوم
            filteredReviews = reviews.filter(review => review.rating === parseInt(filterType));
        } else {
            // فلترة حسب نوع الخدمة
            filteredReviews = reviews.filter(review => review.serviceType === filterType);
        }
    }

    // إذا لم تكن هناك نتائج، أظهر رسالة
    if (filteredReviews.length === 0) {
        const noResults = document.createElement("div");
        noResults.classList.add("no-reviews");
        noResults.innerHTML = `<i class="fas fa-search"></i><p>لا توجد تقييمات تطابق هذا التصنيف</p>`;
        container.appendChild(noResults);
        return;
    }

    // عرض التقييمات المفلترة
    filteredReviews.forEach(review => {
        displaySingleReview(review, container);
    });
}

// عرض تقييم واحد
function displaySingleReview(review, container) {
    const reviewBox = document.createElement("div");
    reviewBox.classList.add("review-box");
    reviewBox.setAttribute('data-rating', review.rating);
    reviewBox.setAttribute('data-service', review.serviceType);

    reviewBox.innerHTML = `
        <div class="review-header">
            <img class="customer-img" src="${review.img}" alt="${review.name}">
            <div class="customer-info">
                <div class="customer-name">${review.name}</div>
                <div class="customer-date"><i class="fas fa-calendar-alt"></i> ${review.date}</div>
            </div>
            ${review.verified ? '<div class="verified-badge"><i class="fas fa-check-circle"></i> عميل موثق</div>' : ''}
        </div>
        <div class="review-service">
            <span class="service-tag"><i class="fas fa-tag"></i> ${review.service}</span>
        </div>
        <div class="stars">${generateStars(review.rating)}</div>
        <p class="customer-review">"${review.review}"</p>
        <div class="review-footer">
            <div class="review-likes">
                <button class="like-button"><i class="far fa-thumbs-up"></i></button>
                <span class="likes-count">${review.likes}</span>
            </div>
            <div class="review-share">
                <button class="share-button"><i class="fas fa-share-alt"></i></button>
            </div>
        </div>
    `;

    container.appendChild(reviewBox);
}

function displayReviews() {
    const container = document.getElementById("reviewsContainer");
    if (!container) return; // Verificar si el contenedor existe antes de continuar
    container.innerHTML = '';
    reviews.forEach(review => {
        displaySingleReview(review, container);
    });

    // إضافة مستمعي الأحداث لأزرار الفلترة
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة الكلاس النشط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة الكلاس النشط للزر المضغوط
            this.classList.add('active');
            // فلترة التقييمات
            filterReviews(this.getAttribute('data-filter'));
        });
    });

    // إضافة مستمعي الأحداث لأزرار الإعجاب
    setTimeout(() => {
        const likeButtons = document.querySelectorAll('.like-button');
        likeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const likesCount = this.nextElementSibling;
                let currentLikes = parseInt(likesCount.textContent);

                if (!this.classList.contains('liked')) {
                    currentLikes++;
                    likesCount.textContent = currentLikes;
                    this.classList.add('liked');
                    this.querySelector('i').classList.remove('far');
                    this.querySelector('i').classList.add('fas');
                } else {
                    currentLikes--;
                    likesCount.textContent = currentLikes;
                    this.classList.remove('liked');
                    this.querySelector('i').classList.remove('fas');
                    this.querySelector('i').classList.add('far');
                }
            });
        });

        // إضافة مستمعي الأحداث لأزرار المشاركة
        const shareButtons = document.querySelectorAll('.share-button');
        shareButtons.forEach(button => {
            button.addEventListener('click', function() {
                alert('تم نسخ رابط التقييم!');
            });
        });
    }, 500);
}

displayReviews();