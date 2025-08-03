import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../layout/AppLayout'
import Dashboard from '../dashboard/Dashboard'

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
    <AppLayout>
      <Dashboard />
    </AppLayout>
  )
}

export default DashboardPage