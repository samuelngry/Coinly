import React from 'react'
import { Progress } from "@material-tailwind/react"

const OnboardingHeader = ({progress = 40}) => {
  return (
    <div className='w-full h-3 bg-gray-300 rounded-full'>
        <div
            className='h-full bg-orange-500 rounded-full transition-all duration-300'
            style={{ width: `${progress}%`}}
        ></div>
    </div>
  )
}

export default OnboardingHeader
