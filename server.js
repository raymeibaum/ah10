const express = require('express');
const app = express();

require('dotenv').config();

const messagesController = require('./controllers/messages.js');

const mongoose = require('mongoose');
const db = mongoose.connection;

// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect('mongodb://localhost/worldy_message');


app.use('/', express.static('public'))
app.use('/api/messages', messagesController);


db.on('error', function(err){
  console.log(err);
});

db.once('open', function() {
  console.log("database has been connected!");
});

const port = process.env.PORT || 3000;
app.listen(port, console.info(`Server listening on port: ${port}.`));
