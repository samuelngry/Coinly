import React from 'react'
import { FiZap } from 'react-icons/fi'

// TODO: Create card components that displays the stats of the user
const StatCards = () => {
  return (
    <>
      <Card
        title= "Level"
        value= "5"
        pillText= "XP: 350/500"
        trend= "up"
        period= "last 30 days"
        icon= {<FiZap className='w-10 h-10 bg-yellow-100 text-yellow-400 rounded shrink-0'/>}
      />
    </>
  );
};

// TODO: Create layout for the card

const Card = ({
    title= '',
    value= '',
    pillText= '',
    trend= "up",
    period= '',
    icon= null,
}) => {
    return (
        <div className='min-w-[120px] p-4 col-span-2 border-stone-300 border rounded shadow'>
            <div className='flex items-start justify-between'>
                <span className='text-neutral-500'>{title}</span>
                {icon}
            </div>
        </div>
    );
};

export default StatCards