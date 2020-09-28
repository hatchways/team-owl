import React, { useState, useEffect, useContext } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { ContestContext } from '../../context/ContestContext';

function Alert() {
  const context = useContext(ContestContext);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(context.state.toast.open);
  }, [context.state.toast]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
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

export default Alert;
