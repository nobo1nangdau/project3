const apiUrl = 'https://dummyjson.com/products';

// Biến lưu trữ tất cả sản phẩm
let allProducts = [];

// Fetch products va lưu vào allProducts
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data.products); // In toàn bộ danh sách sản phẩm ra console

        allProducts = data.products; // Lưu sản phẩm vào biến allProducts
        renderProducts(data.products); // hien thi danh sach sản phẩm ban đầu
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


// lọc và hiển thị sản phẩm theo danh muc
function filterProducts(category) {
    if(category == 'ALL'){
        renderProducts(allProducts); // hien thi tat ca san pham
    } else {
        const filteredProducts = allProducts.filter (product => product.category === category);
        renderProducts(filteredProducts); // hien thi san pham theo danh muc
    }
}

// gán sự kiện cho các nút danh mục
document.getElementById('category-filter').addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON') {
        const category = event.target.dataset.category;
        filterProducts(category);
    }
});


function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
        `;

        productList.appendChild(productDiv);
    });
}



fetchProducts();


