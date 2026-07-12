const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const path = require("path");


const applicantRoutes = require("./routes/applicantRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const verifyToken = require("./middleware/authMiddleware");
const adminRoutes = require("./routes/adminRoutes");
const adminApplicationRoutes = require("./routes/adminApplicationRoutes");
const adminJobRoutes = require("./routes/adminJobRoutes");
const photoRoutes = require("./routes/photoRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Routes
console.log("AUTH");
app.use("/api/auth", authRoutes);

console.log("APPLICANTS");
app.use("/api/applicants", applicantRoutes);

console.log("PROFILE");
app.use("/api/profile", profileRoutes);

console.log("RESUME");
app.use("/api/resume", resumeRoutes);

app.use("/api/photo", photoRoutes);

console.log("JOBS");
app.use("/api/jobs", jobRoutes);

app.use("/api/dashboard", dashboardRoutes);

console.log("ALL ROUTES LOADED");

app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/admin/applications", adminApplicationRoutes);
app.use("/api/admin/jobs", adminJobRoutes);

app.use("/uploads", express.static("uploads"));

// Home Route
app.get("/", (req, res) => {
    res.send("Cloud Job Applicant Management System Backend Running...");
});

// Database Test Route
app.get("/test-db", (req, res) => {
    db.query("SELECT 1", (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database Connection Failed",
                error: err,
            });
        }

        res.json({
            message: "Database Connected Successfully",
            result,
        });
    });
});

// Protected Route
// Protected Route
console.log("Before Protected Route");

app.get("/api/profile", verifyToken, (req, res) => {
    res.json({
        success: true,
        message: "Protected Route Access Granted",
        user: req.user,
    });
});

console.log("After Protected Route");

const PORT = process.env.PORT || 5000;

console.log("Before Listen");

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

console.log("After Listen");