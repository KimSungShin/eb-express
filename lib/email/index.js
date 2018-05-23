/**
 * Created by i99208 on 2016. 11. 12..
 */


var nodemailer = require('nodemailer');

var config = require('config');

var smtpTransport = nodemailer.createTransport( config.get('Email.smtp'));

/*var smtpTransport = nodemailer.createTransport( {
	host: "mail.ibksystem.co.kr", // hostname
	port: 25, // port for secure SMTP
	secure: false,
	auth: {
		user: "platform@ibksystem.co.kr",
		pass: "ibkS0901"
	}
});*/

/* mailoptions sample
var mailOptions = {
    from: '플랫폼사업팀 <platform@ibksystem.co.kr>',
    to: 'jhahn@ibksystem.co.kr',
    subject: '회원 인증 메일',
    text: 'click'
};
 */




const send = function ( mailOptions ){

    smtpTransport.sendMail(mailOptions, function(error, response){

        if (error){
            console.log(error);
        } else {
            console.log("Message sent : " + response.message);
        }
        smtpTransport.close();
    });

}

exports.send = send;