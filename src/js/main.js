const desktopNavLinks = document.querySelectorAll("#desktop-menu ul li a");
const mobileNavLinks = document.querySelectorAll("#mobile-menu a");
const sections = document.querySelectorAll("section");

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

const themeToggle = document.querySelectorAll(".theme-toggle");
const themeToggleSpan = document.querySelectorAll(".theme-toggle span");
const sunIcon = document.querySelectorAll(".theme-toggle span i.fa-sun");
const moonIcon = document.querySelectorAll(".theme-toggle span i.fa-moon");

const sidebar = document.querySelector("#sidebar");
const openSetting = document.querySelector("#open-setting");
const closeSetting = document.querySelector("#close-setting");

const fontOption = document.querySelectorAll(".font-option");
const activeFont = document.querySelector(".font-option.active");

const themeColor = document.querySelectorAll(".theme-colors button");

const resetSettings = document.getElementById("reset-settings");

const backToTopBtn = document.getElementById("back-to-top");

const portfolioFiltersBtn = document.querySelectorAll(".portfolio-filters");
const portfolioItem = document.querySelectorAll(".portfolio-item");

const slider = document.querySelector(".slider");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const nextTestimonial = document.getElementById("next-testimonial");
const prevTestimonial = document.getElementById("prev-testimonial");
const paginationDots = document.querySelectorAll(".pagination-dot");

// Active Link & Intersection & Back to Top :
function changeActiveLink(links, activeLink) {
  links.forEach((item) => {
    item.classList.remove("active");
  });

  if (activeLink) {
    activeLink.classList.add("active");
  }
}

desktopNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    changeActiveLink(desktopNavLinks, link);
  });
});

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    changeActiveLink(mobileNavLinks, link);
  });
});

const observerOptions = {
  root: null,
  rootMargin: "-30% 0px -60% 0px",
  threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute("id");

      if (sectionId === "hero") {
        backToTopBtn.classList.add("hidden");
      } else {
        backToTopBtn.classList.remove("hidden");
      }

      const desktopMatchingLink = document.querySelector(
        `#desktop-menu ul li a[href='#${sectionId}']`,
      );
      const mobileMatchingLink = document.querySelector(
        `#mobile-menu a[href='#${sectionId}']`,
      );

      changeActiveLink(desktopNavLinks, desktopMatchingLink);
      changeActiveLink(mobileNavLinks, mobileMatchingLink);
    }
  });
}, observerOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Mobile Menu :
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("translate-x-full");
});

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("translate-x-full");
  });
});

// Theme Toggle :
const savedTheme = localStorage.getItem("theme");

function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");

  themeToggle.forEach((btn) => {
    btn.classList.toggle("bg-slate-700", theme === "dark");
    btn.classList.toggle("bg-slate-200", theme !== "dark");
  });

  themeToggleSpan.forEach((span) => {
    if (span.closest("#mobile-menu")) {
      span.classList.toggle("translate-x-6", theme === "dark");
      span.classList.toggle("translate-x-0", theme !== "dark");
    } else {
      span.classList.toggle("translate-x-8", theme === "dark");
      span.classList.toggle("translate-x-0", theme !== "dark");
    }

    span.classList.toggle("bg-slate-800", theme === "dark");
    span.classList.toggle("bg-white", theme !== "dark");
  });

  sunIcon.forEach((icon) => {
    icon.classList.toggle("opacity-0", theme === "dark");
    icon.classList.toggle("scale-0", theme === "dark");
    icon.classList.toggle("rotate-90", theme === "dark");
  });

  moonIcon.forEach((icon) => {
    icon.classList.toggle("opacity-100", theme === "dark");
    icon.classList.toggle("scale-100", theme === "dark");
    icon.classList.toggle("rotate-0", theme === "dark");

    icon.classList.toggle("opacity-0", theme !== "dark");
    icon.classList.toggle("scale-0", theme !== "dark");
    icon.classList.toggle("-rotate-90", theme !== "dark");
  });
}

applyTheme(savedTheme);

function changeTheme() {
  const currentTheme = localStorage.getItem("theme");

  let newTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);

  applyTheme(newTheme);
}

themeToggle.forEach((btn) => {
  btn.addEventListener("click", () => {
    changeTheme();
  });
});

