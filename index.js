var express = require("express");
var app = express();
var basicAuth = require('basic-auth');
const mysql = require('mysql');
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root', 
    password: '',
    database: 'hireme'
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('DB connection succeded');
    else
        console.log('DB connection faild \n Error: ' + JSON.stringify(err, undefined, 2));
});

var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  if (user.name === 'amy' && user.pass === 'passwd123') {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
}

app.get( '/media/media:id', auth, (req, res)=>{
    mysqlConnection.query('SELECT * FROM media WHERE id = ?', [req.params.id], (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});


app.get( '/media', auth, (req, res)=>{
    mysqlConnection.query('SELECT * FROM media', (err, rows, fields)=>{
        if(!err)
        res.send(rows); 
        else
        console.log(err);
    })
});

 
 
app.listen(8000);
console.log("app running");