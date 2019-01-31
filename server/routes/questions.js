const express = require('express')
const router = express.Router()
const   {Authentication, cekQuestionVote} = require('../middlewares'),
        questionController = require('../controllers/question')

router.get('/', questionController.findAll);
router.get('/mine', Authentication, questionController.findByUser)
router.get('/:id', questionController.findById);
router.post('/', Authentication, questionController.create);
router.put('/:id', Authentication, questionController.update);
router.get('/upvote/:id', Authentication, cekQuestionVote, questionController.upVote);
router.get('/downvote/:id', Authentication, cekQuestionVote, questionController.downVote);
router.delete('/:id', Authentication, questionController.delete);

module.exports = router; 