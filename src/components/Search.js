import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

const Search = ({ onSubmit, inputChange, inputRef, placeholder }) => {
  return (
    <Paper
      component='form'
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        my: 2,
      }}
      onSubmit={onSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        type='form'
        placeholder={placeholder}
        inputProps={{ 'aria-label': `${placeholder.toLowerCase()}` }}
        inputRef={inputRef}
        onChange={inputChange}
      />
      <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
