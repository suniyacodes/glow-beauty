// ================================
// Glow Beauty - Auth: Login
// ================================

const db = require('../config/db');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    try {
        const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
        const [rows] = await db.execute(sql, [email, password]);

        if (rows.length > 0) {
            req.session.user = rows[0].name;
            req.session.email = rows[0].email;
            return res.json({ success: true, message: 'Login Successful', user: rows[0].name, email: rows[0].email });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid Email or Password' });
        }
    } catch (err) {
        console.error('Login Error:', err.message);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = login;
