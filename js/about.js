// بيانات الفريق
const teamMembers = [
    {
        name: "محمد هاني احمد حشيش",
        image: "img/t.m/hero-banner.jpg",
        description: "قائد الفريق، مطور ويب بخبرة 5 سنوات في تصميم وتطوير المواقع.",
        age: 21,
        role: "القائد والمطور الرئيسي",
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

// عرض بيانات الفريق
const teamGrid = document.getElementById("team-grid");

teamMembers.forEach(member => {
    const memberCard = document.createElement("div");
    memberCard.classList.add("team-member");

    if (member.isLeader) {
        memberCard.classList.add("leader");
    } else {
        memberCard.classList.add("leader");
    }

    // Determine the star rating
    const starRating = member.isLeader ? 5 : Math.floor(Math.random() * 5) + 1;
    const stars = Array.from({ length: 5 }, (_, i) => `<span class="star ${i < starRating ? 'filled' : 'empty'}">★</span>`).join('');

    memberCard.innerHTML = `
        ${member.isLeader ? '<div class="leader-badge">المطور</div>' : ''}
        <img src="${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <p>العمر: ${member.age}</p>
        <p class="role">${member.role}</p>
        <div class="rating">${stars}</div>
    `;

    teamGrid.appendChild(memberCard);
});
document.querySelectorAll('.team-member').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // موقع الماوس الأفقي داخل الكارت
        const y = e.clientY - rect.top; // موقع الماوس العمودي داخل الكارت
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10; // حساب الانحناء العمودي
        const rotateY = (centerX - x) / 10; // حساب الانحناء الأفقي

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});