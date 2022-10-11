import CloseIcon from '@mui/icons-material/Close';
import { Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import React from 'react';

export default function SnackBarNotification() {
  const [open, setOpen] = React.useState(true);
  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Snackbar
        open={open}
        //   onClose={(event, reason) => {
        //     // `reason === 'escapeKeyDown'` if `Escape` was pressed
        //     setOpen(false);
        //     // call `event.preventDefault` to only close one Snackbar at a time.
        //   }}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      />
      <Snackbar open={open} onClose={() => setOpen(false)} />
    </React.Fragment>
  );
}
