const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path')

const app = express();
const port = 80;

main().catch(err => console.log(err))

async function main(){
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

app.use(express.static(path.join(__dirname, './others')))
app.use(express.urlencoded())

app.get('/', (req, res)=>{
    res.status(200).sendFile(__dirname + '/pages/index.html')
})

app.get('/index', (req, res)=>{
    res.status(200).sendFile(__dirname + '/pages/index.html')
})

app.get('/contact', (req, res)=>{
    res.status(200).sendFile(__dirname + '/pages/contact.html')
})

app.get('/donate', (req, res)=>{
    res.status(200).sendFile(__dirname + '/pages/donate.html')
})

app.get('/about', (req, res)=>{
    res.status(200).sendFile(__dirname + '/pages/about.html')
})

app.post('/contact', (req, res)=>{
    var tempdata = new contact(req.body);
    tempdata.save().then(()=>{
        res.send("Your contact are being saved to database")
    }).catch(()=>{
        res.status(400).send("Your contact information is not being stored due to an error")
    })
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
})