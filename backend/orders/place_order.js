// ================================
// Glow Beauty - Orders: Place Order
// ================================

const db = require('../config/db');

// POST /backend/orders/place_order — move cart items to orders table and clear cart
const placeOrder = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Not logged in' });
    }

    const { address, payment_method } = req.body;

    if (!address) {
        return res.status(400).json({ success: false, message: 'Delivery address is required.' });
    }

    try {
        // Fetch cart items
        const [cartItems] = await db.execute('SELECT * FROM cart');

        if (cartItems.length === 0) {
            return res.json({ success: false, message: 'Cart is empty. Cannot place order.' });
        }

        const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

        // Insert into orders table
        const [orderResult] = await db.execute(
            'INSERT INTO orders (user, total, address, payment_method, status) VALUES (?, ?, ?, ?, ?)',
            [req.session.user, total.toFixed(2), address, payment_method || 'COD', 'Confirmed']
        );

        const orderId = orderResult.insertId;

        // Insert each cart item into order_items table
        for (const item of cartItems) {
            await db.execute(
                'INSERT INTO order_items (order_id, product, price) VALUES (?, ?, ?)',
                [orderId, item.product, item.price]
            );
        }

        // Clear the cart
        await db.execute('DELETE FROM cart');

        return res.json({
            success: true,
            message: 'Order placed successfully!',
            order_id: orderId
        });
    } catch (err) {
        console.error('Place Order Error:', err.message);
        return res.status(500).json({ success: false, message: 'Database Error: ' + err.message });
    }
};

module.exports = placeOrder;
