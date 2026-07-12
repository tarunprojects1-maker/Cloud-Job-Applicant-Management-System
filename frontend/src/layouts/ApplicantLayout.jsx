import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  User,
  LogOut,
  Bell,
  ChevronDown,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import "../styles/dashboard.css";

function ApplicantLayout({ children, logout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/available-jobs", icon: Briefcase, label: "Available Jobs" },
    { path: "/my-applications", icon: FileText, label: "My Applications" },
    { path: "/profile", icon: User, label: "My Profile" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    if (logout) logout();
  };

  return (
    <div className="dashboard-layout">
      {(isMobileMenuOpen || isSidebarOpen) && (
        <div
          className={`sidebar-overlay ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`sidebar ${isSidebarOpen ? "open" : "closed"} ${
          isMobileMenuOpen ? "mobile-open" : ""
        }`}
      >
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">
              <Sparkles size={24} />
            </div>
            <span className="logo-text">CloudJob</span>
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${active ? "active" : ""}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {active && <span className="nav-indicator" />}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {user?.full_name?.[0] || "U"}
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">
                {user?.full_name || "User"}
              </span>
              <span className="sidebar-user-role">Applicant</span>
            </div>
          </div>
        </div>
      </aside>

      <div className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <header className="navbar">
          <div className="navbar-left">
            <button className="menu-button" onClick={toggleSidebar}>
              <Menu size={22} />
            </button>
            <h1 className="page-title">
              {navItems.find((item) => isActive(item.path))?.label || "Dashboard"}
            </h1>
          </div>

          <div className="navbar-right">
            <button className="notification-button">
              <Bell size={20} />
              <span className="notification-dot" />
            </button>

            <div className="profile-dropdown" ref={dropdownRef}>
              <button
                className="profile-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="profile-avatar">
                  {user?.full_name?.[0] || "U"}
                </div>
                <span className="profile-name">{user?.full_name || "User"}</span>
                <ChevronDown size={16} className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      {user?.full_name?.[0] || "U"}
                    </div>
                    <div>
                      <div className="dropdown-name">{user?.full_name || "User"}</div>
                      <div className="dropdown-email">{user?.email || "user@example.com"}</div>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                    <User size={16} />
                    Profile Settings
                  </Link>
                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}

export default ApplicantLayout;