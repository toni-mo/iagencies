// Requiring Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const mongoose = require('mongoose');

// Initializing express app
const app = express();
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

// Connecting to database
const dbUrl = 'mongodb://localhost:27017/iagencies';
mongoose.connect(dbUrl);



// Requiring custom roter modules
const home = require('./home');
const agencies = require('./agencies');

// Mounting Routes
app.use('/', home);
app.use('/agencies', agencies);


// Server Port number
const port = 3000;

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});