import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Search from '../components/Search';
import HeaderCard from '../components/HeaderCard';
import PaginationBar from '../components/PaginationBar';
import Stack from '@mui/material/Stack';
import Logo from '../components/Logo';
import CardUser from '../components/CardUser';
import { getUsers } from '../api/users';
import NavBar from '../components/NavBar';
import AddUserDialog from '../components/AddUserDialog';

const Users = () => {
  const [name, setName] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const currentTab = useLocation().pathname;
  useEffect(() => {
    const controller = new AbortController();
    getUsers(controller).then((d) => setUsers(d.data));

    return () => {
      controller.abort();
    };
  }, []);
  const userFiltered = users.filter((u) =>
    u.name.toLowerCase().includes(name.toLocaleLowerCase())
  );
  const limit = 5;
  const totalPage = Math.ceil(userFiltered.length / limit);
  const searchRef = useRef();
  const _page = Number(searchParams.get('_page'));
  const page =
    (_page > totalPage || _page <= 0 || isNaN(_page)) && !!totalPage
      ? 1
      : _page;
  const pages = useMemo(
    () => userFiltered.slice((page - 1) * limit, (page - 1) * limit + limit),
    [userFiltered, page]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(searchRef.current.value);
  };

  const handleInputChange = () => {
    if (searchRef.current.value === '') return setName('');
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
            placeholder='Search By Name'
          />
        </Stack>
        <Divider sx={{ width: 400, m: 0.5 }} orientation='horizontal' />
        <NavBar currentTab={currentTab} />
        <Grid item xs={3}>
          <HeaderCard
            title={'Users'}
            withAction={true}
            onClick={() => setOpen(true)}
          />
          <List
            sx={{
              width: '100%',
              maxWidth: 500,
              bgcolor: 'background.paper',
              maxHeight: '70vh',
              minHeight: 460,
              overflow: 'auto',
            }}
          >
            {pages.length !== 0
              ? pages.map((u) => {
                  return (
                    <CardUser
                      key={`${u.name.replace(/ /g, '-')}-${u.id}`}
                      user={u}
                    />
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
      <AddUserDialog
        onClose={() => setOpen(false)}
        open={open}
        setUsers={setUsers}
      />
    </>
  );
};

export default Users;
