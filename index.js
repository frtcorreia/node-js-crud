const mysql = require('mysql');
const express = require('express');
var app = express();

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

app.listen(3000, ()=>console.log('Express server is running at port nr 3000'));

app.get( '/test', (req, res)=>{
    mysqlConnection.query('SELECT * FROM media', (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

// media 
/*
app.get( '/media', (req, res)=>{
    mysqlConnection.query('SELECT * FROM media', (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

app.get( '/media/media:id', (req, res)=>{
    mysqlConnection.query('SELECT * FROM media WHERE id = ?', [req.params.id], (err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});
*/