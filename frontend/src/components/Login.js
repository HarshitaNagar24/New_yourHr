import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [formData , setFormData] =useState({
    email:"",
    password:"",
  });
  const navigate = useNavigate(); //Initialize useNavigate
  const {setUser} = useContext(AuthContext);

  function changeHandler(event){
    const {name , value} =event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

 async function submitHandler(event) {
    event.preventDefault();
    // Here, you can send `formData` to your backend
    try {
      const response = await axios.post("/user/login", formData);
      const userData = response.data;
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(userData.user));
      const { token, user } = response.data;
        // Store the token in localStorage
      localStorage.setItem('token', token);
      // update user state in context
      setUser(user);
      console.log("Login successful:", response.data);
      navigate('/');

      // Handle successful login (e.g., save token, redirect)
    } catch (error) {
      if (error.response.status === 404) {
        // Redirect to signup page if user is not found
        navigate('/signup');
    } else {
        console.error('Login error:', error.response.data);
        // Handle other errors, such as invalid password
    }
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm border-2 flex flex-col p-6 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={submitHandler}>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              required
              placeholder="Enter email"
              onChange={changeHandler}
              className="w-full h-[35px] outline outline-2 outline-slate-300 rounded-sm mb-4 p-2"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              required
              placeholder="Enter your Password"
              onChange={changeHandler}
              className="w-full h-[35px] outline outline-2 outline-slate-300 rounded-sm mb-6 p-2"
            />
          </div>
          <div>
            <button className="w-full h-[40px] bg-blue-600 text-white font-bold rounded py-2 px-4">
             Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
