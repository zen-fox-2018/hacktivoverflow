var Tag = require('../models/tag')
var _ = require('underscore')

module.exports = {
    create : function(req, res) {
        var input = {name} = req.body
        Tag.create(input)
        .then((tag) => {
            res.status(201).json(tag)
        })
        .catch((err) => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    },
    findAll : function(req, res) {
        Tag.find({})
        .then((tags) => {
            var sortedTags = _.sortBy( tags, 'name' );
            res.status(200).json(sortedTags)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    },
    delete: function(req, res) {
        Tag.findOneAndDelete({_id : req.params.id})
        .then((done) => {
            res.status(204).json('Tag deleted')
        })
        .catch((err) => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    }
}