// ================================
// Glow Beauty - Orders: My Orders
// ================================

const db = require('../config/db');

// GET /backend/orders/my_orders — fetch all past orders for logged-in user
const myOrders = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Not logged in' });
    }

    try {
        // Fetch all orders for this user
        const [orders] = await db.execute(
            'SELECT * FROM orders WHERE user = ? ORDER BY id DESC',
            [req.session.user]
        );

        if (orders.length === 0) {
            return res.json({ success: true, orders: [], message: 'No orders found.' });
        }

        // For each order, attach its items
        const ordersWithItems = await Promise.all(
            orders.map(async (order) => {
                const [items] = await db.execute(
                    'SELECT * FROM order_items WHERE order_id = ?',
                    [order.id]
                );
                return { ...order, items };
            })
        );

        return res.json({ success: true, orders: ordersWithItems });
    } catch (err) {
        console.error('My Orders Error:', err.message);
        return res.status(500).json({ success: false, message: 'Database Error: ' + err.message });
    }
};

module.exports = myOrders;
