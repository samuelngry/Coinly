import React, { PureComponent } from 'react'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Food', value: 320 },
  { name: 'Transport', value: 150 },
  { name: 'Entertainment', value: 200 },
  { name: 'Shopping', value: 80 },
];

const COLORS = ['#facc15', '#f97316', '#60a5fa', '#34d399'];

const BreakdownChart = () => {
  return (
    <div className="p-4 col-span-6 rounded-2xl bg-white shadow">
      <h3>Total XP</h3>
      <div className='flex w-full h-64'>
        <div className="w-1/2">
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

       <div className="w-1/2 flex flex-col justify-center">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center mb-4">
              <div
                className="w-4 h-4 rounded mr-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-gray-700">
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
