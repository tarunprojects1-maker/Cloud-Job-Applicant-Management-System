   import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

import loginImage from "../assets/login-illustration.png";

import "../styles/login.css";
import { toast } from "react-toastify";

function AdminLogin() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    try {
      const response = await API.post("/admin/login", admin);

      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      

      if (response.data.firstLogin === true) {
        navigate("/admin/change-password");
      } else {
        navigate("/admin/dashboard");
      }

    } catch (error) {
    toast.error(
        error.response?.data?.message || "Login Failed"
    );
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
          Cloud Job Applicant
          <br />
          Management System
        </h1>

        <p className="login-subtitle">
          Administrator Portal
          <br />
          Securely manage applicants and job postings.
        </p>

      </div>

      {/* RIGHT SIDE */}

      <Card className="login-card">

        <h2
          style={{
            textAlign: "center",
            fontSize: "38px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          Admin Login
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Welcome Back 👋
        </p>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={admin.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={admin.password}
          onChange={handleChange}
        />

        <Button
          className="w-full"
          onClick={login}
        >
          Login
        </Button>

        <div
  style={{
    marginTop: "15px",
    textAlign: "center",
  }}
>
  <button
    onClick={() => navigate("/")}
    style={{
      background: "none",
      border: "none",
      color: "#2563eb",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "15px",
      marginBottom: "10px",
    }}
  >
    ← Back to Applicant Login
  </button>
</div>

        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
          }}
        >
          <button
            onClick={() => navigate("/admin/forgot-password")}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Forgot Password?
          </button>
        </div>

      </Card>

    </div>
  );
}

export default AdminLogin;