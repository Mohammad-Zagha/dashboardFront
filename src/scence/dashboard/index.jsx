import { Box, Card, CardContent, CircularProgress, Grow, Typography, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import StatBox from "../components/StatBox"
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import PieChart from "../components/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from 'dayjs';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';


const fetchData = async () => {
  try {
    console.log("Fetching From Dashboard");
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


const Dashboard = () => {
  const Authdata = useContext(AuthContext)
  
  console.log("Rendering DashBaord")
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme=useTheme();
  const colors=tokens(theme.palette.mode);
  var tempActive=0;
  var tempEnded=0;
  var tempFrozen=0;
  var tempCanceld=0;
  var tempTotal =0;



  const [activeUsers,setActiveUsers]=useState(0);
  const [endedUsers,setEndedUsers]=useState(0);
  const [frozenUsers,setFrozenUsers]=useState(0);
  const [canceldUsers,setCanceldUsers]=useState(0);
  const [totalUsers,setTotalUsers]=useState(0);
  const [mostRecent,setMostRecent]= useState([]);




  
  const {isError,isSuccess,isLoading,data:clients,error} = useQuery(
    ["clients"],
    Authdata.loggedIn?fetchData:()=>null,
      {staleTime:Infinity}
  );

  const columns = [
    { field: 'name', headerName: 'الاسم', flex: 1 },
    { field: 'daysLeft', headerName: 'الايام المتبقية', flex: 1 },
    {field:"status",headerName:"الحالة", flex:1, renderCell:({row :{status}})=>{
     
      return(
        
            
        
        <Box
        width="60%"
        p="5px"
        display="flex"
        justifyContent="center"
        backgroundColor={status === "Active"?"yellow":colors.redAccent[500]}
        >
         <Typography color={colors.grey[800]}>  {status === "Active"?"فعال":status ==="Frozen"?"مجمد":status === "Canceld"?"ملغي":"منتهي" }</Typography>
          
        </Box>
      )
    }},
    
  ];
 
  useEffect(()=>{
      clients?.forEach((client)=>{
          if(client.status === 'Active')
          {
            tempActive+=1;
          }
          if(client.status === 'Ended')
          {
            tempEnded+=1;
          }
          if(client.status === 'Frozen')
          {
            tempFrozen+=1;
          }
          if(client.status === 'Canceld')
          {
            tempCanceld+=1;
          }
            tempTotal+=1;
      })
      
      setActiveUsers(tempActive)
      setEndedUsers(tempEnded)
      setFrozenUsers(tempFrozen)
      setCanceldUsers(tempCanceld)
      setTotalUsers(tempTotal)
     
 
  },[clients])


  if(isLoading)
  {
    return(
    
      <><CircularProgress /></>
   
    )
  }
  
  else if(isSuccess) {
 
  }

  clients?.map((client,index)=>{
    
    client['id']=`${index}`
    delete client['_id']
    var d=dayjs(client['startDate'])
    client['startDate']=d.format("YYYY/MM/DD")
     d=dayjs(client['endDate'])
    client['endDate']=d.format("YYYY/MM/DD")
    })
  
  return (
    
    <>
     
    <Box m="20px" display="flex" justifyContent="center"  flexDirection={isNonMobile?"row":"column"} gap={1} >
      
      <Box width="280px" >
      <Grow in={!isLoading}>
          <Card sx={{  backgroundColor:colors.primary[400]}}>
          <CardContent>
           
               <Box display="flex" flexDirection="column" gap={1}>
                {/* <PersonAddAltOutlinedIcon  color="success" fontSize="large"></PersonAddAltOutlinedIcon>
                  <Typography fontSize="30px" sx={{color:colors.greenAccent[300]}} >{activeUsers}</Typography> */}
                         <StatBox
            title="عدد الاشتراكات الفعالة "
            subtitle={activeUsers}
            progress={activeUsers/totalUsers}
            type="Active"    
            icon={<PersonAddAltOutlinedIcon  color="success" fontSize="large"></PersonAddAltOutlinedIcon>}
          />
               </Box>
           
          </CardContent>
          
       </Card>
       </Grow>
    </Box>
    
    <Box width="280px">
    <Grow in={!isLoading}> 
          <Card sx={{  backgroundColor:colors.primary[400]}}>

          <CardContent>
         
      <Box display="flex" flexDirection="column" gap={1}>
                {/* <PersonRemoveAlt1OutlinedIcon  color="error" fontSize="large"></PersonRemoveAlt1OutlinedIcon>
                  <Typography fontSize="30px" sx={{color:colors.redAccent[500]}} ></Typography> */}
                     <StatBox
            title="عدد الاشتراكات المنتهية"
            subtitle={endedUsers}
            progress={endedUsers/totalUsers}  
            type="Ended"    
            icon={<PersonRemoveAlt1OutlinedIcon  color="error" fontSize="large"></PersonRemoveAlt1OutlinedIcon>}
          />
               </Box>
          
          </CardContent>
        
    </Card>
    </Grow>
    </Box>
    <Box width="280px">
    <Grow in={!isLoading}> 
    <Card sx={{  backgroundColor:colors.primary[400]}}>
          <CardContent>
         
        
            <Box display="flex" flexDirection="column" gap={1}>
                {/* <PersonRemoveAlt1OutlinedIcon  color="error" fontSize="large"></PersonRemoveAlt1OutlinedIcon>
                  <Typography fontSize="30px" sx={{color:colors.redAccent[500]}} ></Typography> */}
                     <StatBox
            title="عدد الاشتراكات المجمدة"
            subtitle={frozenUsers}
            progress={frozenUsers/totalUsers}  
            type="Frozen"    
            icon={<AcUnitOutlinedIcon  color="info" fontSize="large"></AcUnitOutlinedIcon>}
          />
               </Box>
           
          </CardContent>
        
    </Card>
    </Grow>
    </Box>
    <Box width="280px">
    <Grow in={!isLoading}> 
    <Card sx={{  backgroundColor:colors.primary[400]}}>
          <CardContent>
         
        
            <Box display="flex" flexDirection="column" gap={1}>
                {/* <PersonRemoveAlt1OutlinedIcon  color="error" fontSize="large"></PersonRemoveAlt1OutlinedIcon>
                  <Typography fontSize="30px" sx={{color:colors.redAccent[500]}} ></Typography> */}
                     <StatBox
            title="عدد الاشتراكات الملغية"
            subtitle={canceldUsers}
            progress={canceldUsers/totalUsers}
            type="Canceld"    
            icon={<PersonOffOutlinedIcon  color="error" fontSize="large"></PersonOffOutlinedIcon>}
          />
               </Box>
           
          </CardContent>
        
    </Card>
    </Grow>
    </Box>
    <Box width="280px">
    <Grow in={!isLoading}> 
    <Card sx={{  backgroundColor:colors.primary[400]}}>
          <CardContent>
         
        
            <Box display="flex" flexDirection="column" gap={1}>
                {/* <PersonRemoveAlt1OutlinedIcon  color="error" fontSize="large"></PersonRemoveAlt1OutlinedIcon>
                  <Typography fontSize="30px" sx={{color:colors.redAccent[500]}} ></Typography> */}
                     <StatBox
            title="عدد الاشتراكات الكلي"
            subtitle={totalUsers}
            progress={totalUsers}  
            type="total"    
                  icon={<SubjectOutlinedIcon color="#FFD700" fontSize="large"></SubjectOutlinedIcon>}
          />
               </Box>
           
          </CardContent>
        
    </Card>
    </Grow>
    </Box>
 
    </Box>
   
    <Box display="flex" gap={2} justifyContent="center" flexDirection={isNonMobile?"row":"column"}>

    <Grow in={!isLoading}> 
        <Box width={isNonMobile?"600px":"300px"} height="300px" sx={{  backgroundColor:colors.primary[400] , borderRadius:"5px"  }}
          boxShadow= "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
        display="flex" >
        
          <Typography  variant="h3" fontFamily="sans-serif" marginRight="10px" >المشتركون</Typography>
          <Typography variant="h3" fontFamily="sans-serif" marginRight="10px" color="#66BB6A">+{totalUsers}</Typography>
          <PieChart isDashboard={true}/>
          
          </Box>
          </Grow>
          <Grow in={!isLoading}> 
      <Box width={isNonMobile?"400px":"300px"} sx={{borderRadius:"5px" , backgroundColor:colors.primary[400]}} 
         boxShadow= "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"> 
                    <Typography variant="h4" textAlign="center" color={colors.grey[100]} marginTop="4px"> اشتراكات شارفت على الانتهاء</Typography>
                    <DataGrid sx={{height:"90%"}}
                     rows={ clients?.filter(
                      (dataItem) => dataItem.daysLeft !== '0' && parseInt(dataItem.daysLeft) <= 5
                    )||[]}
                    columns={columns}
                    {...clients}
                    initialState={{
                      ...clients?.initialState,
                      pagination: { paginationModel: { pageSize: 3 } },
                    }}
                    pageSizeOptions={[3]}
      
                      />

      </Box>
      </Grow>
      <Grow in={!isLoading}> 
      <Box width={isNonMobile?"400px":"300px"} sx={{borderRadius:"5px" , backgroundColor:colors.primary[400]}} 
         boxShadow= "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"> 
                    <Typography variant="h4" textAlign="center" color={colors.grey[100]} marginTop="4px">    الاشتراكات المنتهية </Typography>
                    <DataGrid sx={{height:"90%"}}
                     rows={ clients?.filter(
                      (dataItem) => dataItem.status === 'Ended' 
                    )||[]}
                    columns={columns}
                    {...clients}
                    initialState={{
                      ...clients?.initialState,
                      pagination: { paginationModel: { pageSize: 3 } },
                    }}
                    pageSizeOptions={[3]}
      
                      />

      </Box>
      </Grow>
      </Box>
     
    </>
  
  )
};

export default Dashboard;