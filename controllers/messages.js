const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/', function indexAction(req, res) {
	Message
		.find({})
		.exec(function(err, messages) {
      if (err) {
        res.json({error: err});
      } else {
        res.json({messages: messages});
      }
    });
})

router.post('/', function postAction(req, res) {
	const message = new Message(req.body);
  message.save();
	res.json({message: message});
});

module.exports = router;
