import { BookOpen } from 'lucide-react';
import codeImg from '../assets/code.jpg';
import { playBookItems } from '../constants';

const Playbook = () => {
  return (
    <div className='mt-35'>
      <h2 className='text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide mb-10'>
        Your
        <strong className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            {" "}
            PlayBook
        </strong>
        </h2>
        <div className='flex flex-wrap justify-center'>
            <div className='p-2 w-full lg:w-1/2'>
                <img src={codeImg} alt="Code" className='rounded-lg shadow-lg' />
            </div>
            <div className='pt-12 w-full lg:w-1/2'>
                {playBookItems.map((item, index) => (
                    <div key={index} className='flex mb-12'>
                        <div className='text-orange-500 mx-6 h-10 w-10 p-2 justify-center items-center rounded-full'>
                            <BookOpen />
                        </div>
                        <div>
                            <h5 className='text-xl mt-1 mb-2'>{item.title}</h5>
                            <p className='text-md text-neutral-400'>{item.description}</p>
                        </div>                            
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Playbook
