const path = require('path');
const hbs = require('hbs');
const express = require('express');

const app = express();
//const port = process.env.PORT || 3000;

// Define path for express config
const publicDirectoryPath = path.join(__dirname,'/public');
const viewsPath = path.join(__dirname,'/templates/views');
const partialsPath = path.join(__dirname,'/templates/partials');

// Setup handlebars engine.
app.set('view engine', 'hbs'); // for dynamic content
// handlebars bydefault will take 'views' folder. If we want to change the loc then we have to set it
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// For static content
app.use(express.static(publicDirectoryPath)); 

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

// products
app.get('/products', (req, res) => {
    console.log('req.query:', req.query);
    if(!req.query.search) {
        return res.send({
            error: "Enter the search criteria"
        });
    } else {
        res.send({
            products : []
        });
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000 successfully.');
});
