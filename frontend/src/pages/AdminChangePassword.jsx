import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminChangePassword() {
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = async () => {

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      await API.put("/admin/change-password", {
        adminId: admin.id,
        password,
      });

      

      navigate("/admin/dashboard");

    } catch (error) {

      console.log(error);

     toast.error("Failed to update password.");

    }

  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Change Password</h1>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={changePassword}>
        Update Password
      </button>
    </div>
  );
}

export default AdminChangePassword;