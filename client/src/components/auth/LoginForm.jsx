import React from 'react'
import axios from 'axios'
import loginImage from '../../assets/pets.jpeg'
import logo from "../../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const LoginForm = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        username,
        password
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }

    );

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userId', user.id);

      if (!user.onboarding_completed) {
        navigate('/onboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div>
      <div className='flex flex-col lg:flex-row'>

        <div className='absolute top-4 left-4'>
          <Link to='/'>
            <img className='h-15 w-15' src={logo} alt='logo' />
          </Link>
        </div>
       
        <div className='flex flex-col justify-center items-center w-full lg:w-1/2 min-h-screen'>
          <div className='w-3/4 lg:w-2/3 max-w-md rounded-lg'>
            <h1 className='text-3xl mb-6 text-center'>Log In</h1>
            <form onSubmit={handleLogin}>
              <div>
                <label htmlFor='username' className='block mb-2'>
                  Username
                </label>
                <input
                  className='border border-gray-300 rounded-md p-2 w-full' 
                  id='username' 
                  type='text' 
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Enter your username'>
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password'>
                </input>
              </div>
              {errorMsg && (
                <p className='text-red-500 mt-2 text-sm'>{errorMsg}</p>
              )}
              <button className='bg-orange-500 text-white hover:bg-orange-800 rounded-md p-2 mt-4 w-full'>
                Log in
              </button>
              <p className='mt-4 text-center'>
                Don't have an account? <Link to='/register' className='underline text-orange-500 hover:text-orange-800'>Sign up</Link>
              </p>
              <div className='absolute bottom-4 left-4'>
                <p className='text-xs'>
                  &copy; {new Date().getFullYear()} Coinly. All rights reserved.
                </p>
              </div>
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
