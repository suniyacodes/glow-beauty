// ================================
// Glow Beauty - Account
// ================================

const account = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Not logged in', redirect: '/frontend/login.html' });
    }
    return res.json({ success: true, user: req.session.user, email: req.session.email || '' });
};

module.exports = account;
