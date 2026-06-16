import React from 'react';
import './Ros2Slide.css';

const Ros2Slide = ({ isVisible }) => {
  return (
    <section className={`slide ${isVisible ? 'is-visible' : ''}`} id="slide-ros2">
      <div className="overlay-gradient event-schedule-blue"></div>
      <div className="content">
        <div className="eyebrow">Fundamentals of Robotics & AI</div>
        <h1>UPCOMING <span>Activity</span></h1>
        <p className="desc">
          This 36-hour program delivers a deep dive into the synergy between robotic hardware and
          intelligent software. Students start with the essentials of <strong>sensors, drivers, and
            specialized grippers</strong>, moving quickly into the complex <strong>kinematics of
              manipulators</strong> to master precise motion control. The course then shifts to the
          intelligence layer, covering <strong>Artificial Intelligence fundamentals</strong> such
          as <strong>problem-solving through search</strong> and <strong>knowledge representation
            and reasoning</strong>. By analyzing diverse <strong>robot applications</strong>, you
          will learn to deploy simulation-driven workflows that solve real-world automation
          challenges. This curriculum is designed to transform beginners into skilled developers
          ready for the autonomous systems industry.
        </p>
        <div className="ros2-event-card">
          <div className="event-item">
            <span>📅</span>
            <div>
              <strong>Dates</strong>
              <p> July 2026</p>
            </div>
          </div>
          <div className="event-item">
            <span>📍</span>
            <div>
              <strong>Venue</strong>
              <p>MIT, MAHE – Yelahanka Campus</p>
            </div>
          </div>
          <div className="event-item">
            <span></span>
            <div>
              <strong>Mode</strong>
              <p>Onsite</p>
            </div>
          </div>
        </div>
        {/* <p className="ros2-deadline">
          ⏳ Last date to apply: <strong>10th April 2026</strong>
        </p> */}
        {/* <p className="ros2-warning">
          ⚠️ Seats are limited — secure your spot now
        </p> */}
        
        {/* <button className="btn" onClick={() => window.location.href = '/images/Poster.jpg'}>
          View Poster 📄
        </button> */}
      </div>
    </section>
  );
};

export default Ros2Slide;