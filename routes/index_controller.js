var express = require('express');
var router = express.Router({mergeParams true});

router.get('/', function(req,res,next){
  Message.find()
  .exec(function(err,messages){
    if(err) {console.log(err)}
    res.render('/', {
      messages: messages
    });
  });
});

module.exports = router;
