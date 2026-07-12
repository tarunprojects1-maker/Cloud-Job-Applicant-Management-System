import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  CalendarDays,
  IndianRupee,
} from "lucide-react";
import API from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";

function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await API.get(
        `/applications/my/${user.id}`
      );

      setApplications(response.data.applications);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "#16a34a";
      case "Rejected":
        return "#dc2626";
      case "Shortlisted":
        return "#2563eb";
      default:
        return "#f59e0b";
    }
  };

  return (
    <DashboardLayout>
      <div
        style={{
          padding: "35px",
          background: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <div style={{ marginBottom: "35px" }}>
          <h1
            style={{
              fontSize: "34px",
              color: "#0f172a",
              marginBottom: "8px",
            }}
          >
            📄 My Applications
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "16px",
            }}
          >
            Track all your submitted job applications.
          </p>
        </div>

        {applications.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "60px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            }}
          >
            <h2>No Applications Found</h2>
          </div>
        ) : (
          applications.map((application, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "25px",
                marginBottom: "25px",
                boxShadow: "0 8px 25px rgba(0,0,0,.08)",
                transition: ".3s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: "#2563eb",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "28px",
                      fontWeight: "bold",
                    }}
                  >
                    {application.company_name.charAt(0)}
                  </div>

                  <div>
                    <h2
                      style={{
                        marginBottom: "6px",
                        color: "#0f172a",
                      }}
                    >
                      {application.job_title}
                    </h2>

                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#475569",
                        marginBottom: "6px",
                      }}
                    >
                      <Building2 size={16} />
                      {application.company_name}
                    </p>

                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#64748b",
                      }}
                    >
                      <MapPin size={16} />
                      {application.location}
                    </p>
                  </div>
                </div>

                <span
                  style={{
                    background: getStatusColor(application.status),
                    color: "white",
                    padding: "10px 22px",
                    borderRadius: "30px",
                    fontWeight: "600",
                  }}
                >
                  {application.status}
                </span>
              </div>

              <hr
                style={{
                  margin: "20px 0",
                  border: "none",
                  borderTop: "1px solid #e2e8f0",
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "40px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#64748b",
                      marginBottom: "5px",
                    }}
                  >
                    Salary
                  </p>

                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <IndianRupee size={18} />
                    {application.salary}
                  </h3>
                </div>

                <div>
                  <p
                    style={{
                      color: "#64748b",
                      marginBottom: "5px",
                    }}
                  >
                    Applied Date
                  </p>

                  <h3
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <CalendarDays size={18} />
                    {new Date(
                      application.applied_at
                    ).toLocaleDateString("en-IN")}
                  </h3>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

export default MyApplications;