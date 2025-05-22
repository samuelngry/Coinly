import React from 'react'
import { FiZap, FiTrendingDown, FiTrendingUp } from 'react-icons/fi'

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
        icon= {<FiZap className='w-10 h-10 bg-yellow-100 text-yellow-400 rounded-full px-2 py-2 shrink-0'/>}
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
    const trendIcon = trend === "up"
        ? (
            <>
                <FiTrendingUp className='text-green-500 mr-1'/>
                <span className='mr-1'>Up from</span>
            </>
        )
        : (
            <>
                <FiTrendingDown className='text-red-500 mr-1'/>
                <span className='mr-1'>Down from</span>
            </>
        );

    return (
        <div className='min-w-[120px] p-4 col-span-2 border-stone-300 border rounded shadow'>
            <div className='flex items-start justify-between'>
                <span className='text-neutral-500 text-s'>{title}</span>
                {icon}
            </div>
            <div className='flex flex-col'>
                <span className='text-s'>{value}</span>
                <span className='text-neutral-500 flex items-center'>
                    {trendIcon}
                    {period}
                </span>
            </div>
        </div>
    ); 
};

export default StatCards