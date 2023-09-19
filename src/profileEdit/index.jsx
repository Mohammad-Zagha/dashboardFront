import { Box, Button, IconButton, Skeleton, TextField,Typography,useMediaQuery } from '@mui/material';
import React, {  useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Header from '../scence/components/Header';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';
import { DataGrid  } from '@mui/x-data-grid';
import CancelationDialog from '../scence/components/CancelationDialog';
import FrozenDialog from '../scence/components/FrozenDialog';
import UnFreezeDialog from '../scence/components/UnFreezeDialog';
import ActivateDialog from '../scence/components/ActivateDialog';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import axios from 'axios';
import { findAllByDisplayValue } from '@testing-library/react';
import { useEditClient } from '../hooks/useClientMutation';
const fetchData= async()=>{
 
  console.log("Fetching")
  const response=await axios.get('https://app.gymadmindash.site/home/clients');

  if(response.statusText === "OK")
  {
    return response.data;
  }

}



function ProfileEdit() {
  const location = useLocation();
  const selectedClientLocation = location.state?.selectedClient;
  const [selectedClient, setSelectedClient] = useState(selectedClientLocation);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme=useTheme();
  const colors=tokens(theme.palette.mode);
  const [edit,setEdit]=useState(false)
  const [name,setName]=useState("")
  const [phone,setPhone]=useState("")
  const [weight,setWeight]=useState("")
  const [email,setEmail]=useState("")
  const [errorF, setErrorF] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [loading, setLoading] = useState(false);


  const {isError,isSuccess,isLoading,data:clients,error} = useQuery(
    ["clients"],
    fetchData,
      {staleTime:Infinity}
      
  );

  const { mutateAsync } = useEditClient();

  const columns = [
    {field:"id",headerName:"ID"},
    {field:"startDate",headerName:"StartDate"},
    {field:"endDate",headerName:"EndDate"},
 ]
    selectedClient?.dateArray.map((date,index)=>{
      date['id']=`${index}`
      delete date['_id']
      var d=dayjs(date['startDate'])
      date['startDate']=d.format("YYYY/MM/DD")
       d=dayjs(date['endDate'])
      date['endDate']=d.format("YYYY/MM/DD")
      })
    
      useEffect(()=>{
          setSelectedClient(selectedClientLocation)
            setEdit(false)
      },[selectedClientLocation ])
      useEffect(()=>{
        clients?.forEach((client)=>{
          if(selectedClient?.name === client.name)
          {
            setSelectedClient(client)
            
          }
        })
         
    },[clients ])

const handleNameChangeCheck = ()=>{
  setErrorName(false)
  if(name === "")
  {
    return;
  }
  else{
    clients?.forEach((client)=>{
        if(client.name === name)
        {
          setErrorName(true)
          return;
        }
        
    })
  }

}
const handleWeightChange = (event) => {
  const inputValue = event.target.value;
  if (inputValue === '' || parseFloat(inputValue) > 0) {
    setWeight(inputValue);
    setErrorF(false); // Clear error if input is valid
  } else {
    setErrorF(true); // Set error if input is not valid
  }
};


const handleUserChange = async()=>{
  setLoading(true);
  const updatedClient = {
    ...selectedClient,
    name: name !== "" ? name : selectedClient.name,
    phoneNumber: phone!== ""? phone:selectedClient.phoneNumber,
    weight: weight !== "" ? parseFloat(weight) : selectedClient.weight,
    email: email !== "" ? email : selectedClient.email,
  };


  try {
    await mutateAsync({ obj: updatedClient, path: "updateClientByName" })
      .then()
      {
          setLoading(false)
          window.location.reload();
      }

    
  } catch (error) {
    // Handle network or other errors
    console.error('An error occurred:', error);
  }
  
}



const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const emailRegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    <>
     <Box textAlign="center">
      {selectedClient? <> 
      <Box display="flex" gap={1} justifyContent="center" >
        <Header title={selectedClient.name}/>
        <IconButton aria-label="EDIT" onClick={()=>{setEdit(!edit)}}>
          <ModeEditOutlinedIcon />
        </IconButton>
      </Box>
      <Box >
        
     
        <Box
        margin="0px auto"
        width="50px"
        
        display="flex"
        justifyContent="center"
        backgroundColor={
          selectedClient.status==="Active" ? colors.greenAccent[400] : selectedClient.status==="Frozen" ? colors.blueAccent[600] :selectedClient.status==="Canceld"? colors.redAccent[700] :  colors.redAccent[500]
        }
        >
   {selectedClient.status === "Active"?"فعال":selectedClient.status ==="Frozen"?"مجمد":selectedClient.status === "Canceld"?"ملغي":"منتهي" }
          
        </Box>
        <Typography color={selectedClient.status === "Active"?colors.greenAccent[400]:selectedClient.status === "Frozen"?colors.blueAccent[300]:selectedClient.status === "Ended"?colors.redAccent[400]:colors.grey[100]}>{selectedClient.daysLeft}</Typography>
        </Box>
      <Box width="50%" margin="10px auto">
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
                variant="outlined"
                type="text"
               placeholder={selectedClient.name}
                onBlur={()=>{handleNameChangeCheck()}}
               disabled={true}
               onChange={(event)=>{setName(event.target.value); }}
               value={name}
               error={errorName} // Set the error state of the TextField
                helperText={errorName? "الاسم مستخدم" : ""}
                sx={{ gridColumn: "span 2" }}
               dir="rtl"
              />
          <TextField
                onChange={handleWeightChange}
                value={weight}
                fullWidth
                variant="outlined"
                type="number"
                placeholder={selectedClient.weight}
                disabled={!edit}
                sx={{ gridColumn: "span 2" }}
                dir="rtl"
                error={errorF} // Set the error state of the TextField
                helperText={errorF? "Please enter a positive number" : ""}
              />
        <TextField
               onChange={(event)=>{setPhone(event.target.value); }}
              onBlur={()=>{setErrorPhone(!phoneRegExp.test(phone)); if(phone === ""){setErrorPhone(false)}}} // Validate on blur
              value={phone}
              fullWidth
              variant="outlined"
              placeholder={selectedClient.phoneNumber}
              disabled={!edit}
              sx={{ gridColumn: "span 2" }}
              dir="rtl"
              error={errorPhone}
              helperText={errorPhone ? "Please enter a valid phone number" : ""}
            />
               <TextField
                  onChange={(event)=>{setEmail(event.target.value); }}
                  onBlur={()=>{ setErrorEmail(!emailRegExp.test(email)); if(email === ""){setErrorEmail(false)}}} // Validate on blur
                  value={email}
                  fullWidth
                  variant="outlined"
                  type="text"
                  placeholder={selectedClient.email}
                  disabled={!edit}
                  sx={{ gridColumn: "span 2" }}
                  dir="rtl"
                  error={errorEmail}
                  helperText={errorEmail ? "Please enter a valid email address" : ""}
                />
     
            </Box>
            
          </Box> 
          

          
            <Box display="flex"   gap={2} justifyContent="center" alignItems="center" >
            <LoadingButton variant="contained" color='warning'  loading={loading}onClick={()=>{handleUserChange()}} disabled={(name === "" && phone === "" && email === "" && weight === "") || (errorPhone || errorF || errorEmail|| errorName)}>
                 <Typography component={'span'} variant='h5'>تطبيق التعديلات</Typography>
            </LoadingButton>
              {selectedClient? 
                selectedClient.status=== "Active" ? <><CancelationDialog selectedClient={selectedClient}></CancelationDialog> <FrozenDialog selectedClient={selectedClient} ></FrozenDialog> </>:  selectedClient.status=== "Ended" ? <ActivateDialog selectedClient={selectedClient}></ActivateDialog> : selectedClient.status=== "Frozen" ? <><CancelationDialog selectedClient={selectedClient}></CancelationDialog> <UnFreezeDialog selectedClient={selectedClient}></UnFreezeDialog> </> : <ActivateDialog selectedClient={selectedClient}>
                </ActivateDialog>
                
              :<></>}

            </Box>
         
          <Box width={isNonMobile?"500px":"300px"} overflow="hidden" margin="15px auto">
          <DataGrid
      
      rows={selectedClient.dateArray}
      columns={columns}
      
      
      />
      </Box>
          </> 
      
      :<Box width="250px" margin=" 10% auto" dir="ltr">
        <Header title="الرجاء اختيار اسم المشترك من القائمة" subtitle="ستظهر المعلومات في حال الاختيار " ></Header>
        <Skeleton variant="text" sx={{ fontSize: '1rem',backgroundColor:colors.grey[200] }}  />
      <Skeleton variant="circular" width={40} height={40} sx={{backgroundColor:colors.grey[200]}}/>
      <Skeleton variant="rounded" width={250} height={60} sx={{backgroundColor:colors.grey[200] , mb:"5px" }} />
      <Skeleton variant="rounded" width={250} height={60} sx={{backgroundColor:colors.grey[200]}} /></Box> }
      </Box>
         
      </>
  );
}

export default ProfileEdit;
