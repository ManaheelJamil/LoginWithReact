import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { clearSession } from '../reducer/authSlice';
import React from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token, isAuthenticated } = useSelector((state:any) => state.auth);

  useEffect(() => {
    if (!token || !isAuthenticated) {
      navigate('/');
    }
  }, [token, isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(clearSession());
    navigate('/');
  };

  return (
    <div>
    <div className='bg-[url("/images.jpg")] bg-no-repeat lg:space-y-5 space-y-3 bg-cover bg-center  h-screen w-full lg:pt-32 p-2 lg:px-10'>
      <h2 className='text-blue-900 poppins-medium lg:text-5xl text-xl font-bold  underline'>Welcome to Dashboard,</h2>
      <p className='lg:text-xl text-sm text-blue-900 font-bold'>Email: {user?.email}</p>
      <button className='bg-gray-900 text-white lg:w-28 w-20 lg:text-xl text-sm shadow-xl cursor-pointer hover:bg-blue-900 rounded-sm p-2' onClick={handleLogout}>Logout</button>
    </div>
    </div>
  
  );
};

export default Dashboard;
