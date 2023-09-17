import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
import DatePickerModifide from '../components/DatePicker'
import { Alert, Box,  IconButton,  Snackbar,  TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import Header from "../components/Header";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import dayjs from 'dayjs'
import * as Yup from 'yup';

import { useMutation, useQuery } from 'react-query';

import axios from 'axios';
import { useAddClient } from '../../hooks/useClientMutation';




export default function PopUp() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [date1,setDate1] = React.useState(new Date())
  const [date2,setDate2] = React.useState(new Date())
  const [subButtonFlag,setSubButtonFlag] = React.useState(false)
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);



  const fetchData = async () => {
    try {
      
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`, 
      };
  
      const response = await axios.get('https://13.49.44.225:4000/home/clients', {
        headers,
      });
  
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  

  
  const {isError,isSuccess,isLoading,data:clients,error} = useQuery(
    ["clients"],
    fetchData,
      {staleTime:Infinity}
  );


const {mutateAsync} = useAddClient();



  const callBackfun1= (date) =>{
    setDate1(date.toDate())
    
  }
  const callBackfun2= (date) =>{
    setDate2(date.toDate())
  }

   const handleFormSubmit = async(values) => {
    setSubButtonFlag(true);
    values.startDate=date1;
    values.endDate=date2;
        const day1=dayjs(date1);
        const day2=dayjs(date2);
        const today = dayjs(new Date());
        let diff=Math.floor(day2.diff(day1)/1000/60/60/24)

        if(diff>0)
        {
          const diff2=Math.floor(today.diff(day1)/1000/60/60/24)
          diff=diff-diff2
    const client={
      name:values.firstName,
      email:"test@gmail.com",
      age:"18",
      phoneNumber:"0000000000",
      weight:values.Weight,
      status:"Active",
      startDate:values.startDate,
      endDate:values.endDate,
      dateArray:[
        {startDate:values.startDate,
          endDate:values.endDate,
          price:values.price},

      ],
      daysLeft:`${diff}`,
      frozenDate: 0,
      

    }
    try{
    await  mutateAsync(client)
    setSubButtonFlag(false);
    }
    catch(err)
  {
      console.log(err)
      setSubButtonFlag(false);
  }
}
else{
setOpen2(true);
setSubButtonFlag(false);
}

 


   };
   

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
   
    
  };
const handleAlertClose=()=>{
  setOpen1(false)
}
const handleAlert2Close = () => {
  setOpen2(false);
};
  return (
   <>
    <Box>
      <IconButton  onClick={handleClickOpen} 
        style={{
            color: colors.grey[200],
            width:"fit-content",
            height:"fit-content",

          }}>
            
            {isNonMobile?  <Typography component={'span'}   sx={{mt:"12px",width:"fit-content"}}>اضافة مشترك جديد</Typography> : <PersonAddAlt1Icon></PersonAddAlt1Icon>}
       
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        dir="rtl"
      >
        <DialogTitle id="responsive-dialog-title">
          {"اضافة مشترك جديد"}
        </DialogTitle>
        <DialogContent>
        <Box m="20px" >
      <Header title="اضافة مشترك " subtitle=" اضافة مشترك نادي جديد !" />

      <Formik
    
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} >
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
             
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
               placeholder="الاسم الكامل"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 4" }}
               dir="rtl"
              />
          
               <TextField
                fullWidth
                variant="filled"
                type="number"
                placeholder="الوزن"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Weight}
                name="Weight"
                error={!!touched.Weight && !!errors.Weight}
                helperText={touched.Weight && errors.Weight}
                sx={{ gridColumn: "span 2" }}
                dir="rtl"
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                placeholder="السعر"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
                dir="rtl"
              />
     
                     <Box display="flex" justifyContent="space-around" sx={{gridColumn:"span 4"}}>
                        <Box  sx={{ gridColumn: "span 2" }} value={values.startDate}>
                            <Typography  component={'span'} variant="h4" sx={{m:"0px 10px 10px 10px"}}>تاريخ بداية الاشتراك</Typography>
                          
                            <DatePickerModifide name="startDate"
                              callBackfun={callBackfun1}
                              
                              />  
                                 
                        </Box>
                        <Box  sx={{ gridColumn: "span 2",  }}>
                            <Typography component={'span'} variant="h4" sx={{m:"0px 10px 10px 10px"}}>تاريخ نهاية الاشتراك</Typography>
                   
                            <DatePickerModifide name="endDate"
                                callBackfun={callBackfun2}
                                />  

                        </Box>
                    </Box>
                            
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button type="submit" color="secondary" variant="contained" disabled={subButtonFlag}>
                اضافة مشترك
              </Button>
           
            </Box>
          </form>
        )}
      </Formik>
    </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            الغاء
          </Button>
       
        </DialogActions>
      </Dialog>
    </Box>
    <Snackbar open={open1} autoHideDuration={6000} onClose={handleAlertClose} sx={{width:"300px"}} dir='ltr'>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
     تم اضافة المشترك !   
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

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('الرجاء إدخال الاسم الكامل'),
  Weight: Yup.number().required('الرجاء إدخال الوزن').positive('الوزن يجب أن يكون رقمًا موجبًا'),
  price: Yup.number().required('الرجاء إدخال السعر').positive('السعر يجب أن يكون رقمًا موجبًا'),
});


const initialValues = {
  firstName: "",
  Weight: "",
  price:"",
  startDate:new Date(),
  endDate:new Date(),
 
};
