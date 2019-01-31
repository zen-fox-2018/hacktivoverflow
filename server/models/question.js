var mongoose = require('mongoose')

var Schema = mongoose.Schema

var questionSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description: {
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
    answers : [{
        type : Schema.Types.ObjectId, 
        ref: 'Answer'
    }],
    tags : [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    user : { type : Schema.Types.ObjectId, ref: 'User'},
    createdAt : { 
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
})
questionSchema.post('save', function(doc, next) {
    doc.populate('tags').populate('user').execPopulate().then(function() {
        next();
    });
})
questionSchema.post('findOneAndUpdate', function(doc, next) {
    doc.populate('tags').populate('user').populate({path : 'answers', populate : {path : 'user'}}).execPopulate().then(function() {
        next();
    });
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question