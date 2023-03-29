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

app.get('/start', (req, res) => {
  shell.exec('./start.sh')
  res.sendStatus(200) 
});

app.get('/stop', (req, res) => {
  data =shell.exec('./stop.sh')
  // console.log(data);
  // console.log("stopped");
  data = data.slice(0, -2)
  res.send(data) 
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});