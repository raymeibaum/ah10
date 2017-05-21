var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/worldy_message');


var Message = require("../models/message");

mongoose.Promise = global.Promise;

Message.remove({}, function(err){
  console.log(err);
});

var message1 = new Message ({
  message: "Sharing a worldy message",
  country: "Italy",
  language: "Italian"
});

message1.save(function(err) {
  if (err) console.log(err);

  console.log('message created!');
});
