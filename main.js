// ==================== Toggle Mobile Menu ====================
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// ==================== Number Count Up Animation ====================
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".banner__card h4");
  const speed = 200;

  const options = {
    threshold: 0.5,
  };

  const countUp = (el) => {
    const target = +el.getAttribute("data-target");
    let count = 0;
    const increment = target / speed;

    const updateCount = () => {
      count += increment;
      if (count < target) {
        el.textContent = Math.ceil(count);
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target;
      }
    };

    updateCount();
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  counters.forEach((counter) => observer.observe(counter));
});

// ==================== Swiper for Hero or General ====================
const swiper = new Swiper(".swiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

// ==================== Swiper for Testimonials Section ====================
const clientSwiper = new Swiper(".clientSwiper", {
  loop: true,
  autoplay: {
    delay: 5000, // 5 seconds delay
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// ==================== Download CV ====================
const downloadCv = document.getElementById("download-cv");
if (downloadCv) {
  downloadCv.addEventListener("click", () => {
    const aElement = document.createElement("a");
    aElement.setAttribute("download", "CV.pdf");
    aElement.setAttribute("href", "/assets/CV.pdf");
    aElement.click();
  });
}

// ==================== ScrollReveal Animations ====================
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__container h4", { ...scrollRevealOption });
ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__container .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__container .header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".about__content h4", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".about__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".about__content .about__progress", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".service__card", {
  ...scrollRevealOption,
  interval: 500,
});
ScrollReveal().reveal(".blog__card", {
  ...scrollRevealOption,
  interval: 500,
});

// ==================== Tabs Functionality ====================
const tabList = document.querySelector(".resume__tablist");
if (tabList) {
  tabList.addEventListener("click", (e) => {
    const tabIndex = e.target.dataset.tab;
    if (!tabIndex) return;

    document.querySelectorAll("[data-tab]").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.tab === tabIndex);
    });

    const activePanel = document.querySelector(".panel__grid.active");
    const toActivePanel = document.querySelector(`[data-panel="${tabIndex}"]`);
    if (activePanel && activePanel.dataset.panel !== tabIndex) {
      activePanel.classList.add("close");
      activePanel.addEventListener(
        "animationend",
        () => {
          activePanel.classList.remove("active", "close");
          toActivePanel.classList.add("active");
        },
        { once: true }
      );
    }
  });
}

// ==================== Progress Bar Animation ====================
document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".about__progressbar");

  progressBars.forEach((bar) => {
    const span = bar.querySelector("span");
    span.style.width = "0%";
    span.innerText = "0%";
  });

  const animateCount = (span, target) => {
    let start = 0;
    const duration = 1000;
    const stepTime = 10;
    const steps = duration / stepTime;
    const increment = target / steps;

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(counter);
      }
      span.innerText = Math.round(start) + "%";
    }, stepTime);
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const progress = parseInt(bar.getAttribute("data-progress"));
          const span = bar.querySelector("span");
          span.style.transition = "width 1s ease-out";
          span.style.width = progress + "%";
          animateCount(span, progress);
          observer.unobserve(bar);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  progressBars.forEach((bar) => observer.observe(bar));
});
