import React from 'react'
import AppLayout from '../layout/AppLayout'
import Pet from '../../pet/Pet'

const PetPage = () => {
  return (
    <AppLayout className="bg-white">
      <Pet />
    </AppLayout>
  )
}

export default PetPage