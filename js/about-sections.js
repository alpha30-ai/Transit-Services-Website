/**
 * ملف JavaScript لأقسام صفحة من نحن
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل ملف about-sections.js');

    // تفعيل قسم الأسئلة الشائعة
    initFAQ();

    // تفعيل قسم التكنولوجيا المستخدمة
    initTechTabs();
});

/**
 * تفعيل قسم الأسئلة الشائعة
 */
function initFAQ() {
    console.log('تفعيل قسم الأسئلة الشائعة');

    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length === 0) {
        console.warn('لم يتم العثور على عناصر الأسئلة الشائعة');
        return;
    }

    console.log('عدد الأسئلة الشائعة:', faqItems.length);

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        if (!question || !answer || !toggle) {
            console.warn('عنصر الأسئلة الشائعة غير مكتمل');
            return;
        }

        // إخفاء جميع الإجابات افتراضيًا
        answer.style.display = 'none';

        // إضافة حدث النقر على السؤال
        question.addEventListener('click', function() {
            // التحقق مما إذا كان السؤال مفتوحًا
            const isOpen = answer.style.display === 'block';

            // إغلاق جميع الأسئلة الأخرى
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherToggle = otherItem.querySelector('.faq-toggle i');

                if (otherItem !== item) {
                    otherAnswer.style.display = 'none';
                    otherToggle.className = 'fas fa-plus';
                    otherItem.classList.remove('active');
                }
            });

            // تبديل حالة السؤال الحالي
            if (isOpen) {
                answer.style.display = 'none';
                toggle.querySelector('i').className = 'fas fa-plus';
                item.classList.remove('active');
            } else {
                answer.style.display = 'block';
                toggle.querySelector('i').className = 'fas fa-minus';
                item.classList.add('active');

                // تحريك السؤال إلى مركز الشاشة
                const rect = item.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetTop = rect.top + scrollTop - 100;

                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // لا نقوم بفتح السؤال الأول تلقائيًا لمنع التمرير للأسفل
    // يمكن للمستخدم النقر على السؤال الذي يريده بنفسه
    // if (faqItems.length > 0) {
    //     const firstQuestion = faqItems[0].querySelector('.faq-question');
    //     if (firstQuestion) {
    //         setTimeout(() => {
    //             firstQuestion.click();
    //         }, 500);
    //     }
    // }
}

/**
 * تفعيل قسم التكنولوجيا المستخدمة
 */
function initTechTabs() {
    console.log('تفعيل قسم التكنولوجيا المستخدمة');

    const techTabs = document.querySelectorAll('.tech-tab');
    const techContents = document.querySelectorAll('.tech-content');

    if (techTabs.length === 0 || techContents.length === 0) {
        console.warn('لم يتم العثور على عناصر قسم التكنولوجيا');
        return;
    }

    console.log('عدد تبويبات التكنولوجيا:', techTabs.length);
    console.log('عدد محتويات التكنولوجيا:', techContents.length);

    // إضافة حدث النقر على التبويبات
    techTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع التبويبات
            techTabs.forEach(t => t.classList.remove('active'));

            // إضافة الفئة النشطة للتبويب المحدد
            this.classList.add('active');

            // الحصول على معرف المحتوى المرتبط بالتبويب
            const tabId = this.getAttribute('data-tab');
            const contentId = `${tabId}-content`;

            console.log('تم النقر على تبويب:', tabId);
            console.log('معرف المحتوى:', contentId);

            // إخفاء جميع المحتويات
            techContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            // إظهار المحتوى المرتبط بالتبويب المحدد
            const selectedContent = document.getElementById(contentId);
            if (selectedContent) {
                selectedContent.classList.add('active');
                selectedContent.style.display = 'block';

                // تفعيل تأثيرات الحركة للمحتوى المحدد
                const techItems = selectedContent.querySelectorAll('.tech-item');
                techItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100 * (index + 1));
                });
            } else {
                console.warn('لم يتم العثور على المحتوى المرتبط بالتبويب:', contentId);
            }
        });
    });

    // لا نقوم بتفعيل التبويب الأول تلقائيًا لمنع التمرير للأسفل
    // يمكن للمستخدم النقر على التبويب الذي يريده بنفسه
    // if (techTabs.length > 0) {
    //     setTimeout(() => {
    //         techTabs[0].click();
    //     }, 500);
    // }
}
