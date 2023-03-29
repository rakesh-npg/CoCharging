const express = require('express');
const fs = require('fs');

const app = express();

app.get('/getData', (req, res) => {
  fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading file');
    } else {
      res.send(data);
    }
  });
});

app.listen(8000, () => {
  console.log('Server listening on port 8000');
});
