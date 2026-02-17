document.addEventListener('DOMContentLoaded', () => {

    // CARDS
    fetch("./data/cards.json").then((response) => response.json()).then((data) => {
        // CREATE CARDS
        const categoryMap = {
            "pokemon": 0,
            "magic": 1,
            "yugioh": 2,
            "lorcana": 3,
            "onepiece": 4,
            "digimon": 5,
            "dragonball": 6,
            "riftbound": 7
        };

        const path = window.location.pathname.toLowerCase();
        const categoryKey = Object.keys(categoryMap).find(key => path.includes(key));

        let cardsCategory = categoryKey != undefined ? data[categoryMap[categoryKey]].cards : [];

        const categoryTitle = document.querySelector(".category-title");

        if (categoryKey != undefined) {
            categoryTitle.textContent = `
                ${data[categoryMap[categoryKey]].name}
            `
        }

        const categoriesWrapper = document.querySelector("#categories-wrapper");

        function createCards(array) {
            array.forEach((card) => {
                const div = document.createElement("div");
                div.classList.add("card", "card-border", "col-12", "col-sm-7", "col-md-6", "col-lg-4", "col-xxl-3", "mx-4", "mt-5");

                div.innerHTML = `
                    <img class="card-img-top" src="${card.image}" alt="Card image">
                    <div class="card-body card-border bg-p d-flex flex-column justify-content-center align-items-center border">
                        <h5 class="card-title color-s text-center tooltip-container px-1" data-tooltip="${card.name}">${card.name}</h5>
                        <p class="card-text m-0 color-s">${card.rarity}</p>
                        <p class="card-text m-0 color-s">${card.price.toFixed(2)}€</p>
                    ${card.quantity == 0
                        ? `<p class="card-text text-danger">${card.quantity} in stock</p>`
                        : `<p class="card-text text-secondary">${card.quantity} in stock</p>`
                    }
                        <a href="#" class="btn btn-cart">Add to cart
                            <i class="bi bi-cart"></i>
                        </a>
                    </div>
                `;

                categoriesWrapper.appendChild(div);
            });
        }

        createCards(cardsCategory);

        // PRICE FILTER
        let priceLabel = document.querySelector("#price-label");
        let priceFilter = document.querySelector("#price-filter");

        const prices = cardsCategory.map(card => card.price);

        let minPrice = Math.ceil(Math.min(...prices));
        let maxPrice = Math.ceil(Math.max(...prices));

        priceFilter.min = minPrice;
        priceFilter.max = maxPrice;
        priceFilter.value = maxPrice;
        priceLabel.innerHTML = `Max Price: ${parseFloat(maxPrice).toFixed(2)} €`;

        function priceFilterCards(array) {
            let filtered = array.filter((card) => card.price <= priceFilter.value)

            return filtered;
        }

        priceFilter.addEventListener("change", () => {
            priceLabel.innerHTML = `Max Price: ${parseFloat(priceFilter.value).toFixed(2)} €`;
            globalFilter();
        });

        // WORD FILTER
        let wordFilter = document.querySelector("#word-filter");

        function wordFilterCards(array) {
            let filtered = array.filter((card) => card.name.toLowerCase().includes(wordFilter.value.toLowerCase()));

            return filtered;
        }

        wordFilter.addEventListener("input", () => {
            globalFilter();
        })

        // AVAILABLE FILTER
        let availableFilter = document.querySelector("#available-filter");


        function availableFilterCards(array) {
            let filtered = array.filter((card) => {
                if (availableFilter.checked) {
                    return card.quantity > 0;
                }

                return array;
            });

            return filtered;
        }

        availableFilter.addEventListener("click", () => {
            globalFilter();

        })

        // GLOBAL FILTER
        function globalFilter() {
            categoriesWrapper.innerHTML = "";

            let filteredPrice = priceFilterCards(cardsCategory);
            let filteredWord = wordFilterCards(filteredPrice);
            let filteredAvailable = availableFilterCards(filteredWord);

            if (filteredAvailable.length === 0) {
                categoriesWrapper.innerHTML = `
            <div class="text-center col-12 mx-4 mt-5">
                <h4 class="color-s">No cards match your search</h4>
                <p class="text-secondary">Try adjusting your filters.</p>
            </div>`;
            } else {
                createCards(filteredAvailable);
            }
        }
    })
});