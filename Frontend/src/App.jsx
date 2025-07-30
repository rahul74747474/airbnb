import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateListing from "./pages/CreateListing";
import ListingDetail from "./pages/ListingDetail";
import Profile from "./pages/Profile";
import MyRentals from "./pages/MyRentals";
import Navmini from "./components/Navbar";
import Footer from "./components/footer";

function AppWrapper() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register","/create-listing"];
  const hideFooterRoutes = ["/login", "/register","/create-listing"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navmini />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-rentals" element={<MyRentals />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
