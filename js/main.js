



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









  let bigImage = document.getElementById('big-img')

        function myProduct(item){
            bigImage.src = item
        }


        // product page
        //buy fast order
        
        let btnbuyNowF = document.querySelector('.buyNow')
        let divcretAcBuyF = document.querySelector('.creatacountfast')


btnbuyNowF.onclick = ()=> {
  divcretAcBuyF.classList.toggle('active')
}

const slider = document.getElementById('unique-slider');

// إضافة عملية سحب للماوس
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









