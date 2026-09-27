import nodemailer from 'nodemailer';

 const emailTransporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'abutt042@gmail.com',
    pass: 'lffg jcos kfhh jefr',
  },
});

export default emailTransporter;