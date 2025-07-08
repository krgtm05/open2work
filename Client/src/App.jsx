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
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<RoleSelection />} />
          <Route
            path='/signup'
            element={
              <ProtectedRoute>
                <SignUp />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route
            path='/feed'
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
