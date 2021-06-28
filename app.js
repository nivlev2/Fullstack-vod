const express = require('express');
const http = require('http');
const {configRoutes,originAllow} =require('./routes/configRoutes')
const path = require('path');
const app = express();
const port = process.env.PORT ||3001

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

const {} = require('./db/connectMongodb')
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")));
originAllow(app);

configRoutes(app)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'), err => {
        if (err) {
            res.status(500).send(err)
        }
    })
})

const server = http.createServer(app)
server.listen(port)