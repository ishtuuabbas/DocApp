import './App.css';
import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AllUsers from "./pages/User/AllUsers";
import Login from "./pages/Auth/Login";
import AddUser from "./pages/User/AddUser";
import EditUser from "./pages/User/EditUser";
import { AuthContext } from "./store/auth-context";
import AllPatients from "./pages/Patient/AllPatients";
import EditPatient from "./pages/Patient/EditPatient";
import AddPatient from "./pages/Patient/AddPatient";
import PatientDetail from "./pages/Patient/PatientDetail";
import AllDoctor from "./pages/Doctor/AllDoctor";
import AllContact from './pages/Contacts';
import AddDoctor from "./pages/Doctor/AddDoctor";
import Paperbase from "./layout/Dashboard/Paperbase";
import Revenue from "./pages/Stats/Revenue";
import ClinicStats from "./pages/Stats/PatientStats";
import Home from "./pages/User/Home";
import LandingPage from "./components/Home/Home/Home"
import AppointmentsTable from './pages/Appointments';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import About from './components/About/About';
import Service from './components/Service/Service'
import Contact from './components/Contact/Contact';
import AppointmentPage from './components/Appointment/AppointmentPage';

const App = () => {
  const authCtx = useContext(AuthContext);
  // console.log(authCtx.user);
  const rabcRoutes =
    authCtx.user?.role === "admin" || authCtx.user?.role === "superadmin";
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Please not reload if you are offline";
    };

    // Attach the event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const routes = (
    <Routes>
      {/* USERS ROUTES */}
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<ClinicStats />} />
      <Route path="/users" element={<AllUsers />} />

      <Route path="/user/create" element={<AddUser />} />
<Route path='/appointments' element={<AppointmentsTable/>}/>
      <Route path="/user/edit/:userId" element={<EditUser />} />

      <Route path="/auth/login" element={<Login />} />

      <Route path="/patients" element={<AllPatients />} />

      <Route path="/patient/detail/:patientId" element={<PatientDetail />} />

      <Route path="/patient/create" element={<AddPatient />} />

      <Route path="/clinic/stats" element={<ClinicStats />} />

      <Route path="/revenue" element={<Revenue />} />

      <Route path="/patient/edit/:patientId" element={<EditPatient />} />

      <Route path="/doctors" element={<AllDoctor />} />

      <Route path="/doctor/create" element={<AddDoctor />} />
      <Route path="/contacts" element={<AllContact/>} />

    </Routes>
  );

  const unAuthRoutes = (
    <Routes>
      {/* USERS ROUTES */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/service" element={<Service />} />
      
      <Route path="/appointment" element={<AppointmentPage/>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );

  return authCtx.isLoggedIn ? <Paperbase>{routes}</Paperbase> : unAuthRoutes;
};

export default App;
