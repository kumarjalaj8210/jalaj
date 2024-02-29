const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kumarjalaj39@gmail.com', 
    }
});

// Email details
let mailOptions = {
    from: 'kumarjalaj39@gmail.com', // Sender address
    to: 'kuchbhi90@gmail.com', 
    subject: 'Testing Email', 
    text: 'This is a test email using Nodemailer.'
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred:', error);
    } else {
        console.log('Email sent successfully:', info.response);
    }
});
