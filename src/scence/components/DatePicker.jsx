import * as React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';



dayjs.extend(utc);
dayjs.extend(timezone);


dayjs.tz.setDefault('America/New_York');



export default function DatePickerModifide({callBackfun}) {
  const [value, setValue] = React.useState(dayjs.utc(new Date()));
    const currentTimezone='UTC'
 
    
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
   
      
        <DatePicker format='YYYY/MM/DD'
          
          timezone={currentTimezone}
          value={value}
          onChange={(newValue)=> callBackfun(newValue)}
        />
     
    </LocalizationProvider>
  );
}