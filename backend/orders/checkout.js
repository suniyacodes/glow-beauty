// ================================
// Glow Beauty - Orders: Checkout
// ================================

const db = require('../config/db');

// GET /backend/orders/checkout — get cart items for checkout summary
const checkout = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Not logged in' });
    }

    try {
        const [cartItems] = await db.execute('SELECT * FROM cart');

        if (cartItems.length === 0) {
            return res.json({ success: false, message: 'Cart is empty.' });
        }

        const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

        return res.json({
            success: true,
            user: req.session.user,
            cart: cartItems,
            total: total.toFixed(2)
        });
    } catch (err) {
        console.error('Checkout Error:', err.message);
        return res.status(500).json({ success: false, message: 'Database Error: ' + err.message });
    }
};

module.exports = checkout;
