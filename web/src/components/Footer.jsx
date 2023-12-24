const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="nav-links">
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
        <a href="/faq">FAQs</a>
        <a href="/terms">Terms & Conditions</a>
      </div>
      <div className="copyright">
        &copy; Copyright {new Date().getFullYear()} Public Docs. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

// footer is open for any kind of creativity
// we will also do experiments with color scheme of the application
