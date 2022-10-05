var express = require('express');
var app = express();
var bodyParser  = require("body-parser");
var mysql = require('mysql2');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// create the connection to database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'eric',
  password: 'password',
  database: 'JoinUs'
  
});


app.get("/", function(req, res){
    //finding count of users in DB
    var q = 'SELECT COUNT(*) as count FROM users';
    connection.query(q, function (error, results) {
    if (error) throw error;
    var count = results[0].count;
    res.render("home", {data: count});
    });
   });

app.post("/register", function(req, res){
    //inserting user email into DB
    var person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});
   

app.listen(3000, function () {
 console.log('App listening on port:3000');
});

