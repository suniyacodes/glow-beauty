// ================================
// Glow Beauty - Database Config
// ================================

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'glowbeauty',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database Connection Failed:', err.message);
    } else {
        console.log('Database Connected Successfully ✅');
        connection.release();
    }
});

module.exports = pool.promise();
