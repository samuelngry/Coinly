import React from 'react'
import TopBar from './TopBar'
import Grid from './Grid'

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: 'var(--old-lace)' }} className='rounded-lg shadow h-[200vh]'>
        <TopBar />
        <Grid /> 
    </div>
  )
}

export default Dashboard
