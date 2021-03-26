import nodemailer from 'nodemailer';

import { env } from './env';

export const getNodemailerTransport = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.nodemailerEmail,
      pass: env.nodemailerPass,
    },
  });

  return transporter;
};

export const getMailOptions = (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: env.nodemailerEmail,
    to,
    subject,
    text,
  };

  return mailOptions;
};

export default {
  getNodemailerTransport,
  getMailOptions,
};
