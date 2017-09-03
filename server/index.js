const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

module.exports = server;

const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// set up body parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// server logging
app.use(morgan('dev'));

// serve up static files
app.use(express.static(path.join(__dirname, '../public')));

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

server.listen(process.env.PORT || 3002, () => {
  console.log('listening on 3002 hey girrrlll')
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

// const io = socketio(server);
// // connect the io from the socket file to io here, which is socket.io invoked with our server..
// require('./socket')(io);
