import React, { PureComponent } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'M', xp: 120 },
  { name: 'T', xp: 98 },
  { name: 'W', xp: 150 },
  { name: 'T', xp: 200 },
  { name: 'F', xp: 170 },
  { name: 'S', xp: 90 },
  { name: 'S', xp: 130 },
];

const ActivityGraph = () => {
  return (
    <div className='p-4 col-span-12 lg:col-span-6 rounded-2xl bg-white shadow'>
        <div className='flex items-start justify-between'>
            <h3>Weekly Progress</h3>
        </div>
        <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="linear" dataKey="xp" stroke="#1CB0F6" dot={{ r: 4, fill: '#1CB0F6', stroke: '#1CB0F6' }} activeDot={{ r: 6, fill: '#1CB0F6', stroke: '#1CB0F6' }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default ActivityGraph
