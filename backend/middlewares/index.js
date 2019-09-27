'use strict'

const Posts = require('../models/post.model');

async function onlyAuthor(req, res, next) {
    try {
        const { _id } = req.params;
        const { author } = req.body;
        const post = await Posts.findOne({ _id });
        if (author !== post.author) {
            res.status(403).send({ message: 'only the author of the post can update' });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

function requireAuthor(req, res, next) {
    const { author } = req.body;
    if (author && author != '') {
        next();
    } else {
        res.status(400).send({ message: 'author is required' });
    }
}

function requireUpvoter(req, res, next) {
    const { upvoter } = req.body;
    if (upvoter && upvoter != '') {
        next();
    } else {
        res.status(400).send({ message: 'upvoter is required' });
    }
}

module.exports = {
    onlyAuthor,
    requireAuthor,
    requireUpvoter
};