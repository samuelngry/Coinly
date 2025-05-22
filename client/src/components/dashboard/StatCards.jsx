import React from 'react'
import { FiZap, FiSmile, FiTarget, FiTrendingDown, FiTrendingUp } from 'react-icons/fi'
import { FaFire } from 'react-icons/fa'

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
      <Card 
        title='Pet Mood'
        value='😊 Happy'
        trend='up'
        percent='Happier'
        period='yesterday'
        icon={<FiSmile className='w-10 h-10 bg-green-100 text-green-400 rounded-full px-2 py-2 shrink-0'/>}
      />
      <Card 
        title='Daily Goal'
        value='40%'
        trend='down'
        percent='2.3%'
        period='past week'
        icon={<FiTarget className='w-10 h-10 bg-blue-100 text-blue-400 rounded-full px-2 py-2 shrink-0' />}
      />
    </>
  );
};

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
                <span className='text-red-500 mr-1'>{percent}</span>
                <span className='mr-1'>Down from</span>
            </>
        );

    return (
        <div className='min-w-[200px] p-4 col-span-3 rounded-2xl bg-white shadow'>
            <div className='flex items-start justify-between'>
                <div className='flex flex-col'>
                    <span className='text-neutral-500 text-sm'>{title}</span>
                    <span className='text-xl mt-2 font-semibold'>{value}</span>
                </div>

                {icon}
            </div>
            <div className='flex flex-col'>
                <span className='text-neutral-500 flex items-center text-xs mt-6'>
                    {trendIcon}
                    {period}
                </span>
            </div>
        </div>
    ); 
};

export default StatCards