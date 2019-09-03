const HtmlReady = require("./generateHtml");

const sendMail = async function(recipient, subtotal, products) {
  const sgMail = require("@sendgrid/mail");

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: recipient,
    from: "Shoppago Marketplace <shoppago.io@email.com>",
    subject: "Successful purchase! --Shoppago",
    text: "Hey",
    html: HtmlReady.generateHtml(products, subtotal)
  };

  try {
    await mailResponse(sgMail, msg);
    console.log("Success:", recipient);
    return true;
  } catch (error) {
    console.log({ error: error });
    throw Error(error);
  }
};

function mailResponse(sender, message) {
  return new Promise((resolve, reject) => {
    resolve(sender.send(message));
  });
}

function makeHtml(products) {
  return;
}

module.exports = {
  sendMail
};
