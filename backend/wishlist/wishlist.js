// ================================
// Glow Beauty - Wishlist
// ================================

const db = require('../config/db');

// GET /backend/wishlist/wishlist — view all wishlist items for logged-in user
const getWishlist = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Not logged in' });
    }

    try {
        const [rows] = await db.execute(
            'SELECT * FROM wishlist WHERE user = ?',
            [req.session.user]
        );
        return res.json({ success: true, wishlist: rows });
    } catch (err) {
        console.error('Wishlist Error:', err.message);
        return res.status(500).json({ success: false, message: 'Database Error: ' + err.message });
    }
};

// POST /backend/wishlist/wishlist — add item to wishlist
const addToWishlist = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Not logged in' });
    }

    const { product_name, price } = req.body;

    if (!product_name || !price) {
        return res.status(400).json({ success: false, message: 'Product name and price are required.' });
    }

    try {
        await db.execute(
            'INSERT INTO wishlist (user, product, price) VALUES (?, ?, ?)',
            [req.session.user, product_name, price]
        );
        return res.json({ success: true, message: 'Added to wishlist.' });
    } catch (err) {
        console.error('Wishlist Add Error:', err.message);
        return res.status(500).json({ success: false, message: 'Database Error: ' + err.message });
    }
};

// DELETE /backend/wishlist/wishlist?id=X — remove item from wishlist
const removeFromWishlist = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ success: false, message: 'Item ID is required.' });
    }

    try {
        await db.execute('DELETE FROM wishlist WHERE id = ?', [id]);
        return res.json({ success: true, message: 'Removed from wishlist.' });
    } catch (err) {
        console.error('Wishlist Remove Error:', err.message);
        return res.status(500).json({ success: false, message: 'Database Error: ' + err.message });
    }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
