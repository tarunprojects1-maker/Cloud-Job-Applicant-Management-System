import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import AuthLayout from "../layouts/AuthLayout";

import Input from "../components/Input";
import Button from "../components/Button";
import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    try {

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");

    } catch (error) {

  toast.error(
    error.response?.data?.message || "Login Failed"
  );

}

  };

  return (

    <AuthLayout
      title="Applicant Login"
      subtitle="Welcome Back 👋"
    >

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <Button onClick={loginUser}>
        Login
      </Button>

      <div
        style={{
          marginTop:"20px",
          display:"flex",
          justifyContent:"space-between"
        }}
      >

        <Link to="/register">
          Create Account
        </Link>

        <Link to="/admin/login">
          Admin Login
        </Link>

      </div>

    </AuthLayout>

  );

}

export default Login;