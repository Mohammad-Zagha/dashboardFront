import axios from "axios";
import { useMutation ,useQueryClient } from "react-query"

const addClientReq=async(client)=>
{
 await axios.post('/home/add',client)
}


const editClientReq= async({obj,path})=>
{
  if(path==="addSub")
  {
   await axios.patch(`/home/${path}`,obj)
  }
  if(path==="updateStatus")
  {
   
      const name = obj.name;
     
      const status = obj.status
      
     await axios.patch(`/home/${path}`,{name,status})
    
  
  }
  if(path==="freezSub")
  {
   
      const name = obj.name;
     
      const frozenDays = obj.frozenDays;
 
     await axios.patch(`/home/${path}`,{name,frozenDays})
    
  
  }
  if(path==="unFreezSub")
  {
   
      const name = obj;

     await axios.patch(`/home/${path}`,{name})
    
  
  }
  if(path === "updateClientByName")
  {
    const updatedClient = obj;
    await axios.patch(`/home/${path}`, updatedClient);
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