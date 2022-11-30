import React, { useEffect, useState } from 'react';
import { getPost } from '../api/posts';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import CardPost from '../components/CardPost';
import HeaderCard from '../components/HeaderCard';
import Stack from '@mui/material/Stack';
import Logo from '../components/Logo';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/users';
import NavBar from '../components/NavBar';
import { getComments } from '../api/comments';
import CardComment from '../components/CardComment';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';
import AddCommentDialog from '../components/AddCommentDialog';

const PostDetail = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const { postId } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    getPost(postId, controller).then((d) => {
      setPost(d.data);
      getUser(d.data.userId, controller).then((d) => setUser(d.data));
    });
    getComments(postId, controller).then((d) => setComments(d.data));

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='flex-start'
        style={{ minHeight: '100vh' }}
      >
        <Stack direction='row' alignItems='center'>
          <Logo />
        </Stack>
        <Divider sx={{ width: 400, m: 0.5 }} orientation='horizontal' />
        <NavBar currentTab={'/posts'} />
        <Grid item xs={3}>
          <HeaderCard title={'Post'} withAction={false} />
          <List
            sx={{
              width: '100%',
              maxWidth: 500,
              bgcolor: 'background.paper',
              overflow: 'auto',
            }}
          >
            <CardPost post={post} user={user} />
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems={'center'}
            >
              <Typography variant='body2'>Comments</Typography>
              <IconButton onClick={() => setOpen(true)}>
                <AddCircle />
              </IconButton>
            </Stack>
            {comments.length !== 0
              ? comments.map((c) => {
                  return (
                    <CardComment
                      key={`${c.email}-${c.name.replace(/ /g, '-')}`}
                      comment={c}
                    />
                  );
                })
              : 'Not Found'}
          </List>
        </Grid>
      </Grid>
      <AddCommentDialog
        onClose={() => setOpen(false)}
        open={open}
        postId={Number(postId)}
        setComments={setComments}
      />
    </>
  );
};

export default PostDetail;
