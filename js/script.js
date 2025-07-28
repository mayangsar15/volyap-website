function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.style.display = "none";
  });

  document.getElementById(pageId).style.display = "flex";
  document.body.style.overflowX = "hidden";
  function adjustResponsiveLayout() {
    if (window.innerWidth < 768) {
      const carousel = document.querySelector(".carousel");
      if (carousel) {
        carousel.style.flexDirection = "column";
        carousel.style.alignItems = "center";
      }
    }
  }

  window.addEventListener("load", adjustResponsiveLayout);

  if (pageId !== "page-2") {
    document.querySelectorAll(".content-container").forEach((div) => {
      div.classList.add("form-hidden");
      div.classList.remove("show");
    });

    const carousel = document.querySelector(".carousel-container");
    if (carousel) carousel.style.display = "flex";
  }
}

document
  .querySelector("#contact-content form")
  .addEventListener("submit", function (e) {
    showPage("page-3");
  });

const swiper = new Swiper(".mySwiper", {
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function showContent(section) {
  document.querySelector(".carousel-container").style.display = "none";

  document.querySelectorAll(".content-container").forEach((div) => {
    div.classList.remove("show");
    div.classList.add("form-hidden");
  });

  const content = document.getElementById(`${section}-content`);
  if (content) {
    content.classList.add("show");
    content.classList.remove("form-hidden");
  }

  history.pushState({ section }, "", `#${section}`);
}

function backToSlider() {
  document.querySelectorAll(".content-container").forEach((div) => {
    div.classList.remove("show");
    div.classList.add("form-hidden");
  });

  document.querySelector(".carousel-container").style.display = "flex";

  window.scrollTo({ top: 0, behavior: "smooth" });

  history.pushState({}, "", window.location.pathname);
}

window.addEventListener("popstate", function (event) {
  if (event.state && event.state.section) {
    showContent(event.state.section);
  } else {
    backToSlider();
  }
});

setInterval(() => {
  document.querySelectorAll(".slideshow-vertical").forEach((slideshow) => {
    const images = slideshow.querySelectorAll(".slide-v");
    let current = Array.from(images).findIndex((img) =>
      img.classList.contains("show")
    );
    images[current].classList.remove("show");
    const next = (current + 1) % images.length;
    images[next].classList.add("show");
  });
}, 3000);
document.querySelectorAll(".slide-v").forEach((img, i) => {
  if (i !== 0) img.style.top = "100%";
});
