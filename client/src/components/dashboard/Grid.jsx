import React from 'react'
import StatCards from './StatCards'
import ActivityGraph from './ActivityGraph'
import BreakdownChart from './BreakdownChart'
import QuestsTable from './QuestsTable'

const Grid = () => {
  return (
    <div className='px-4 grid gap-6 lg:grid-cols-12 md:grid-cols-9 grid-cols-6'>
        <StatCards />
        <BreakdownChart />
        <ActivityGraph />
        <QuestsTable />
    </div>
  )
}

export default Grid
