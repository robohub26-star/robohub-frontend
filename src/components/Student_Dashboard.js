import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Dashboard.css";
import API_BASE_URL from "../config";

const KINEMATICS_NOTEBOOK_URL =
  "https://drive.google.com/drive/folders/1o3Ur9XFs6NihuzqvxCJi2vyRz6wqbpoM?usp=sharing";
const COLAB_NOTEBOOK_URL =
  "https://colab.research.google.com/drive/18gHeTN2KlLxKUAYttVF8DhXbKeWL654J?usp=sharing";

const CERTIFICATE_URL =
  "https://drive.google.com/drive/folders/1Nwx6cKbT1SW-bmxYkYIQoHIBDkJPg_ns?usp=drive_link";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [token, setToken] = useState(
    () => sessionStorage.getItem("token") || localStorage.getItem("token")
  );

  const [fullName] = useState(
    () =>
      sessionStorage.getItem("fullName") ||
      localStorage.getItem("fullName") ||
      "Student"
  );

  // Require explicit string "true" to render certificate
  const [canDownloadCertificate, setCanDownloadCertificate] = useState(() => {
    const certSession = sessionStorage.getItem("canDownloadCertificate");
    const certLocal = localStorage.getItem("canDownloadCertificate");

    return certSession === "true" || certLocal === "true";
  });

  useEffect(() => {
    const authToken =
      sessionStorage.getItem("token") ||
      localStorage.getItem("token") ||
      token;

    if (!authToken) {
      navigate("/login");
      return;
    }

    setToken(authToken);

    const certSession = sessionStorage.getItem("canDownloadCertificate");
    const certLocal = localStorage.getItem("canDownloadCertificate");

    setCanDownloadCertificate(certSession === "true" || certLocal === "true");
  }, [navigate, token]);

  const handleOpenNotebook = () => {
    window.open(COLAB_NOTEBOOK_URL, "_blank", "noopener,noreferrer");
  };

  const handleOpenCertificate = () => {
    window.open(CERTIFICATE_URL, "_blank", "noopener,noreferrer");
  };

  const handleLogout = async () => {
    const authToken = sessionStorage.getItem("token") || token;

    if (authToken) {
      try {
        await fetch(`${API_BASE_URL}/api/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
      } catch (err) {
        console.error("Logout API failed:", err);
      }
    }

    setToken(null);
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  };

  if (!token) {
    return null;
  }

  return (
    <div className="dashboard-page-wrapper">
      {/* Navbar */}
      <div className="dashboard-header-wrapper">
        <header className="dashboard-header">
          <div className="dashboard-nav-container">
            <nav className="dashboard-nav">
              <div className="logo-wrap">
                <img src="/images/Logo.png" alt="RoboHub Logo" />
              </div>
              <div className="dashboard-auth-buttons">
                <span className="student-name">{fullName}</span>
                <button className="button-secondary" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-container">
        <h1 className="dashboard-title">
          Kinematics <span>of Manipulators</span>
        </h1>
        <p className="dashboard-subtitle">
          5 Hours Curriculum-Tailored Course on Robotics Kinematics with Interactive Widgets
        </p>

        {/* Notebook Card (Visible to ALL logged-in students) */}
        <div
          className="course-progress-card"
          style={{ maxWidth: "600px", margin: "0 auto 24px" }}
        >
          <span className="badge">Lab</span>
          <h3>Kinematics of Manipulators</h3>
          <p>
            Click below to open your notebook in a new tab. Complete the
            exercises there at your own pace.
          </p>
          <button className="primary-btn" onClick={handleOpenNotebook}>
            <i
              className="fas fa-external-link-alt"
              style={{ marginRight: "8px" }}
            ></i>
            Open Notebook
          </button>
        </div>

        {/* Certificate Card (ONLY visible if canDownloadCertificate is TRUE) */}
        {canDownloadCertificate && (
          <div
            className="course-progress-card"
            style={{ maxWidth: "600px", margin: "0 auto 24px" }}
          >
            <span
              className="badge"
              style={{ backgroundColor: "#ecfdf5", color: "#059669" }}
            >
              Certificate
            </span>
            <h3>Workshop Certificate</h3>
            <p>
              Access your official completion certificate. Click below to view and
              download your file from Google Drive.
            </p>
            <button
              className="primary-btn"
              onClick={handleOpenCertificate}
              style={{ backgroundColor: "#10b981", borderColor: "#10b981" }}
            >
              <i
                className="fas fa-download"
                style={{ marginRight: "8px" }}
              ></i>
              Download Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}