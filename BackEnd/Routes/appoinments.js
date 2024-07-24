const express = require('express');
const router = express.Router();
const { getAppointments, createAppointment, updateAppointment, deleteAppointment } = require('../controllers/appointmetController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getAppointments);
router.post('/', authMiddleware, createAppointment);
router.put('/:id', authMiddleware, updateAppointment);
router.delete('/:id', authMiddleware, deleteAppointment);

module.exports = router;