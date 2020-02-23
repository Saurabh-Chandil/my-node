const express = require('express');
const bcrypt = require('bcryptjs');
require('./db/mongoose');
const app = express();
const port = process.env.PORT || 3000;

const userRoute = require('../src/routers/userRoute');

app.use(express.json());
app.use(userRoute);

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

// Storing password safely
const myFunction = async () => {
    const password = 'dfjkgd';
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log('hashedPassword : ', hashedPassword);

    const isMatch = await bcrypt.compare('dfjkgd', hashedPassword);
    console.log('isMatch:', isMatch);
}

myFunction();

// Implementing json web token
const jwt = require('jsonwebtoken')
const jwtFunc = async () => {
    const token = jwt.sign({_id: 'abc123'}, 'thisissaurabhchandil', {expiresIn: '1 seconds'})
    console.log('token : ', token)

    // token verification
    const data = jwt.verify(token, 'thisissaurabhchandil')
    console.log('data : ', data)
} 

jwtFunc()
