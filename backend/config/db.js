'use strict'

const config = require('config');
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(config.get('database'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
        console.log(`Connection to MongoDB working...(${config.get('name')})`);
        return;
    } catch (error) {
        console.log(`Database connection error: ${error.message}`);
        throw error;
    }
}

module.exports = {
    connectDB
};
