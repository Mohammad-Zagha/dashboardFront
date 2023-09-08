import { useEffect } from 'react';
import {ClientsContext} from '../context/clientContext'
import { useContext } from 'react'
import axios from 'axios';

export const useClientsContext =()=>{




    const context = useContext(ClientsContext);
    if(!context)
    {
        throw Error("not Allowd")
    }
  
   


    return context
}