import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";


function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
  full_name: "",
  email: "",
  phone: "",
  skills: "",
  experience: "",
  education: "",
  profile_photo: "",
});

  const [resume, setResume] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

await API.post("/profile/save", {
    applicant_id: user.id,
    ...profile,
});

await fetchProfile();      // Reload latest profile
setEditing(false);         // Return to Profile View

console.log("Profile Saved Successfully");
toast.success("Profile Saved Successfully!");

      
    } catch (err) {
      console.log(err);
      console.log("Error Saving Profile");
    }
  };

  const fetchProfile = async () => {
  try {

    const user = JSON.parse(localStorage.getItem("user"));

    console.log("User:", user);
console.log("User ID:", user.id);

    const response = await API.get(`/profile/${user.id}`);

    if (response.data.profile) {

      setProfile({
  full_name: response.data.profile.full_name || "",
  email: response.data.profile.email || "",
  phone: response.data.profile.phone || "",
  skills: response.data.profile.skills || "",
  experience: response.data.profile.experience || "",
  education: response.data.profile.education || "",
  profile_photo: response.data.profile.profile_photo || "",
});

console.log(response.data.profile);
    }

  } catch (error) {

    console.log(error);

  }
};

  

  const uploadResume = async () => {
    if (!resume) {
      console.log("Please choose a PDF file.");
      return;
    }

    const formData = new FormData();

   const user = JSON.parse(localStorage.getItem("user"));

formData.append("applicant_id", user.id);
    formData.append("resume", resume);

    try {
      await API.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

     

      console.log("Resume Uploaded Successfully");
    } catch (err) {
      console.log(err);
     console.log("Resume Upload Failed");
    }
  };

  const uploadPhoto = async () => {

    console.log("Upload Photo button clicked");

  if (!photo) {
   toast.warning("Please choose a photo.");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const formData = new FormData();

  formData.append("applicant_id", user.id);
  formData.append("photo", photo);

  try {

    await API.post("/photo/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

   toast.success("Photo Uploaded Successfully.");

    await fetchProfile();

  } catch (err) {

    console.log(err);
    toast.error("Photo Upload Failed.");

  }

};
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
    return;
  }

  fetchProfile();

}, [navigate]);

  return (
  <DashboardLayout>

    {!editing ? (

<div
  style={{
    maxWidth: "850px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "18px",
    padding: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
  }}
>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "25px",
    }}
  >

    <div
  style={{
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    background: "#2563eb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  {profile.profile_photo ? (
    <img
      src={`http://localhost:5000/uploads/${profile.profile_photo}`}
      alt="Profile"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  ) : (
    <span
      style={{
        color: "#fff",
        fontSize: "40px",
        fontWeight: "700",
      }}
    >
      {profile.full_name
        ? profile.full_name.charAt(0).toUpperCase()
        : "U"}
    </span>
  )}
</div>

    <div>

      <h1>{profile.full_name}</h1>

      <p>{profile.email}</p>

      <p>{profile.phone}</p>

    </div>

  </div>

  <hr style={{ margin: "30px 0" }} />

  <h3>Skills</h3>

  <p>{profile.skills}</p>

  <h3>Experience</h3>

  <p>{profile.experience}</p>

  <h3>Education</h3>

  <p>{profile.education}</p>

  <button
    onClick={() => setEditing(true)}
    style={{
      marginTop: "30px",
      padding: "12px 25px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Edit Profile
  </button>

</div>

) : (

  

    <div
  style={{
    maxWidth: "700px",
    margin: "0 auto",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
  }}
>
      <h1
  style={{
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "25px",
  }}
>
  My Profile
</h1>

<p
  style={{
    color: "#64748b",
    marginBottom: "30px",
  }}
>
  Update your personal information and upload your latest resume.
</p>

      <br />

      <input
        type="text"
        name="full_name"
        placeholder="Full Name"
        value={profile.full_name}
        onChange={handleChange}
        style={{
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  marginBottom: "18px",
  fontSize: "15px",
  boxSizing: "border-box",
}}
      />

      <br />
      <br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={profile.email}
        onChange={handleChange}
        style={{
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  marginBottom: "18px",
  fontSize: "15px",
  boxSizing: "border-box",
}}
      />

      <br />
      <br />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={profile.phone}
        onChange={handleChange}
        style={{
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  marginBottom: "18px",
  fontSize: "15px",
  boxSizing: "border-box",
}}
      />

      <br />
      <br />

      <textarea
        name="skills"
        placeholder="Skills"
        value={profile.skills}
        onChange={handleChange}
        rows="4"
        style={{
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  marginBottom: "18px",
  fontSize: "15px",
  boxSizing: "border-box",
}}
      />

      <br />
      <br />

      <textarea
        name="experience"
        placeholder="Experience"
        value={profile.experience}
        onChange={handleChange}
        rows="4"
        style={{
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  marginBottom: "18px",
  fontSize: "15px",
  boxSizing: "border-box",
}}
      />

      <br />
      <br />

      <textarea
        name="education"
        placeholder="Education"
        value={profile.education}
        onChange={handleChange}
        rows="4"
        style={{
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  marginBottom: "18px",
  fontSize: "15px",
  boxSizing: "border-box",
}}
      />

      <br />
      <br />
      <h3
  style={{
    marginTop: "25px",
    marginBottom: "15px",
  }}
>
  📷 Upload Profile Photo
</h3>

<label
  htmlFor="photoUpload"
  style={{
    display: "block",
    padding: "14px",
    border: "2px dashed #10b981",
    borderRadius: "10px",
    textAlign: "center",
    cursor: "pointer",
    background: "#ecfdf5",
    color: "#059669",
    fontWeight: "600",
    marginBottom: "15px",
  }}
>
  📸 Click here to choose your profile photo
</label>

<input
  id="photoUpload"
  type="file"
  accept="image/*"
  style={{ display: "none" }}
  onChange={(e) => setPhoto(e.target.files[0])}
/>

{photo && (
  <p
    style={{
      color: "#16a34a",
      marginBottom: "20px",
    }}
  >
    Selected Photo: {photo.name}
  </p>
)}

<button
  onClick={uploadPhoto}
  style={{
    background: "#10b981",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    marginBottom: "25px",
  }}
>
  Upload Profile Photo
</button>

      <h3>Upload Resume (PDF)</h3>

      <h3
  style={{
    marginTop: "25px",
    marginBottom: "15px",
  }}
>
  📄 Upload Resume (PDF)
</h3>

<label
  htmlFor="resumeUpload"
  style={{
    display: "block",
    padding: "14px",
    border: "2px dashed #2563eb",
    borderRadius: "10px",
    textAlign: "center",
    cursor: "pointer",
    background: "#eff6ff",
    color: "#2563eb",
    fontWeight: "600",
    marginBottom: "15px",
  }}
>
  📁 Click here to choose your resume
</label>

<input
  id="resumeUpload"
  type="file"
  accept=".pdf"
  style={{ display: "none" }}
  onChange={(e) => setResume(e.target.files[0])}
/>

{resume && (
  <p
    style={{
      color: "#16a34a",
      marginBottom: "20px",
    }}
  >
    Selected File: {resume.name}
  </p>
)}

      <br />
      <br />

      <button
        onClick={uploadResume}
        style={{
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  marginRight: "15px",
}}
      >
        Upload Resume
      </button>

      <br />
      <br />

      <button
        onClick={saveProfile}
       style={{
  background: "#10b981",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
}}
      >
        Save Profile
      </button>


      <button
  onClick={() => {
    fetchProfile();
    setEditing(false);
  }}
  style={{
    background: "#e5e7eb",
    color: "#111827",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    marginLeft: "15px",
  }}
>
  Cancel
</button>
        </div>

  )}
</DashboardLayout>
);
}

export default Profile;