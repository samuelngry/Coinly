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

  const handleOpen = () => setOpen((cur) => !cur);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(newName);
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
          handler={handleOpen}
          className='bg-transparent shadow-none inset-0 flex items-center justify-center'
        > 
          <Card className='mx-auto w-full max-w-[24rem]'>
            <CardBody className='flex flex-col gap-4'>
              <Typography variant="h4" color="blue-gray">
                Edit Pet Name
              </Typography>
              <Typography className='-mb-2' variant='h6'>
                Your Pet Name
              </Typography>
              <Input 
                size='lg'
                label='Pet Name'
                value={newName} 
                onChange={handleNameChange} 
              />
            </CardBody>
            <CardFooter className='pt-0'>
              <Button 
                variant='gradient' 
                onClick={handleSubmit} 
                fullWidth
                className='bg-orange-500 hover:bg-orange-600 text-white'>
                Confirm
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
    </div>
  )
}

export default PetName
