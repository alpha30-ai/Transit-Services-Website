/**
 * ملف JavaScript الرئيسي لصفحة من نحن
 * يحتوي على جميع الوظائف والتفاعلات اللازمة للصفحة
 */

// بيانات الفريق
const teamMembers = [
    {
        name: "محمد هاني احمد حشيش",
        image: "img/t.m/hero-banner.jpg",
        description: "قائد الفريق، مطور ويب بخبرة 5 سنوات في تصميم وتطوير المواقع.",
        age: 21,
        role: " المطور الرئيسي",
        isLeader: true
    },
    {
        name: "محمد السيد محمد الشبراوى محمد",
        image: "img/t.m/WhatsApp Image 2025-02-22 at 23.41.24_008f3977.jpg",
        description: "موزع الادوار وحل المشاكل",
        age: 22,
        role: "قائد التيم",
        isLeader: false
    },
    {
        name: "عبدالله سعيد قرطام سليمان السيد",
        image: "img/t.m/WhatsApp Image 2025-02-22 at 23.47.03_25e3bfae.jpg",
        description: "مصمم الجرافيك والشعارات وتجميع البيانات",
        age: 22,
        role: "مصمم الجرافيك",
        isLeader: false
    },
    {
        name: "محمد هاني عبدالعزيز",
        image: "img/t.m/WhatsApp Image 2025-02-22 at 23.35.25_fc77dc30.jpg",
        description: "متخصص في الباك اند والبنيه التحتيه لنظام المشروع",
        age: 23,
        role: "خبير",
        isLeader: false
    },
    {
        name: "صفاء اشرف عبدالفتاح",
        image: "img/t.m/WhatsApp Image 2025-02-22 at 23.34.13_cfc1e4f5.jpg",
        description: "خبيره في التحليل والتسويق الالكتروني",
        age: 22,
        role: "التحليل",
        isLeader: false
    },
    {
        name: "محمد نشأت محمد السيد نبهان",
        image: "img/t.m/WhatsApp Image 2025-02-23 at 20.04.33_e46d9390.jpg",
        description: "مهندس DevOps، متخصص في إدارة البنية التحتية والسحابية.",
        age: 22,
        role: "مهندس DevOps",
        isLeader: false
    },
    {
        name: "عبد الرحمن علاء محمد عثمان",
        image: "img/t.m/WhatsApp Image 2025-02-22 at 23.32.47_16802dc0.jpg",
        description: "مطور واجهات مستخدم، متخصص في تصميم واجهات تفاعلية.",
        age: 21,
        role: "مطور واجهات",
        isLeader: false
    },
    {
        name: "محمود أحمد رجب السيد",
        image: "img/t.m/WhatsApp Image 2025-02-23 at 00.19.13_29132f6c.jpg",
        description: "مهندس برمجيات، متخصص في تطوير أنظمة إدارة قواعد البيانات.",
        age: 23,
        role: "مهندس برمجيات",
        isLeader: false
    },
    {
        name: "فارس يوسف محمد احمد محمد",
        image: "img/t.m/WhatsApp Image 2025-02-23 at 18.29.40_59d973ee.jpg",
        description: "مطور برمجيات، متخصص في تطوير تطبيقات الويب.",
        age: 22,
        role: "مطور برمجيات",
        isLeader: false
    },
    {
        name: "روان حمدي عبدالله طه",
        image: "img/t.m/WhatsApp Image 2025-02-22 at 23.33.19_286d942c.jpg",
        description: "خبيره في تجميع البيانات وتجميعها وحل مشكله التحاليل الخاصه",
        age: 22,
        role: "خبيره في تحليل المشاكل",
        isLeader: false
    }
];

// تصنيف أعضاء الفريق حسب الأدوار
const teamCategories = {
    all: teamMembers,
    development: teamMembers.filter(member =>
        member.role.includes('مطور') ||
        member.role.includes('مهندس') ||
        member.role.includes('DevOps')
    ),
    design: teamMembers.filter(member =>
        member.role.includes('مصمم') ||
        member.role.includes('تصميم') ||
        member.role.includes('جرافيك') ||
        member.name === "محمد هاني احمد حشيش" // إضافة العضو إلى فريق التصميم
    ),
    management: teamMembers.filter(member =>
        member.role.includes('قائد') ||
        member.role.includes('تحليل') ||
        member.role.includes('خبير') ||
        member.role.includes('إدارة')
    )
};

// سنحدد عناصر DOM عند تحميل الصفحة
let teamGrid;
let teamTabs;

