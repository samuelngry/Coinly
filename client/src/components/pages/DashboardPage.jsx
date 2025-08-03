import Sidebar from '../sidebar/Sidebar'
import Dashboard from '../dashboard/Dashboard'
import BottomNavbar from '../sidebar/BottomNavbar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
          const token = localStorage.getItem('token');
  
          if (!token) {
              navigate('/login');
              return;
          }
  
          const user = JSON.parse(localStorage.getItem('user'));
  
          if (user && user.onboarding_completed) {
              navigate('/dashboard');
          } else {
            navigate('/onboard');
          }
      }, [navigate])

  return (
    <>
      <div className='grid gap-4 lg:p-4 lg:grid-cols-[220px_1fr] min-h-screen'>
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