import React from 'react'
import StatCards from './StatCards'
import ActivityGraph from './ActivityGraph'
import BreakdownChart from './BreakdownChart'
import QuestsTable from './QuestsTable'

const Grid = () => {
  return (
    <div className='px-4 grid gap-6 grid-cols-12'>
      <StatCards />
      <ActivityGraph />
      <BreakdownChart />
      <QuestsTable />
    </div>
  )
}

export default Grid
