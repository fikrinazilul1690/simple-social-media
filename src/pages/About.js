import { Divider, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import CardMember from '../components/CardMember';
import Logo from '../components/Logo';
import NavBar from '../components/NavBar';

const About = () => {
  const currentTab = useLocation().pathname;

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
          <Stack
            direction='column'
            justifyContent='flex-start'
            alignItems='flex-start'
            spacing={0.5}
          >
            <Typography variant='h5' component='h5'>
              Simple Social Media
            </Typography>
            <span>By Kelompok 1</span>
          </Stack>
        </Stack>
        <Divider sx={{ width: 400, m: 0.5 }} orientation='horizontal' />
        <NavBar currentTab={currentTab} />
        <Grid
          container
          direction='row'
          justifyContent='space-evenly'
          alignItems='center'
          xs={6}
        >
          <CardMember
            member={{
              nama: 'Aldi Mulyawan',
              nim: '21120119120026',
              username: 'SMAMHTN',
            }}
          />
          <CardMember
            member={{
              nama: 'Achmad Nazilul Fikri',
              nim: '21120119130079',
              username: 'fikrinazilul1690',
            }}
          />
        </Grid>
        <Grid
          container
          direction='row'
          justifyContent='space-evenly'
          alignItems='center'
          xs={6}
        >
          <CardMember
            member={{
              nama: 'Muhammad Haikal Ash Shidqi',
              nim: '21120119130081',
              username: 'haikalkilkul',
            }}
          />
          <CardMember
            member={{
              nama: 'Abimanyu Putro Yulianto',
              nim: '21120119140120',
              username: 'abimanyupy',
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default About;
