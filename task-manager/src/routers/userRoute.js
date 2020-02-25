const express = require('express');
const app = express();
const User = require('../models/user'); 
const auth = require('../middleware/auth')

const userRoute = new express.Router();

// user sign-up
userRoute.post('/users', async (req, res) => {
    
    const user = new User(req.body);
    const dbUser = await User.findOne({ email: user.email })
    try {
        if(!dbUser) {
            await user.save()
            const token = await user.generateAuthToken()
            res.status(200).send({user, token}) 
        } else
            res.status(400).send('User already exists') 
    } catch (error) {
       res.status(400).send(error) 
    }
});

userRoute.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(201).send({user, token})

    } catch (error) {
        res.status(400).send(error.message);
    }
})

userRoute.get('/users/me', auth, async (req, res) => {
    // try {
    //     const user = await User.findOne({})
    //     res.send(user)        
    // } catch (error) {
    //     res.status(500).send()
    // }
 
    res.send(req.user);
});

userRoute.post('/users/logout', auth, async (req, res) => {
    try {
        // from auth middleware
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != user.token
        })

        await req.user.save()
        res.send(201)
    } catch (error) {
        res.status(500).send()
    }
})

userRoute.get('/users/:id', (req, res) => {

     User.findById(req.params.id).then(user=> {
        res.status(201).send('Record found');
     }).catch(err=> {
        res.status(404).send('Record unavailable');
     });
});

module.exports = userRoute;