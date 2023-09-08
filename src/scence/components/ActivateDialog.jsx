import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import DatePickerModifide from './DatePicker';
import { useEditClient } from '../../hooks/useClientMutation';
import dayjs from 'dayjs';

export default function ActivateDialog({ selectedClient }) {
  const [open, setOpen] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [buttonDisable, setButtonDisable] = useState(false);
  const [price, setPrice] = useState(0);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const { mutateAsync } = useEditClient();

  const callBackfun1 = (date) => {
    setDate1(date.toDate());
  };

  const callBackfun2 = (date) => {
    setDate2(date.toDate());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleActivationProcess = async() => {
    setButtonDisable(true);

    const day1 = dayjs(date1);
    const day2 = dayjs(date2);
    const diff = day2.diff(day1, 'day');

    if (diff > 0) {
      const dateObj = {
        startDate: date1,
        endDate: date2,
        price,
        name: selectedClient.name
      };
      try{
       await mutateAsync({ obj: dateObj, path: "addSub" });
       setButtonDisable(false);
      }catch(err)
      {

      }
    

      setOpen1(true);
      setButtonDisable(false);
    } else {
     setOpen2(true)
     setButtonDisable(false);
    }
  };

  const handleAlertClose = () => {
    setOpen1(false);
    setOpen2(false)
  };
  const handleAlert2Close = () => {
    setOpen2(false);
  };
  return (
    <>
      <Box>
        <Button variant="contained" onClick={handleClickOpen} color='success'>
          <Typography component={'span'} variant='h5'>تفعيل</Typography>
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle dir="rtl" id="alert-dialog-title">
            {"تاريخ اشتراك جديد"}
          </DialogTitle>
          <DialogContent dir="rtl">
            <DialogContentText id="alert-dialog-description">
            </DialogContentText>
            <Box display="flex" justifyContent="space-around">
              <DatePickerModifide name="startDate" callBackfun={callBackfun1} />
              <Box sx={{ m: 1 }}></Box>
              <DatePickerModifide name="endDate" callBackfun={callBackfun2} />
            </Box>
            <Box display="flex" justifyContent="center">
              <TextField
                sx={{ width: "80px" }}
                id="standard-read-only-input"
                label="السعر"
                type='number'
                variant="standard"
                value={price}
                onChange={(event) => { setPrice(event.target.value) }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color='error' onClick={handleClose}>
              <Typography component={'span'} variant='h5'>الغاء</Typography>
            </Button>
            <Button variant="contained" color='success' onClick={handleActivationProcess} disabled={buttonDisable}>
              <Typography component={'span'} variant='h5'>تفعيل اشتراك</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleAlertClose} sx={{ width: "300px" }} dir='ltr'>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          تم اضافة الاشتراك بنجاح !
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleAlert2Close} sx={{ width: "300px" }} dir='ltr'>
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          يجب اختيار تاريخ اشتراك مناسب
          </Alert>
      </Snackbar>
    </>
  );
}
