import React, { useState, useEffect } from 'react';
import { data } from '../backendConfig';

function PostsCreate() {
   const [PostName, setPostName] = useState('');
   const sendHandler = function () {
      if (PostName) {
         fetch(`${data.post}/posts`, {
            method: 'POST',
            body: JSON.stringify({ title: PostName }),
            headers: {
               'Content-Type': 'application/json',
            },
         });
         setPostName('');
      }
   };

   return (
      <div className="p-2">
         <label className="form-label">Post name</label>
         <div className="input-group">
            <input type="text" value={PostName} onChange={(e) => setPostName(e.target.value)} class="form-control" placeholder="Post name" />
         </div>
         <button onClick={sendHandler} className="btn btn-primary mt-3">
            Send
         </button>
      </div>
   );
}

export default PostsCreate;
