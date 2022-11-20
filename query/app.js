const express = require('express');
const app = express();
const port = 7000;
const cors = require('cors');

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// small prisist data
const posts = {};

// routes => get
app.get('/posts', (req, res, next) => {
   res.send(posts);
});

// route => post
app.post('/events', (req, res, next) => {
   const { type, data } = req.body;

   if (type === 'postCreated') {
      const { id, title } = data;
      posts[id] = {
         id,
         title,
         comment: [],
      };
   }
   if (type === 'postCommentCreated') {
      const { commentId, postsId, content } = data;
      console.log(req.body);
      const post = posts[postsId];
      post.comment.push({ id: commentId, content });
   }

   console.log('query service ', req.body);

   res.send({});
});

app.listen(port, () => {
   console.log(`server runing in port ${port}`);
});
