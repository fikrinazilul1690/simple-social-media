import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { addComment } from '../api/comments';

const AddCommentDialog = ({ open, onClose, setComments, postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const handleSubmit = () => {
    addComment(name, email, postId, body).then((d) => {
      setComments((comments) => [...comments, d.data]);
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
            setName('');
            setBody('');
            setEmail('');
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCommentDialog;
