import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Product from './product';
import CartPage from './cartPage';
import Header from './header';
import LoginPage from './login';
import Signup from './signUp';
import Confirm from './conform';
import NotFound from './notFound';

function AppWrapper() {
  const location = useLocation();
  const authPath = ['/login', '/signup'];
  const navigate = useNavigate()
  const showHeader = authPath.includes(location?.pathname);


  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user && authPath.includes(location.pathname)) {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  return (
    <>
      {!showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/conform" element={<Confirm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </>
  );
}

export default AppWrapper