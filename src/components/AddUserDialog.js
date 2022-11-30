import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { addUser } from '../api/users';

const AddUserDialog = ({ open, onClose, setUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = () => {
    addUser(name, email).then((d) => {
      setUsers((users) => [...users, d.data]);
    });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add user</DialogTitle>
      <DialogContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.5rem',
          padding: '8px 20px',
        }}
      >
        <TextField
          name='name'
          label='Name'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          name='email'
          label='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={() => {
            handleSubmit();
            onClose();
            setName('');
            setEmail('');
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
