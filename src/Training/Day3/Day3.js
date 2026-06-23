import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../Day.css';
import API_BASE_URL from "../../config";

export default function Day3() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

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
        if (data.progress && data.progress["3"]) {
          setCompleted(data.progress["3"].completed === true);
        }
      } catch (err) {
        console.error("Failed to fetch progress", err);
      }
    };

    fetchProgress();
  }, []);

  const handleComplete = () => {
    window.dispatchEvent(new Event("progressUpdate"));
    navigate("/courses/5g-training/day3/test");
  };

  const handleBackToCourse = () => {
    navigate("/courses/5g-training");
  };

  return (
    <div className="page-container">
      <div className="dashboard-header-wrapper">
        <header className="dashboard-header">
          <div className="dashboard-nav-container">
            <nav className="dashboard-nav">
              <div className="logo-wrap">
                <img src="/images/Logo.png" alt="RoboHub Logo" />
              </div>
              <div className="dashboard-auth-buttons">
                <button className="button-secondary" onClick={handleBackToCourse}>
                  <i className="fas fa-arrow-left"></i> Back To Course
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <div className="page-header">
        <span className="page-label">Day 3</span>
        <h1>Manipulator <span>Kinematics</span> & <span>Transformation</span></h1>
        <p className="page-subtitle">
          Learn the mathematical foundations of robotic motion, coordinate systems, and D-H parameters.
        </p>
      </div>

      <div className="main-container page-content">
        <div className="content-card">
          <div className="content-details">
            <h3>Fundamentals of Kinematics</h3>
            <p>
              Kinematics studies the motion of robots without considering the forces causing it. It is the core mathematical framework required to determine the position, orientation, and velocity of a robotic end-effector.
            </p>
            <ul>
              <li><strong>Forward Kinematics:</strong> Given the joint angles, find the position and orientation of the end-effector.</li>
              <li><strong>Inverse Kinematics:</strong> Given the desired end-effector position, calculate the necessary joint angles to reach it.</li>
            </ul>
            
          </div>
        </div>

        <div className="content-card">
          <div className="content-details">
            <h3>Coordinate Transformations</h3>
            <p>
              Robots exist in 3D space, requiring rigorous mathematical methods to describe how parts relate to each other:
            </p>
            <ul>
              <li><strong>Rotation Matrices:</strong> Define the orientation of one coordinate frame relative to another.</li>
              <li><strong>Homogeneous Transformation Matrix:</strong> A 4x4 matrix combining rotation and translation to represent complete spatial relationships.</li>
            </ul>

            <h3>Denavit–Hartenberg (D-H) Parameters</h3>
            <p>
              The D-H method is the industry standard for systematically assigning coordinate frames to each link of a serial manipulator. It simplifies the complex geometry of a robot into four parameters:
            </p>
            <ul>
              <li><strong>Link length (a)</strong> and <strong>Link twist (α)</strong></li>
              <li><strong>Link offset (d)</strong> and <strong>Joint angle (θ)</strong></li>
            </ul>
            
          </div>
        </div>

        <div className="content-card">
          <div className="content-details">
            <h3>Differential Kinematics & Jacobian</h3>
            <p>
              While standard kinematics deals with positions, <strong>Differential Kinematics</strong> deals with velocities. The <strong>Jacobian Matrix</strong> is essential here, as it maps joint velocities to end-effector velocities.
            </p>
            <h3>Engineering Formulations</h3>
            <div className="formula-box" style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "6px", borderLeft: "4px solid #007bff" }}>
              <p><strong>Rotation Matrix (2D):</strong> R = [[cosθ, -sinθ], [sinθ, cosθ]]</p>
              <p><strong>Jacobian Relationship:</strong> v = J(q) · q̇</p>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button className="button button-primary" onClick={handleBackToCourse}>
            <i className="fas fa-arrow-left"></i> Back to Course
          </button>
          <button
            className="button button-secondary"
            onClick={() => { if (!completed) handleComplete(); }}
            disabled={completed}
          >
            {completed ? "Assessment Completed" : "Take Assessment"} <i className="fas fa-check-circle"></i>
          </button>
        </div>
      </div>
    </div>
  );
}