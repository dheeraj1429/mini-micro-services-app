const express = require('express');
const app = express();
const port = 6000;
const cors = require('cors');
const axios = require('axios');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/events', async (req, res, next) => {
   const event = req.body;
   await axios.post('http://localhost:4000/events', event);
   await axios.post('http://localhost:5000/events', event);
   await axios.post('http://localhost:7000/events', event);

   res.send({});
});

app.listen(port, () => {
   console.log(`server is runing in port ${port}`);
});
