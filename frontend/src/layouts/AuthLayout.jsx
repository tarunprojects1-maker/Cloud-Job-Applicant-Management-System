import loginImage from "../assets/login-illustration.png";
import "../styles/login.css";

function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="login-page">

      {/* LEFT SIDE */}

      <div className="login-left">

        <img
          src={loginImage}
          alt="Background"
          className="login-image"
        />

        <h1 className="login-title">
          Cloud Job Applicant
          <br />
          Management System
        </h1>

        <p className="login-subtitle">
          Manage job applications with ease.
          <br />
          Track, review and hire the best candidates efficiently.
        </p>

      </div>

      {/* RIGHT SIDE */}

      <div className="login-card">

        <h2 className="auth-title">
          {title}
        </h2>

        <p className="auth-subtitle">
          {subtitle}
        </p>

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;