import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import { useEditClient } from '../../hooks/useClientMutation';

export default function UnFreezeDialog({selectedClient}) {

  const [open, setOpen] = React.useState(false);
  const [buttonDisable,setButtondisable]=useState(false)
  const [open1,setOpen1]= React.useState(false)

  const {mutateAsync}=useEditClient();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(selectedClient.name)
  };

  const handleAlertClose=()=>{
    setOpen1(false)
  }

  const handleCancelationProcess = async () => {
    setButtondisable(true)
   await mutateAsync({obj:selectedClient.name,path:"unFreezSub"})
   setButtondisable(false)
   setOpen1(true)

   
  };


  return (
    <div  >
      <Button variant="contained" onClick={handleClickOpen} color='info' sx={{ }}>
        <Typography component={'span'} variant='h5'> تفعيل</Typography>
        
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" dir="rtl" display="flex" flexDirection="column">
           <Typography component={'span'} variant="h4" sx={{fontWeight:"bold"}}> فك التجميد ؟ </Typography>
           <Typography component={'span'} variant="h4" sx={{fontWeight:"100px"}}> سيتم اعادة تفعيل الاشتراك و اضافة ايام التجميد الى المشترك</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button variant="contained"  color='info' disabled={buttonDisable} onClick={handleCancelationProcess}>
        <Typography component={'span'} variant='h5'>تفعيل الاشتراك</Typography>
      </Button>
      <Button variant="outlined"  color='info' onClick={handleClose}>
        <Typography component={'span'} variant='h5'>الغاء </Typography>
      </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleAlertClose} sx={{ width: "300px" }} dir='ltr'>
        <Alert onClose={handleAlertClose} severity="info" sx={{ width: '100%' }}>
          تم ازالة التجميد !
        </Alert>
        </Snackbar>
    </div>
  );
}