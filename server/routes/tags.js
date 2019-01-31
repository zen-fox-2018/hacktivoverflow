var express = require('express');
var router = express.Router()
var tagController = require('../controllers/tag')

router.get('/', tagController.findAll)
router.post('/', tagController.create)
router.delete('/:id', tagController.delete)

module.exports = router;