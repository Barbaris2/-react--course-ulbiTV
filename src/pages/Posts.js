import React, { useEffect, useRef, useState } from 'react';
import PostService from '../API/PostService';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import Loading from '../components/UI/loading/Loading';
import MyModal from '../components/UI/MyModal/MyModal';
import MySelect from '../components/UI/select/MySelect';
import Pagination from '../components/UI/pagination/Pagination';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import { usePost } from '../hooks/usePosts';
import '../styles/App.css';
import { getPageCount } from '../utils/pages';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchPosts = usePost(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count'];
      setTotalPage(getPageCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page < totalPage, isLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className='App'>
      <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
        Add post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter setFilter={setFilter} filter={filter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue='Кол-во элементов на странице'
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'Показать все' },
        ]}
      />
      {postError && <h1>Error: ${postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchPosts}
        title={'Список постов'}
      />
      <div
        ref={lastElement}
        style={{ height: '20px', background: 'red' }}
      ></div>
      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <Loading />
        </div>
      )}
      <Pagination page={page} changePage={changePage} totalPage={totalPage} />
    </div>
  );
}

export default Posts;
