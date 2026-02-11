document.addEventListener('DOMContentLoaded', () => {
    // AOS
    AOS.init();

    // NAVBAR
    const navbar = document.querySelector(".navbar");
    const promoBar = document.querySelector(".promo-bar");
    const btnClose = document.querySelector(".btn-close");

    window.addEventListener("scroll", () => {
        if (!navbar || !promoBar) return;

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

    // PROMO BAR
    if (btnClose && promoBar) {
        const carousel = document.querySelector(".carousel");
        const carouselImg = document.querySelectorAll(".carousel-img");

        btnClose.addEventListener("click", () => {
            promoBar.classList.add("promo-hidden");
            carousel.classList.add("remove-promo");
            carouselImg.forEach((img) => {
                img.classList.add("remove-promo");
            });
        })
    }

    // CATEGORIES
    const categoriesWrapper = document.querySelector("#categories-wrapper");

    if (categoriesWrapper) {
        fetch("./data/cards.json").then((response) => response.json()).then((data) => {

            data.forEach((category) => {
                const div = document.createElement("div");
                div.classList.add("col-12", "col-sm-7", "col-md-6", "col-lg-4", "col-xxl-3", "p-3", "p-md-5");
                div.setAttribute("data-aos", "zoom-in-down");
                div.setAttribute('data-aos-duration', '700');

                div.innerHTML = `
                    <a href="#" class="card-category d-flex justify-content-center align-items-center rounded-4">
                        <img src="${category.icon}" alt="${category.name} Category" class="category-img p-3">
                    </a>
            `

                categoriesWrapper.appendChild(div);
            });

            AOS.refresh();
        })
    }


    // STATS
    const animateCounter = (counter) => {
        let current = 0;
        const target = +counter.getAttribute('data-target');
        const startTime = Date.now();
        const duration = 2000;

        const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 4);
            current = target * easeOut;

            if (progress < 1) {
                counter.innerText = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = current.toLocaleString() + '+';
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const countersInView = entry.target.querySelectorAll('.counter');
                countersInView.forEach(animateCounter);
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(document.querySelector('.stats'));

    // FOOTER
    const spanYear = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    spanYear.textContent = currentYear;
});