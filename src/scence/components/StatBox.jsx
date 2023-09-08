import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase,type}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="fit-content" m="0 30px">
      <Box display="flex" justifyContent="" width="300px">
        <Box sx={{ml:"4px"}}>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{mt:"30px" ,mr:"10px"}}  >
          <ProgressCircle progress={progress} type={type}  />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="-2px" >
        <Typography variant="h3" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
  
      </Box>
    </Box>
  );
};

export default StatBox;