import Sidebar from '../sidebar/Sidebar'
import Dashboard from '../dashboard/Dashboard'

const DashboardPage = () => {
  return (
    <div className='grid gap-4 p-4 grid-cols-[220px_1fr] min-h-screen bg-white'>
      <Sidebar />
      <Dashboard />
    </div>
  )
}

export default DashboardPage