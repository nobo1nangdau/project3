export function setupSearch(allProducts, renderProducts) {
    const inputSearch = document.querySelector("#search input");
    const buttonSearch = document.querySelector("#search button");

    buttonSearch.addEventListener("click", function () {
        const query = inputSearch.value.trim().toLowerCase();
        searchProducts(query, allProducts, renderProducts);
    });

    inputSearch.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            buttonSearch.click();
        }
    });
}

 export function searchProducts(query, allProducts, renderProducts) {
    if (query === "") {
        renderProducts(allProducts);
        return;
    }

    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(query)
    );

    renderProducts(filteredProducts);
}
