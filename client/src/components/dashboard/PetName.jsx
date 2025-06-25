import React, { useState } from 'react'
import EditIcon from '../../assets/edit.png'
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  DialogBackdrop,
} from "@material-tailwind/react";

const PetName = ({ name, onComplete }) => {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleOpen = () => setOpen(true);
  const handleClose = () =>setOpen(false);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(newName);
    setOpen(false);
  }

  const handleCancel = () => {
    setNewName(name);
    setOpen(false);
  }

  return (
    <div className='px-3 py-1 flex items-center justify-center gap-2'>
        <h2 className='lg:text-lg'>{name}</h2>
        <button onClick={handleOpen} >
          <img src={EditIcon} alt='Edit' className='w-3.5 h-3.5'/>
        </button>

        {/* Dialog for editing pet name */}
        <Dialog 
          size='xs'
          open={open}
          onClose={handleCancel}
          handler={handleOpen}
          className='flex justify-center items-center'>
        <Card className='mx-auto w-full max-w-[24rem]'>
          <CardHeader className='text-center'>
            <Typography className='text-sm font-bold p-2'>
              Edit Pet Name
            </Typography>
          </CardHeader>
          <Input size='lg' value={newName} onChange={handleNameChange} className='border border-gray-300 rounded-lg' autoFocus />
          <CardFooter className='flex justify-between gap-2 p-4'>
            <Button variant='gradient' onClick={handleSubmit} className='bg-orange-500 hover:bg-orange-800 text-white' fullWidth>
              Confirm
            </Button>
            <Button variant="text" onClick={handleCancel} fullWidth className="mt-2">
                Cancel
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  )
}

export default PetName
