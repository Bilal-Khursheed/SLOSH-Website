const cors = require("cors");
const express = require("express");
const bodyParse = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();

app.use(cors());

//this is use for sending mail for contact us window

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.post("/contactus", async (req, res) => {
  console.log("full body", req.body.name);
  console.log("API is called");
  const htmll = `<p>You have a New contact request </p>
    <h2>Contact Details</h2>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone No: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
      `;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      //user: account.email,
      user: "balich616@gmail.com", //  user
      pass: "comsats@123", //  password
      //pass: account.password,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Node Mailer" <balich616@gmail.com>', // sender address
    to: "umarnazaket97@gmail.com, balich617@gmail.com", // list of receivers
    subject: "Contact Request", // Subject line
    text: "This is for test purpose", // plain text body
    html: htmll, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.status(200).sendFile(path.join(__dirname, "./Slosh Site", "index.html"));
});
app.get("/", function (req, res) {
  return res.send(console.log("working"));
});

module.exports = app;
