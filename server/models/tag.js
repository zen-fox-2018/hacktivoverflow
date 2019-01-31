const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var Question = require('../models/question')

var tagSchema = new Schema({
    name: {
        type: String,
    },
})

tagSchema.post('findOneAndDelete', function(doc){
    Question.findOneAndUpdate({tags : doc._id}, {'$pull' : {'tags' : doc.id}}, function(err){
        if(err) return new Error(err)
    })
})

var Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag