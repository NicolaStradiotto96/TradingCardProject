
// NAVBAR + OFFCANVAS NAVBAR
const navbarPlaceholder = document.querySelector('.navbar-placeholder');
let navbar;

if (navbarPlaceholder) {
    navbarPlaceholder.innerHTML = `
            <nav class="navbar navbar-expand-lg bg-p position-fixed top-0 w-100 z-3 navbar-dark ">
                <div class="nav-wrapper w-100 mx-auto d-flex align-items-center justify-content-between px-3">
                    <div>
                        <button class="navbar-toggler me-2 ps-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
                            <i class="bi bi-list align-middle display-3 color-s"></i>
                        </button>
                        <a class="navbar-brand m-0" href="index.html">
                            <img src="media/logo.png" alt="Logo" class="nav-logo mx-2">
                        </a>
                    </div>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav mx-auto fs-5 fw-bold">
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="index.html">Home</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Categories
                                    <span class="dropdown-arrow fw-normal">></span>
                                </a>
                                <ul class="dropdown-menu categories-dropdown text-center py-0 mt-0">
                                    <!-- CATEGORIES CONTENT VIA LAYOUT.JS -->
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="contacts.html">Contacts</a>
                            </li>
                        </ul>
                    </div>
                    <div class="fs-3">
                        <ul class="navbar-nav flex-row">
                            <li class="navbar-icon"><a href=""><i class="bi bi-search color-s mx-2"></a></i></li>
                            <li class="navbar-icon"><a href=""><i class="bi bi-person color-s mx-2"></a></i></li>
                            <li class="navbar-icon"><a href=""><i class="bi bi-bag color-s mx-2"></a></i></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="offcanvas offcanvas-start" id="offcanvasNavbar">
                <div class="offcanvas-body bg-p">
                    <div class="container bg-p2 rounded">
                        <ul class="navbar-nav fs-5 fw-bold">
                            <hr class="mt-0">
                            <li class="nav-item text-center d-flex justify-content-center">
                                <a class="nav-link active w-50" aria-current="page" href="index.html">Home</a>
                            </li>
                            <hr class="color-s">
                            <li class="nav-item dropdown text-center d-flex flex-column align-items-center">
                                <a class="nav-link w-50" href="#categories" id="categories-navbar">
                                    Categories
                                </a>
                                <ul class="categories-dropdown list-unstyled">
                                    <!-- CATEGORIES CONTENT VIA LAYOUT.JS -->
                                </ul>
                            </li>
                            <hr class="color-s">
                            <li class="nav-item text-center d-flex justify-content-center">
                                <a class="nav-link w-50" aria-current="page" href="contacts.html">Contacts</a>
                            </li>
                            <hr class="mb-0">
                        </ul>
                    </div>
                </div>
            </div>
        `;

    const currentPath = window.location.pathname;
    const navLinks = navbarPlaceholder.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if ((currentPath === "/" || currentPath.endsWith("index.html")) && linkHref === "index.html") {
            link.classList.add('active');
        } else if ((currentPath === "/" || currentPath.endsWith("contacts.html")) && linkHref === "contacts.html") {
            link.classList.add('active');
        } else if (linkHref === "category.html"){
            link.classList.add('active');
        }
    });

    fetch("data/cards.json").then((response) => response.json()).then((data) => {
        const categoriesDropdown = document.querySelectorAll(".categories-dropdown");

        data.forEach((category) => {
            categoriesDropdown.forEach((dropdown) => {
                const li = document.createElement("li");
                li.classList.add("nav-link");
                li.innerHTML = `
                    <a class="dropdown-item" href="category-${category.url}.html">${category.name}</a>
                `;

                dropdown.appendChild(li);
            })
        });
    })

    // NAVBAR
    navbar = navbarPlaceholder.querySelector(".navbar");

    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownArrow = document.querySelector(".dropdown-arrow");

    const dropdownContainer = dropdownToggle.parentElement;

    if (dropdownToggle) {
        dropdownToggle.addEventListener("mouseenter", () => {
            dropdownToggle.classList.add('show');
            dropdownMenu.classList.add('show');
            dropdownToggle.setAttribute('aria-expanded', 'true');
            dropdownArrow.classList.add("arrow-rotate");
        });

        dropdownContainer.addEventListener("mouseleave", () => {
            dropdownToggle.classList.remove('show');
            dropdownMenu.classList.remove('show');
            dropdownToggle.setAttribute('aria-expanded', 'false');
            dropdownArrow.classList.remove("arrow-rotate");
        });
    }

    // OFFCANVAS NAVBAR
    const categoriesNavbar = document.querySelector("#categories-navbar");
    const offcanvasNavbar = document.querySelector("#offcanvasNavbar");

    categoriesNavbar.addEventListener("click", () => {
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasNavbar);
        bsOffcanvas.hide();
    })
}

// PROMO BAR
const promobarPlaceholder = document.querySelector('.promobar-placeholder');
let promoBar;

if (promobarPlaceholder) {
    promobarPlaceholder.innerHTML = `
        <div class="promo-bar bg-p color-s position-fixed w-100 z-2">
            <hr class="m-0">
            <div class="container-lg h-100">
                <div class="row align-items-center justify-content-center h-100 px-3">
                    <div class="col-11 col-md-6 px-0">
                        <strong>🚀 30% OFF this month! Code: PROMO30</strong>
                    </div>
                    <div class="col-1 col-md-4 text-end px-0">
                        <button class="btn-close btn-close-white "></button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const btnClose = document.querySelector(".btn-close");
    promoBar = promobarPlaceholder.querySelector(".promo-bar");

    if (btnClose && promoBar) {
        btnClose.addEventListener("click", () => {
            promoBar.classList.add("promo-hidden");
        })
    }
}

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

// FOOTER
const footerPlaceholder = document.querySelector('.footer-placeholder');
const currentYear = new Date().getFullYear();

if (footerPlaceholder) {
    footerPlaceholder.innerHTML = `
        <footer>
            <div class="container d-flex flex-wrap justify-content-between align-items-center py-4">
                <div class="col-8 col-md-4 d-flex align-items-center">
                    <a href="index.html" class="me-2 mb-md-0 color-s text-decoration-none lh-1" aria-label="Bootstrap">
                        <img src="media/logo.png" alt="Logo" class="nav-logo">
                    </a>
                    <span class="mb-md-0 color-s">© ${currentYear} Trading Card Website</span>
                </div>
                <ul class="nav col-4 list-unstyled d-flex justify-content-end align-items-center">
                    <li class="footer-icon ms-3">
                        <a class="color-s" href="#" aria-label="Instagram">
                            <i class="bi bi-instagram"></i>
                        </a>
                    </li>
                    <li class="footer-icon ms-3">
                        <a class="color-s" href="#" aria-label="TikTok">
                            <i class="bi bi-tiktok"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    `;
}