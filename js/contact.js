const reviews = [
    { name: "أحمد علي", rating: 5, review: "خدمة رائعة وسريعة جدًا، أنصح الجميع بها!", img: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "منى حسن", rating: 4, review: "تجربة رائعة ولكن يمكن تحسين سرعة الاستجابة.", img: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "خالد عبد الله", rating: 5, review: "أفضل خدمة تلقيتها حتى الآن، شكراً لكم!", img: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "سارة محمد", rating: 3, review: "الخدمة جيدة ولكن أواجه بعض المشاكل الصغيرة.", img: "https://randomuser.me/api/portraits/women/4.jpg" },
    { name: "يوسف كريم", rating: 4, review: "خدمة ممتازة وتعامل راقي جداً.", img: "https://randomuser.me/api/portraits/men/5.jpg" },
    { name: "ليلى عمر", rating: 5, review: "رائع جداً، سوف أكرر التجربة قريباً!", img: "https://randomuser.me/api/portraits/women/6.jpg" },
    { name: "محمود السيد", rating: 4, review: "جيد جدًا ولكن يمكن تحسين بعض التفاصيل.", img: "https://randomuser.me/api/portraits/men/7.jpg" },
    { name: "هدى إبراهيم", rating: 5, review: "خدمة ممتازة وسريعة! أنصح بها للجميع.", img: "https://randomuser.me/api/portraits/women/8.jpg" },
    { name: "عمر خالد", rating: 3, review: "الخدمة لا بأس بها، ولكن تحتاج لبعض التحسينات.", img: "https://randomuser.me/api/portraits/men/9.jpg" },
    { name: "نادية سامي", rating: 5, review: "تعامل راقي وسريع، شكراً لكم!", img: "https://randomuser.me/api/portraits/women/10.jpg" },
    { name: "سمير فوزي", rating: 4, review: "خدمة رائعة وممتازة، سأعود مرة أخرى!", img: "https://randomuser.me/api/portraits/men/11.jpg" },
    { name: "ريم الجندي", rating: 5, review: "أفضل تجربة لي، تعامل راقي واحترافي!", img: "https://randomuser.me/api/portraits/women/12.jpg" }
];

function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? "★" : "☆";
    }
    return stars;
}

function displayReviews() {
    const container = document.getElementById("reviewsContainer");
    reviews.forEach(review => {
        const reviewBox = document.createElement("div");
        reviewBox.classList.add("review-box");

        reviewBox.innerHTML = `
            <img class="customer-img" src="${review.img}" alt="${review.name}">
            <div class="customer-name">${review.name}</div>
            <div class="stars">${generateStars(review.rating)}</div>
            <p class="customer-review">"${review.review}"</p>
        `;

        container.appendChild(reviewBox);
    });
}

displayReviews();