const express = require('express');
const socket = require('socket.io');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();

const chatLogs = require('../server/chatLogs.model');

app.use(cors());
app.use(bodyParser.json());

const server = app.listen(8000, () => {
  console.log('server is running on port 8000');
});

const io = socket(server);

io.on('connection', socket => {
  //Connect to mongoDatabase
  mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true
  });

  const connection = mongoose.connection;

  connection.once('open', function() {
    console.log('mongoDB database connection established');
  });

  //Set Default Room
  let currentRoom = '1';

  //Join Default Room when submitting Temp Name
  socket.join(currentRoom, () => {
    socket.on('error', error => {
      console.log(error);
    });
    io.to(currentRoom).emit('NEW_ROOM', 'Someone has joined ' + currentRoom);
  });


  //Message Event Handling
  socket.on('SEND_MSG', function(msg) {
    //emit to connected clients.
    console.log(currentRoom);
    io.to(currentRoom).emit('RECEIVE_MSG', msg);
  });

  //Change Room Event Handling
  socket.on('CHANGE_ROOM', function(data) {
    socket.on('error', error => {
      console.log(error);
    });
    //Leave the current room
    socket.leave(currentRoom, () => {
      socket.on('error', error => {
        console.log(error);
      });
    });

    //Set the currentRoom variable as the new room
    currentRoom = data.room;
    const user = data.user;
    //Join the new room
    socket.join(currentRoom, () => {
      socket.on('error', error => {
        console.log(error);
      });
      //Change endpoint in front end to receive a NEW_ROOM event instead of a RECEIVE_MSG event
      io.to(currentRoom).emit(
        'NEW_ROOM',
        user + ' has joined Room ' + currentRoom
      );
    });
  });
});

router.route('/chatlogs').post(function(req, res) {
  let newLog = new chatLogs(req.body);
  newLog
    .save()
    .then(message => {
      res.status(200).json({ message: message });
    })
    .catch(err => {
      res.status(400).send('failed to save message' + err);
    });
});

router.get('/getChatLogs', (req, res) => {
  console.log(req.query.room);
  chatLogs.find({ room: req.query.room }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

app.use('/chicagoChat', router);