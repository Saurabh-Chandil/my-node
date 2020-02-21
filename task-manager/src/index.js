const express = require('express');
require('./db/mongoose');
const app = express();
const port = process.env.PORT || 3000;

const userRoute = require('../src/routers/userRoute');
app.use(express.json());
app.use(userRoute);

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});



