import React from 'react'
import axios from 'axios'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import signupImage from '../../assets/pet.jpg'
import defaultAvatar from '../../assets/avatar.jpg'

const SignupForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [avatar, setAvatar] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setErrorMsg('Please fill in all fields')
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            if (avatar) {
                formData.append('avatar', avatar);
            }

            const res = await axios.post('http://localhost:5000/api/auth/register', formData);

            const { token, user } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/login');

        } catch (err) {
            setErrorMsg(err.response?.data?.error || 'Signup failed');
        }
    };

  return (
    <div>
        <div className='flex flex-col lg:flex-row'>

            <div className='absolute top-4 left-4'>
                <img className='h-15 w-15' src={logo} alt='logo' />
            </div>

            <div className='flex flex-col justify-center items-center w-full lg:w-1/2 min-h-screen'>
                <div className='w-3/4 lg:w-2/3 max-w-md rounded-lg'>
                    <h1 className='text-3xl mb-6 text-center'>Get Started Now</h1>
                    <form onSubmit={handleSignup}>
                        {/* Avatar Upload Field */}
                        <div className="flex justify-center mb-4">
                            <div className="relative w-20 h-20">
                            <img 
                                src={avatar ? URL.createObjectURL(avatar) : defaultAvatar}
                                alt='Avatar'
                                className='w-20 h-20 rounded-full border object-cover'
                            />
                            <input 
                                id='avatar'
                                type='file'
                                accept='image/*'
                                onChange={(e) => setAvatar(e.target.files[0])}
                                className='hidden'
                            />
                            <label
                                htmlFor='avatar'
                                className='absolute bottom-0 right-0 bg-orange-500 p-1 rounded-full cursor-pointer hover:bg-orange-800 transition'
                                title='Edit Avatar'
                            >
                                <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4 text-white'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                >
                                <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.414.263l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.263-.414l9.9-9.9a2 2 0 012.828 0zm-2.828 2.828L5 15l-2.5.625L3.625 13 14.586 3.828z" />
                                </svg>
                            </label>
                            </div>
                        </div>

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
                            Already have an account? <a href='/login' className='text-orange-500 underline hover:text-orange-800'>Log in</a>
                        </p>
                        
                        {/* Footer */}
                        <div className='absolute bottom-4 left-4'>
                            <p className='text-xs'>
                                &copy; {new Date().getFullYear} Coinly. All rights reserved.
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
