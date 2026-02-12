document.addEventListener('DOMContentLoaded', () => {
    // AOS
    AOS.init();

    // CATEGORIES
    fetch("./data/cards.json").then((response) => response.json()).then((data) => {
        const categoriesWrapper = document.querySelector("#categories-wrapper");

        data.forEach((category) => {
            const div = document.createElement("div");
            div.classList.add("col-12", "col-sm-7", "col-md-6", "col-lg-4", "col-xxl-3", "p-3", "p-md-5");
            div.setAttribute("data-aos", "zoom-in-down");
            div.setAttribute('data-aos-duration', '700');

            div.innerHTML = `
                    <a href="#" class="card-category d-flex justify-content-center align-items-center rounded-4">
                        <img src="${category.icon}" alt="${category.name} Category" class="category-img p-3">
                    </a>
            `;

            categoriesWrapper.appendChild(div);
        });

        AOS.refresh();
    })

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
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.9
    });

    const allCounters = document.querySelectorAll('.counter');
    allCounters.forEach(counter => {
        observer.observe(counter);
    });
});