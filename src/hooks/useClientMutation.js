import axios from "axios";
import { useMutation ,useQueryClient } from "react-query"
const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
const addClientReq = async (client) => {
  

  try {
    const response = await axios.post('https://app.gymadmindash.site/home/add', client, {
      headers: headers,
    });
  } catch (error) {
  }
};



const editClientReq= async({obj,path})=>
{
  if(path==="addSub")
  {
   await axios.patch(`https://app.gymadmindash.site/home/${path}`,obj, {
    headers: headers,
  })
  }
  if(path==="updateStatus")
  {
   
      const name = obj.name;
     
      const status = obj.status
      
     await axios.patch(`https://app.gymadmindash.site/home/${path}`,{name,status}, {
      headers: headers,
    })
    
  
  }
  if(path==="freezSub")
  {
   
      const name = obj.name;
     
      const frozenDays = obj.frozenDays;
 
     await axios.patch(`https://app.gymadmindash.site/home/${path}`,{name,frozenDays}, {
      headers: headers,
    })
    
  
  }
  if(path==="unFreezSub")
  {
   
      const name = obj;

     await axios.patch(`https://app.gymadmindash.site/home/${path}`,{name}, {
      headers: headers,
    })
    
  
  }
  if(path === "updateClientByName")
  {
    const updatedClient = obj;
    await axios.patch(`https://app.gymadmindash.site/home/${path}`, updatedClient, {
      headers: headers,
    });
  }
  

}

export const useAddClient =()=>{
  const queryClient = useQueryClient();
  return useMutation(addClientReq,{
    onSuccess: ()=>{
      queryClient.invalidateQueries('clients')
    }
  });
}

export const useEditClient =()=>{
  const queryClient = useQueryClient();
  return useMutation(editClientReq,{
    onSuccess: ()=>{
      queryClient.invalidateQueries('clients')
    }
  });
}