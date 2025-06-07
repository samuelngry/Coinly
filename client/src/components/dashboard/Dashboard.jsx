import React from 'react'
import TopBar from '../archived/TopBar'
import MainContent from '../archived/MainContent'

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: 'var(--old-lace)' }} className='rounded-lg shadow'>
        <TopBar />
        <MainContent /> 
    </div>
  )
}

export default Dashboard
