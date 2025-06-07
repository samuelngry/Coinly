import Sidebar from '../sidebar/Sidebar'
import BottomNavbar from '../sidebar/BottomNavbar'
import Quests from '../quests/Quests'

const DashboardPage = () => {
  return (
    <>
      <div className='grid gap-4 p-4 lg:grid-cols-[220px_1fr] min-h-screen bg-white'>
        <div className='hidden lg:block'>
          <Sidebar />
        </div>
        <Quests />
      </div>
      <BottomNavbar />
    </>
  )
}

export default DashboardPage