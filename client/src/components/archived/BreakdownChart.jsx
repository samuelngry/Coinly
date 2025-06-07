import React, { PureComponent } from 'react'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Food', value: 320 },
  { name: 'Transport', value: 150 },
  { name: 'Entertainment', value: 200 },
  { name: 'Shopping', value: 80 },
];

const COLORS = ['#34d399', '#60a5fa', '#a78bfa', '#f472b6'];

const BreakdownChart = () => {
  return (
    <div className="p-4 col-span-12 lg:col-span-6 rounded-2xl bg-white shadow">
      <h3>Total XP</h3>
      <div className='flex md:flex-row flex-col w-full'>
        <div className="w-full md:w-1/2 h-64">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={false}
                labelLine={false}
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
            </PieChart>
            </ResponsiveContainer>
        </div>

       <div className="w-full px-4 md:w-1/2 grid grid-cols-2 gap-x-4 gap-y-2 md:flex md:flex-col justify-items-center md:justify-center">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center mb-2 md:border-b md:border-stone-300 pb-2">
              <div
                className="w-4 h-4 rounded mr-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm">
                {entry.name}: {entry.value}
              </span>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BreakdownChart
