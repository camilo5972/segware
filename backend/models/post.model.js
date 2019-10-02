'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostsSchema = Schema({
    author: { type: String, required: true},
    dateCreated: { type: Date, default: new Date() },
    dateModified: Date,
    text: { type: String, required: true },
    upvoters: [String]
});

module.exports = mongoose.model('Posts', PostsSchema);