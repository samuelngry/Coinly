import React from 'react'
import StatCards from './StatCards'
import PetWidget from './PetWidget'

const Grid = () => {
  return (
    <div className='px-4 grid gap-6 grid-cols-12'>
      <StatCards />
      <PetWidget />
    </div>
  )
}

export default Grid
