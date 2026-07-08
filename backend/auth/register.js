// ================================
// Glow Beauty - Auth: Register
// ================================

const db = require('../config/db');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        await db.execute(sql, [name, email, password]);

        return res.json({ success: true, message: 'Registration Successful' });
    } catch (err) {
        console.error('Register Error:', err.message);
        return res.status(500).json({ success: false, message: 'Registration Failed: ' + err.message });
    }
};

module.exports = register;
