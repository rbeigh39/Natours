const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

const Email = class {
   constructor(user, url) {
      this.to = user.email;
      this.firstName = user.name.split(' ')[0];
      this.url = url;
      this.from = `Rayan <${process.env.EMAIL_FROM}>`;
   }

   newTransport() {
      if (process.env.NODE_ENV === 'production') {
         // Sendgrid
         return 1;
      }

      // return nodemailer.createTransport({
      //    host: process.env.EMAIL_HOST,
      //    port: process.env.EMAIL_PORT,

      //    auth: {
      //       user: process.env.EMAIL_USERNAME,
      //       password: process.env.EMAIL_PASSWORD
      //    }
      // });

      return nodemailer.createTransport({
         host: 'smtp.mailtrap.io',
         port: 465,

         auth: {
            user: '3a7855aff42158',
            password: 'e9c878e100d5f0'
         }
      });
   }

   async send(template, subject) {
      // Send the actual email
      // 1) Render HTML based on a pug template
      const html = pug.renderFile(
         `${__dirname}/../views/email/${template}.pug`,
         {
            firstName: this.firstName,
            url: this.url,
            subject
         }
      );

      // 2) Define the email options
      const emailOptions = {
         from: this.from,
         to: this.to,
         subject,
         html, // it is here where we can define the html that we want to send. here, for now, we are not going to use this, but later we will be using this.
         text: htmlToText.fromString(html)
      };

      // 3) Create a transport and send email
      await this.newTransport().sendMail(emailOptions);
   }

   async sendWelcome() {
      await this.send('welcome', 'Welcome to the natours family!');
   }
};

module.exports = Email;
