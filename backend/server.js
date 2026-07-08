// ================================
// Glow Beauty - Express Server
// ================================

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');

// Route Handlers — Auth
const login = require('./auth/login');
const register = require('./auth/register');
const logout = require('./auth/logout');

// Route Handlers — Cart
const addCart = require('./cart/add_cart');
const removeCart = require('./cart/remove_cart');
const viewCart = require('./cart/view_cart');

// Route Handlers — Account
const account = require('./account/account');

// Route Handlers — Products
const getProducts = require('./products/products');
const getBrands = require('./products/brands');
const getCategories = require('./products/categories');
const getOffers = require('./products/offers');

// Route Handlers — Wishlist
const { getWishlist, addToWishlist, removeFromWishlist } = require('./wishlist/wishlist');

// Route Handlers — Orders
const checkout = require('./orders/checkout');
const placeOrder = require('./orders/place_order');
const orderSuccess = require('./orders/order_success');
const myOrders = require('./orders/my_orders');

const app = express();
const PORT = 3000;

// ================================
// Middleware
// ================================

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'glowbeauty_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// ================================
// Static Files
// ================================

// Serve frontend folder at /frontend
app.use('/frontend', express.static(path.join(__dirname, '../frontend')));

// Serve root files (loader.html, loader.css)
app.use(express.static(path.join(__dirname, '..')));

// ================================
// Routes — Auth
// ================================

app.post('/backend/auth/login', login);
app.post('/backend/auth/register', register);
app.get('/backend/auth/logout', logout);
app.post('/backend/auth/logout', logout);

// ================================
// Routes — Cart
// ================================

app.post('/backend/cart/add_cart', addCart);
app.get('/backend/cart/remove_cart', removeCart);
app.get('/backend/cart/view_cart', viewCart);

// ================================
// Routes — Account
// ================================

app.get('/backend/account/account', account);

// ================================
// Routes — Products
// ================================

app.get('/backend/products/products', getProducts);
app.get('/backend/products/brands', getBrands);
app.get('/backend/products/categories', getCategories);
app.get('/backend/products/offers', getOffers);

// ================================
// Routes — Wishlist
// ================================

app.get('/backend/wishlist/wishlist', getWishlist);
app.post('/backend/wishlist/wishlist', addToWishlist);
app.delete('/backend/wishlist/wishlist', removeFromWishlist);

// ================================
// Routes — Orders
// ================================

app.get('/backend/orders/checkout', checkout);
app.post('/backend/orders/place_order', placeOrder);
app.get('/backend/orders/order_success', orderSuccess);
app.get('/backend/orders/my_orders', myOrders);

// ================================
// Root Redirect
// ================================

app.get('/', (req, res) => {
    res.redirect('/loader.html');
});

// ================================
// Start Server
// ================================

app.listen(PORT, () => {
    console.log(`\n🌸 Glow Beauty Store is running!`);
    console.log(`   Local:  http://localhost:${PORT}`);
    console.log(`   Home:   http://localhost:${PORT}/frontend/index.html\n`);
});
