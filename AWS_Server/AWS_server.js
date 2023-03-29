// import axios from 'axios'
const axios = require('axios');
const shell = require('shelljs')
const express = require('express');
const app = express();


async function callRaspberry()  {
  const response = await axios.get("localhost:8100")
  return response 
}


// let data = req.body 
// const response = callRaspberry() 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/start', (req, res) => {
  console.log('Incoming Request Data:', req.body);
  shell.exec('./start.sh')
  res.sendStatus(200) 
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});