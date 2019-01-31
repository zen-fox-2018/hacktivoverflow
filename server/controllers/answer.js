const Answer = require('../models/answer')

module.exports = {
    create : function(req, res){
        var input = {message} = req.body
        input.user = req.userId
        input.question = req.params.questionId
        Answer.create(input, function(err, answer){
            if(err){
                console.log(err)
                res.status(400).json(err)
            }else{
                res.status(201).json(answer)
            }
        })
    },
    findAll: function(req, res, next){
        Answer.find({}, function(err, answers){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(answers)
            }
        })
    },
    findByQuestion:function(req, res, next){
        Answer.find({questionId : req.params.id})
        .populate('userId')
        .exec(function(err, answers){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(answers)
            }
        })
    },
    update : function(req, res, next){
        let input = {message} = req.body
        input.updatedAt = Date.now()
        Answer.findOne({_id : req.params.id})
        .then((answer) => {
            if(answer){
                return Answer.findOneAndUpdate({_id : answer._id}, {$set: input}, {new: true})
            }else{
                res.status(404).json({
                    message: 'Answer not found'
                })
            }
        })
        .then((updated) => {
            res.status(200).json({updated})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
        
    },
    upVote : function(req, res, next){
        if(req.hasUpVote){
            Answer.findOneAndUpdate({_id : req.params.id}, {$pull: {'upVote' : req.userId}}, {new: true}, function(err, result){
                if(err){
                    res.status(400).json(err)
                }else{
                    res.status(200).json({result})
                }
            })
        }else if(!req.hasDownVote && !req.hasUpVote){
            Answer.findOneAndUpdate({_id : req.params.id}, {$push: {'upVote' : req.userId}}, {new: true}, function(err, result){
                if(err){
                    res.status(400).json(err)
                }else{0
                    res.status(200).json({result})
                }
            })
        }else if(req.hasDownVote && !req.hasUpVote){
            Answer.findById(req.params.id, function(err, answer){
                if(err){
                    res.status(400).json(err)
                }else{
                    Answer.findOneAndUpdate({_id : answer._id}, {$pull: {'downVote' : req.userId}, $push: {'upVote' : req.userId}}, {new: true }, function(err, result){
                        if(err){
                            res.status(400).json(err)
                        }else{
                            res.status(200).json({result})
                        }
                    })
                }
            })
        }
    },
    downVote : function(req,res, next){
        if(req.hasDownVote){
            Answer.findOneAndUpdate({_id : req.params.id}, {$pull: {'downVote' : req.userId}}, {new: true},function(err, result){
                if(err){
                    res.status(400).json(err)
                }else{
                    res.status(200).json({result})
                }
            })
        }else if(!req.hasDownVote && !req.hasUpVote){
            Answer.findOneAndUpdate({_id : req.params.id}, {$push: {'downVote' : req.userId}}, {new: true},function(err, result){
                if(err){
                    res.status(400).json(err)
                }else{
                    res.status(200).json({result})
                }
            })
        }else if(!req.hasDownVote && req.hasUpVote){
            Answer.findById(req.params.id, function(err, answer){
                if(err){
                    res.status(400).json(err)
                }else{
                    Answer.findOneAndUpdate({_id : answer._id}, {$pull: {'upVote' : req.userId}, $push: {'downVote' : req.userId}}, {new: true }, function(err, result){
                        if(err){
                            res.status(400).json(err)
                        }else{
                            res.status(200).json({result})
                        }
                    })
                }
            })
        }
    },
    delete : function(req, res, next){
        Answer.findOne({ _id : req.params.id})
        .then((answer) => {
            if(answer){
               return Answer.findOneAndDelete({_id: req.params.id})  
            }else{
                res.status(404).json({
                    message: 'Answer not found'
                })
            }
        })
        .then((result) => {
            res.status(200).json("removed answer")
        })
        .catch((err) => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
        
    }
}