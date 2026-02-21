const products = [
    { id: 1, name: "Patriot Polo - Black", price: 45.00, image: "1.jpg", category: "polo" },
    { id: 2, name: "Patriot Polo - Red", price: 45.00, image: "2.jpg", category: "polo" },
    { id: 3, name: "Tropical Vibes Shirt", price: 39.99, image: "3.jpg", category: "shirt" },
    { id: 4, name: "Signature Polo - Navy", price: 42.50, image: "4.jpg", category: "polo" },
    { id: 5, name: "Racer Zip Polo", price: 48.00, image: "5.jpg", category: "polo" },
    { id: 6, name: "Fishing Humor Tee", price: 25.00, image: "6.jpg", category: "tee" }
];

const grid = document.getElementById('product-grid');
const cartCountSpan = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total-amount');

let cart = [];

function renderProducts(items = products) {
    grid.innerHTML = items.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button onclick="addToCart('${product.name}')">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function filterProducts(category) {
    // Update active button style
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if(event && event.target) {
        event.target.classList.add('active');
    }

    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

window.addToCart = function(productName) {
    const product = products.find(p => p.name === productName);
    cart.push(product);
    updateCartCount();
    updateCartModal();
    
    // Optional: Visual feedback
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "Added!";
    setTimeout(() => btn.innerText = originalText, 1000);
};

function updateCartCount() {
    cartCountSpan.textContent = cart.length;
}

function updateCartModal() {
    cartItemsList.innerHTML = cart.map(item => `
        <li>
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        </li>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalSpan.textContent = total.toFixed(2);
}

window.openCart = function() {
    cartModal.style.display = "block";
}

window.closeCart = function() {
    cartModal.style.display = "none";
}

// Close modal if clicking outside content
window.onclick = function(event) {
    if (event.target == cartModal) {
        cartModal.style.display = "none";
    }
}

// Initialize the store
renderProducts();