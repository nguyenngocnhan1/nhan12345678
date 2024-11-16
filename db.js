const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Thay bằng username của bạn
    password: '', // Thay bằng password của bạn
    database: 'BookingDB'
});

module.exports = pool.promise();
