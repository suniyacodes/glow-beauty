// ================================
// Glow Beauty - Cart: Add to Cart
// ================================

const db = require('../config/db');

const addCart = async (req, res) => {
    const { product_name, price } = req.body;

    if (!product_name || !price) {
        return res.status(400).json({ success: false, message: 'Product name and price are required.' });
    }

    try {
        const sql = 'INSERT INTO cart (product, price) VALUES (?, ?)';
        await db.execute(sql, [product_name, price]);

        return res.json({ success: true, message: 'Product added to cart.' });
    } catch (err) {
        console.error('Add Cart Error:', err.message);
        return res.status(500).json({ success: false, message: 'Database Error: ' + err.message });
    }
};

module.exports = addCart;
