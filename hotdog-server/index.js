const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_HOTDOGS = 'SELECT * FROM type_hotdogs';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hotdog',
    password: 'hotdog',
    database: 'hotdog'
});

connection.connect(err => {
    if(err) {
	return err;
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /hotdog to see')
});

//Show all hotdogs
app.get('/hotdog', (req, res) => {
    connection.query(SELECT_ALL_HOTDOGS, (err, results) => {
	if(err) {
	    return res.send(err)
	}
	else {
	    return res.json({
		data: results
	    })
	}
    });
});

//Add new hotdog
app.get('/add_hotdog', (req, res) => {
    const { name, price} = req.query;
    const INSERT_HOTDOG = `INSERT INTO type_hotdogs (name, price) VALUES('${name}', ${price})`;
    connection.query(INSERT_HOTDOG, (err, results) => {
	if(err) {
	    return res.send(err)
	}
	else {
	    return res.send('life is good')
	}
    });
});

//Delete hotdog
app.get('/del_hotdog', (req, res) => {
    const { name } = req.query;
    const DELETE_HOTDOG = `DELETE FROM type_hotdogs WHERE name = '${name}'`;
    connection.query(DELETE_HOTDOG, (err, result) => {
	if(err) {
	    return res.send(err)
	}
	else {
	    return res.send('delete')
	}
    });
});

//Update hotdog
app.get('/upd_hotdog', (req, res) => {
    const { name1, name, price } = req.query;
    const UPDATE_HOTDOG = `UPDATE type_hotdogs SET name = '${name}', price = ${price} WHERE name = '${name1}'`;
    connection.query(UPDATE_HOTDOG, (err, result) => {
	if(err) {
	    return res.send(err)
	}
	else {
	    return res.send('update')
	}
    });
});

app.listen(4000, () => {
    console.log(`Hotdog server listening on port 4000`)
});