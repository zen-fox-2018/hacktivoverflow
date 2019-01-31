var mongoose = require('mongoose')
var Question = require('./question')

var Schema = mongoose.Schema

var answerSchema = new Schema({
    message : {
        type : String,
        required : true
    },
    upVote: [{
        type : Schema.Types.ObjectId, 
        ref: 'User'
    }],
    downVote: [{
        type : Schema.Types.ObjectId, 
        ref: 'User'
    }],
    user : { type : Schema.Types.ObjectId, ref: 'User'},
    question : { type : Schema.Types.ObjectId, ref: 'Question'},
    createdAt : { 
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
})
answerSchema.post('save', function(doc, next){
    Question.findOneAndUpdate({ _id : doc.question }, {'$push' : { 'answers' : doc._id}}, function(err){
        if(err) throw new Error(err)
        doc.populate('user').execPopulate().then(function() {
            next();
        });
    })
})
answerSchema.post('findOneAndDelete', function(doc){
    Question.findOneAndUpdate({ _id : doc.question }, {'$pull' : { 'answers' : doc._id}}, function(err){
        if(err) throw new Error(err)
    })
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer