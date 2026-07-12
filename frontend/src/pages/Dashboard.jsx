import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

import WelcomeCard from "../components/WelcomeCard";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    availableJobs: 0,
    appliedJobs: 0,
    pending: 0,
    selected: 0,
  });

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchDashboardStats = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await API.get(`/dashboard/stats/${user.id}`);
      setStats(response.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchDashboardStats();
  }, [navigate]);

  return (
    <DashboardLayout logout={logout}>
      <div className="dashboard-content">
        <WelcomeCard />
        <DashboardCard stats={stats} />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard; 