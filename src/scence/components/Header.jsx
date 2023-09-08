import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px" sx={{mb:"3px"}}>
      <Typography
      component={'span'}
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0px 11px 0px 0px" }}
      >
        {title}
      </Typography>
      <Box>
   
      <Typography variant="h5" color={colors.greenAccent[400]} component={'span'} >
        {subtitle}
      </Typography>
           
      </Box>
    </Box>
  );
};

export default Header;