// دالة لعرض أعضاء الفريق
function displayTeamMembers(category = 'all') {
    // تفريغ الشبكة
    teamGrid.innerHTML = '';

    // الحصول على الأعضاء حسب التصنيف
    const members = teamCategories[category];

    // إذا لم يوجد أعضاء في هذا التصنيف
    if (members.length === 0) {
        teamGrid.innerHTML = '<div class="no-members">لا يوجد أعضاء في هذا القسم حالياً</div>';
        return;
    }

    // إضافة الأعضاء إلى الشبكة
    members.forEach(member => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("team-member");
        memberCard.dataset.category = category;

        // إضافة فئة للقائد
        if (member.isLeader) {
            memberCard.classList.add("leader");
        }

        // تحديد التقييم بالنجوم (جميع الأعضاء يحصلون على 5 نجوم)
        const stars = Array.from({ length: 5 }, () => `<span class="star filled">★</span>`).join('');

        // إنشاء محتوى البطاقة
        memberCard.innerHTML = `
            <div class="team-member-image-container">
                <img src="${member.image}" alt="${member.name}">
                ${member.isLeader ? '<div class="leader-badge">قائد الفريق</div>' : ''}
            </div>
            <div class="team-member-content">
                <h3>${member.name}</h3>
                <span class="role">${member.role}</span>
                <p>${member.description}</p>
                <div class="rating">${stars}</div>
            </div>
        `;

        teamGrid.appendChild(memberCard);
    });

    // تفعيل تأثير الحركة ثلاثية الأبعاد
    activateCardEffects();
}

// تفعيل تأثير الحركة ثلاثية الأبعاد للبطاقات
function activateCardEffects() {
    document.querySelectorAll('.team-member').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // موقع الماوس الأفقي داخل الكارت
            const y = e.clientY - rect.top; // موقع الماوس العمودي داخل الكارت
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20; // حساب الانحناء العمودي
            const rotateY = (centerX - x) / 20; // حساب الانحناء الأفقي

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// تفعيل أزرار التبويب
function activateTabs() {
    teamTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // إزالة الفئة النشطة من جميع الأزرار
            teamTabs.forEach(t => t.classList.remove('active'));

            // إضافة الفئة النشطة للزر المضغوط
            tab.classList.add('active');

            // عرض الأعضاء حسب التصنيف
            const category = tab.dataset.teamTab;
            displayTeamMembers(category);
        });
    });
}

// دالة لتحريك أرقام الإحصائيات
function animateStatNumbers() {
    console.log('جاري تفعيل عداد الإحصائيات');

    // تحديد جميع عناصر الأرقام في الصفحة
    const statNumbers = document.querySelectorAll('.stat-number, .achievement-number, .impact-number, .counter-number, [data-count]');

    // التأكد من أن الأرقام مرئية
    statNumbers.forEach(number => {
        number.style.visibility = 'visible';
        number.style.opacity = '1';
    });
    console.log('عدد عناصر الإحصائيات:', statNumbers.length);

    if (statNumbers.length === 0) {
        console.warn('لم يتم العثور على عناصر الإحصائيات');
        return;
    }

    // استخدام Intersection Observer لتفعيل العدادات عند الوصول إليها
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // إعادة تشغيل العداد عند الوصول إليه
                    const number = entry.target;
                    const targetValue = parseFloat(number.dataset.count);
                    if (!isNaN(targetValue)) {
                        number.textContent = '0';
                        const duration = 2000;
                        const startTime = Date.now();

                        function updateNumber() {
                            const currentTime = Date.now();
                            const elapsedTime = currentTime - startTime;

                            if (elapsedTime < duration) {
                                const progress = elapsedTime / duration;
                                // التعامل مع الأرقام العشرية مثل 4.8
                                const isDecimal = targetValue % 1 !== 0;
                                const currentValue = isDecimal ?
                                    (targetValue * progress).toFixed(1) :
                                    Math.floor(targetValue * progress);
                                number.textContent = currentValue;
                                requestAnimationFrame(updateNumber);
                            } else {
                                number.textContent = targetValue;
                            }
                        }

                        updateNumber();
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // تقليل قيمة threshold لتفعيل العداد مبكرًا

        // مراقبة جميع العدادات
        statNumbers.forEach(number => {
            observer.observe(number);
        });
    } else {
        // في حالة عدم دعم Intersection Observer
        statNumbers.forEach(number => {
            try {
                const targetValue = parseFloat(number.dataset.count);
                if (isNaN(targetValue)) {
                    console.warn('قيمة غير صالحة للعداد:', number.dataset.count);
                    return;
                }

                console.log('تحريك العداد إلى:', targetValue);
                const duration = 2000; // مدة التحريك بالمللي ثانية
                const startTime = Date.now();

                function updateNumber() {
                    const currentTime = Date.now();
                    const elapsedTime = currentTime - startTime;

                    if (elapsedTime < duration) {
                        const progress = elapsedTime / duration;
                        // التعامل مع الأرقام العشرية مثل 4.8
                        const isDecimal = targetValue % 1 !== 0;
                        const currentValue = isDecimal ?
                            (targetValue * progress).toFixed(1) :
                            Math.floor(targetValue * progress);
                        number.textContent = currentValue;
                        requestAnimationFrame(updateNumber);
                    } else {
                        number.textContent = targetValue;
                    }
                }

                updateNumber();
            } catch (error) {
                console.error('خطأ في تحريك العداد:', error);
            }
        });
    }
}

