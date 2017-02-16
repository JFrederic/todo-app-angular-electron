var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'simplon974',
  database  : 'express-todo'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

connection.query('CREATE TABLE IF NOT EXISTS todo(id int primary key, task varchar(255), complete BIT)', function (err, result) {
    if (err) throw err;
  console.log('Table created')
    
});

app.post('/addtask',function(req,res){
  var data = req.body.params;  
  var query = connection.query('INSERT INTO todo SET ? ', data ,function(err, rows, fields){
   if (err) throw err;
   console.log(rows)
  })
})
 
connection.end();
  