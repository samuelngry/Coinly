import React from 'react'
import StatCards from './StatCards'
import ActivityGraph from './ActivityGraph'
import BreakdownChart from './BreakdownChart'
import QuestsTable from './QuestsTable'

const Grid = () => {
  return (
    <div className='px-4 grid grid-cols-12 gap-6 items-stretch'>
        <StatCards />
        <BreakdownChart />
        <ActivityGraph />
        <QuestsTable />
    </div>
  )
}

export default Grid
