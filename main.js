let navbar = document.querySelector(".navbar");
let promoBar = document.querySelector(".promo-bar");
let btnClose = document.querySelector(".btn-close");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        navbar.classList.add("nav-scrolled");
        promoBar.classList.add("nav-scrolled");
        navbar.classList.remove("bg-p");
        promoBar.classList.remove("bg-p");
    } else {
        navbar.classList.add("bg-p");
        promoBar.classList.add("bg-p");
        navbar.classList.remove("nav-scrolled");
        promoBar.classList.remove("nav-scrolled");
    }
})

btnClose.addEventListener("click", () => {
    promoBar.classList.add("d-none");
})