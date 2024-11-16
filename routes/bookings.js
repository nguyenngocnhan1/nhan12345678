const express = require('express');
const router = express.Router();
const db = require('../db');

// Hiển thị danh sách đặt chỗ
router.get('/', async (req, res) => {
    try {
        const [bookings] = await db.query('SELECT * FROM Bookings');
        res.render('list', { bookings });
    } catch (error) {
        console.error(error);
    }
});

// Trang thêm đặt chỗ
router.get('/new', (req, res) => {
    res.render('new');
});

// Xử lý thêm đặt chỗ
router.post('/new', async (req, res) => {
    const { customerName, date, time } = req.body;
    try {
        await db.query(
            'INSERT INTO Bookings (customerName, date, time) VALUES (?, ?, ?)',
            [customerName, date, time]
        );
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

// Trang sửa đặt chỗ
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [booking] = await db.query('SELECT * FROM Bookings WHERE id = ?', [id]);
        res.render('edit', { booking: booking[0] });
    } catch (error) {
        console.error(error);
    }
});

// Xử lý sửa đặt chỗ
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { customerName, date, time } = req.body;
    try {
        await db.query(
            'UPDATE Bookings SET customerName = ?, date = ?, time = ? WHERE id = ?',
            [customerName, date, time, id]
        );
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

// Xử lý hủy đặt chỗ
router.post('/cancel/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE Bookings SET status = ? WHERE id = ?', ['Cancelled', id]);
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
