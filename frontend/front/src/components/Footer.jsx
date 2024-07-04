import "../styles/Footer.css";
import iglogo from '../assets/instagram.png';
import fblogo from '../assets/facebook.png';
import lnlogo from '../assets/linkedin.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="socialIcons">
          <li className="socialIconItem">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={iglogo} alt="Instagram logo" />
              <span className="socialText">@suiteescape</span>
            </a>
          </li>
          <li className="socialIconItem">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={fblogo} alt="Facebook logo" />
              <span className="socialText">Suite Escape</span>
            </a>
          </li>
          <li className="socialIconItem">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={lnlogo} alt="Linkedin logo" />
              <span className="socialText">Suite Escape</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="fText">Copyright © 2024 SuiteEscape.</div>
    </div>
  );
}

export default Footer;
