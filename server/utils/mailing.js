import { createTransport } from 'nodemailer';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
require('dotenv').config();

const OAuth2_CLIENT_ID = process.env.OAUTH2_CLIENT_ID;
const OAuth2_CLIENT_SECRET = process.env.OAUTH2_CLIENT_SECRET;
const OAuth2_REFRESH_TOKEN = process.env.OAUTH2_REFRESH_TOKEN;

const oauth2Client = new OAuth2Client(OAuth2_CLIENT_ID, OAuth2_CLIENT_SECRET);
oauth2Client.setCredentials({
  refresh_token: OAuth2_REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken();

const transporter = createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_ADDRESS,
    clientId: OAuth2_CLIENT_ID,
    clientSecret: OAuth2_CLIENT_SECRET,
    refreshToken: OAuth2_REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

export async function sendMail({ to, subject, html }) {
  try {
    const mailOptions = {
      from: process.env.MAIL_ADDRESS,
      to: to,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé :', info.messageId);
    return info;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error.message);
    throw new Error("Échec de l'envoi de l'e-mail. Veuillez réessayer plus tard.");
  }
}

export default sendMail;
