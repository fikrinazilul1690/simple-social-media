import React, { useEffect, useState, useRef } from 'react';
import { getPosts } from '../api/posts';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import CardPost from '../components/CardPost';
import Search from '../components/Search';
import HeaderCard from '../components/HeaderCard';
import PaginationBar from '../components/PaginationBar';
import Stack from '@mui/material/Stack';
import Logo from '../components/Logo';
import { useSearchParams, useLocation } from 'react-router-dom';
import { getUsers } from '../api/users';
import NavBar from '../components/NavBar';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import AddPostDialog from '../components/AddPostDialog';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = useLocation().pathname;
  const limit = 10;
  const totalPage = Math.ceil(posts.length / limit);
  const searchRef = useRef();
  const _page = Number(searchParams.get('_page'));
  const page =
    (_page > totalPage || _page <= 0 || isNaN(_page)) && !!totalPage
      ? 1
      : _page;

  useEffect(() => {
    const controller = new AbortController();
    getPosts(controller, title).then((d) => setPosts(d.data));
    getUsers(controller).then((d) => setUsers(d.data));

    return () => {
      controller.abort();
    };
  }, [title]);

  const pages = posts.slice((page - 1) * limit, (page - 1) * limit + limit);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle(searchRef.current.value);
  };

  const handleInputChange = () => {
    if (searchRef.current.value === '') return setTitle('');
  };

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
          <Search
            inputChange={handleInputChange}
            inputRef={searchRef}
            onSubmit={handleSubmit}
            placeholder='Search By Title'
          />
        </Stack>
        <Divider sx={{ width: 400, m: 0.5 }} orientation='horizontal' />
        <NavBar currentTab={currentTab} />
        <Grid item xs={3}>
          <HeaderCard
            title={'Posts'}
            withAction={true}
            onClick={() => setOpen(true)}
          />
          <List
            sx={{
              width: '100%',
              maxWidth: 500,
              bgcolor: 'background.paper',
              maxHeight: '70vh',
              minHeight: 500,
              overflow: 'auto',
            }}
          >
            {pages.length !== 0
              ? pages.map((p) => {
                  const user = users.filter((u) => u.id === p.userId);
                  return (
                    <ListItemButton
                      component={Link}
                      to={`${p?.id}`}
                      alignItems='flex-start'
                      key={`${p.title.replace(/ /g, '-')}`}
                    >
                      <CardPost post={p} user={user[0]} />
                    </ListItemButton>
                  );
                })
              : 'Not Found'}
          </List>
        </Grid>
        {!!pages.length && (
          <PaginationBar
            totalPage={totalPage}
            onChange={(event, value) => setSearchParams({ _page: value })}
            page={page}
          />
        )}
      </Grid>
      <AddPostDialog
        onClose={() => setOpen(false)}
        open={open}
        setPosts={setPosts}
        users={users}
      />
    </>
  );
};

export default Posts;
