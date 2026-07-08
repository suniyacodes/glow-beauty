// ================================
// Glow Beauty - Products: Get All Offers
// ================================

const db = require('../config/db');

const getOffers = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM offers');
        return res.json({ success: true, offers: rows });
    } catch (err) {
        console.error('Offers Error:', err.message);
        return res.status(500).json({ success: false, message: 'Database Error: ' + err.message });
    }
};

module.exports = getOffers;
