import React, { useEffect, useState } from 'react';
import { data } from '../backendConfig';
import './postCartComponent.style.css';
import CommentCreateComponent from './CommentCreateComponent';
import CommentListComponent from './CommentListComponent';

function PostCartComponent() {
   const [Posts, setPosts] = useState([]);

   const fetchPosts = function () {
      fetch(`${data.query}/posts`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((res) => res.json())
         .then((resData) => setPosts(resData));
   };

   useEffect(() => {
      fetchPosts();
   }, []);

   return (
      <div className="mt-2 d-flex items-center">
         {Object.keys(Posts).map((el) => (
            <div className="post_carts me-4" key={Posts[el].id}>
               {Posts[el].title}
               <CommentListComponent data={Posts[el].comment} postId={Posts[el].id} />
               <div className="mt-3"></div>
               <CommentCreateComponent postId={Posts[el].id} />
            </div>
         ))}
      </div>
   );
}

export default PostCartComponent;
