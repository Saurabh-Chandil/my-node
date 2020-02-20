const express = require('express');
require('./db/mongoose');
const User = require('./models/user'); 

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

app.use(express.json());
app.post('/users', (req, res) => {
    // console.log('Request body : ', req.body);
    // res.send('testing');

    const user = new User(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch(() => {

    });
});

app.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.send(users)
    }).catch(error => {

    })
});