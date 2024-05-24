import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'harmonyhub89@gmail.com',
    pass: 'zgua kwwp ikgz jqzd',
  },
});

export const sendEmail = async (req,res) => {
  const { email } = req.body;

  console.log("EmailId is : ",email);
  // TODO: Check if email exists in your database (user authentication)

  const mailOptions = {
    from: 'harmonyhub89@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: 'Click the following link to reset your password: http://localhost:3000/reset-password',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }

    console.log('Email sent: ' + info.response);
    res.status(200).send('Password reset email sent successfully.');
  });
}

export default sendEmail;