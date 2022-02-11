import About from '../pages/About';
import Login from '../pages/Login';
import PostPage from '../pages/PostPage';
import Posts from '../pages/Posts';

export const privateRoutes = [
  { path: '/about', component: <About /> },
  { path: '/posts', component: <Posts /> },
  { path: '/posts/:id', component: <PostPage /> },
];

export const publicRoutes = [{ path: '/login', component: <Login /> }];
