import logo from '../assets/logo.png'
import { resourcesLinks } from '../constants'

const Footer = () => {
  return (
    <div className='container mx-auto text-sm relative mt-20'>
        <div className='flex justify-between items-center'>
            <img className='w-15 h-15' src={logo} alt="logo" />
            <ul className='flex space-x-6'>
                {resourcesLinks.map((item,index) => (
                    <li key={index}>
                        <a href={item.href}>
                            <img src={item.image} alt={item.text} className='w-5 h-5' />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Footer
