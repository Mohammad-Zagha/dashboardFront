import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from './context/AuthContext';
import Topbar from './scence/global/Topbar';
import SideSilde from './scence/global/SideSilde';
import Members from './scence/members/index';
import Form from './scence/form/index';
import Dashboard from './scence/dashboard';
import ProfileEdit from './profileEdit/index';
import Bar from './Bar/index';
import PieChart from './scence/components/PieChart';
import Login from './scence/login';
import SignUp from './signup';
import Loading from './scence/components/Loading';

function Router() {
  const AuthData = useContext(AuthContext);

  useEffect(() => {
    AuthData.getLoggedIn(); // Check authentication status
  }, [AuthData]);

  // Wait for the authentication status to be determined
  if (AuthData.loggedIn === undefined) {
    return <Loading />;
  }

  return (
    <div className="app" dir="rtl">
      {AuthData.loggedIn ? <SideSilde /> : <></>}
      <main className="content">
        {AuthData.loggedIn ? <Topbar /> : <></>}

        <Routes>
          <Route path="/login" element={!AuthData.loggedIn ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!AuthData.loggedIn ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/" element={AuthData.loggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/team" element={AuthData.loggedIn ? <Members /> : <Navigate to="/login" />} />
          <Route path="/form" element={AuthData.loggedIn ? <Form /> : <Navigate to="/login" />} />
          <Route path="/editSub" element={AuthData.loggedIn ? <ProfileEdit /> : <Navigate to="/login" />} />
          <Route path="/barChart" element={AuthData.loggedIn ? <Bar /> : <Navigate to="/login" />} />
          <Route path="/pie" element={AuthData.loggedIn ? <PieChart /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

export default Router;
