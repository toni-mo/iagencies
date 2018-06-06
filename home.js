// Router home module
const express = require('express');

const router = express.Router();

router.get('/', function(req, res){
    res.render('index', {testVar: 'Test variable in template'});
});

module.exports = router;