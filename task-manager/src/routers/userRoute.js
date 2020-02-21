const express = require('express');
const app = express();
const User = require('../models/user'); 

const userRoute = new express.Router();

userRoute.post('/users', async (req, res) => {
    // console.log('Request body : ', req.body);
    // res.send('testing');

    const user = new User(req.body);

    try {
       await user.save();
       res.status(201).send('Record inserted successfully'); 
    } catch (error) {
       res.status(400).send('Problem in record insertion'); 
    }
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch(() => {

    //});
});

userRoute.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.send(users)
    }).catch(error => {

    })
});

userRoute.get('/users/:id', (req, res) => {

     User.findById(req.params.id).then(user=> {
        res.status(201).send('Record found');
     }).catch(err=> {
        res.status(404).send('Record unavailable');
     });
});

module.exports = userRoute;