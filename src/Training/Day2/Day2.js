import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../Day.css";
import API_BASE_URL from "../../config";

export default function Day2() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  // Load completion state from backend API for Day 2
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
        if (data.progress && data.progress["2"]) {
          setCompleted(data.progress["2"].completed === true);
        }
      } catch (err) {
        console.error("Failed to fetch progress", err);
      }
    };

    fetchProgress();
  }, []);

  const handleComplete = () => {
    // Dispatch event to update progress in Dashboard/Training
    window.dispatchEvent(new Event("progressUpdate"));
    navigate("/courses/5g-training/day2/test");
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

      {/* Page Header */}
      <div className="page-header">
        <span className="page-label">Day 2</span>
        <h1>Sensors, <span>Drives</span> & <span>Robotic Grippers</span></h1>
        <p className="page-subtitle">
          Master physical sensing devices, joint actuation systems, and end-effector gripper design.
        </p>
      </div>

      {/* Main Content */}
      <div className="main-container page-content">
        
        {/* Content Block 1: Robotic Sensors & Characteristics */}
        <div className="content-card">
          <div className="content-details">
            <h3>Introduction to Robotic Sensors</h3>
            <p>
              Sensors translate environmental physical quantities into readable electrical signals, preventing robots from acting as blind, non-adaptive hardware systems. They enable closed-loop feedback crucial for perception, path adjustment, and local decision-making.
            </p>
            
            <h3>Sensor Classifications</h3>
            <ul>
              <li>
                <strong>Internal Sensors:</strong> Measure state parameters of the robot itself. Examples include potentiometers, encoders, and LVDTs for mapping joint position, alongside tachometers for managing velocity feedback.
              </li>
              <li>
                <strong>External Sensors:</strong> Monitor the external surroundings. This group encompasses non-contact proximity sensors (inductive, capacitive, ultrasonic, infrared), tactile touch arrays, and force or torque wrist assemblies.
              </li>
            </ul>

            <h3>Sensing Device Performance Characteristics</h3>
            <p>
              Deploying industrial sensors requires matching the operating domain against critical operational behaviors:
            </p>
            <ul>
              <li>
                <strong>Range & Sensitivity:</strong> Range determines operational boundary limits (max/min boundaries). Sensitivity establishes the ratio matching change in sensor output against changes in input parameters.
              </li>
              <li>
                <strong>Precision Metrics:</strong> Encompasses absolute accuracy (closeness to truth values), resolution (minimal readable step size change), and repeatability (consistency across looping trials).
              </li>
              <li>
                <strong>Signal Alterations:</strong> Systems must monitor performance limitations like response time delays, signal drift trends over prolonged usage, and unwanted environmental noise interference.
              </li>
            </ul>
          </div>
        </div>

        {/* Content Block 2: Actuation Drives & End-Effector Grippers */}
        <div className="content-card">
          <div className="content-details">
            <h3>Robotic Drive Systems</h3>
            <p>
              Drives generate localized joint movement. Selecting a configuration directly reshapes overall payload threshold capabilities, speed ceilings, and path consistency:
            </p>
            <ul>
              <li>
                <strong>Electric Drives:</strong> Utilize electric servo/stepper motors. Favored in assembly environments due to excellent precision scaling, quiet operation profiles, and simple controller loop structures.
              </li>
              <li>
                <strong>Hydraulic Drives:</strong> Driven via pressurized fluid systems. Ideal for massive payload handling demands despite baseline fluid containment leakage issues and intensive hardware service schedules.
              </li>
              <li>
                <strong>Pneumatic Drives:</strong> Dependent on compressed air delivery. Offers rapid actuation cycles and low acquisition barriers, though limited by lower absolute position precision thresholds.
              </li>
            </ul>

            <h3>Mechanical Grippers & End Effectors</h3>
            <p>
              Grippers function directly as a robot's hands to handle objects securely. Industrial solutions scale across distinct mechanical architectures:
            </p>
            <ul>
              <li>
                <strong>Mechanical Fingers:</strong> Utilize targeted mechanical linkages (2-finger, 3-finger, or multi-jointed variants) using active actuation to grasp geometric shapes.
              </li>
              <li>
                <strong>Magnetic & Vacuum Grippers:</strong> Magnetic types streamline sheet metal manipulation tasks for ferromagnetic workpieces. Vacuum cup mechanisms use active atmospheric suction distribution to lift smooth, flat, or highly fragile workpieces.
              </li>
            </ul>

            <h3>Core Engineering Formulations</h3>
            <div className="formula-box" style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "6px", margin: "15px 0", borderLeft: "4px solid #28a745" }}>
              <p style={{ margin: "5px 0" }}><strong>Sensor Range</strong> = Maximum Measurable Value − Minimum Measurable Value</p>
              <p style={{ margin: "5px 0" }}><strong>Sensitivity</strong> = Δ Output / Δ Input</p>
              <p style={{ margin: "5px 0" }}><strong>Accuracy Error</strong> = | True Value − Measured Value |</p>
              <p style={{ margin: "5px 0" }}><strong>Grasping Force (F_g)</strong> = Weight (W) / Friction Coefficient (μ)</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
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
              if (!completed) handleComplete();
            }}
            disabled={completed}
          >
            {completed ? "Assessment Completed" : "Take Assessment"}{" "}
            <i className="fas fa-check-circle"></i>
          </button>
        </div>
      </div>
    </div>
  );
}