var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "david@roncancio.me",
        pass: process.env.EMAIL_PASSWORD
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "David Roncancio ✔ <david@roncancio.me>" // sender address
}

module.exports.send = function(to, subject, content, done){
    // send mail with defined transport object
    mailOptions.to = to || 'david@twnel.com';
    mailOptions.subject = subject || 'Default Subject ' + Math.random();
    mailOptions.text = content || 'Default Content ' + Math.random();

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            done(error);
        }else{
            console.log("Message sent: " + response.message);
            done(null, response.message);
        }

    });
};
