import React from 'react'
import Account from './Account'
import Search from './Search'
import RouteSelect from './RouteSelect'
import SidebarFooter from './SidebarFooter'

const Sidebar = () => {
  return (
    <div>
        <div className='fixed left-4 top-4 h-screen w-56 flex flex-col'>
            <Account />
            <Search />
            <RouteSelect />
            <SidebarFooter />
        </div>
        

    </div>
  )
}

export default Sidebar