// عرض جميع الأعضاء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل صفحة من نحن');

    // تحديد عناصر DOM
    teamGrid = document.getElementById("team-grid");
    teamTabs = document.querySelectorAll('.team-tab');

    console.log('عناصر التبويب:', teamTabs);
    console.log('شبكة الفريق:', teamGrid);

    // التحقق من وجود عناصر DOM
    if (teamGrid) {
        // تفعيل أزرار التبويب
        if (teamTabs && teamTabs.length > 0) {
            activateTabs();
        }

        // عرض جميع الأعضاء افتراضيًا
        displayTeamMembers('all');
        console.log('تم عرض أعضاء الفريق');
    } else {
        console.error('لم يتم العثور على عنصر شبكة الفريق (team-grid)');
    }

    // تفعيل عداد الإحصائيات
    animateStatNumbers();

    // تفعيل مكتبة AOS للتحريكات
    if (typeof AOS !== 'undefined') {
        // إعادة تهيئة AOS لضمان عمل التحريكات
        // إضافة خيارات لتخفيف الأنيميشن ومنع التمرير التلقائي
        AOS.init({
            duration: 600, // تقليل مدة الأنيميشن
            once: true, // تشغيل الأنيميشن مرة واحدة فقط
            mirror: false, // إيقاف تأثير المرآة
            offset: 50, // تقليل المسافة اللازمة لتفعيل الأنيميشن
            easing: 'ease', // تبسيط التأثير الحركي
            throttleDelay: 99, // تحسين الأداء
            disableMutationObserver: true, // لمنع التمرير التلقائي
            startEvent: 'manualStart' // استخدام حدث مخصص بدلاً من DOMContentLoaded
        });

        // تفعيل AOS بعد ثانية واحدة لضمان عدم التمرير التلقائي
        setTimeout(() => {
            // إرسال حدث مخصص لتفعيل AOS بدون تمرير
            document.dispatchEvent(new Event('manualStart'));
            AOS.refresh();
        }, 1000);
    }

    // تفعيل تحريكات الأقسام عند التمرير
    initSectionAnimations();
});

// دالة لتفعيل تحريكات الأقسام عند التمرير - أنيميشن بسيط واحترافي
function initSectionAnimations() {
    console.log('تفعيل تحريكات الأقسام البسيطة');

    // تحديد جميع الأقسام في الصفحة
    const sections = document.querySelectorAll('section');
    console.log('عدد الأقسام:', sections.length);

    // تفعيل قسم الإنجازات والمسؤولية المجتمعية
    const achievementsSection = document.querySelector('.achievements-section');
    if (achievementsSection) {
        achievementsSection.classList.add('animate-section');
    }

    const csrSection = document.querySelector('.csr-section');
    if (csrSection) {
        csrSection.classList.add('animate-section');
    }

    // إنشاء Intersection Observer بسيط لمراقبة الأقسام
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // إضافة فئة للقسم عند ظهوره في نطاق الرؤية
                    entry.target.classList.add('section-visible');

                    // عرض الأرقام بشكل بسيط
                    const counters = entry.target.querySelectorAll('.stat-number, .achievement-number, .impact-number, .counter-number, [data-count]');
                    if (counters.length > 0) {
                        counters.forEach(counter => {
                            const targetValue = parseFloat(counter.dataset.count);
                            if (!isNaN(targetValue)) {
                                // عرض القيمة مباشرة بدون أنيميشن
                                counter.textContent = targetValue;
                            }
                        });
                    }

                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // مراقبة جميع الأقسام
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // تفعيل تحريكات التمرير بشكل بسيط
    window.addEventListener('scroll', function() {
        // لا نفعل أي شيء عند التمرير لتبسيط الأنيميشن
    }, { passive: true });
}
