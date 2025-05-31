import React from 'react'

const OnboardingStep = ({ step, setStep, answers, setAnswers }) => {
    if (step === 1) {
    return (
        <>
            <p>What's your biggest spending category?</p>

        </>
    )
}

export default OnboardingStep
