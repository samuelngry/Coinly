import { FiCommand, FiSearch } from 'react-icons/fi';
import React from 'react'
import CommandMenu from './CommandMenu';

const Search = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <div className="bg-stone-100 mb-4 relative rounded flex items-center px-2 py-1.5 text-sm">
                <FiSearch className='mr-2' />
                <input 
                    type='text'
                    placeholder='Search'
                    className='w-full pr-8 bg-transparent placeholder:text-stone-300 focus:outline-none'
                />

                <span className='absolute right-2 flex items-center text-xs gap-0.5 p-0.5 bg-white rounded'>
                    <FiCommand />K
                </span>
            </div>

            <CommandMenu open={open} setOpen={setOpen} />
            
        </>  
    )
}

export default Search
