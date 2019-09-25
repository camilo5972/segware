'use strict'

require('dotenv').config();

const port = process.env.PORT || 3530;
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(helmet());
app.use(helmet.hidePoweredBy());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use('/api', routes);

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('Connection to MongoDB working...');
        app.listen(port, '0.0.0.0', () => {
            console.log(`App listening on port ${port}!`);
        });
    })
    .catch(error => console.log(`Database connection error: ${error.message}`));