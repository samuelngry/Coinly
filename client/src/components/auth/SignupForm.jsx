import React from 'react'
import axios from 'axios'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'

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

            const res = await axios.post('http://localhost:5000/api/auth/register', formData);``

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
      
    </div>
  )
}

export default SignupForm
