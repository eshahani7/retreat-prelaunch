var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var email = require('../email.js');

var router = express.Router();
const publicPath = path.join(__dirname, '../public/index.html');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('test.hbs', { title: 'Home' });
// });

router.use(express.static(publicPath));

router.post('/submitemail', (req, res)=> {
  console.log(req.body.email);
  email.sendWelcomeMessage(req.body.email, req.body.fName);
  email.subscribeEmail(req.body.email, req.body.fName, req.body.lName);
  console.log(req.body.fName);
  res.send('Email sent');
});

module.exports = router;