// Sidebar :
openSetting.addEventListener("click", () => {
  openSetting.classList.add("right-80");
  sidebar.classList.remove("translate-x-full");
});

closeSetting.addEventListener("click", () => {
  openSetting.classList.remove("right-80");
  sidebar.classList.add("translate-x-full");
});

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !openSetting.contains(e.target)) {
    openSetting.classList.remove("right-80");
    sidebar.classList.add("translate-x-full");
  }
});

// Change Font :
function addCheck(item) {
  const checkIcon = document.createElement("div");
  checkIcon.className =
    "check-icon w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full flex justify-center items-center bg-primary";
  checkIcon.innerHTML = `<i class="fa-solid fa-check text-white text-xs"></i>`;
  item.appendChild(checkIcon);
}

if (activeFont) {
  addCheck(activeFont);
}

function deleteBodyFont() {
  document.body.classList.remove(
    "font-tajawal",
    "font-alexandria",
    "font-cairo",
  );
}

function changeFont(btn) {
  const font = btn.getAttribute("data-font");

  deleteBodyFont();

  document.body.classList.add(`font-${font}`);

  localStorage.setItem("font", font);
  applyFont(font);
}

fontOption.forEach((btn) => {
  btn.addEventListener("click", () => {
    changeFont(btn);
  });
});

const savedFont = localStorage.getItem("font");

function applyFont(font) {
  deleteBodyFont();

  document.body.classList.add(`font-${font}`);

  fontOption.forEach((btn) => {
    btn.classList.remove("active");

    const icon = btn.querySelector(".check-icon");
    if (icon) {
      icon.remove();
    }
  });

  const activeBtn = document.querySelector(`[data-font="${font}"]`);

  activeBtn.classList.add("active");
  addCheck(activeBtn);
}

if (savedFont) {
  applyFont(savedFont);
}

// Change Theme Color :
const themeActiveClasses = [
  "active",
  "ring-2",
  "ring-primary",
  "ring-offset-2",
  "ring-offset-white",
  "dark:ring-offset-slate-900",
];

const savedThemeColor = localStorage.getItem("colorTheme");

if (savedThemeColor) {
  const targetColor = document.querySelector(
    `button[data-theme='${savedThemeColor}']`,
  );

  setThemeColor(targetColor);

  themeColor.forEach((item) => {
    item.classList.remove(...themeActiveClasses);
  });

  targetColor.classList.add(...themeActiveClasses);
}

function setThemeColor(btn) {
  const primary = btn.dataset.primary;
  const secondary = btn.dataset.secondary;
  document.documentElement.style.setProperty("--color-primary", primary);
  document.documentElement.style.setProperty("--color-secondary", secondary);
}

themeColor.forEach((btn) => {
  if (btn.classList.contains("active")) {
    btn.classList.add(...themeActiveClasses);
  }

  btn.addEventListener("click", () => {
    themeColor.forEach((item) => {
      item.classList.remove(...themeActiveClasses);
    });

    btn.classList.add(...themeActiveClasses);

    setThemeColor(btn);

    localStorage.setItem("colorTheme", btn.dataset.theme);
  });
});

// Reset Theme Color :
const DEFAULT_THEME = "light";
const DEFAULT_FONT = "tajawal";
const DEFAULT_COLOR = "purple-blue";

function deleteStoriedSetting() {
  localStorage.removeItem("font");
  localStorage.removeItem("colorTheme");
}

const defaultThemeColorBtn = document.querySelector(
  `button[data-theme="${DEFAULT_COLOR}"]`,
);

resetSettings.addEventListener("click", () => {
  deleteStoriedSetting();
  applyFont(DEFAULT_FONT);
  setThemeColor(defaultThemeColorBtn);
  themeColor.forEach((item) => {
    item.classList.remove(...themeActiveClasses);
  });
  defaultThemeColorBtn.classList.add(...themeActiveClasses);
});

// Portfolio Filteration :
const filterActiveClasses = [
  "active",
  "text-white",
  "bg-linear-to-r",
  "from-primary",
  "to-secondary",
  "hover:shadow-lg",
  "hover:shadow-primary/50",
];

