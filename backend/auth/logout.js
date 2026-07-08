// ================================
// Glow Beauty - Auth: Logout
// ================================

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Logout Failed' });
        }
        return res.json({ success: true, message: 'Logged Out Successfully' });
    });
};

module.exports = logout;
