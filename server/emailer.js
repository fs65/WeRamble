const nodemailer = require('nodemailer');
const { port, ip } = require("../utils.js")

var transporter = nodemailer.createTransport('SMTP', {
    host: 'smtp.gmail.com',
    port: 587,
    secure: true, // use SSL
    auth: {
        user: 'werambleservices@gmail.com',
        pass: '0089fxcy?'
    }
});

var mailOptions = {
    from: 'werambleservices@gmail.com',
    to: 'callumtw42@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};
module.exports = {
    sendVerificationEmail: () => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }
}