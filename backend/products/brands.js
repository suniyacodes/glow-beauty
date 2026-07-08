// ================================
// Glow Beauty - Products: Get All Brands
// ================================

const db = require('../config/db');

const getBrands = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM brands');
        return res.json({ success: true, brands: rows });
    } catch (err) {
        console.error('Brands Error:', err.message);
        return res.status(500).json({ success: false, message: 'Database Error: ' + err.message });
    }
};

module.exports = getBrands;
