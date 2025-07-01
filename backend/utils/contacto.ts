import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.REMITENTE,
        pass: process.env.PASS_GMAIL,
    },
});
