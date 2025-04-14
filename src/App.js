import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

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

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideNavbarOn = ['/login', '/register', '/adminmenu'];

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
        <Route path="/approve-drivers" element={<ApproveDrivers />} />
      </Routes>
    </>
  );
}

export default App;
