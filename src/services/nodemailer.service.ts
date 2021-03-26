import { nodemailerUtil } from '@utils';

const forgotMail = async () => {
  const transporter = nodemailerUtil.getNodemailerTransport();
  const mail = nodemailerUtil.getMailOptions(
    'merukori767@gmail.com',
    'Sended email via nodemailer',
    'Wow!',
  );

  transporter.sendMail(mail, function (error, info) {
    if (error) {
      console.error(error);

      return;
    }

    console.log({ response: info.response });
  });
};

export default {
  forgotMail,
};
