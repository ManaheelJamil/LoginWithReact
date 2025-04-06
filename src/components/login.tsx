import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSession } from "../reducer/authSlice"; 

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setError("");

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      const requestData = JSON.parse(response.config.data);
      const token = response.data.token;
      const otp = "123456";

      localStorage.setItem("otp", otp);
      localStorage.setItem("Email", requestData.email);

      const user = { email: requestData.email };

      dispatch(setSession({ user, token }));

      alert(`Your OTP: ${otp}`);
      navigate("/otp");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="w-full">
      <div className="flex lg:flex-row flex-col h-screen lg:w-full justify-center md:mx-0 mx-5 gap-5 items-center">
        <img
          src="/login.jpeg"
          alt="image"
          className="object-cover h-screen w-[50%] lg:block hidden"
        />
        <div className="lg:w-[40%] w-full mx-auto space-y-4">
          <h1 className="text-center font-bold text-3xl text-white">Login</h1>
          <div className="flex flex-col">
            <label className="lg:text-xl text-sm lg:font-bold text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-1 cursor-pointer shadow-xl outline-none border-[#808080] border text-gray-900 rounded-lg bg-[#c2baba] md:p-4 p-2"
            />
            <label className="lg:text-xl text-sm lg:font-bold text-gray-600 md:mt-5 mt-3">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 cursor-pointer shadow-xl outline-none border-[#808080] border text-gray-900 rounded-lg bg-[#c2baba] md:p-4 p-2 w-full"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </div>
            </div>
          </div>
          <div className="text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="md:w-5 md:h-5 w-4 h-4 cursor-pointer bg-[#808080]"
              />
              <a href="#" className="text-xs md:text-sm">
                Remember me
              </a>
            </div>
            <a
              href="/forget-password"
              className="text-[#a18954] text-xs md:text-sm underline"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="border-[#a18954] w-full md:text-xl text-md border text-white rounded-lg bg-[#a18954] md:p-4 p-2 shadow-xl cursor-pointer"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
