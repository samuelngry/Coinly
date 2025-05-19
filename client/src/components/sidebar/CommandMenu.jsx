import { Command } from 'cmdk'
import React from 'react'

const CommandMenu = ({ open, setOpen }) => {
    const [value, setValue] = React.useState('');

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Command.Dialog 
        open={open} 
        onOpenChange={setOpen} 
        label="Global Command Menu"
        className='fixed inset-0 bg-stone-950/50'
        onClick={() => setOpen(false)}
    >
        <div
            onClick={(e) => e.stopPropagation()} 
            className='bg-white rounded-lg shadow-xl border-stone-300 border overflow-hidden w-full max-w-lg mx-auto mt-12'
        >
        <Command.Input
            value={value}
            onValueChange={setValue} 
            placeholder='Search'
            className='relative border-b border-stone-300 p-3 text-lg w-full placeholder:text-stone-400 focus:outline-none focus:ring-0 focus:border-stone-500'
        />
        <Command.List className='p-3'>
            <Command.Empty>
                No results found for {" "}
                <span className='text-orange-500'>{value}</span>
            </Command.Empty>
        
            <Command.Group heading="Letters">
            <Command.Item>a</Command.Item>
            <Command.Item>b</Command.Item>
            <Command.Separator />
            <Command.Item>c</Command.Item>
            </Command.Group>

            <Command.Item>Apple</Command.Item>
        </Command.List>
        </div>
        </Command.Dialog>
    )
}


export default CommandMenu