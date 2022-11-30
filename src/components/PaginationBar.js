import React from 'react';
import Pagination from '@mui/material/Pagination';

const PaginationBar = ({ totalPage, onChange, page }) => {
  return <Pagination count={totalPage} onChange={onChange} page={page} />;
};

export default PaginationBar;
