import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <div className='bg-neutral-100 py-20'>
        <div className='container mx-auto text-sm relative'>
            <div className='flex flex-col lg:flex-row justify-between items-center border-b border-neutral-500 pb-10'>
                <img className='w-15 h-15' src={logo} alt="logo" />
            </div>
            <div>
                <p className='text-center mt-6'>
                    &copy; {new Date().getFullYear()} Coinly. All rights reserved.
                </p>
            </div>
        </div>
    </div>
    
  )
}

export default Footer
