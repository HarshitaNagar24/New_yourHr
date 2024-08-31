import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function SIgnup(){
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); //Initialize useNavigate


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
      const response = await axios.post("user/signup",formData);
      if (response.status === 201){
        setMessage("Signup successfully"); //success message
      }
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message}`); // Error message from the backend
      } else {
        setMessage("An error occurred. Please try again.");
      }
      
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
  <div className='w-full max-w-sm border-2 flex flex-col p-6 rounded-lg shadow-lg bg-white'>
    <h1 className='text-2xl font-bold mb-6 text-center'>Sign Up</h1>
    <form onSubmit={submitHandler}>
      <div>
        <input 
          type="text" 
          id="name" 
          value={formData.name} 
          name="name" 
          required 
          placeholder='Enter Your Name' 
          className='w-full h-[35px] outline outline-2 outline-slate-300 rounded-sm mb-4 p-2' 
          onChange={changeHandler} 
        />
      </div>
      <div>
        <input 
          type="email" 
          id="email" 
          value={formData.email} 
          name="email" 
          required 
          placeholder='Enter email' 
          className='w-full h-[35px] outline outline-2 outline-slate-300 rounded-sm mb-4 p-2' 
          onChange={changeHandler} 
        />
      </div>
      <div>
        <input 
          type="password" 
          id="password" 
          value={formData.password} 
          name="password" 
          required 
          placeholder='Create Password' 
          className='w-full h-[35px] outline outline-2 outline-slate-300 rounded-sm mb-6 p-2' 
          onChange={changeHandler} 
        />
      </div>
      <div>
        <button className='w-full h-[40px] bg-blue-600 text-white font-bold rounded py-2 px-4'>Register</button>
      </div>
    </form>
  </div>
</div>

  )
}

export default SIgnup