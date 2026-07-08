// ================================
// Glow Beauty - Products: Get All Categories
// ================================

const db = require('../config/db');

const getCategories = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM categories');
        return res.json({ success: true, categories: rows });
    } catch (err) {
        console.error('Categories Error:', err.message);
        return res.status(500).json({ success: false, message: 'Database Error: ' + err.message });
    }
};

module.exports = getCategories;
