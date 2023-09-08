
import  {  useReducer } from 'react'
import { createContext } from 'react'




export const ClientsContext=createContext();

export const clientsReducer = (state, action) => {
    switch (action.type) {
      case 'SET_CLIENTS':
        return {
          clients: action.payload,
        };
      case 'CREATE_CLIENT':
        return {
          clients: [action.payload, ...state.clients],
        };
        case 'UPDATE_CLIENT':
          const updatedClients = [...state.clients]; 
        
          state.clients.forEach((client, index) => {
            if (client.name === action.payload.name) {
              updatedClients.splice(index, 1, action.payload);
              
               
            }
         
          });
        
          return {
            clients: updatedClients,
          };
         
        default:
          return state;
        
    }
  };
  

export const ClientsContextProvider = ({Children})=>{

const [state,dispatch]=useReducer(clientsReducer,{
    clients:[],
    editedClient:null,
    

})

return(
        <ClientsContext.Provider value={{...state,dispatch}}>
            {Children}
        </ClientsContext.Provider>
        )
}