import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useEditClient } from '../../hooks/useClientMutation';

export default function CancelationDialog({selectedClient}) {

  const [open, setOpen] = React.useState(false);

  const {mutateAsync}=useEditClient();
  const [buttonDisable,setButtondisable]=useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(selectedClient.name)
  };
  const handleCancelationProcess =  () => {
    mutateAsync({obj:{name:selectedClient.name,status:"Canceld"},path:"updateStatus"})
    setButtondisable(true)
  
  };


  return (
    <div  >
      <Button variant="contained" onClick={handleClickOpen} color='error' sx={{}}>
        <Typography component={'span'} variant='h5'>الغاء</Typography>
        
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
           <Typography component={'span'} variant="h4" sx={{fontWeight:"bold"}}>الغاء الاشتراك ؟ </Typography>
           <Typography component={'span'} variant="h4" sx={{fontWeight:"100px"}}>  سيتم الغاء الاشتراك لهذا المستخدم و سيتحتم عليك تفعيل اشتراك جديد في حال الالغاء</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button variant="contained"  color='error' disabled={buttonDisable} onClick={handleCancelationProcess}>
        <Typography component={'span'} variant='h5'>الغاء الاشتراك</Typography>
      </Button>
      <Button variant="outlined"  color='error' onClick={handleClose}>
        <Typography component={'span'} variant='h5'>الغاء </Typography>
      </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}