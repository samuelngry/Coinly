import React from 'react'
import { ArrowLeft } from 'lucide-react'

const OnboardingHeader = ({ step }) => {
    const progress = step * 25;
    return (
        <div className='flex items-center w-full rounded-full'>
            <a href='/'>
                <ArrowLeft className='h-5 w-5 bg-white mr-2 text-gray-400' alt='back'/>
            </a>
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