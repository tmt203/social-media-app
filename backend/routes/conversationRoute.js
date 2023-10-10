const express = require('express');
const conversationController = require('../controller/conversationController');

const router = express.Router();

router.post('/', conversationController.createConversation);
router.get('/:userId', conversationController.getConversation);
router.get('/find/:firstUserId/:secondUserId', conversationController.getConversationByTwoUser);

module.exports = router;