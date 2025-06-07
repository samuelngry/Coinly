import React from 'react'
import TopBar from './TopBar'
import MainContent from './MainContent'

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: 'var(--old-lace)' }} className='rounded-lg shadow'>
        <TopBar />
        <MainContent /> 
    </div>
  )
}

export default Dashboard
