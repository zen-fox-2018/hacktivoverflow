const express = require('express')
const router = express.Router()
const {Authentication, cekAnswerVote} = require('../middlewares')
const answerController = require('../controllers/answer')

router.post('/:questionId', Authentication, answerController.create);
router.get('/:id', answerController.findByQuestion);
router.put('/:id', Authentication, answerController.update);
router.get('/upvote/:id', Authentication, cekAnswerVote, answerController.upVote);
router.get('/downvote/:id', Authentication, cekAnswerVote, answerController.downVote);
router.delete('/:id', Authentication, answerController.delete);

module.exports = router; 