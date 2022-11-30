import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const CardComment = ({ comment }) => {
  return (
    <>
      <ListItem alignItems='flex-start'>
        <ListItemText
          primary={comment.email}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='body2'
                color='text.primary'
              >
                {comment?.body}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </>
  );
};

export default CardComment;
