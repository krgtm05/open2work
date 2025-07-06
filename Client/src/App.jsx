import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RoleSelection from "./Components/RoleSelection/RoleSelection";
import SignUp from "./Components/Signup/SignUp";
import Login from "./Components/Login/Login";
import Feed from "./Components/Feed/feed";
import ProtectedSignupRoute from "./Components/ProtectedSignupRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<RoleSelection />} />
          <Route
            path='/signup'
            element={
              <ProtectedSignupRoute>
                <SignUp />
              </ProtectedSignupRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
