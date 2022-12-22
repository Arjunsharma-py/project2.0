const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path')
const nodemailer = require("nodemailer");

const app = express();
const port = 80;

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect('mongodb://127.0.0.1/projectdb')
}

const contactschema = new mongoose.Schema({
    Name: String,
    Phone: Number,
    Email: String,
    State: String,
    Message: String
})

const contact = mongoose.model('Contact', contactschema);

const emailschema = new mongoose.Schema({
    Email: String
})

const donatemoneyschema = new mongoose.Schema({
    Name: String,
    Phone: Number,
    Amount: Number,
    Purpose: String
})

const donatemoney = mongoose.model('moneydonors', donatemoneyschema);

const donategoodsschema = new mongoose.Schema({
    Name: String,
    Address: String,
    Options: String
})

const donategoods = mongoose.model('goodsdonors', donategoodsschema);


const email = mongoose.model('Email', emailschema);

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'donatedotin@gmail.com',
        pass: 'vyiambonqpsfyrbi'
    }
});

app.use(express.static(path.join(__dirname, './others')))
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/pages/index.html')
})

app.get('/index', (req, res) => {
    res.status(200).sendFile(__dirname + '/pages/index.html')
})

app.get('/contact', (req, res) => {
    res.status(200).sendFile(__dirname + '/pages/contact.html')
})

app.get('/donate', (req, res) => {
    res.status(200).sendFile(__dirname + '/pages/donate.html')
})

app.get('/about', (req, res) => {
    res.status(200).sendFile(__dirname + '/pages/about.html')
})

app.post('/contact', (req, res) => {
    var tempdata = new contact(req.body);
    tempdata.save().then(() => {
        transporter.sendMail({
            from: 'donatedotin@gmail.com',
            to: req.body.Email,
            subject: "Apreciation",
            text: "Thank you for joining our organization. We will contact you soon.."
        });
        res.status(204).send()
    }).catch(() => {
        res.status(400).send("Your contact information is not being stored due to an error")
    })
})


app.post('/emailsub', (req, res) => {
    var tempdata = new email(req.body);
    tempdata.save().then(() => {
        transporter.sendMail({
            from: 'donatedotin@gmail.com',
            to: req.body.Email,
            subject: "Apreciation",
            text: "Thank you for joining our organization."
        });
        res.status(204).send()
    }).catch(() => {
        res.status(400).send("Your contact information is not being stored due to an error")
    })
})

app.post('/donatemoney', (req, res) => {
    var tempdata = new donatemoney(req.body);
    tempdata.save().then(() => {
        res.status(204).send()
    }).catch(() => {
        res.status(400).send("Your contact information is not being stored due to an error")
    })
})
app.post('/donategoods', (req, res) => {
    var tempdata = new donategoods(req.body);
    tempdata.save().then(() => {
        res.status(204).send()
    }).catch(() => {
        res.status(400).send("Your contact information is not being stored due to an error")
    })
})


app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})