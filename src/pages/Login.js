import React, { useContext } from 'react';
import { AuthContext } from '../components/context';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';

const Login = () => {
  const { isLogin, setIsAuth } = useContext(AuthContext);
  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  };

  return (
    <div>
      <h1>Страница для логина</h1>
      <form onSubmit={login}>
        <MyInput type='text' placeholder='login' />
        <MyInput type='password' placeholder='password' />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  );
};

export default Login;
