const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'abhinaya.raghu@gmail.com',
    pass: 'ofxrocdpwajlhipd',
  },
});
var mailOptions = {
    from: 'abhinaya.raghu@gmail.com',
    to: 'abhinaya@princeton.edu',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });