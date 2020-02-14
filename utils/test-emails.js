const nodemailer = require('nodemailer');

const sendEmail = async options => {
   try {
      // 1) Create a transporter
      const transporter = nodemailer.createTransport({
         host: 'smtp.mailtrap.io',
         port: 25,

         auth: {
            user: '3a7855aff42158',
            password: 'e9c878e100d5f0'
         }
      });

      // 2) Define email options
      const emailOptions = {
         from: 'Rayan Beigh <hello@natours.io>',
         to: options.email,
         subject: options.subject,
         text: options.message
      };

      // 3) Actually send the email with nodemailer
      await transporter.sendMail(emailOptions);

      console.log('Sending mail was successful.');
   } catch (err) {
      console.log('Error', err);
   }
};

const op = {
   email: 'hayanbeigh119@gmail.com',
   subject: 'Hello from Rayan',
   text: 'Hii... what are you doing?'
};
console.log('hello');

sendEmail(op);
