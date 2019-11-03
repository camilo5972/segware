'use strict'

const db = require('./config/db');
const port = process.env.PORT || 3530;
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const routes = require('./routes/post.route');

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

//initialize a simple http server
const server = http.createServer(app);

db.connectDB()
    .then(() => {
        server.listen(port, '0.0.0.0', () => {
            console.log(`App listening on port ${port}!`);
        });
    })
    .catch(console.log);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.action === 'update list') {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        }
        console.log(`Received: ${message}`);
    });
});

module.exports = app;