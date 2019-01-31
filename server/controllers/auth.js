const User = require('../models/user')
const {compare, sign} = require('../helpers/index')

module.exports = {
    login : function(req, res){
        User.findOne({email: req.body.email})
        .then(user =>{
            if(user){
                if(compare(req.body.password, user.password)){
                    var token = sign({
                        email : user.email,
                        id : user._id
                    })
                    res.status(200).json({
                        message: 'Login success',
                        token,
                        userId: user._id
                    })
                }else{
                    res.status(401).json({
                        message: 'Email/password is wrong'
                    })
                }
            }else{
                res.status(401).json({
                    message: 'Email/password is wrong'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Internal server error',
                error: err
            })
        })
    },
    register : function(req, res){
        User.create({
            email: req.body.email,
            password : req.body.password,
            firstName: req.body.firstName,
            lastName : req.body.lastName
        })
        .then(user =>{
            res.status(201).json({
                    data: user,
                    message: 'User created'
            })
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    }
}