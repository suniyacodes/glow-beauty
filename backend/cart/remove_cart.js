// ================================
// Glow Beauty - Cart: Remove from Cart
// ================================

const db = require('../config/db');

const removeCart = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ success: false, message: 'Item ID is required.' });
    }

    try {
        const sql = 'DELETE FROM cart WHERE id = ?';
        await db.execute(sql, [id]);

        return res.json({ success: true, message: 'Item removed from cart.' });
    } catch (err) {
        console.error('Remove Cart Error:', err.message);
        return res.status(500).json({ success: false, message: 'Database Error: ' + err.message });
    }
};

module.exports = removeCart;
