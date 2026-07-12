import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import AuthLayout from "../layouts/AuthLayout";

import Input from "../components/Input";
import Button from "../components/Button";
import { toast } from "react-toastify";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {

    try {

      const response = await API.post(
        "/auth/register",
        user
      );

     toast.success(response.data.message);

      navigate("/");

    } catch (error) {

  toast.error(
    error.response?.data?.message || "Registration Failed"
  );

}

  };

  return (

    <AuthLayout
      title="Create Account"
      subtitle="Create your applicant account"
    >

      <Input
        type="text"
        name="full_name"
        placeholder="Full Name"
        value={user.full_name}
        onChange={handleChange}
      />

      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
      />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
      />

      <Button onClick={registerUser}>
        Create Account
      </Button>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <Link to="/">
          Already have an account? Login
        </Link>
      </div>

    </AuthLayout>

  );
}

export default Register;