const express = require('express');
const router = express.Router();
const { recommendAI } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/recommend', protect, recommendAI);

module.exports = router;
