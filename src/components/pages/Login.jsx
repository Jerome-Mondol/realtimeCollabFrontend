import React, { useState } from 'react';
import { signIn } from '../Auth/Auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn(formData.email, formData.password);

    if (result) {
      sessionStorage.setItem('token', JSON.stringify(result));
      navigate('/dashboard');
    }
  };

  return (
    <div className='bg-zinc-900 h-screen flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-white text-center py-5'>Remote Work Collaboration Suite</h1>
      <form onSubmit={handleSubmit} className='w-[30%] mx-auto flex justify-center flex-col h-[50%] gap-4'>
        <h1 className='text-white font-semibold text-xl'>Login</h1>
        <p className='text-gray-200'>
          Don't have an account? <Link to='/signup' className='text-blue-500'>Sign Up</Link>
        </p>

        <input 
          type="email"
          placeholder='Email'
          name='email'
          className='bg-black p-5 w-[100%] text-white'
          onChange={handleChange}
        />    

        <input 
          type="password"
          name='password'
          placeholder='Password'
          className='bg-black p-5 w-[100%] text-white'
          onChange={handleChange}
        />

        <button type='submit' className='w-[100%] bg-zinc-800 text-gray-300 py-3 shadow-sm cursor-pointer rounded-sm'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
