const express = require('express');
const hbs = require('hbs');
var bodyParser = require('body-parser');

var index = require('/routes/index.js');

var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use('/', index);

app.listen(port, ()=> {
  console.log(`Server is up on port ${port}`);
});
