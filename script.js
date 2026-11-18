
const products = [
    {
        id: 1,
        name: "Men Casual Shirt",
        category: "Men",
        price: 799,
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500"
    },
    {
        id: 2,
        name: "Women Fashion Dress",
        category: "Women",
        price: 1299,
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500"
    },
    {
        id: 3,
        name: "Men Sneakers",
        category: "Men",
        price: 1499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 4,
        name: "Women Handbag",
        category: "Women",
        price: 999,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
    },
    {
        id: 5,
        name: "Kids Fashion",
        category: "Kids",
        price: 599,
        image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500"
    },
    {
        id: 6,
        name: "Men Jacket",
        category: "Men",
        price: 1799,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    },
    {
        id: 7,
        name: "Women Shoes",
        category: "Women",
        price: 1199,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500"
    },
    {
        id: 8,
        name: "Kids Outfit",
        category: "Kids",
        price: 699,
        image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500"
    }
];

let cart = [];
let wishlist = [];

// Display Products

function displayProducts(items) {
    const grid = document.getElementById("productGrid");

    grid.innerHTML = "";

    if (items.length === 0) {
        grid.innerHTML = "<h3>No products found!</h3>";
        return;
    }

    items.forEach(product => {

        const isLiked = wishlist.some(p => p.id === product.id);

        grid.innerHTML += `
            <div class="product">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <p class="price">₹${product.price}</p>

                <div class="product-actions">

                    <button onclick="addToCart(${product.id})">
                        ADD TO BAG
                    </button>

                    <button
                        class="like-btn ${isLiked ? 'liked' : ''}"
                        onclick="toggleWishlist(${product.id})">
                        ${isLiked ? '♥' : '♡'}
                    </button>

                </div>
            </div>
        `;
    });
}

// Add To Cart

function addToCart(id) {

    const product = products.find(p => p.id === id);

    const existing = cart.find(p => p.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    openBag();
}

// Update Cart

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    document.getElementById("cartCount").innerText =
        cart.reduce((sum, p) => sum + p.quantity, 0);

    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<div class="empty-message">🛍 Your bag is empty!</div>';
    }

    cart.forEach(product => {

        total += product.price * product.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${product.image}">

                <div class="cart-info">

                    <h4>${product.name}</h4>

                    <p>₹${product.price}</p>

                    <div class="quantity">

                        <button onclick="changeQuantity(${product.id}, -1)">−</button>

                        <span>${product.quantity}</span>

                        <button onclick="changeQuantity(${product.id}, 1)">+</button>

                    </div>

                    <button class="remove-btn"
                    onclick="removeFromCart(${product.id})">
                        Remove
                    </button>

                </div>
            </div>
        `;
    });

    document.getElementById("totalPrice").innerText = total;
}

// Change Quantity

function changeQuantity(id, change) {

    const product = cart.find(p => p.id === id);

    if (!product) return;

    product.quantity += change;

    if (product.quantity <= 0) {
        removeFromCart(id);
        return;
    }

    updateCart();
}

// Remove Product

function removeFromCart(id) {

    cart = cart.filter(p => p.id !== id);

    updateCart();
}

// Wishlist

function toggleWishlist(id) {

    const product = products.find(p => p.id === id);

    const exists = wishlist.some(p => p.id === id);

    if (exists) {
        wishlist = wishlist.filter(p => p.id !== id);
    } else {
        wishlist.push(product);
    }

    updateWishlist();

    displayProducts(getVisibleProducts());
}

function updateWishlist() {

    document.getElementById("wishCount").innerText =
        wishlist.length;

    const wishlistItems =
        document.getElementById("wishlistItems");

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {
        wishlistItems.innerHTML =
            '<div class="empty-message">❤️ Your wishlist is empty!</div>';
    }

    wishlist.forEach(product => {

        wishlistItems.innerHTML += `
            <div class="cart-item">

                <img src="${product.image}">

                <div class="cart-info">

                    <h4>${product.name}</h4>

                    <p>₹${product.price}</p>

                    <button class="remove-btn"
                    onclick="toggleWishlist(${product.id})">
                        Remove from Wishlist
                    </button>

                    <button onclick="addToCart(${product.id})">
                        ADD TO BAG
                    </button>

                </div>

            </div>
        `;
    });
}

// Open Bag

function openBag() {

    closePanels();

    document.getElementById("overlay").classList.add("active");

    document.getElementById("bagPanel").classList.add("active");
}

// Open Wishlist

function openWishlist() {

    closePanels();

    document.getElementById("overlay").classList.add("active");

    document.getElementById("wishlistPanel").classList.add("active");
}

// Close Panels

function closePanels() {

    document.getElementById("overlay").classList.remove("active");

    document.getElementById("bagPanel").classList.remove("active");

    document.getElementById("wishlistPanel").classList.remove("active");
}

// Filtering

let currentCategory = "All";

function getVisibleProducts() {

    if (currentCategory === "All") {
        return products.filter(p =>
            p.name.toLowerCase().includes(
                document.getElementById("searchInput").value.toLowerCase()
            )
        );
    }

    return products.filter(p =>
        p.category === currentCategory &&
        p.name.toLowerCase().includes(
            document.getElementById("searchInput").value.toLowerCase()
        )
    );
}

function filterProducts(category) {

    currentCategory = category;

    displayProducts(getVisibleProducts());

    document.querySelector(".products").scrollIntoView({
        behavior: "smooth"
    });
}

// Search

function searchProducts() {

    displayProducts(getVisibleProducts());
}

// Checkout Demo

function checkout() {

    if (cart.length === 0) {
        alert("Your shopping bag is empty!");
        return;
    }

    alert("Order feature coming soon! Your total is ₹" +
        document.getElementById("totalPrice").innerText);
}

// Initial Display

displayProducts(products);

updateCart();

updateWishlist();
