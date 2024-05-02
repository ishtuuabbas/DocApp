import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AllUsers from "./pages/User/AllUsers";
import Login from "./pages/Auth/Login";
import Home from "./pages/User/Home";
import AddUser from "./pages/User/AddUser";
import EditUser from "./pages/User/EditUser";
import { AuthContext } from "./store/auth-context";
import AllPatients from "./pages/Patient/AllPatients";
import EditPatient from "./pages/Patient/EditPatient";
import AddPatient from "./pages/Patient/AddPatient";
import PatientDetail from "./pages/Patient/PatientDetail";
import AllDoctor from "./pages/Doctor/AllDoctor";
import AddDoctor from "./pages/Doctor/AddDoctor";
import Paperbase from "./layout/Dashboard/Paperbase";
import Revenue from "./pages/Stats/Revenue";
import ClinicStats from "./pages/Stats/PatientStats";

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
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<AllUsers />} />

      <Route path="/user/create" element={<AddUser />} />

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
    </Routes>
  );

  const unAuthRoutes = (
    <Routes>
      {/* USERS ROUTES */}
      <Route path="/" element={<Login />} />
    </Routes>
  );

  return authCtx.isLoggedIn ? <Paperbase>{routes}</Paperbase> : unAuthRoutes;
};

export default App;