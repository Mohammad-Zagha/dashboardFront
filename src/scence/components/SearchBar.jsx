
import React, { useState } from 'react';
import { Autocomplete,  Stack, TextField } from '@mui/material';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useEffect } from 'react';



const fetchData = async () => {
  try {
    console.log("Fetching From SearchBar");
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`, 
    };

    const response = await axios.get('https://13.49.44.225:4000/home/clients', {
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
          renderInput={(params) => <TextField {...params} label="اختار مشترك" />}
          sx={{ width: 250, margin: "5px auto" }}
          direction="ltr"
          isOptionEqualToValue={(option, value) => option._id === value._id} // Customize the equality test
        />
      </Stack>
    </>
  );
}

export default SearchBar;
