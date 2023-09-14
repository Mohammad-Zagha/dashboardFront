import { Box, IconButton,  useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PopUp from "../components/PopUp"
import LogoutIcon from '@mui/icons-material/Logout';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";


const Topbar = () => {
  console.log("Rendering Topbar")
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate()



  const handleLogout =  () => {

    localStorage.removeItem("token");
  

    window.location.reload();
  };

  return (
 
    <Box display="flex"  flexDirection={isNonMobile?"row":"column"} p={2} dir="rtl" justifyContent="space-between">
     
        
      {/* ICONS */}
      <Box display="flex" gap="4px" sx={{margin:"5px auto" ,mr:"7px"}} >
          <PopUp/>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Box>
<Box sx={{ml:isNonMobile?"780px":"20px" , mr:isNonMobile?"20%":""}}> 
<SearchBar />
</Box>
     
    
    </Box>
  
  );
};

export default Topbar;