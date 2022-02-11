import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { privateRoutes, publicRoutes } from '../router/routes';
import { AuthContext } from './context';
import Loading from './UI/loading/Loading';

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isAuth ? (
        <Routes>
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              element={route.component}
              path={route.path}
            />
          ))}
          <Route path='*' element={<Navigate replace to='/posts' />} />
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              element={route.component}
              path={route.path}
            />
          ))}
          <Route path='*' element={<Navigate replace to='/login' />} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
