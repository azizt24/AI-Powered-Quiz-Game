import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";


const Footer = () => {
  //const Auth = useAuth();

  return (
    <footer className="footer">
      <div className="footerContainer">
        <div className="row">
          <div className="footer-col">
            <h4>Pages</h4>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/blogs">Blogs</NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>get help</h4>
            <ul>
              <li>
                <NavLink to="/contact-us">Contact Us</NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Accounts</h4>
            <ul>
              {!Auth.userLogin ? (
                <li>
                  <NavLink to="/sign-in">Sign In</NavLink>
                </li>
              ) : (
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;