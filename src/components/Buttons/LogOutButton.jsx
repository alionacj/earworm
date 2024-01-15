import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';


function LogOutButton(props) {
  
  const dispatch = useDispatch();


  return (
    <Button
    sx={{fontFamily: 'Retro-Gaming'}}
      variant="contained"
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props

      // I think I can get rid of this? ^
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
