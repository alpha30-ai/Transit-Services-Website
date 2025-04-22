// تأثيرات الفوتر المتحركة
document.addEventListener('DOMContentLoaded', function() {

    // إضافة تأثير تموج للفوتر
    const footer = document.querySelector('footer');
    if (footer) {
        console.log('Footer found, adding wave effect');

        // إضافة عنصر التموج
        const wave = document.createElement('div');
        wave.className = 'footer-wave';
        wave.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="rgba(255, 255, 255, 0.05)" fill-opacity="1" d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,138.7C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        `;

        // إضافة التموج في بداية الفوتر
        footer.insertBefore(wave, footer.firstChild);

        // إضافة CSS للتموج
        const style = document.createElement('style');
        style.textContent = `
            .footer-wave {
                position: absolute;
                top: 10px; /* إبعادها قليلاً عن الحافة العلوية */
                left: 0;
                width: 100%;
                height: 50px;
                overflow: hidden;
                line-height: 0;
                transform: rotate(180deg);
                z-index: 1;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                border-radius: inherit !important;
                -webkit-mask-image: -webkit-radial-gradient(white, black) !important;
                mask-image: radial-gradient(white, black) !important;
            }

            .footer-wave svg {
                position: relative;
                display: block !important;
                width: 100%;
                height: 100px;
                visibility: visible !important;
                opacity: 1 !important;
            }

            .footer-wave path {
                animation: waveAnimation 10s linear infinite;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
            }

            @keyframes waveAnimation {
                0% {
                    transform: translateX(0);
                }
                50% {
                    transform: translateX(-50%);
                }
                100% {
                    transform: translateX(-100%);
                }
            }
        `;
        document.head.appendChild(style);

        // إضافة عنصر متحرك آخر للفوتر
        const floatingElements = document.createElement('div');
        floatingElements.className = 'footer-floating-elements';
        footer.appendChild(floatingElements);

        // إضافة بعض العناصر المتحركة - عدد أقل لتكون خفيفة
        for (let i = 0; i < 8; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            // التأكد من بقاء العناصر داخل حدود الفوتر
            element.style.left = (10 + Math.random() * 80) + '%'; // إبقاء العناصر بعيدة عن الحواف
            element.style.top = (10 + Math.random() * 80) + '%'; // إبقاء العناصر بعيدة عن الحواف
            element.style.animationDelay = (Math.random() * 5) + 's';
            floatingElements.appendChild(element);
        }

        // إضافة CSS للعناصر المتحركة
        const floatingStyle = document.createElement('style');
        floatingStyle.textContent = `
            .footer-floating-elements {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden !important;
                pointer-events: none;
                z-index: 1;
                border-radius: inherit !important;
                -webkit-mask-image: -webkit-radial-gradient(white, black) !important;
                mask-image: radial-gradient(white, black) !important;
            }

            .floating-element {
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(79, 172, 254, 0.8) 0%, rgba(0, 242, 254, 0) 70%);
                animation: float 8s ease-in-out infinite;
                opacity: 0.5;
                pointer-events: none;
                box-shadow: 0 0 10px rgba(79, 172, 254, 0.5);
            }

            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                }
                25% {
                    transform: translate(15px, -15px) scale(1.1);
                }
                50% {
                    transform: translate(30px, 0) scale(1);
                }
                75% {
                    transform: translate(15px, 15px) scale(0.9);
                }
            }
        `;
        document.head.appendChild(floatingStyle);
    }

    // إضافة تأثير توهج للروابط في الفوتر
    const footerLinks = document.querySelectorAll('footer a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            // إنشاء عنصر التوهج
            const glow = document.createElement('div');
            glow.className = 'link-glow';
            glow.style.position = 'absolute';
            glow.style.width = '20px';
            glow.style.height = '20px';
            glow.style.borderRadius = '50%';
            glow.style.background = 'radial-gradient(circle, rgba(79, 172, 254, 0.8) 0%, rgba(79, 172, 254, 0) 70%)';
            glow.style.pointerEvents = 'none';
            glow.style.zIndex = '1';
            glow.style.opacity = '0.7';
            glow.style.transform = 'translate(-50%, -50%)';
            glow.style.transition = 'all 0.3s ease';

            // إضافة التوهج للصفحة
            document.body.appendChild(glow);

            // تحريك التوهج مع مؤشر الماوس
            const updateGlowPosition = function(e) {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
            };

            // تحديث موقع التوهج
            updateGlowPosition(e);

            // إضافة مستمع لحركة الماوس
            document.addEventListener('mousemove', updateGlowPosition);

            // إزالة التوهج عند مغادرة الرابط
            link.addEventListener('mouseleave', function() {
                document.removeEventListener('mousemove', updateGlowPosition);
                glow.style.opacity = '0';
                setTimeout(() => {
                    if (glow.parentNode) {
                        glow.parentNode.removeChild(glow);
                    }
                }, 300);
            }, { once: true });
        });
    });
});
