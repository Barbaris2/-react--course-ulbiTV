import React, { useState } from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: '', body: '' });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPost({ title: '', body: '' });
  };
  return (
    <div>
      <form>
        {/* Control */}
        <MyInput
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          type='text'
          placeholder='Name'
        />
        <MyInput
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          type='text'
          placeholder='Desc'
        />
        <MyButton onClick={addNewPost}>Add</MyButton>
      </form>
    </div>
  );
};

export default PostForm;
