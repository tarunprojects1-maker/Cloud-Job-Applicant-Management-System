    import { useEffect, useState } from "react";
    import { useNavigate, useParams } from "react-router-dom";
    import API from "../services/api";
    import Loader from "../components/Loader";
    import { toast } from "react-toastify";
    import "../styles/ApplicantProfile.css";

    function ApplicantProfile() {

      const { id } = useParams();
      const navigate = useNavigate();

      const [applicant, setApplicant] = useState(null);

      useEffect(() => {
        fetchApplicant();
      }, []);

      const fetchApplicant = async () => {

        try {

          const response = await API.get(`/admin/applicants/${id}`);

          setApplicant(response.data.applicant);

        } catch (error) {

          console.log(error);

          toast.error("Failed to load applicant profile");

        }

      };

      if (!applicant) {
        return <Loader />;
      }

      return (

    <div className="profile-page">

    <div className="profile-header">

    <div>

    <h1>👤 Applicant Profile</h1>

    <p style={{color:"#64748b"}}>
    View complete applicant information
    </p>

    </div>

    <button
    className="back-btn"
    onClick={()=>navigate("/admin/applicants")}
    >

    ← Back to Applicants

    </button>

    </div>

    <div className="profile-container">

    <div className="photo-card">

    {applicant.profile_photo ? (

    <img
    src={`http://localhost:5000/uploads/${applicant.profile_photo}`}
    alt="Profile"
    />

    ):(


    <div className="avatar">

    {applicant.full_name?.charAt(0).toUpperCase()}

    </div>

    )}

    <h2
    style={{
    marginTop:"20px",
    marginBottom:"8px",
    }}
    >

    {applicant.full_name}

    </h2>

    <p
    style={{
    color:"#64748b",
    }}
    >

    Applicant

    </p>

    </div>

    <div className="details">

    <div className="info-card">

    <h4>Full Name</h4>

    <p>{applicant.full_name}</p>

    </div>

    <div className="info-card">

    <h4>Email Address</h4>

    <p>{applicant.email}</p>

    </div>

    <div className="info-card">

    <h4>Phone Number</h4>

    <p>{applicant.phone || "N/A"}</p>

    </div>

    <div className="info-card">

    <h4>Education</h4>

    <p>{applicant.education || "N/A"}</p>

    </div>

    <div className="info-card full-card">
  <h4>Skills</h4>
  <p>{applicant.skills || "N/A"}</p>
</div>

<div className="info-card full-card">
  <h4>Experience</h4>
  <p>{applicant.experience || "N/A"}</p>
</div>

<div className="info-card full-card">
  <h4>Resume</h4>

  {applicant.resume ? (
    <a
      href={`http://localhost:5000/uploads/${applicant.resume}`}
      target="_blank"
      rel="noreferrer"
    >
      <button className="resume-btn">
        📄 View Resume
      </button>
    </a>
  ) : (
    <p>No Resume Uploaded</p>
  )}
</div>

</div>

</div>

</div>

);

}

export default ApplicantProfile;


