import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

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
import Checkout from './Checkout';
import Driver from './Driver';
import VerifyDriver from './VerifyDriver';
import AboutUs from "./AboutUs";
import AdminNavbar from "./components/AdminNavbar";
import AboutUsNavbar from "./components/AboutUsNavbar";
import { useNavigate } from "react-router-dom"; // Required for AboutUsNavbar

function App() {
  return (
      <Router>
        <MainLayout />
      </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const adminPaths = [
    '/adminmenu',
    '/approve-drivers',
    '/manage-communities',
    '/complaints',
    '/review-driver',
    '/manage-profile',
    '/editcommunity',
    '/verifydriver',
  ];

  const hideNavbarOn = ['/login', '/register'];
  const currentPath = location.pathname.toLowerCase();

  const showAdminNavbar = adminPaths.includes(currentPath);
  const showAboutUsNavbar = currentPath === '/about-us';
  const showDefaultNavbar = !hideNavbarOn.includes(currentPath) && !showAdminNavbar && !showAboutUsNavbar;

  return (
      <>
        {showAdminNavbar && <AdminNavbar />}
        {showAboutUsNavbar && <AboutUsNavbar navigate={navigate} />}
        {showDefaultNavbar && <Navbar />}

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/about-us" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />

          {/* Protected routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/book-ride" element={<BookRide />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/post-ride" element={<PostRide />} />
          <Route path="/history" element={<History />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/verified" element={<Verified />} />

          {/* Protected Admin routes */}
          <Route path="/adminmenu" element={<AdminMenu />} />
          <Route path="/manage-communities" element={<ManageCommunities />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/review" element={<ReviewComplaint />} />
          <Route path="/approve-drivers" element={<ApproveDrivers />} />
          <Route path="/editcommunity" element={<EditCommunity />} />
          <Route path="/manage-profile" element={<ManageProfiles />} />
          <Route path="/review-driver" element={<ReviewDriverRequest />} />
          <Route path="/verifydriver" element={<VerifyDriver />} />
        </Routes>
      </>
  );
}

export default App;