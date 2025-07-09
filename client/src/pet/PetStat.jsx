import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const PetStat = ({ data }) => {
  return (
    <div className='mt-6 w-full max-w-2xl mx-auto'>
      <h2 className='mb-2'>Weekly Progress</h2>
      <div className='border border-neutral-300 shadow-lg shadow-black/10 rounded-xl'>
        <div className='flex justify-between mx-3 my-2'>
            <span className='text-orange-500 font-semibold text-sm'>Total</span>
            <span className='text-orange-500 font-semibold text-sm'>59 XP</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
                type="linear"
                dataKey="xp"
                stroke="#F97316"
                strokeWidth={2}
                dot={{ r: 3, fill: '#f97316' }}
            />
            </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


export default PetStat
