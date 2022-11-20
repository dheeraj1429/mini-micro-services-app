const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const { randomBytes } = require('crypto');
const axios = require('axios');

const commentByPostsID = {};

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes => get
app.get('/posts/:id/comments', (req, res, next) => {
   const postsId = req.params.id;
   res.send(commentByPostsID[postsId] || []);
});

// routes => posts
app.post('/posts/:id/comments', async (req, res, next) => {
   const commentId = randomBytes(4).toString('hex');
   const { content } = req.body;
   const postsId = req.params.id;
   const comment = commentByPostsID[postsId] || [];
   comment.push({ id: commentId, content });
   commentByPostsID[postsId] = comment;

   // send back the event to the event bus
   await axios.post('http://localhost:6000/events', {
      type: 'postCommentCreated',
      data: {
         commentId: commentId,
         postsId,
         content,
      },
   });

   res.status(201).send(comment);
});

app.post('/events', (req, res, next) => {
   console.log('comment service ', req.body);
   res.send({});
});

// server listen
app.listen(port, () => {
   console.log(`server running in port ${port}`);
});
