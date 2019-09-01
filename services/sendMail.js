const sendEmail = (recipient, subtotal, products) => {
  const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

for (const [index, person] of recipients.entries()) {
  console.log("To: ", person);
  const msg = {
    to: person,
    from: "Developer <lfuentesa@unicartagena.edu.co>",
    subject: "Sending with Twilio SendGrid",
    text: " Easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even <i>Node.js</i></strong>"
  };

  await mailResponse(sgMail, msg);

  console.log("Success:", person);
}
}

function mailResponse(sender, message) {
  return new Promise((resolve, reject) => {
    resolve(sender.send(message));
  });
}

function makeHtml(products){

}

module.exports = {
  sendEmail
}