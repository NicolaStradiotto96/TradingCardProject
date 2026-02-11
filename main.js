document.addEventListener('DOMContentLoaded', () => {
    // AOS
    AOS.init();

    // NAVBAR
    const navbar = document.querySelector(".navbar");
    const promoBar = document.querySelector(".promo-bar");
    const btnClose = document.querySelector(".btn-close");

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

    // PROMO BAR
    btnClose.addEventListener("click", () => {
        promoBar.classList.add("d-none");
    })

    // STATS
    const animateCounter = (counter) => {
        let current = 0;
        const target = counter.getAttribute('data-target');
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
                counter.innerText = target.toLocaleString() + '+';
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