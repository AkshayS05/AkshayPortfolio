import "./footer.css";
import logo from "../../../public/brand_logo.png"; // Update the path to your logo

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="footer-text">
        &copy; {new Date().getFullYear()} akshaysharma.tech All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
