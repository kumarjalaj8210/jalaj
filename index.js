const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kumarjalaj39@gmail.com', 
    }
});


let mailOptions = {
    from: 'kumarjalaj39@gmail.com', 
    to: 'kuchbhi90@gmail.com', 
    subject: 'Testing Email', 
    text: 'This is a test email using Nodemailer.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred:', error);
    } else {
        console.log('Email sent successfully:', info.response);
    }
});

//esme kuch aisa bhi hai jise google search kiye hai
