const nodemailer = require('nodemailer');
const request = require('request');
//const env = require('node-env-file');
const hbs = require('nodemailer-express-handlebars');

//env(__dirname + '/.env');

//WELCOME EMAIL
var sendWelcomeMessage = (newEmail, firstName) => {
  var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: process.env.AUTH_EMAIL,
          pass: process.env.AUTH_PASS
      }
  });

  //options for handelbars plugin
  var options = {
    viewEngine: {
        extname: '.hbs',
        layoutsDir: 'views/',
        defaultLayout : 'welcome-template',
    },
    viewPath: 'views/',
    extName: '.hbs'
};

  transporter.use('compile', hbs(options));
  // setup e-mail data
  var mailOptions = {
      from: '"Retreat" <discoverretreat@gmail.com>', // sender address (who sends)
      to: newEmail, // list of receivers (who receives)
      subject: 'Welcome to Retreat', // Subject line
      attachments: [{
        filename: 'beach-resort.png',
        path: './views/img/beach-resort.png',
        cid: 'header-img'
      }, {
        filename: 'facebook_icon.png',
        path: './views/img/facebook_icon.png',
        cid: 'fb-icon'
      }, {
        filename: 'twitter_icon.png',
        path: './views/img/twitter_icon.png',
        cid: 'twitter-icon'
      }, {
        filename: 'insta_icon.png',
        path: './views/img/insta_icon.png',
        cid: 'insta-icon'
      }, {
        filename: 'Asset 1.png',
        path: './views/img/Asset 1.png',
        cid: 'logo'
      }],
      template: 'welcome-template',
      context: {
        firstname: firstName
      }
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
};

//MAILCHIMP SUBSCRIPTION
var subscribeEmail = (newEmail, firstName, lastName) => {
  request({
    method: 'POST',
    url: `https://us16.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}/members/`,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.API_KEY,
      sendImmediately: true
    },
    json: true,
    body: {
      "email_address": newEmail,
      "status": "subscribed",
      "merge_fields": {
        "FNAME": firstName,
        "LNAME": lastName
      }
    }
  }, (error, response, body) => {
      console.log(response.statusCode);
  });
};

//EXPORT FUNCTIONS
module.exports.sendWelcomeMessage = sendWelcomeMessage;
module.exports.subscribeEmail = subscribeEmail;
