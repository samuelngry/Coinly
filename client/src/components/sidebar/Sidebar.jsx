import React from 'react'
import Account from './Account'

const Sidebar = () => {
  return (
    <div>
        <div className='overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]'>
            <Account />
        </div>

        {/* TODO: Plan Toggle */}
    </div>
  )
}

export default Sidebar
