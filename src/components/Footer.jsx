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
          
          {/* Box 3: WhatsApp (Forced to 300px width) */}
          <div className="footer-item" style={{ width: '300px' }}>
            <i className="fab fa-whatsapp"></i>
            <p>
              <a
                href="https://chat.whatsapp.com/Co5LRIi0JhTGWUXOmH2TfH?s=sw&p=i&ilr=4&amv=2"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
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