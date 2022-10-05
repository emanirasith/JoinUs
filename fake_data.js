var mysql = require('mysql2');
const { faker } = require('@faker-js/faker'); 

// create the connection to database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'eric',
  password: 'password',
  database: 'JoinUs'
  
});

// create the fake data
var data = [];
for(var i = 0; i < 500; i++){
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
}
 

var q = 'INSERT INTO users (email, created_at) VALUES ?';
 
connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});
 
connection.end();
