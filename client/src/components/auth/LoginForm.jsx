import React from 'react'
import loginImage from '../../assets/pets.jpeg'

const LoginForm = () => {
  return (
    <div>
      <div className='flex flex-col lg:flex-row h-screen'>
        <div className='flex flex-col justify-center items-center w-full lg:w-1/2 px-4'>
          <div className='w-3/4 lg:w-2/3 max-w-md rounded-lg'>
            <h1 className='text-3xl mb-6 text-center'>Log In</h1>
            <form>
              <div>
                <label htmlFor='email' className='block mb-2'>
                  Email
                </label>
                <input
                  className='border border-gray-300 rounded-md p-2 w-full' 
                  id='email' 
                  type='email' 
                  placeholder='Enter your email'>
                </input>
              </div>
              <div>
                <label htmlFor='password' className='block mb-2 mt-4'>
                  Password
                </label>
                <input
                  className='border border-gray-300 rounded-md p-2 w-full'
                  id='password'
                  type='password'
                  placeholder='Enter your password'>
                </input>
              </div>
              <button className='bg-orange-500 text-white hover:bg-orange-800 rounded-md p-2 mt-4 w-full'>
                Log in
              </button>
              <p className='mt-4 text-center'>
                Don't have an account? <a href='/signup' className='underline text-orange-500 hover:text-orange-800'>Sign up</a>
              </p>
            </form>
          </div>
        </div>
        
        <div className='hidden lg:flex w-full lg:w-1/2'>
          <img className='w-full h-full object-cover object-center' src={loginImage} alt='Pets'></img>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
