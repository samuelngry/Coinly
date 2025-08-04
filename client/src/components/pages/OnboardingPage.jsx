import OnboardingHeader from "../onboarding/OnboardingHeader";
import OnboardingStep from "../onboarding/OnboardingStep";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const OnboardingPage = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.onboarding_completed) {
            navigate('/home');
        }
    }, [navigate])

    return (
        <div className="max-w-7xl mx-auto py-10" >
            <OnboardingHeader step={step} setStep={setStep} />
            <OnboardingStep step={step} setStep={setStep} answers={answers} setAnswers={setAnswers} />
        </div>
    );
};

export default OnboardingPage;