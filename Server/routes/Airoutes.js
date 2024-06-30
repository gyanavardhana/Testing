const express = require('express');
const router = express.Router();
const chatController = require('../Controllers/AiControllers');

router.post('/analyze', chatController);

module.exports = router;