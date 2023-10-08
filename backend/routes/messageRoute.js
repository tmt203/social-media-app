const express = require('express');
const messageController = require('../controller/messageController');

const router = express.Router();

router.post('/', messageController.createMessage);
router.get('/:conversationId', messageController.getAllMessages);

module.exports = router;