const filterItemsClasses = ["opacity-0", "scale-95"];

function showItem(box) {
  box.classList.remove("hidden");

  setTimeout(() => {
    box.classList.remove(...filterItemsClasses);
    box.classList.add("opacity-100", "scale-100");
  }, 10);
}

function hideItem(box) {
  box.classList.remove("opacity-100", "scale-100");
  box.classList.add(...filterItemsClasses);

  setTimeout(() => {
    box.classList.add("hidden");
  }, 300);
}

function setActiveFilter(btn) {
  portfolioFiltersBtn.forEach((item) => {
    item.classList.remove(...filterActiveClasses);
  });

  btn.classList.add(...filterActiveClasses);
}

function filterPortfolio(category) {
  portfolioItem.forEach((box) => {
    const boxCategory = box.dataset.category;

    if (category === "all" || category === boxCategory) {
      showItem(box);
    } else {
      hideItem(box);
    }
  });
}

portfolioFiltersBtn.forEach((btn) => {
  if (btn.classList.contains("active")) {
    btn.classList.add(...filterActiveClasses);
  }

  btn.addEventListener("click", () => {
    const category = btn.dataset.filter;

    filterPortfolio(category);

    setActiveFilter(btn);
  });
});

// Testimonial Carousel :
const paginationActiveClasses = ["active", "bg-accent", "scale-125"];

let currentIndex = 0;

function getCardsPerView() {
  if (window.innerWidth < 768) {
    return 1;
  } else if (window.innerWidth < 1024) {
    return 2;
  } else {
    return 3;
  }
}

function getCardWidth() {
  return testimonialCards[0].offsetWidth;
}

function getMaxIndex() {
  return testimonialCards.length - getCardsPerView();
}

function updateCarousel() {
  const translateValue = currentIndex * getCardWidth();

  slider.style.transform = `translateX(${translateValue}px)`;

  updatePagination();
}

nextTestimonial.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex > getMaxIndex()) {
    currentIndex = 0;
  }

  updateCarousel();
});

prevTestimonial.addEventListener("click", () => {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = getMaxIndex();
  }

  updateCarousel();
});

window.addEventListener("resize", () => {
  if (currentIndex > getMaxIndex()) {
    currentIndex = getMaxIndex();
  }

  updateCarousel();
});

updateCarousel();

function updatePagination() {
  paginationDots.forEach((dot) => {
    dot.classList.remove(...paginationActiveClasses);
    dot.classList.add("bg-slate-400");

    const dotIndex = Number(dot.dataset.index);

    if (dotIndex === currentIndex) {
      dot.classList.add(...paginationActiveClasses);
      dot.classList.remove("bg-slate-400");
    }
  });
}

paginationDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentIndex = Number(dot.dataset.index);

    updateCarousel();
  });
});


// Open & Close Select Options :
const customSelects = document.querySelectorAll(".custom-select-wrapper");

customSelects.forEach((wrapper) => {
  const select = wrapper.querySelector(".custom-select");
  const options = wrapper.querySelector(".custom-options");
  const selectedText = wrapper.querySelector(".selected-text");
  const arrow = wrapper.querySelector("i");
  const optionItems = wrapper.querySelectorAll(".custom-option");

  select.addEventListener("click", (e) => {
    e.stopPropagation();

    document.querySelectorAll(".custom-select-wrapper").forEach((item) => {
      if (item !== wrapper) {
        item.querySelector(".custom-options").classList.add("hidden");
        item.querySelector("i").classList.remove("rotate-180");
      }
    });

    options.classList.toggle("hidden");
    arrow.classList.toggle("rotate-180");
  });

  optionItems.forEach((option) => {
    option.addEventListener("click", () => {
      selectedText.textContent = option.dataset.value;

      selectedText.classList.remove(
        "text-slate-500",
        "dark:text-slate-400"
      );

      selectedText.classList.add(
        "text-slate-800",
        "dark:text-white"
      );

      options.classList.add("hidden");
      arrow.classList.remove("rotate-180");
    });
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".custom-select-wrapper").forEach((wrapper) => {
    wrapper.querySelector(".custom-options").classList.add("hidden");
    wrapper.querySelector("i").classList.remove("rotate-180");
  });
});