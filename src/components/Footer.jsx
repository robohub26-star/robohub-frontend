import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer" className="site-footer">
      <div className="footer-container">
        <h2 className="footer-title">GET IN TOUCH</h2>
        
        {/* Container centered via flexbox */}
        <div className="footer-grid" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px' }}>
          
          {/* Box 1: Email (Forced to 300px width) */}
          <div className="footer-item" style={{ width: '300px' }}>
            <i className="fas fa-envelope"></i>
            <p>
              <a href="mailto:ceo@robohub.org.in">ceo@robohub.org.in</a>
            </p>
          </div>
          
          {/* Box 2: Linkedin (Forced to 300px width to match perfectly) */}
          <div className="footer-item" style={{ width: '300px' }}>
            <i className="fab fa-linkedin"></i>
            <p>
              <a
                href="https://www.linkedin.com/in/robohub-enablement-and-advisory-technologies-12a0443ba"
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </a>
            </p>
          </div>
          
          {/* Box 3: Phone (Forced to 300px width) */}
          <div className="footer-item" style={{ width: '300px' }}>
            <i className="fas fa-phone"></i>
            <p>
              <a href="tel:+917899770470" style={{ display: 'block', marginBottom: '8px' }}>
                +91 78997 70470
              </a>
              <a href="tel:+919003310312" style={{ display: 'block' }}>
                +91 90033 10312
              </a>
            </p>
          </div>
          
        </div>
        
        <p className="footer-copy">© 2026 RoboHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;