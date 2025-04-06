import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from '../reducer/authSlice'; 
import { useNavigate } from 'react-router-dom';
import React from 'react';

function OTP() {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state:any) => state.auth.token);
  const email = localStorage.getItem('Email'); 

  const handleVerify = () => {
    const correctOtp = localStorage.getItem('otp');

    if (code === correctOtp) {
      const user = { name: 'Dummy User', email };

      dispatch(setSession({ user, token }));

      localStorage.removeItem('otp');
      navigate('/dashboard');
    } else {
      alert('❌ Invalid OTP');
    }
  };

  return (
    <div className="flex items-center h-screen">
      <img
        src="/login.jpeg"
        alt="image"
        className="object-cover h-screen w-[50%] lg:block hidden"
      />

      <div className="mx-auto w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] shadow-xl p-10 space-y-8">
        <h2 className="text-[#a18954] text-3xl text-center">Enter OTP</h2>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter OTP"
          className="outline-none shadow-xl cursor-pointer p-3 text-white bg-[#a18954] rounded-sm w-full"
        />
        <button
          onClick={handleVerify}
          className="bg-[#574113] w-32 p-2 shadow-xl text-white flex justify-center cursor-pointer rounded-sm mx-auto"
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default OTP;
