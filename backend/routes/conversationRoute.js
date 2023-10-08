const express = require('express');
const conversationController = require('../controller/conversationController');

const router = express.Router();

router.post('/', conversationController.createConversation);
router.get('/:userId', conversationController.getConversation)

module.exports = router;