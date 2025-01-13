import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from '../component/auth/Login';

const LoginPage = () => {
  const navigate = useNavigate();
  let isAuthenticated=false

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  }, [])
  
  return (
    <div>
        <Login />
    </div>
  )
}

export default LoginPage;