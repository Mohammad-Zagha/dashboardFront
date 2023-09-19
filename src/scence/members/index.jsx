import React from 'react'
import { Box, useMediaQuery} from '@mui/material'
import { DataGrid ,GridToolbar} from '@mui/x-data-grid';
import Header from '../components/Header';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { useQuery } from 'react-query';
import axios from 'axios';
import dayjs from 'dayjs';



const fetchData = async () => {
  try {
    console.log("Fetching From Members");
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`, 
    };

    const response = await axios.get('https://app.gymadmindash.site/home/clients', {
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


 function  Members() {
  console.log("Rendering Members")
  const {isError,isSuccess,isLoading,data:clients,error} = useQuery(
    ["clients"],
    fetchData,
      {staleTime:Infinity}
  );

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme=useTheme();
  const colors=tokens(theme.palette.mode);

  const columns = [
    {field:"id",headerName:"ID"},
    {field:"name",headerName:"الاسم",flex:1}, 
    {field:"email",headerName:"الايميل",flex:1},
    {field:"age",headerName:"العمر"},
    {field:"phoneNumber",headerName:"الرقم"},
    {field:"weight",headerName:"الوزن"},
    {field:"startDate",headerName:"تاريخ البداية"},
    {field:"endDate",headerName:"تاريخ النهاية"},
    {field:"daysLeft",headerName:"الايام المتبقية"},
    {field:"status",headerName:"الحالة", renderCell:({row :{status}})=>{
     
      return(
        <Box
        width="60%"
        p="5px"
        display="flex"
        justifyContent="center"
        backgroundColor={
          status==="Active" ? colors.greenAccent[400] : status==="Frozen" ? colors.blueAccent[600] :status==="Canceld"? colors.redAccent[700] :  colors.redAccent[500]
        }
        >
          {status === "Active"?"فعال":status ==="Frozen"?"مجمد":status === "Canceld"?"ملغي":"منتهي" }
          
        </Box>
      )
    }},
    
  ]
  const mobileColumns = [
    {field:"id",headerName:"ID"},
    {field:"name",headerName:"الاسم"}, 
    {field:"daysLeft",headerName:"الايام المتبقية"},
    {field:"status",headerName:"الحالة", renderCell:({row :{status}})=>{
     
      return(
        <Box
        width="60%"
        p="5px"
        display="flex"
        justifyContent="center"
        backgroundColor={
          status==="Active" ? colors.greenAccent[400] : status==="Frozen" ? colors.blueAccent[600] :status==="Canceld"? colors.redAccent[700] :  colors.redAccent[500]
        }
        >
          {status === "Active"?"فعال":status ==="Frozen"?"مجمد":status === "Canceld"?"ملغي":"منتهي" }
          
        </Box>
      )
    }},
    
  ]
  clients?.map((client,index)=>{
    client['id']=`${index}`
    delete client['_id']
    var d=dayjs(client['startDate'])
    client['startDate']=d.format("YYYY/MM/DD")
     d=dayjs(client['endDate'])
    client['endDate']=d.format("YYYY/MM/DD")
    })
  return (
  
   <Box m="10px" display="flex" flexDirection="column"  alignItems="center"> 
   
    <Header title="الاعضاء" subtitle="جدول الاعضاء"/>

    <Box
    m="10px 10px 0 10px"
    height="80vh"
    width="80vw"
    sx={{
      "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
        color:`${colors.grey[200]} !important` 
      },
      width:isNonMobile ?"90%":"280px"
    }}
    >
      <DataGrid
      rows={clients || []}
      columns={isNonMobile ? columns:mobileColumns}
      components={{toolbar: GridToolbar}}
      
      />
    </Box>
   </Box>
  )
}

export default Members