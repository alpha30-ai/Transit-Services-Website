// تأثيرات الجزيئات المتحركة في الفوتر
document.addEventListener('DOMContentLoaded', function() {
    // إنشاء عنصر الكانفاس
    const footer = document.querySelector('footer');
    if (!footer) return;

    console.log('Footer found, adding particles effect');

    const canvas = document.createElement('canvas');
    canvas.id = 'footer-particles';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.overflow = 'hidden';

    // إضافة الكانفاس كأول عنصر في الفوتر
    footer.insertBefore(canvas, footer.firstChild);

    // إضافة CSS للتأكد من ظهور التأثير وحصره داخل الفوتر
    const style = document.createElement('style');
    style.textContent = `
        #footer-particles {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            border-top-left-radius: 60px !important;
            border-top-right-radius: 60px !important;
            overflow: hidden !important;
            -webkit-mask-image: -webkit-radial-gradient(white, black) !important;
            mask-image: radial-gradient(white, black) !important;
        }

        footer {
            overflow: hidden !important;
            position: relative !important;
        }
    `;
    document.head.appendChild(style);

    // تهيئة الكانفاس
    const ctx = canvas.getContext('2d');
    let width = canvas.width = footer.offsetWidth;
    let height = canvas.height = footer.offsetHeight;

    // إعادة ضبط حجم الكانفاس عند تغيير حجم النافذة
    window.addEventListener('resize', function() {
        width = canvas.width = footer.offsetWidth;
        height = canvas.height = footer.offsetHeight;
    });

    // إنشاء الجزيئات
    const particlesArray = [];
    const numberOfParticles = 20; // عدد الجزيئات - قليل لتكون خفيفة

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1; // حجم صغير للجزيئات
            this.speedX = Math.random() * 0.5 - 0.25; // سرعة بطيئة
            this.speedY = Math.random() * 0.5 - 0.25; // سرعة بطيئة
            this.color = this.getRandomColor();
            this.opacity = Math.random() * 0.5 + 0.1; // شفافية عالية
        }

        getRandomColor() {
            // ألوان فاتحة تتناسب مع خلفية الفوتر
            const colors = [
                'rgba(79, 172, 254, 0.7)',
                'rgba(0, 242, 254, 0.7)',
                'rgba(255, 255, 255, 0.5)',
                'rgba(173, 216, 230, 0.6)'
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // إعادة تدوير الجزيئات عندما تخرج من الحدود
            // التأكد من بقاء الجزيئات داخل حدود الفوتر
            if (this.x > width - this.size) {
                this.x = width - this.size;
                this.speedX = -this.speedX;
            } else if (this.x < this.size) {
                this.x = this.size;
                this.speedX = -this.speedX;
            }

            if (this.y > height - this.size) {
                this.y = height - this.size;
                this.speedY = -this.speedY;
            } else if (this.y < this.size) {
                this.y = this.size;
                this.speedY = -this.speedY;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // إنشاء الجزيئات
    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // تحريك وإعادة رسم الجزيئات
    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }

        // رسم الخطوط بين الجزيئات القريبة
        connectParticles();

        requestAnimationFrame(animate);
    }

    // رسم خطوط بين الجزيئات القريبة
    function connectParticles() {
        const maxDistance = 80; // المسافة القصوى للاتصال - تقليلها للحفاظ على التأثير داخل الفوتر

        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    // كلما كانت المسافة أقل، كلما كان الخط أكثر وضوحاً
                    const opacity = 1 - (distance / maxDistance);

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`; // خطوط شفافة جداً
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // بدء التأثير
    init();
    animate();
});
