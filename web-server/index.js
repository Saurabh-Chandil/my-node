const path = require('path');

const express = require('express');
const app = express();

const publicDirectoryPath = path.join(__dirname,'/public');

app.set('view engine', 'hbs'); // for dynamic content
app.use(express.static(publicDirectoryPath)); // for static content

// for dynamic 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Saurabh Chandil'
    });
});

// app.com
app.get('', (req, res) => {
    res.send('<h1>Hello Saurabh. This is root.</h1>');
});

// app.com/help
app.get('/help', (req, res) => {
    res.send([{
        name: 'Saurabh',
        age: '33'
    }]);
});

// app.com/about
app.get('/about', (req, res) => {
    res.send('Hello Saurabh. This is about.');
});

app.listen(3000, () => {
    console.log('Server started on port 3000 successfully.');
});
