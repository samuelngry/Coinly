import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', xp: 120 },
  { name: 'Tue', xp: 98 },
  { name: 'Wed', xp: 150 },
  { name: 'Thu', xp: 200 },
  { name: 'Fri', xp: 170 },
  { name: 'Sat', xp: 90 },
  { name: 'Sun', xp: 130 },
];

const ActivityGraph = () => {
  return (
    <div className='p-4 col-span-6 rounded-2xl bg-white shadow'>
        <div className='flex items-start justify-between'>
            <h3>XP Progress</h3>
        </div>
        <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip cursor={{ fill: '#fef9c3' }} />
                    <Bar
                        dataKey='xp'
                        radius={[12, 12, 0, 0]}
                        isAnimationActive={true}
                        animationDuration={800}
                        animationEasing='ease-in-out'
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.name === 'Sun' ? '#f97316' : '#facc15'}
                            />
                        ))}
                    </Bar>                
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default ActivityGraph
