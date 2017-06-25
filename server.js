const express = require('express');
const hbs = require('hbs');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use('/', index);

app.listen(3000, ()=> {
  console.log('Server is up on port 3000');
});
