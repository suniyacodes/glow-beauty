// ================================
// Glow Beauty - Orders: Order Success
// ================================

const db = require('../config/db');

// GET /backend/orders/order_success?order_id=X — fetch a single order confirmation
const orderSuccess = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Not logged in' });
    }

    const { order_id } = req.query;

    if (!order_id) {
        return res.status(400).json({ success: false, message: 'Order ID is required.' });
    }

    try {
        // Fetch the order
        const [orders] = await db.execute(
            'SELECT * FROM orders WHERE id = ? AND user = ?',
            [order_id, req.session.user]
        );

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'Order not found.' });
        }

        // Fetch the order items
        const [items] = await db.execute(
            'SELECT * FROM order_items WHERE order_id = ?',
            [order_id]
        );

        return res.json({
            success: true,
            order: orders[0],
            items: items
        });
    } catch (err) {
        console.error('Order Success Error:', err.message);
        return res.status(500).json({ success: false, message: 'Database Error: ' + err.message });
    }
};

module.exports = orderSuccess;
