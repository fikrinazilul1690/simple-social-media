import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';

const NavBar = ({ currentTab }) => {
  return (
    <Tabs value={currentTab}>
      <Tab label='Users' value='/users' to='/users' component={Link} />
      <Tab label='Posts' value='/posts' to='/posts' component={Link} />
      <Tab label='About' value='/about' to='/about' component={Link} />
    </Tabs>
  );
};

export default NavBar;
