import React from 'react'
import { FiZap,  FiTrendingDown, FiTrendingUp } from 'react-icons/fi'
import { FaFire } from 'react-icons/fa'

// TODO: Create card components that displays the stats of the user
const StatCards = () => {
  return (
    <>
      <Card
        title= "Level"
        value= "5"
        trend= "up"
        percent='4.3%'
        period= "last 30 days"
        icon= {<FiZap className='w-10 h-10 bg-yellow-100 text-yellow-400 rounded-full px-2 py-2 shrink-0'/>}
      />
      <Card 
        title='Streak'
        value='67 Days'
        trend='up'
        percent='1.3%'
        period='past week'
        icon={<FaFire className='w-10 h-10 bg-red-100 text-red-400 rounded-full px-2 py-2 shrink-0'/>}
      />
    </>
  );
};

// TODO: Create layout for the card

const Card = ({
    title= '',
    value= '',
    trend= "up",
    percent= '',
    period= '',
    icon= null,
}) => {
    const trendIcon = trend === "up"
        ? (
            <div className='flex items-center'>
                <FiTrendingUp className='text-green-500 mr-1'/>
                <span className='text-green-500 mr-1'>{percent}</span>
                <span className='mr-1'> Up from</span>
            </div>
        )
        : (
            <>
                <FiTrendingDown className='text-red-500 mr-1'/>
                <span className='mr-1'>{percent} Down from</span>
            </>
        );

    return (
        <div className='min-w-[200px] p-4 col-span-2 rounded-2xl bg-white shadow'>
            <div className='flex items-start justify-between'>
                <div className='flex flex-col'>
                    <span className='text-neutral-500 text-sm'>{title}</span>
                    <span className='text-xl mt-2 font-semibold'>{value}</span>
                </div>

                {icon}
            </div>
            <div className='flex flex-col'>
                <span className='text-neutral-500 flex items-center text-xs mt-2'>
                    {trendIcon}
                    {period}
                </span>
            </div>
        </div>
    ); 
};

export default StatCards