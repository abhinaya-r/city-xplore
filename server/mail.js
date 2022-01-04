const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'cityxplorecontact@gmail.com',
    pass: 'Cityxplore123',
  },
});
var mailOptions = {
    from: 'cityxplorecontact@gmail.com',
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