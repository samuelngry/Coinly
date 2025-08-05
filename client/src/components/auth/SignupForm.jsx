import React from 'react'
import axios from 'axios'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import signupImage from '../../assets/pet.jpg'
import { Link } from 'react-router-dom'
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const SignupForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setErrorMsg('Please fill in all fields')
            return;
        }

        try {
            const userData = { username, password };

            console.log('Sending sign-up request with data:', userData);

            const res = await axios.post(`${API_BASE}/api/auth/register`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            console.log('Response from backend:', res.data);

            const { token, user } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/onboard');
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                console.log("Session expired, please log in again.");
                localStorage.removeItem('token');  // Clear invalid token
                navigate('/login');
            } else {
                setErrorMsg(err.response?.data?.error || 'Signup failed');
            }
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
                <div className='w-3/4 lg:w-2/3 rounded-lg'>
                    <h1 className='text-3xl mb-6 text-center'>Get Started Now</h1>
                    <form onSubmit={handleSignup}>
                        {/* Username and Password Fields */}
                        <div>
                            <label htmlFor='username' className='block mb-2 mt-4'>
                                Username
                            </label>
                            <input
                                className='border border-gray-300 rounded-md p-2 w-full'
                                id='username'
                                type='text'
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Enter your username'
                                required
                            />
                            <label htmlFor='password' className='block mb-2 mt-4'>
                                Password
                            </label>
                            <input 
                                className='border border-gray-300 rounded-md p-2 w-full'
                                id='password'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter your password'
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {errorMsg && (
                            <p className='text-red-500 mt-2 text-sm'>{errorMsg}</p>
                        )}

                        <button className='bg-orange-500 text-white hover:bg-orange-800 rounded-md p-2 mt-4 w-full'>
                            Sign Up
                        </button>

                        <p className='text-center mt-4'>
                            Already have an account? <Link to='/login' className='text-orange-500 underline hover:text-orange-800'>Log in</Link>
                        </p>
                        
                        {/* Footer */}
                        <div className='absolute bottom-4 left-4'>
                            <p className='text-xs'>
                                &copy; {new Date().getFullYear()} Coinly. All rights reserved.
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <div className='hidden lg:flex w-full lg:w-1/2'>
                <img className='w-full h-full object-cover object-center' src={signupImage} alt='Pet'/>
            </div>
        </div>
    </div>
  )
}

export default SignupForm
