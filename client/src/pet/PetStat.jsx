import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { PawPrint } from 'lucide-react';

function useResponsiveHeight() {
  const [height, setHeight] = React.useState(window.innerWidth >= 768 ? 450 : 200);

  React.useEffect(() => {
    function handleResize() {
      setHeight(window.innerWidth >= 768 ? 450 : 200);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return height;
}

const PetStat = ({ data, total }) => {
  const chartHeight = useResponsiveHeight();
  return (
    <div className='mx-auto'>
      <h2 className='mb-2 md:text-xl md:hidden'>Weekly Progress</h2>
      <div className='border border-neutral-300 shadow-lg bg-white rounded-2xl'>
        <div className='flex justify-between mx-6.5 my-2'>
            <div className='flex items-center gap-1'>
                <div className='w-2 h-2 rounded-full bg-orange-500'></div>
                <span className='text-orange-500 font-semibold text-xs md:text-base'>Total</span>
            </div>
            <div className='flex items-center gap-1'>
                <span className='text-orange-500 font-semibold text-sm md:text-lg'>{total}</span>
                <PawPrint alt='Paw' className='w-4 h-4 md:w-5 md:h-5 text-orange-500'/>
            </div>
        </div>
        <div className='flex justify-center items-center mt-3'>
            <ResponsiveContainer width="100%" height={chartHeight}>
                <LineChart data={data} margin={{ right: 30}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Line
                    type="linear"
                    dataKey="xp"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#f97316' }}
                />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};


export default PetStat
