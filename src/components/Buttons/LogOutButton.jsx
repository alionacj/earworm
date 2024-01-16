import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';


function LogOutButton(props) {
  
  const dispatch = useDispatch();


  return (
    <Button
      onClick={() => dispatch({ type: 'LOGOUT' })}
      variant="contained"
      sx={{
        fontFamily: 'Retro-Gaming',
        display: 'block',
        width: 225,
        m: 1,
        mx: 'auto',
        bgcolor: '#427cf0'
      }}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
