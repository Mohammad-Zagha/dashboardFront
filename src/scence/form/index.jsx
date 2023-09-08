import { Alert, Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import React from "react";
import DatePickerModifide from "../components/DatePicker";
import { useQuery } from "react-query";
import axios from "axios";
import { useAddClient } from "../../hooks/useClientMutation";
import dayjs from "dayjs";



const fetchData= async()=>{
 
  console.log("Fetching")
  const response=await axios.get('/home/clients');

  if(response.statusText === "OK")
  {
    return response.data;
  }

}

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [subButtonFlag,setSubButtonFlag] = React.useState(false)
  const [date1,setDate1] = React.useState(new Date())
  const [date2,setDate2] = React.useState(new Date())
  const [open2, setOpen2] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  
  const {isError,isSuccess,isLoading,data:clients,error} = useQuery(
    ["clients"],
    fetchData,
      {staleTime:Infinity}
  );

  const {mutateAsync} = useAddClient();
  const handleFormSubmit = async(values) => {
    setSubButtonFlag(true);
     console.log("here")
    values.startDate=date1;
    values.endDate=date2;
        const day1=dayjs(date1);
        const day2=dayjs(date2);
        const diff=Math.floor(day2.diff(day1)/1000/60/60/24)

     if(diff>0)
     {
      const client={
        name:values.firstName,
        email:values.email,
        age:values.age,
        phoneNumber:values.contact,
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
       await mutateAsync(client)
       setOpen1(true)
       setSubButtonFlag(false);
      }catch(err)
      {
        console.log(err)
        
 
        setSubButtonFlag(false);
      }
  
     }
     else{
        setOpen2(true)
        setSubButtonFlag(false);
     }
    
  };

  const handleAlertClose = () => {
    setOpen2(false)
    setOpen1(false)
  };
  const handleAlert2Close = () => {
    setOpen2(false);
  };
  const callBackfun1= (date) =>{
    setDate1(date.toDate())
    
  }
  const callBackfun2= (date) =>{
    setDate2(date.toDate())
  }

  return (
    <Box m="20px" >
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
    
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 4" }}
               dir="rtl"
              />
          
              <TextField
                fullWidth
                variant="filled"
                type="text"
                placeholder="الايميل"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
                dir="rtl"
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                placeholder="رقم الهاتف"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 1" }}
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
                sx={{ gridColumn: "span 1" }}
                dir="rtl"
              />
     
                     <Box display="flex" justifyContent="space-around" sx={{gridColumn:"span 4"}}>
                        <Box  sx={{ gridColumn: "span 2" }} display="flex" flexDirection="column">
                            <Typography  component={'span'} variant="h4" sx={{m:"0px 10px 10px 10px"}}>تاريخ بداية الاشتراك</Typography>
                            <DatePickerModifide name="startDate"
                              callBackfun={callBackfun1}
                              
                              />  
                        </Box>
                        <Box  sx={{ gridColumn: "span 2" }}  display="flex" flexDirection="column">
                            <Typography  component={'span'} variant="h4" sx={{m:"0px 10px 10px 10px"}}>تاريخ نهاية الاشتراك</Typography>
                            <DatePickerModifide name="endDate"
                              callBackfun={callBackfun2}
                              
                              />  
                        </Box>
                    </Box>
                            
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" disabled={subButtonFlag}>
                اضافة مشترك
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleAlert2Close} sx={{ width: "300px" }} dir='ltr'>
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          يجب اختيار تاريخ اشتراك مناسب
          </Alert>
      </Snackbar>
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleAlert2Close} sx={{ width: "300px" }} dir='ltr'>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          تم اضافة الاشتراك بنجاح !
        </Alert>
        </Snackbar>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  email: yup.string().email("invalid email"),
  Weight: yup.number().required('الرجاء إدخال الوزن').positive('الوزن يجب أن يكون رقمًا موجبًا'),
  price: yup.number().required('الرجاء إدخال السعر').positive('السعر يجب أن يكون رقمًا موجبًا'),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),

});
const initialValues = {
  firstName: "",
  email: "",
  contact: "",
  Weight: "",
  address2: "",
  price:""
};

export default Form;