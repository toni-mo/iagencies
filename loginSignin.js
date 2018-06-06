const path= require('path');
const express = require('express');
const bodyParser=require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
//create a new user
router.post('/SignIn', urlencodedParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    console.log(req.body);//used to check the result of request
    //insert log info
    const MongoClient = require('mongodb').MongoClient;
        const url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db("myProject");
        const myobj = { username:username , password: password,email:email };
        const whereStr = {email:email};  // select condition
        dbo.collection("logInfo").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            if(result.length>0){
                //if the user name exists, return a message to user,'change a new value
                res.send('This user name is occupied, please change to another user name!')
                db.close();
            }else{//if the username doesn't exist, insert it to database
                dbo.collection("logInfo").insertOne(myobj, function(err, result) {
                    if (err) throw err;
                    console.log("insert successfully!");
                    db.close();
                    //sign in successfullys
                    // res.send(`We got the following values from the query string: ${username}, ${password}`);
                    res.status(200).sendFile(path.join(__dirname,'../profile.html'));
                 });
            }
            // console.log(result);
        });
 });

    //need jump to personal profile page, 2 seconds later,transfer it
});
// login
router.post('/loginSubmit', urlencodedParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);//used to check the result of request
    //insert log info
    const MongoClient = require('mongodb').MongoClient;
        const url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            const dbo = db.db("myProject");
            const whereStr = {username:username,password:password};  // select condition
            dbo.collection("logInfo").find(whereStr).toArray(function(err, result) {
                if (err) throw err;
                if(result){
                    res.send('log in successful!');
                }
                db.close();
            });
        });

    // res.send(`We got the following values from the query string: ${username}, ${password}`);
    //need jump to personal profile page, 2 seconds later,transfer it
});

module.exports=router;
//log In
