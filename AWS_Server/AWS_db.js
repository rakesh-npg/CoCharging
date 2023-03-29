// const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database('./chinook.db');

// //with serialize method
// db.serialize(() => {
//     // db.run("DROP TABLE playlists");
//     db.run("CREATE TABLE circuits([CircuitId] INTEGER,[CircuitLocation] NVARCHAR(120))");
//     db.run("INSERT INTO playlists (name) VALUES  ('Music'), ('Movies'), ('TV Shows')");
// });


// // db.serialize(() => {
// //     db.each("SELECT * FROM playlists", (err, row) => {
// //         console.log(row);
// //     });
// //   });
  
// //   // close the database
// //   db.close();


const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// open database connection
let db = new sqlite3.Database('CircuitData.db');

// CREATE operation
app.post('/api/data', (req, res) => {
  let data = req.body;
  console.log(data);
  let sql = `INSERT INTO data(CircuitId, CircuitLocation, CircuitStatus)
             VALUES(?, ?, ?)`;
  db.run(sql, [data.CircuitId, data.CircuitLocation, data.CircuitStatus], (err) => {
    if (err) {
      console.error(err.message);
      res.status(400).send(err.message);
    } else {
      res.status(201).send('Data added successfully');
    }
  });
});

// READ operation
app.get('/api/data/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let sql = `SELECT * FROM data WHERE CircuitId = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(400).send(err.message);
    } else if (!row) {
      res.status(404).send('Data not found');
    } else {
      res.send(row);
    }
  });
});

// UPDATE operation
app.put('/api/data/:id', (req, res) => {
  let id = req.params.id;
  let data = req.body;
  let sql = `UPDATE data SET CircuitLocation = ?, CircuitStatus = ?
             WHERE CircuitId = ?`;
  db.run(sql, [ parseInt(data.CircuitLocation), data.CircuitStatus, id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(400).send(err.message);
    } else {
      res.send('Data updated successfully');
    }
  });
});

// DELETE operation
app.delete('/api/data/:id', (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM data WHERE CircuitId = ?`;
  db.run(sql, [id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(400).send(err.message);
    } else {
      res.send('Data deleted successfully');
    }
  });
});

// start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});