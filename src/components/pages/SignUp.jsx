import React, { forwardRef, useState } from 'react'
import { signUp } from '../Auth/Auth'
import { Link } from 'react-router-dom'

const SignUp = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    })



    const handleChange = (event) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleSubmit = (e) =>  {
        e.preventDefault();
        signUp(formData.email, formData.password, formData.fullName);
    }

  return (
    <div className='bg-zinc-900 h-screen flex justify-center items-center flex-col' >
        <h1 className='text-3xl text-white text-center py-5' >Remote Work Collaboration Suite</h1>
        <form onSubmit={handleSubmit} className='w-[30%] mx-auto flex justify-center flex-col h-[50%] gap-4'>
            <h1 className='text-white font-semibold text-xl' >Sign Up</h1>
            <p className='text-gray-200' >Already Have an account? <Link to="/login" className='text-blue-500' >Login</Link></p>

            <input 
                type="text"
                placeholder='Full Name'
                name='fullName'
                className='bg-black p-5 w-[100%] text-white'
                onChange={handleChange}
            />

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

            <button type='submit' name='submit' className='w-[100%] bg-zinc-800 text-gray-300 py-3 shadow-sm cursor-pointer rounded-sm'>Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp;