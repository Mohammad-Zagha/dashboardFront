
import React, { useState } from 'react';
import { Autocomplete,  Stack, TextField } from '@mui/material';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
const fetchData= async()=>{
 
  console.log("Fetching")
  const response=await axios.get('/home/clients');

  if(response.statusText === "OK")
  {
    return response.data;
  }

}

function SearchBar() {
  const {isError,isSuccess,isLoading,data:clients,error} = useQuery(
    ["clients"],
    fetchData,
      {staleTime:Infinity}
  );
  console.log("Rendering SearchBar")
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate()




  const handleClientSelect = (event, newValue) => {
    setSelectedClient(newValue);
    console.log('Selected Client:', newValue);
    if (newValue) {
    
      navigate('/editSub', { state: { selectedClient: newValue } });
    }
  };

  return (
    <>
      <Stack sx={{ width: 250, margin: "5px auto" }}>
        <Autocomplete
          dir='rtl'
          options={clients||[]}
          getOptionLabel={(option) => option.name} // Display the "name" field
          value={selectedClient} // Set the selected value
          onChange={handleClientSelect} // Add the event handler
          renderInput={(params) => <TextField {...params} label="Select a client" />}
          sx={{ width: 250, margin: "5px auto" }}
          direction="ltr"
          isOptionEqualToValue={(option, value) => option._id === value._id} // Customize the equality test
        />
      </Stack>
    </>
  );
}

export default SearchBar;
