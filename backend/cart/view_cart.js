// ================================
// Glow Beauty - Cart: View Cart
// ================================

const db = require('../config/db');

const viewCart = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM cart');
        return res.json({ success: true, cart: rows });
    } catch (err) {
        console.error('View Cart Error:', err.message);
        return res.status(500).json({ success: false, message: 'Database Error: ' + err.message });
    }
};

module.exports = viewCart;
