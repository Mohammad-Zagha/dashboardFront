import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography , Box, Snackbar, Alert } from '@mui/material';
import TextField from "@mui/material/TextField";
import { useEditClient } from '../../hooks/useClientMutation';

// ... (import statements)

export default function FrozenDialog({ selectedClient }) {
  const [open, setOpen] = React.useState(false);
  const { mutateAsync } = useEditClient();
  const [open1,setOpen1]= React.useState(false);
  const [open2,setOpen2]= React.useState(false);
  const [btnDis,setBtnDis]= React.useState(false);
  const [numberOfDays, setNumberOfDays] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleAlertClose = () => {
    setOpen1(false)
    setOpen2(false)
  };

  const handleFreezingSub = async () => {

    if (numberOfDays > 0) {
      setBtnDis(true);
      mutateAsync({
        obj: { name: selectedClient.name, frozenDays: numberOfDays },
        path: "freezSub"
      });
      setOpen2(true)
      setBtnDis(false)
    } else {
      setOpen1(true);
    }
  };

  return (
    <>
    <div>
      <Button variant="contained" onClick={handleClickOpen} color='info' sx={{}}>
        <Typography component={'span'} variant='h5'>تجميد</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            dir="rtl"
            display="flex"
            flexDirection="column"
          >
            <Typography component={'span'} variant="h4" sx={{ fontWeight: "bold" }}>تجميد الاشتراك ؟ </Typography>
            <Typography component={'span'} variant="h4" sx={{ fontWeight: "100px" }}> الرجاء اختيار عدد ايام تجميد الاشتراك</Typography>
          </DialogContentText>
          <Box dir="rtl">
            <TextField
              dir="rtl"
              sx={{ m: "10px 0px 10px 10px" }}
              id="standard-read-only-input"
              label="عدد الايام"
              value={numberOfDays}
              type="number"
              variant="filled"
              onChange={(event) => { setNumberOfDays(event.target.value) }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color='info'  disabled={btnDis} onClick={handleFreezingSub}>
            <Typography component={'span'} variant='h5'>تجميد الاشتراك</Typography>
          </Button>
          <Button variant="outlined" color='info' onClick={handleClose}>
            <Typography component={'span'} variant='h5'>الغاء</Typography>
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleAlertClose} sx={{ width: "300px" }} dir='ltr'>
       <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
            يجب اختيار عدد ايام مناسب
        </Alert>
    </Snackbar>
    <Snackbar open={open2} autoHideDuration={6000} onClose={handleAlertClose} sx={{ width: "300px" }} dir='ltr'>
       <Alert onClose={handleAlertClose} severity="info" sx={{ width: '100%' }}>
           !تم تجميد الاشتراك 
        </Alert>
    </Snackbar>
    </>
  );
}
