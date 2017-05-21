const express = require('express');
const router = express.Router();

const Message = require('../models/message.js');

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

})

module.exports = router;
