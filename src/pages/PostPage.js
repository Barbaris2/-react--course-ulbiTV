import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import PostService from '../API/PostService';
import Loading from '../components/UI/loading/Loading';
import { useFetching } from '../hooks/useFetching';

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComment, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComment(params.id);
  }, []);

  return (
    <div>
      <h1>Вы открыли страницу поста c ID: {params.id}</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {post.id}.{post.title}
        </div>
      )}
      <h1>Коментарии</h1>
      {isComLoading ? (
        <Loading />
      ) : (
        <div>
          {comments.map((comm) => (
            <div key={comm.id} style={{ marginTop: '15px' }}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostPage;
