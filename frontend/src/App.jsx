import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import MyApplications from "./pages/MyApplications";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ViewApplicants from "./pages/ViewApplicants";
import ApplicantProfile from "./pages/ApplicantProfile";
import ViewApplications from "./pages/ViewApplications";
import ManageJobs from "./pages/ManageJobs";
import AdminChangePassword from "./pages/AdminChangePassword";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import Background from "./components/Background";

function App() {
  return (
    <>
      <Background />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/available-jobs" element={<Jobs />} />  {/* ← ADD THIS LINE */}
        <Route path="/my-applications" element={<MyApplications />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/change-password"
          element={<AdminChangePassword />}
        />
        <Route
          path="/admin/forgot-password"
          element={<AdminForgotPassword />}
        />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/applicants" element={<ViewApplicants />} />
        <Route
          path="/admin/applications"
          element={<ViewApplications />}
        />
        <Route path="/admin/jobs" element={<ManageJobs />} />

        <Route
          path="/admin/applicant/:id"
          element={<ApplicantProfile />}
        />
      </Routes>
    </>
  );
}

export default App;