import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import AppRouter from './components/AppRouter';
import { AuthContext } from './components/context';
import Navbar from './components/UI/navbar/Navbar';

import './styles/App.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isLoading,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;