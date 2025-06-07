import Sidebar from '../sidebar/Sidebar'
import Dashboard from '../dashboard/Dashboard'
import BottomNavbar from '../sidebar/BottomNavbar'

const DashboardPage = () => {
  return (
    <>
      <div className='grid gap-4 lg:p-4 lg:grid-cols-[220px_1fr] min-h-screen bg-white'>
        <div className='hidden lg:block'>
          <Sidebar />
        </div>
        <Dashboard />
      </div>
      <BottomNavbar />
    </>
  )
}

export default DashboardPage