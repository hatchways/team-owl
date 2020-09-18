import React, { useContext, useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import UserContext from '../context/UserContext';

export default function Toast(props) {
  const context = useContext(UserContext);
  let [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(context.state.toast.open);
  }, [context.state.toast]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => {
        setOpen(false);
      }}
    >
      <MuiAlert severity="error" variant="filled" elevation={6}>
        {context.state.toast.message}
      </MuiAlert>
    </Snackbar>
  );
}
