import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

import loginImage from "../assets/login-illustration.png";

import "../styles/login.css";
import { toast } from "react-toastify";

function AdminForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await API.put("/admin/forgot-password", {
       email,
password: newPassword,
      });

      
      navigate("/admin/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}

      <div className="login-left">

        <img
          src={loginImage}
          alt="background"
          className="login-image"
        />

        <h1 className="login-title">
          Reset
          <br />
          Admin Password
        </h1>

        <p className="login-subtitle">
          Enter your administrator email
          <br />
          and choose a new secure password.
        </p>

      </div>

      {/* RIGHT SIDE */}

      <Card className="login-card">

        <h2
          style={{
            textAlign: "center",
            fontSize: "34px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          Forgot Password
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Reset your account 🔐
        </p>

        <Input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button onClick={resetPassword}>
          Reset Password
        </Button>

        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
          }}
        >
          <button
            onClick={() => navigate("/admin/login")}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            ← Back to Admin Login
          </button>
        </div>

      </Card>

    </div>
  );
}

export default AdminForgotPassword;