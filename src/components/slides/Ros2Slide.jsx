import React from 'react';
import { eventData } from '../../utils/constants';
import './Ros2Slide.css';

const Ros2Slide = ({ isVisible }) => {
  // Duplicate data for infinite scroll effect
  const allEvents = [...eventData, ...eventData];

  return (
    <section className={`slide ${isVisible ? 'is-visible' : ''}`} id="slide-ros2">
      <div className="overlay-gradient event-schedule-blue"></div>
      <div className="content">
        <div className="eyebrow">Fundamentals of Robotics & AI</div>
        <h1>UPCOMING <span>Activity</span></h1>
       

        <div className="events-carousel">
          <div className="events-track">
            {allEvents.map((event, idx) => (
              <div key={idx} className="ros2-event-card">
                <div className="event-tag">{event.type}</div>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>

                <div className="event-details">
                  <div className="event-item">
                    <span>📅</span>
                    <div>
                      <strong>Dates</strong>
                      <p>{event.dates}</p>
                    </div>
                  </div>
                  <div className="event-item">
                    <span>📍</span>
                    <div>
                      <strong>Venue</strong>
                      <p>{event.venue}</p>
                    </div>
                  </div>
                  <div className="event-item">
                    <span>🖥️</span>
                    <div>
                      <strong>Mode</strong>
                      <p>{event.mode}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ros2Slide;