import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../Day.css"; // Updated CSS file
import API_BASE_URL from "../../config";

export default function Day1() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  // Load completion state from localStorage
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/progress/progress`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) return;

        const data = await res.json();

        if (data.progress && data.progress["1"]) {
          setCompleted(data.progress["1"].completed === true);
        } else {
          setCompleted(false);
        }
      } catch (err) {
        console.error("Failed to fetch progress", err);
      }
    };

    fetchProgress();
  }, []);

  const handleComplete = () => {
    // Dispatch custom event so Training.js & Dashboard update immediately
    window.dispatchEvent(new Event("progressUpdate"));

    navigate("/courses/5g-training/day1/test");
  };

  const handleBackToCourse = () => {
    navigate("/courses/5g-training");
  };

  return (
    <div className="page-container">
      {/* Header / Navbar */}
      <div className="dashboard-header-wrapper">
        <header className="dashboard-header">
          <div className="dashboard-nav-container">
            <nav className="dashboard-nav">
              <div className="logo-wrap">
                {/* Ensure your logo image path is correct, matching Training.js */}
                <img src="/images/Logo.png" alt="RoboHub Logo" />
              </div>
              <div className="dashboard-auth-buttons">
                <button
                  className="button-secondary"
                  onClick={handleBackToCourse}
                >
                  <i className="fas fa-arrow-left"></i> Back To Course
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <div className="page-header">
        <span className="page-label">Day 1</span>
        <h1>Introduction to <span>Robotics</span> & <span>Anatomy</span> </h1>
        <p className="page-subtitle">
          Explore basic robotic configurations, industial specifications, and core performance parameters.
        </p>
      </div>

      {/* Main Content */}
      <div className="main-container page-content">
        {/* Content Block 1 */}
        <div className="content-card">
          <div className="content-details">
            <h3>Foudations of Robotics</h3>
            <p>
              A robot is a programmable electro-mechnical machine engineered to interact with the physical world using mechanical structures,actuators,sensors, and intelligent control systems. The study of robotics is highly interdisciplinary, merging mechanics, electronics,computer science and artificial intelligence.
            </p>



            <h3>Geometrical Configurations (Anatomy)</h3>
            <ul>
              <li>
                <strong>Cartesian Robots:</strong> Operates across three mutually perpendicular linear axes (X, Y, Z) via prismatic joints, mapping out a box-shaped workspace with excellent positional accuracy.
              </li>
              <li>
                <strong>SCARA Robots:</strong>Utilizing parallel rotary joints combined with vertical linear motion, these are ideal for high-speed, high-precision horizontal assembly .
              </li>
              <li>
                <strong>Articulated Robots:</strong>Mimicking the human arm with rotary joints, they possess 4 to 6 Degrees of Freedom (DOF), providing massive flexibility for complex tasks like welding and painting .
              </li>
              <li>
                <strong>Parallel Robots:</strong> Employs multiple kinematic chains tracking simultaneously to an end effector, generating extreme stiffness, precision, and acceleration over small workspaces.
              </li>
            </ul>
            <h3>Controlled Systems & Kinematic Chains</h3>
            <p>
              Manipulators are generally separated into <strong>Serial Manipulators</strong> (links connected sequentially from base to end effector, offering wider reach but accumulated joint errors) and <strong>Parallel Manipulators</strong> (multiple concurrent supports avoiding error stacking, maximizing rigidity) .
            </p>
          </div>
        </div>

        {/* Content Block 2 */}
        <div className="content-card">
          <div className="content-details">
            <h3>Industrial Specifications</h3>
            <p>
              Evaluating a robotic system for deployment relies on core baseline metrics:
              <strong> Degrees of Freedom (DOF)</strong> defining independent directional capabilities,
              <strong> Workspace (Work Envelope)</strong> denoting operational limits, and
              <strong> Payload Capacity</strong> specifying safe weight restrictions.
            </p>
            <h3>Precision of Movement</h3>
            <ul>
              <li>
                <strong>Resolution:</strong>The smallest measurable step increment that a robotic control system can execute or perceive.
              </li>
              <li>
                <strong>Accuracy:</strong> The absolute margin of error between a target coordinate point and the actual position reached by the end effector.
              </li>
              <li>
                <strong>Repeatability:</strong> The ability of a robotic mechanism to consistently return to the exact same position under identical conditions across thousands of cycles.
              </li>
            </ul>
            <h3>Core Engineering Formulations</h3>
            <div className="formula-box" style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "6px", margin: "15px 0", borderLeft: "4px solid #007bff" }}>
              <p style={{ margin: "5px 0" }}><strong>Accuracy Error</strong> = | Desired Position – Actual Position |</p>
              <p style={{ margin: "5px 0" }}><strong>Repeatability Error</strong> = | Repeated Position – Mean Position |</p>
              <p style={{ margin: "5px 0" }}><strong>Resolution</strong> = Range of Motion / Number of Control Increments</p>
              <p style={{ margin: "5px 0" }}><strong>Torque (τ)</strong> = Force (F) × Radius (r)</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-container">
          <button
            className="button button-primary"
            onClick={handleBackToCourse}
          >
            <i className="fas fa-arrow-left"></i> Back to Course
          </button>
          <button
            className="button button-secondary"
            onClick={() => {
              if (!completed) {
                handleComplete(); // Only allow navigation if not completed
              }
            }}
            disabled={completed} // properly disables the button
          >
            {completed ? "Assessment Completed" : "Take Assessment"}{" "}
            <i className="fas fa-check-circle"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
