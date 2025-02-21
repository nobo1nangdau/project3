


const apiUrl = 'https://dummyjson.com/products';

// Biến lưu trữ tất cả sản phẩm và danh sách sản phẩm đang hiển thị
let allProducts = [];
let filteredProducts = []; // Lưu danh sách hiện tại sau khi lọc hoặc tìm kiếm
let currentPage = 1;
const productsPerPage = 6; // Số sản phẩm mỗi trang

// Fetch danh sách sản phẩm từ API
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        allProducts = data.products;
        filteredProducts = allProducts; // Ban đầu, hiển thị tất cả sản phẩm
        renderProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
fetchProducts();

// Hàm hiển thị sản phẩm
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex); // Lấy danh sách hiển thị

    productsToShow.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
        `;
        productList.appendChild(productDiv);
    });

    updatePagination();
}

// Cập nhật trạng thái phân trang
function updatePagination() {
    document.getElementById('pageNumber').textContent = currentPage;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage * productsPerPage >= filteredProducts.length;
}

// Xử lý sự kiện chuyển trang
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage * productsPerPage < filteredProducts.length) {
        currentPage++;
        renderProducts();
    }
});

// Lọc sản phẩm theo danh mục
function filterProducts(category) {
    currentPage = 1;
    if (category === 'ALL') {
        filteredProducts = allProducts;
    } else {
        filteredProducts = allProducts.filter(product => product.category === category);
    }
    renderProducts();
}

// Gán sự kiện click cho các nút danh mục
document.getElementById('category-filter').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const category = event.target.dataset.category;
        filterProducts(category);
    }
});

// Tìm kiếm sản phẩm theo từ khóa
function timKiem(query) {
    currentPage = 1;
    if (query === "") {
        filteredProducts = allProducts;
    } else {
        filteredProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(query)
        );
    }
    renderProducts();
}

// Lắng nghe sự kiện click vào nút tìm kiếm
document.querySelector("#search button").addEventListener("click", function () {
    const query = document.querySelector("#search input").value.trim().toLowerCase();
    timKiem(query);
});

// Cho phép tìm kiếm khi nhấn Enter
document.querySelector("#search input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        document.querySelector("#search button").click();
    }
});



// sắp xếp theo giá

// xử lý sự kiên khi thay đổi lựa chọn sắp xếp
document.getElementById('sort').addEventListener('change', function(){
    const sortBy = this.value;
    sortProducts(sortBy);
});

// hàm sắp xếp sản phẩm
function sortProducts(sortBy){
    let sortedProducts = [...filteredProducts]; // tao bản sao để không làm thay đổi dữ liệu gốc
    switch(sortBy) {
        case 'lowToHigh':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'highToLow':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'discount':
            sortedProducts.sort((a, b) => b.discountPercentage  - a.discountPercentage);
            break;
        default:
            sortedProducts = [...allProducts]; // quay ve danh sach goc
            break;
    }
    filteredProducts = sortedProducts; // cap nhat danh sach da loc
    currentPage = 1; // reset ve trang 1 khi sap xep
    renderProducts(sortedProducts)
}

