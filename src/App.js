import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Profile from './Profile';
import Navbar from './components/Navbar';
import Home from './Home';
import Community from './Community';
import BookRide from './BookRide';
import PostRide from './PostRide';
import History from './History';
import Login from './Login';
import Register from './Register';
import Notification from './Notification';
import AdminMenu from "./AdminMenu";
import ManageCommunities from './ManageCommunities';
import Complaints from './Complaints';
import ApproveDrivers from './ApproveDrivers';
import ReviewComplaint from './ReviewComplaint';
import EditCommunity from './EditCommunity';
import Verified from './Verified';
import ManageProfiles from "./ManageProfiles";
import ReviewDriverRequest from './ReviewDriverRequest';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideNavbarOn = ['/login', '/register', '/adminmenu','/review-driver',"/manage-profile","/approve-drivers","/manage-communities"];

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/book-ride" element={<BookRide />} />
        <Route path="/post-ride" element={<PostRide />} />
        <Route path="/history" element={<History />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/adminmenu" element={<AdminMenu />} />
        <Route path="/manage-communities" element={<ManageCommunities />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/review" element={<ReviewComplaint />} />
        <Route path="/approve-drivers" element={<ApproveDrivers />} />
        <Route path="/manege" element={<ApproveDrivers />} />
        <Route path="/EditCommunity" element={<EditCommunity />} />
        <Route path="/verified" element={<Verified />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manage-profile" element={<ManageProfiles />} />
        <Route path="/review-driver" element={<ReviewDriverRequest />} />

      </Routes>
    </>
  );
}

export default App;
