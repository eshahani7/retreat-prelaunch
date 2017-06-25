var express = require('express');
var bodyParser = require('body-parser');

var email = require('../email.js');

var router = express.Router();
//'use strict';
//const nodemailer = require('nodemailer');

//router.use(bodyParser.raw({ type: 'text/xml' }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.hbs', { title: 'Home' });
});

router.post('/submitemail', (req, res)=> {
  console.log(req.body.email);
  email.sendWelcomeMessage(req.body.email);
  email.subscribeEmail();
  res.send('Email sent');
});

module.exports = router;
