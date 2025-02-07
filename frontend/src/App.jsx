import { Routes, Route, Navigate } from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import { useEffect } from "react";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LoadingSpinner from "./components/LoadingSpinner";

import Navbar from './components/Navbar';
import { useUserStore } from "./store/useUserStore.js";
import DashboardPage from "./pages/DashboardPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import { useCartStore } from "./store/useCartStore.js";
import CartPage from "./pages/CartPage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";

const App = () => {
  const {user, checkAuth, isCheckingAuth} = useUserStore();
  const isAdmin = user?.role === 'admin';

  const {getCartItem} = useCartStore();

  useEffect(() => {
    checkAuth();
    getCartItem();
  }, [checkAuth, getCartItem]);

  if(isCheckingAuth){
    return (
      <LoadingSpinner />
    )
  };

  return (
    <div className='min-h-screen w-full bg-gray-900 text-white relative overflow-hidden'>
      {/*Background gradient*/}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
        </div>
      </div>

      <div className='relative z-50 pt-20'>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to='/login' />} />
          <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to='/' />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to='/' />} />
          <Route path='/secret-dashboard' element={isAdmin ? <DashboardPage /> : <Navigate to='/login' />} />
          <Route path='category/:category' element={user ? <CategoryPage /> : <Navigate to='/login' />} />
          <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
          <Route path='/payment-success' element={user ? <SuccessPage /> : <LoginPage />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
};

export default App;
