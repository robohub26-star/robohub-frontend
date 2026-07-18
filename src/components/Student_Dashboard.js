import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Dashboard.css";
import API_BASE_URL from "../config";

const COLAB_NOTEBOOK_URL =
  "https://colab.research.google.com/drive/18gHeTN2KlLxKUAYttVF8DhXbKeWL654J?usp=sharing";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [fullName] = useState(
    sessionStorage.getItem("fullName") || "Student"
  );

  useEffect(() => {
    const authToken = sessionStorage.getItem("token") || token;
    if (!authToken) {
      navigate("/login");
    }
  }, [navigate, token]);

  const handleOpenNotebook = () => {
    window.open(COLAB_NOTEBOOK_URL, "_blank", "noopener,noreferrer");
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
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("fullName");
    sessionStorage.removeItem("role");
    navigate("/");
  };

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
          Robotics <span>Essentials</span>
        </h1>
        <p className="dashboard-subtitle">
          A 3-Hour Workshop on Understanding Fundamentals Through Virtual Simulation
        </p>

        {/* Notebook Card */}
        <div className="course-progress-card" style={{ maxWidth: "600px", margin: "0 auto 24px" }}>
          <span className="badge">Lab</span>
          <h3>Fundamental of Robotics</h3>
          <p>
            Click below to open your notebook in a new tab. Complete the
            exercises there at your own pace.
          </p>
          <button className="primary-btn" onClick={handleOpenNotebook}>
            <i className="fas fa-external-link-alt" style={{ marginRight: "8px" }}></i>
            Open Notebook
          </button>
        </div>
      </div>
    </div>
  );
}