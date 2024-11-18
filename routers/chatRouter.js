const express = require('express');
const router = express.Router();
const discussionCtrl = require('../controllers/chatCtrl')



router.post('/add/:sourceId/:destinationId',discussionCtrl.createDiscussion);
router.post('/send/:id',discussionCtrl.sendMessage);
router.get('/contact/:id',discussionCtrl.getContacts);
router.get('/:user_id',discussionCtrl.getDiscussions);
router.get('/id/:id',discussionCtrl.getDiscussionById);


module.exports = router;