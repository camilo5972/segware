'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostsSchema = Schema({
    author: { type: String, required: true},
    dateCreated: { type: Date, default: Date.now() },
    text: { type: String, required: true },
    upvoters: [{ type: String, unique: true }]
});

module.exports = mongoose.model('Posts', PostsSchema);