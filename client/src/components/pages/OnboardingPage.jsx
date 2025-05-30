import OnboardingHeader from "../onboarding/OnboardingHeader";

const OnboardingPage = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="max-w-7xl mx-auto py-10" >
            <OnboardingHeader step={step} />
        </div>
    );
};

export default OnboardingPage;