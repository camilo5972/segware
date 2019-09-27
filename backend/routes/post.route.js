'use strict'

const express = require('express');
const Controllers = require('../controllers/post.controller');
const Middlewares = require('../middlewares');

const api = express.Router();

api.get('/posts/:author?', Controllers.getPosts);
api.post('/posts', Middlewares.requireAuthor, Controllers.newPost);
api.put('/posts/:_id', Middlewares.onlyAuthor, Controllers.updatePost);
api.put('/posts/:_id/upvote', Middlewares.requireUpvoter, Controllers.upvotePost);
api.delete('/posts/:_id', Middlewares.onlyAuthor, Controllers.deletePost);

module.exports = api;