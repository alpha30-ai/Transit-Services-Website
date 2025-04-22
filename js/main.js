



var swiper = new Swiper(".slide-swp", {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable:true
    },
    autoplay:{
        delay:2500,
        disableOnInteraction: false,

    },
    loop:true,
  });

  var swiper = new Swiper(".deals", {
    slidesPerView: 2,
    spaceBetween: 30,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop:true,
      breakpoints:{
        1200:{
          slidesPerView : 2,
        },
        990 : {
          slidesPerView : 1,
        },
        0 :{
          slidesPerView : 1,
        }

      }
  });



  var swiper = new Swiper(".sale-sec", {
    slidesPerView: 5,
    spaceBetween: 30,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop:true,
      breakpoints:{
        1400:{
          slidesPerView: 5,
        },
        1200:{
          slidesPerView : 4,
        },
        800:{
          slidesPerView : 3,
          spaceBetween: 30,
        },
        650 :{
          slidesPerView : 3,
          spaceBetween: 15,
        },
        0 :{
          slidesPerView : 2,
          spaceBetween: 10,
        }

      }
  });



  var swiper = new Swiper(".swip-with-img", {
    slidesPerView: 4,
    spaceBetween: 30,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop:true,
      breakpoints:{
        1400:{
          slidesPerView: 4,
        },
        1100:{
          slidesPerView : 3,
        },
        800:{
          slidesPerView : 2,
          spaceBetween: 30,
        },
        700 :{
          slidesPerView : 2,
          spaceBetween: 15,
        },
        0 :{
          slidesPerView : 2,
          spaceBetween: 10,
        }

      }
  });



  /* side bar in Resbonsive */

  let btnCloseSide = document.getElementById("btn-close");
  let sideBar = document.getElementById("side-bar");
  let btnOpenSide = document.getElementById("open-side");

  btnOpenSide.onclick = () => {
    sideBar.classList.add('active')
  }
  btnCloseSide.onclick = () => {
    sideBar.classList.remove('active')
  }

  // إضافة معالج النقر على روابط القائمة الجانبية
  document.addEventListener('DOMContentLoaded', function() {
    const sideLinks = document.querySelectorAll('.side-links a');

    sideLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // الحصول على المسار الحالي والمسار المستهدف
        const currentPath = window.location.pathname.split('/').pop();
        const targetPath = this.getAttribute('href');

        // إذا كان المسار الحالي هو نفس المسار المستهدف، قم بإعادة تحميل الصفحة
        if (currentPath.toLowerCase() === targetPath.toLowerCase()) {
          e.preventDefault(); // منع السلوك الافتراضي للرابط
          window.location.reload(); // إعادة تحميل الصفحة
        }

        // إغلاق القائمة الجانبية بعد النقر على أي رابط
        sideBar.classList.remove('active');
      });
    });
  });









  let bigImage = document.getElementById('big-img')

        function myProduct(item){
            bigImage.src = item
        }


        // product page
        //buy fast order

        let btnbuyNowF = document.querySelector('.buyNow')
        let divcretAcBuyF = document.querySelector('.creatacountfast')


if (btnbuyNowF && divcretAcBuyF) {
  btnbuyNowF.onclick = ()=> {
    divcretAcBuyF.classList.toggle('active')
  }
}

const slider = document.getElementById('unique-slider');

