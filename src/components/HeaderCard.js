import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';

const HeaderCard = ({ title, withAction, onClick }) => {
  return (
    <Stack direction='row' justifyContent='space-between'>
      <Typography variant='h4'>{title}</Typography>
      {!!withAction && (
        <IconButton onClick={onClick}>
          <AddCircle />
        </IconButton>
      )}
    </Stack>
  );
};

export default HeaderCard;
