import React, { useEffect, useState } from 'react';
import { data } from '../backendConfig';

function CommentListComponent({ postId, data }) {
   // const [PostComments, setPostComments] = useState([]);

   // const fetchPostsComments = function () {
   //    fetch(`${data.comment}/posts/${postId}/comments`, {
   //       method: 'GET',
   //       headers: {
   //          'Content-Type': 'application/json',
   //       },
   //    })
   //       .then((res) => res.json())
   //       .then((resData) => setPostComments(resData));
   // };

   // useEffect(() => {
   //    fetchPostsComments();
   // }, []);

   return <ul>{!!data && data.length ? data.map((el) => <li>{el.content}</li>) : null}</ul>;
}

export default CommentListComponent;
