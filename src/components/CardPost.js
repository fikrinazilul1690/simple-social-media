import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const CardPost = ({ post, user }) => {
  return (
    <>
      <ListItemAvatar>
        <Avatar
          alt='Remy Sharp'
          src={`https://robohash.org/${user?.id}?set=set2&size=180x180`}
        />
      </ListItemAvatar>
      <ListItemText
        primary={post?.title}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component='span'
              variant='body2'
              color='text.primary'
            >
              {user?.name} {' - '}
            </Typography>
            {post?.body}
          </React.Fragment>
        }
      />
    </>
  );
};

export default CardPost;
