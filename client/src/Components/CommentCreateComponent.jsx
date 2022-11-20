import React, { useState } from 'react';
import { data } from '../backendConfig';

function CommentCreateComponent({ postId }) {
   const [PostComment, setPostComment] = useState('');

   const sendHandler = function () {
      fetch(`${data.comment}/posts/${postId}/comments`, {
         method: 'POST',
         body: JSON.stringify({
            content: PostComment,
         }),
         headers: {
            'Content-Type': 'application/json',
         },
      });
      setPostComment('');
   };

   return (
      <>
         <label>Comment</label>
         <input onChange={(e) => setPostComment(e.target.value)} value={PostComment} type="text" class="form-control" />
         <button onClick={sendHandler} className="btn btn-primary mt-3">
            Add comment
         </button>
      </>
   );
}

export default CommentCreateComponent;
