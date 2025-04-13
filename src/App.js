import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Home';
import Community from './Community';
import BookRide from './BookRide';
import PostRide from './PostRide';
import History from './History';
import Login from './Login';
import Register from './Register';


function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideNavbarOn = ['/', '/register']; 

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/book-ride" element={<BookRide />} />
        <Route path="/post-ride" element={<PostRide />} />
        <Route path="/history" element={<History />} />
        

      </Routes>
    </>
  );
}

export default App;
