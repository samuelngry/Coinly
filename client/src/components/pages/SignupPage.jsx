import SignupForm from "../auth/SignupForm"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignupPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
          const parsedUser = JSON.parse(user);

          if (parsedUser.onboarding_completed) {
              navigate('/dashboard');
          } else {
              navigate('/onboard');
          }
      } 
  }, [navigate])

  return (
    <div style={{ backgroundColor: 'var(--old-lace)' }}>
      <SignupForm />
    </div>
  )
}

export default SignupPage
