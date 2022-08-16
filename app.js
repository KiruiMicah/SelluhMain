const express = require('express');
const path = require('path');
require('dotenv').config()

// twillio;
const accountSid = 'ACa50ba2641ef95681ecbacf0916ca708b'
const authToken = 'a1f252a51792a340010ec1535a19cf61'
const client = require('twilio')(accountSid, authToken);


const app = express();

app.use(express.urlencoded({ extended: false}));
// static files
app.use(express.static('./public'));




app.get('/', (req, res) => {
  
    res.sendFile(path.resolve(__dirname, './index.html'))
})

app.get('/user/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, './signup.html'))
})


app.post('/user/myaccount', (req, res) => {
    const {userphoneNumber, randomcode, userId} = req.body;
    res.redirect(`/user/myaccount.html?${userId} ? ${randomcode}`)

    client.messages
  .create({
     body: `Your selluh verification code is ${randomcode}` ,
     from: '+19035468814',
     to: userphoneNumber
   })
  .then(message => console.log(message.sid))
   alert('Verification code has been sent to your phone!')
  .catch((error) => {
    console.log(error)
  })
   
})

const PORT = process.env.PORT || 3000

app.listen(PORT, (req, res) => {
    console.log(`App is running at port ${PORT}`)
})