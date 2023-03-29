const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();
const port = 8080;


app.use(cors()); 
app.get('/start', (req, res) => {
  axios.get('https://ec2b-2401-4900-3604-ddc0-a89c-6f0b-c54e-d7f9.in.ngrok.io/start')
    .then(response => {
      res.send(response.data); // only send response data, not the entire response object
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error occurred while making request to start');
    });
});

app.get('/stop', (req, res) => {
  axios.get('https://ec2b-2401-4900-3604-ddc0-a89c-6f0b-c54e-d7f9.in.ngrok.io/stop')
    .then(response => {
      console.log(response.data);
      data=response.data.toString()
      res.status(200).send(data);//.send(response.data);
    })
    .catch(error => {
      console.error(error);
      res.send(500).send('Error occurred while making request to stop');
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
