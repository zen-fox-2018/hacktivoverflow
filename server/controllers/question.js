const Question = require('../models/question')

module.exports = {
    create : function(req, res){
        let input = req.body
        input.user = req.userId
        Question.create(input, function(err, question){
            if(err){
                res.status(400).json(err)
            }else{
                console.log(question,"question baru")
                res.status(200).json(question)
            }
        })
    },
    findAll: function(req, res, next){
        Question.find({})
        .populate('user')
        .populate('tags')
        .exec(function(err, questions){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(questions)
            }
        })
    },
    findById:function(req, res, next){
        Question.findOne({_id : req.params.id})
        .populate('user')
        .populate({path : 'answers', populate : {path : 'user'}})
        .populate('tags')
        .exec(function(err, question){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(question)
            }
        })
    },
    findByUser:function(req, res, next){
        Question.find({user : req.headers.userid})
        .populate('user')
        .exec(function(err, questions){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(questions)
            }
        })
    },
    update : function(req, res, next){
        let input = {title, description, tags} = req.body
        input.userId = req.userId
        for(let key in input) {
            if(key == undefined)
            delete input[key]
        }
        input.updatedAt = Date.now()
        console.log(input)
        console.log(req.headers.id,"===========")
        Question.findOneAndUpdate({_id : req.params.id}, {$set: input}, {new: true}, function(err, result){
            if(err) {
                res.status(400).json(err)
            }else{
                console.log("Updated the question");
                res.status(200).json({
                    data: result
                })
            }
        })
    },
    upVote : function(req, res, next){
        if(req.hasUpVote){
            Question.findOneAndUpdate({_id : req.params.id}, {$pull: {'upVote' : req.userId}}, {new: true}, function(err, result){
                if(err){
                    res.status(400).json(err)
                }else{
                    res.status(200).json({result})
                }
            })
        }else if(!req.hasDownVote && !req.hasUpVote){
            Question.findOneAndUpdate({_id : req.params.id}, {$push: {'upVote' : req.userId}}, {new: true}, function(err, result){
                if(err){
                    res.status(400).json(err)
                }else{0
                    res.status(200).json({result})
                }
            })
        }else if(req.hasDownVote && !req.hasUpVote){
            Question.findById(req.params.id, function(err, question){
                if(err){
                    res.status(400).json(err)
                }else{
                    Question.findOneAndUpdate({_id : question._id}, {$pull: {'downVote' : req.body.userId}, $push: {'upVote' : req.body.userId}}, {new: true }, function(err, result){
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
        console.log(req.hasUpVote,"upvote=====")
        console.log(req.hasDownVote,"downvote=====")
        if(req.hasDownVote){
            Question.findOneAndUpdate({_id : req.params.id}, {$pull: {'downVote' : req.userId}}, {new: true},function(err, result){
                if(err){
                    res.status(400).json(err)
                }else{
                    res.status(200).json({result})
                }
            })
        }else if(!req.hasDownVote && !req.hasUpVote){
            Question.findOneAndUpdate({_id : req.params.id}, {$push: {'downVote' : req.userId}}, {new: true},function(err, result){
                if(err){
                    res.status(400).json(err)
                }else{
                    res.status(200).json({result})
                }
            })
        }else if(!req.hasDownVote && req.hasUpVote){
            Question.findById(req.params.id, function(err, question){
                if(err){
                    res.status(400).json(err)
                }else{
                    Question.findOneAndUpdate({_id : question._id}, {$pull: {'upVote' : req.userId}, $push: {'downVote' : req.userId}}, {new: true }, function(err, result){
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
        Question.findOne({_id : req.params.id})
        .then((question) => {
            if(question){
                if(question.user.toString() == req.userId.toString()){
                    return  Question.findOneAndDelete({_id: req.params.id})
                }else{
                    res.status(401).json('Error authentication, you have no access')
                }
            }else{
                res.status(404).json('Question not found')
            }
        })
        .then((done) => {
            res.status(204).json("removed question")
        })
        .catch((err) => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    }
}