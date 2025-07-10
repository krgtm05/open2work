import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RoleSelection from "./Components/RoleSelection/RoleSelection";
import SignUp from "./Components/Signup/SignUp";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import DashboardLayout from "./Components/DashboardLayout";
import CandidateFeed from "./Components/Feed/CandidateFeed";
import EmployerFeed from "./Components/Feed/EmployerFeed";
import UserList from "./Components/FeedTabs/UserList";
import AboutPage from "./Components/FeedTabs/AboutPage";
import CreateJob from "./Components/FeedTabs/CreateJob";
import PostedJobs from "./Components/FeedTabs/PostedJobs";
import ReceivedApplications from "./Components/FeedTabs/ReceivedApplications";
import MyApplications from "./Components/FeedTabs/MyApplications";
import AllJobs from "./Components/FeedTabs/AllJobs";

const role = localStorage.getItem("role");

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
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {role === "candidate" && (
              <>
                <Route index element={<CandidateFeed />} />
                <Route path='all' element={<AllJobs />} />
                <Route path='applications' element={<MyApplications />} />
                <Route path='users' element={<UserList />} />
                <Route path='about' element={<AboutPage />} />
              </>
            )}

            {role === "employer" && (
              <>
                <Route index element={<EmployerFeed />} />
                <Route path='create-job' element={<CreateJob />} />
                <Route path='posted-jobs' element={<PostedJobs />} />
                <Route path='applications' element={<ReceivedApplications />} />
              </>
            )}
          </Route>

          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
