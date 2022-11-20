const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
const { randomBytes } = require('crypto');
const axios = require('axios');

// database data
const posts = {};

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes => get
app.get('/posts', (req, res, next) => {
   res.send(posts);
});

// routes => posts
app.post('/posts', async (req, res, next) => {
   // random ids
   const id = randomBytes(4).toString('hex');
   // get the posts data from the client body
   const { title } = req.body;
   // insert new posts data inside the posts database
   posts[id] = {
      id,
      title,
   };

   // send the envet to the event bus
   await axios.post('http://localhost:6000/events', {
      type: 'postCreated',
      data: {
         id,
         title,
      },
   });

   // send back the inserted data.
   res.status(201).send(posts[id]);
});

app.post('/events', (req, res, next) => {
   console.log('post service ', req.body);
   res.send({});
});

// server listen
app.listen(port, () => {
   console.log(`server running in port ${port}`);
});
