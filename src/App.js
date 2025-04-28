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
import ProtectedRoute from './components/ProtectedRoute'; // ✅ New import

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
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
          <Route path="/book-ride" element={<ProtectedRoute><BookRide /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/post-ride" element={<ProtectedRoute><PostRide /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/driver" element={<ProtectedRoute><Driver /></ProtectedRoute>} />
          <Route path="/verified" element={<ProtectedRoute><Verified /></ProtectedRoute>} />

          {/* Protected Admin routes */}
          <Route path="/adminmenu" element={<ProtectedRoute><AdminMenu /></ProtectedRoute>} />
          <Route path="/manage-communities" element={<ProtectedRoute><ManageCommunities /></ProtectedRoute>} />
          <Route path="/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
          <Route path="/review" element={<ProtectedRoute><ReviewComplaint /></ProtectedRoute>} />
          <Route path="/approve-drivers" element={<ProtectedRoute><ApproveDrivers /></ProtectedRoute>} />
          <Route path="/editcommunity" element={<ProtectedRoute><EditCommunity /></ProtectedRoute>} />
          <Route path="/manage-profile" element={<ProtectedRoute><ManageProfiles /></ProtectedRoute>} />
          <Route path="/review-driver" element={<ProtectedRoute><ReviewDriverRequest /></ProtectedRoute>} />
          <Route path="/verifydriver" element={<ProtectedRoute><VerifyDriver /></ProtectedRoute>} />
        </Routes>
      </>
  );
}

export default App;