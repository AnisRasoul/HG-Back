const nodemailer = require('nodemailer');

const sendMail = async (email, subject, html) => { 
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        await transporter.sendMail({
            from: `"Higher Gravity Team" <highergravity1@gmail.com>`,
            to: email,
            subject: subject,
            html: html, 
        });

        console.log('Email sent');
    } 
    catch (error) {
        console.log('Email not sent', error);
    }
}

module.exports = sendMail;
