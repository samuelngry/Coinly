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
          handler={handleClose}
        > 
          <Card className='mx-auto w-full max-w-[24rem] bg-gray-100 relative'>
            {/* Close button in top right */}
            <button 
              onClick={handleCancel}
              className='absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl font-bold z-10'>
              ×
            </button>
            
            <CardHeader className='mb-4 pt-6 pb-4 pl-2 bg-gray-100'>
              <Typography variant="h5" color="blue-gray" className='font-bold'>
                Edit Pet Name
              </Typography>
            </CardHeader>
            <CardBody className='flex flex-col gap-4 pt-0'>
              <Input 
                size='lg' 
                label="Pet Name"
                value={newName} 
                onChange={handleNameChange} 
                autoFocus 
                className='bg-white'
              />
            </CardBody>
            <CardFooter className='pt-0'>
              <Button 
                variant='filled' 
                onClick={handleSubmit} 
                fullWidth
                className='bg-blue-500 hover:bg-blue-600 text-white'>
                Confirm
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
    </div>
  )
}

export default PetName
