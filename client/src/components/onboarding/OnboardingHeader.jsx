import React from 'react'
import { ArrowLeft } from 'lucide-react'

const OnboardingHeader = ({ step, setStep }) => {
    const progress = step * 25;
    return (
        <div className='flex items-center w-full rounded-full px-5'>
            <button
                onClick={() => {
                    setStep(prevStep => prevStep - 1);
                }}
            >
                <ArrowLeft className='h-5 w-5 mr-2 text-gray-400 bg-white hover:text-gray-800' alt='back' />
            </button>
            <div className='bg-gray-300 flex-1 rounded-full overflow-hidden h-3'>
                <div
                    className='h-full bg-orange-500 rounded-full transition-all duration-300 '
                    style={{ width: `${progress}%`}}
                ></div>
            </div>
        </div>
    )
}

export default OnboardingHeader