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