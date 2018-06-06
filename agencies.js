// Router agencies module
const express = require('express');

const router = express.Router();



const Agency = require('./models/agency');

// Hardcoding services
let services = [
    { id: 1000, name: "English Language", alias: "el" },
    { id: 1001, name: "Resume & Cover Letter", alias: "rc" },
    { id: 1002, name: "Diversity Training", alias: "dt" },
    { id: 1003, name: "Workplace Language", alias: "wl" },
    { id: 1004, name: "Interview Preparation", alias: "ip" }    
];

// Creating data object that will hold services and agencies
let data = {
    servcies: [],
    agencies: []
};

router.get('/', function(req, res){
    
    
    
    Agency.find().exec().then(function(docs){
        console.log(docs);
        let agency = {name: "Manitoba Start"};
        // jsonAgencies = JSON.stringify(docs);
        // console.log(jsonAgencies);
        // let matrix = [{id: "123"},{id:"123"},{id: "123"}];
        // res.render('agencies', {agencies: docs});
        data.services = services;
        data.agencies = docs;
        res.render('agencies', {data: data});    
    });

    

});

router.get('/services', function(req, res){
    console.log('Fetch works');
    console.log(req.query.services);
    let selectedServices = req.query.services.split(',');
    // still needs to be converted to array, string here doest worn and req.query.services is a string
    // let selectedServices = req.query.services;
    console.log(typeof selectedServices);
    Agency.find({
        'services.alias': { $in: selectedServices }
    }).exec().then(function(docs){
        console.log(docs);
        res.send(docs);
    })
    // res.end();
});

router.get('/near', function(req, res){
    console.log('Fetch works');
    // let nearLocation = req.query.l;
    nearCoordinates = [req.query.lng, req.query.lat];
    console.log(req.query.lat);

    Agency.find({
        location:{
            $near: {
                $geometry: {type: "Point", coordinates: nearCoordinates},
                $minDistance: 100,
                $maxDistance: 200
            }
        }
    }).exec().then(function(docs){
        console.log(docs);
        res.send(docs);
    });

    // res.end();
});

module.exports = router;