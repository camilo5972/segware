'use strict'

const Posts = require('./Model');

function getPosts(req, res) {
    Posts.find({});
}

module.exports = {
	getPosts
};