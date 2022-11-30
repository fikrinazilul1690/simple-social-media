import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { addPost } from '../api/posts';

const AddPostDialog = ({ open, onClose, setPosts, users }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(0);
  const handleSubmit = () => {
    addPost(title, body, userId).then((d) => {
      setPosts((posts) => [d.data, ...posts]);
    });
  };
  const handleChange = (e) => {
    setUserId(e.target.value);
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
        <FormControl fullWidth>
          <InputLabel id='user'>User</InputLabel>
          <Select
            value={userId}
            onChange={handleChange}
            label='User'
            labelId='user'
          >
            {users.map((user) => (
              <MenuItem value={user.id}>{user.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name='title'
          label='Title'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          name='body'
          label='Body'
          value={body}
          onChange={(event) => setBody(event.target.value)}
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={() => {
            handleSubmit();
            onClose();
            setTitle('');
            setBody('');
            setUserId(null);
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostDialog;
