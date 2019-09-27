'use strict'

const Posts = require('../models/post.model');

async function getPosts(req, res) {
    try {
        const { author } = req.params;
        const query = author ? { author } : {};
        const posts = await Posts.find(query).sort({ dateCreated: -1 });
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function newPost(req, res) {
    try {
        const { author, text } = req.body;
        const post = new Posts({ author, text, upvoters: [] });
        const responseSave = await post.save();
        res.status(201).send({ post: responseSave });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updatePost(req, res) {
    try {
        const { _id } = req.params;
        const { text } = req.body;
        const dateModified = Date.now();
        const responseUpdate = await Posts.findOneAndUpdate({ _id }, { text, dateModified }, { new: true });
        res.status(200).send({ post: responseUpdate });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function deletePost(req, res) {
    try {
        const { _id } = req.params;
        const responseDelete = await Posts.findOneAndDelete({ _id });
        res.status(200).send({ post: responseDelete });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function upvotePost(req, res) {
    try {
        const { _id } = req.params;
        const { upvoter } = req.body;
        const responseUpdate = await Posts.findByIdAndUpdate(_id, { '$addToSet': { upvoters: upvoter }}, { new: true });
        res.status(200).send({ post: responseUpdate });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getPosts,
    newPost,
    updatePost,
    deletePost,
    upvotePost
};