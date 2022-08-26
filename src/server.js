require("dotenv").config();
const express = require("express");
const nodeMail = require("nodemailer");
//const path = require("path");
const cors = require('cors');

const app = express();
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//app.use(express.static(path.join(__dirname, "public")));

async function mainMail(name, email, subject, message) {
  console.log(process.env.GMAIL_USER);
  const transporter = await nodeMail.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.PASSWORD,
    },
  });
  const mailOption = {
    from: process.env.GMAIL_USER,
    to: process.env.EMAIL,
    subject: subject,
    html: `You got a message from 
    Email : ${email}
    Name: ${name}
    Message: ${message}`,
  };
  console.log(mailOption);
  try {
    await transporter.sendMail(mailOption);
    return Promise.resolve("Message Sent Successfully!");
  } catch (error) {
    return Promise.reject(error);
  }
}
/*
app.get("/", (req, res) => {
  res.render(index.html);
});

app.get("/contact", (req, res) => {
  res.render(contact.html);
});
*/

app.post("/contact", async (req, res, next) => {
  //remove cors
  res.header("Access-Control-Allow-Origin", "*");

  const { yourname, youremail, yoursubject, yourmessage } = req.body;

  try {
    await mainMail(yourname, youremail, yoursubject, yourmessage);
    
    res.send("Message Successfully Sent!");
  } catch (error) {
    res.send("Message Could not be Sent");
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running!"));