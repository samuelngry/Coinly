import React from 'react'
import Account from './Account'
import Search from './Search'

const Sidebar = () => {
  return (
    <div>
        <div className='overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]'>
            <Account />
            <Search />
        </div>

        {/* TODO: Plan Toggle */}
    </div>
  )
}

export default Sidebar
