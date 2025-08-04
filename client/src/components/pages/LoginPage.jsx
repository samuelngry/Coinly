import LoginForm from "../auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            const parsedUser = JSON.parse(user);

            if (parsedUser.onboarding_completed) {
                navigate('/home');
            } else {
                navigate('/onboard');
            }
        } 
    }, [navigate])
    
    return (
        <div style={{ backgroundColor: 'var(--old-lace)' }}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;