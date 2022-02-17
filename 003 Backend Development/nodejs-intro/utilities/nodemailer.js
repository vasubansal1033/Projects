const nodemailer = require("nodemailer");

// userObject -> name email password

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail = async function sendMail(str, data) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            // user: testAccount.user, // generated ethereal user
            // pass: testAccount.pass, // generated ethereal password
            user: 'vasubansal1033@gmail.com',
            pass: 'hkuwtvoglpxdrfaz'
        },
    });

    var Osubject, Otext, Ohtml;
    if (str == 'signup') {
        Osubject = `Thank you for signing ${data.name}`;
        Ohtml = `
        <h1>Welcome to foodApp.com</h1>
        Hope you have a good time !
        Here are your details-
        Name - ${data.name}
        Email- ${data.email}
        `
    } else if (str == 'forgotPassword') {
        Osubject = `Reset Password`;
        Ohtml = `
        <h1>foodAp.com</h1>
        Here is your link to reset your password !
        ${data.resetPasswordLink}
        `
    }

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"VasuFoodServices 👻" <vasubansal1033.com>', // sender address
        to: "vasubansal1998@gmail.com, vasub@iitk.ac.in", // list of receivers
        subject: Osubject, // Subject line
        // text: "Hello world?", // plain text body
        html: Ohtml, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