// إضافة عملية سحب للماوس
if (slider) {
  slider.addEventListener('mousedown', (e) => {
  let isDragging = true;
  let startPos = e.clientX;
  let currentTranslate = 0;
  let prevTranslate = 0;

  slider.style.transition = 'none'; // إزالة التأثير عند السحب
  const mouseMove = (e) => {
    if (!isDragging) return;
    const currentPos = e.clientX;
    const diff = currentPos - startPos;
    currentTranslate = prevTranslate + diff;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  };

  const mouseUp = () => {
    isDragging = false;
    prevTranslate = currentTranslate;
    slider.style.transition = 'transform 0.3s ease'; // إضافة تأثير الانتقال
    slider.removeEventListener('mousemove', mouseMove);
    slider.removeEventListener('mouseup', mouseUp);
  };

  slider.addEventListener('mousemove', mouseMove);
  slider.addEventListener('mouseup', mouseUp);
  });

  // إضافة سحب في الأجهزة الصغيرة (الهاتف)
  if (window.innerWidth <= 768) {
  let touchStart = 0;
  let touchEnd = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStart = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', (e) => {
    touchEnd = e.changedTouches[0].clientX;
    if (touchEnd - touchStart > 50) {
      slider.scrollLeft -= 150; // السحب لليسار
    } else if (touchStart - touchEnd > 50) {
      slider.scrollLeft += 150; // السحب لليمين
    }
    });
  }
}
var swiper1 = new Swiper('.mySwiper1', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  autoplay: {
      delay: 500,  /* تقليل وقت الانتقال بين الصور */
      disableOnInteraction: false,
  },
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  effect: 'slide',  /* تأثير الانتقال بين الصور */
  speed: 500,  /* تقليل سرعة الانتقال بين الصور */
});

var swiper2 = new Swiper('.mySwiper2', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  autoplay: {
      delay: 2000,
      disableOnInteraction: false,
  },
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  effect: 'slide',
  speed: 500,
});

var swiper3 = new Swiper('.mySwiper3', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  autoplay: {
      delay: 2000,
      disableOnInteraction: false,
  },
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  effect: 'slide',
  speed: 500,
});



// تفعيل فلترة التقييمات
document.addEventListener('DOMContentLoaded', function() {
  // تبديل علامات التبويب في قسم الفلترة
  const filterTabs = document.querySelectorAll('.filter-tab');
  const filterContents = document.querySelectorAll('.filter-content');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // إزالة الفئة النشطة من جميع علامات التبويب
      filterTabs.forEach(t => t.classList.remove('active'));
      // إضافة الفئة النشطة للعلامة المحددة
      this.classList.add('active');

      // إخفاء جميع محتويات الفلترة
      filterContents.forEach(content => content.style.display = 'none');
      // إظهار المحتوى المرتبط بالعلامة المحددة
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId + '-filters').style.display = 'flex';
    });
  });

  // تفعيل أزرار الفلترة
  const filterButtons = document.querySelectorAll('.filter-btn');
  const reviewBoxes = document.querySelectorAll('.review-box');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // إزالة الفئة النشطة من جميع الأزرار
      const parentContent = this.closest('.filter-content');
      parentContent.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      // إضافة الفئة النشطة للزر المحدد
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');
      const filterType = parentContent.id.replace('-filters', '');

      // فلترة صناديق المراجعات
      reviewBoxes.forEach(box => {
        if (filter === 'all') {
          box.style.display = 'block';
        } else {
          const boxValue = box.getAttribute('data-' + filterType);
          if (boxValue === filter) {
            box.style.display = 'block';
          } else {
            box.style.display = 'none';
          }
        }
      });
    });
  });

  // تفعيل أزرار الإعجاب
  const likeButtons = document.querySelectorAll('.like-button');

  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('liked');
      const likesCount = this.nextElementSibling;
      let count = parseInt(likesCount.textContent);

      if (this.classList.contains('liked')) {
        likesCount.textContent = count + 1;
        this.innerHTML = '<i class="fas fa-thumbs-up"></i>';
      } else {
        likesCount.textContent = count - 1;
        this.innerHTML = '<i class="far fa-thumbs-up"></i>';
      }
    });
  });

  // تحريك أرقام الإحصائيات
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateNumbers() {
    statNumbers.forEach(number => {
      const target = parseInt(number.getAttribute('data-count'));
      const duration = 2000; // مدة التحريك بالمللي ثانية
      const step = target / (duration / 16); // 16ms لكل إطار في 60fps
      let current = 0;

      const updateNumber = () => {
        current += step;
        if (current < target) {
          number.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateNumber);
        } else {
          number.textContent = target.toLocaleString();
        }
      };

      updateNumber();
    });
  }

  // تفعيل تحريك الأرقام عند ظهور القسم في الشاشة
  const statsSection = document.querySelector('.testimonials-stats-enhanced');

  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumbers();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }
});

// تفعيل تأثيرات AOS للتحريك عند التمرير
// AOS.init تم نقلها إلى ملف index.html

