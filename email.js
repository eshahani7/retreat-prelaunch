const nodemailer = require('nodemailer');
const request = require('request');
const env = require('node-env-file');

env(__dirname + '/.env');

var sendWelcomeMessage = (newEmail) => {
  var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: process.env.AUTH_EMAIL,
          pass: process.env.AUTH_PASS
      }
  });
  // setup e-mail data
  var mailOptions = {
      from: '"Retreat" <discoverretreat@gmail.com>', // sender address (who sends)
      to: newEmail, // list of receivers (who receives)
      subject: 'Welcome to Retreat', // Subject line
      text: 'Thanks for signing up!', // plaintext body
      html: '<b>Email sent from node.js</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
};

var subscribeEmail = () => {
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
      "email_address": process.env.TEST_EMAIL,
      "status": "subscribed",
      "merge_fields": {
        "FNAME": "Not",
        "LNAME": "Real"
      }
    }
  }, (error, response, body) => {
      console.log(response.statusCode);
  });
};

module.exports.sendWelcomeMessage = sendWelcomeMessage;
module.exports.subscribeEmail = subscribeEmail;
