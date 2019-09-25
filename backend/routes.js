'use strict'

const express = require('express');
const Controllers = require('./controllers');
const Middlewares = require('./middlewares');

const api = express.Router();

api.get('/posts', Controllers.getPosts);

module.exports = api;