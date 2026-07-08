// ================================
// Glow Beauty - Products: Get All Products
// ================================

const db = require('../config/db');

const getProducts = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM products');
        return res.json({ success: true, products: rows });
    } catch (err) {
        console.error('Products Error:', err.message);
        return res.status(500).json({ success: false, message: 'Database Error: ' + err.message });
    }
};

module.exports = getProducts;
