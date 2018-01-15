const express = require('express');
const app = express();
const socketServer = require('http').Server(app);
const socketio = require('socket.io');
const io = socketio(socketServer);
const socket = require('./socket');

const PORT = process.env.PORT || 3002;
const path = require('path');
const bodyParser = require('body-parser');

// set up body parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve up static files
app.use(express.static(path.join(__dirname, '../public')));

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

socket(io)

socketServer.listen(PORT, () => {
  console.log('listening on 3002 hey girrrlll')
})

