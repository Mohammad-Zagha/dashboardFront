
import Topbar from './scence/global/Topbar'
import SideSilde from "./scence/global/SideSilde";
import { Routes,Route,BrowserRouter, Navigate, useNavigate} from "react-router-dom";
import Members from "./scence/members/index";
import Form from "./scence/form/index";
import Dashboard from "./scence/dashboard";
import ProfileEdit from './profileEdit/index'
import Bar from "./Bar/index";
import axios from "axios";
import PieChart from "./scence/components/PieChart";
import Login from "./scence/login";
import SignUp from "./signup";
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
function Router() {
  const AuthData = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="app" dir="rtl" >
    
   {AuthData.loggedIn? <SideSilde/>:<></> }
            <main className="content"  >
          {AuthData.loggedIn?  <Topbar/>:<></>}
           
            
            <Routes>
                   
            <Route path="/login" element={!AuthData.loggedIn?<Login/>:<Navigate to="/"/>}></Route>
            <Route path="/signup" element={!AuthData.loggedIn?<SignUp/>:<Navigate to="/"/>}></Route>
              <Route path="/" element={AuthData.loggedIn?<Dashboard/>:<Navigate to="/login"/>}></Route>
              <Route path='/team' element={AuthData.loggedIn?<Members/>:<Navigate to="/login"/>}></Route>
              <Route path='/form' element={AuthData.loggedIn?<Form/>:<Navigate to="/login"/>}></Route>
              <Route path='/editSub' element={AuthData.loggedIn?<ProfileEdit/>:<Navigate to="/login"/>}></Route>
              <Route path='/barChart' element={AuthData.loggedIn?<Bar></Bar>:<Navigate to="/login"/>}></Route>
              <Route path='/pie' element={AuthData.loggedIn?<PieChart></PieChart>:<Navigate to="/login"/>}></Route>
            </Routes>
         
            </main>
          </div>
  )
}

export default Router