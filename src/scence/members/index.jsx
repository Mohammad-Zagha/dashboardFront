import React from 'react'
import { Box, useMediaQuery} from '@mui/material'
import { DataGrid ,GridToolbar} from '@mui/x-data-grid';
import Header from '../components/Header';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { useQuery } from 'react-query';
import axios from 'axios';
import dayjs from 'dayjs';

const fetchData= async()=>{
 
  console.log("Fetching")
  const response=await axios.get('/home/clients');

  if(response.statusText === "OK")
  {
    return response.data;
  }

}

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
    {field:"name",headerName:"Name",flex:1}, 
    {field:"email",headerName:"Email",flex:1},
    {field:"age",headerName:"Age"},
    {field:"phoneNumber",headerName:"Phone"},
    {field:"weight",headerName:"Weight"},
    {field:"startDate",headerName:"StartDate"},
    {field:"endDate",headerName:"EndDate"},
    {field:"daysLeft",headerName:"Days"},
    {field:"status",headerName:"Status", renderCell:({row :{status}})=>{
     
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
          {status}
          
        </Box>
      )
    }},
    
  ]
  const mobileColumns = [
    {field:"id",headerName:"ID"},
    {field:"name",headerName:"Name"}, 
    {field:"daysLeft",headerName:"Days"},
    {field:"status",headerName:"Status", renderCell:({row :{status}})=>{
     
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
          {status}
          
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
   
    <Header title="Members" subtitle="Members Table"/>

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