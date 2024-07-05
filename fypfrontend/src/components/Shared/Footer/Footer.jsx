import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import img from "../../../images/logo.png";
import {
  FaEnvelope,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaPhoneAlt,
  FaWhatsappSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer position-relative">
      <div className="footer-bottom">
        <div className="container-fluid">
          <div className="copyright">
            <div className="row">
           
              <div class="col-lg-4 col-md-6 footer-about">
                <div className="footer-logo">
					 <img src={img} alt="logo" />
				</div>
                 
               <span class="sitename text-black">
                 "Digitizing clinics improves patient care by streamlining
                  operations, enhancing data management, facilitating better
                  access to patient records, and making appointment scheduling
                  more efficient."
				  </span>
        			  
                   </div>

              {/*  */}
              <div class="col-lg-2 col-md-3">
			  <div className="copyright-menu">
                <h4><b>Useful Links</b></h4>
                <ul>
                  <li>
                    <a href="#" className="text-black">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-black">
                      About us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-black">
                      Services
                    </a>
                  </li>
                  <li>
                    <Link to={"/"} className="text-black">
                      Terms of service
                    </Link>
                  </li>
                  <li>
                    <Link to={"/"} className="text-black">
                      Privacy policy
                    </Link>
                  </li>
                </ul>
              </div>
			  </div>

              <div class="col-lg-2 col-md-3">
			  <div className="copyright-menu">
                <h4><b>Our Services</b></h4>
                <ul>
                  <li>
                    <Link to={"/"} className="text-black">
					Cardiology                    
					</Link>
                  </li>
                  <li>
                    <Link to={"/"} className="text-black">
					Dentistry
                    </Link>
                  </li>
                  <li>
                    <Link to={"/"} className="text-black">
					Neurology
                    </Link>
                  </li>
                  <li>
                    <Link to={"/"} className="text-black">
					Orthopedics
                    </Link>
                  </li>
                  <li>
                    <Link to={"/"} className="text-black">
					Surgery                 
					   </Link>
                  </li>
                </ul>
              </div>
			  </div>
              <div className="col-lg-2 col-md-3">
                <div className="copyright-menu">
                  <h4>
                    <b>Follow Us</b>
                  </h4>
                 
                  <ul className="d-none d-lg-flex social-links align-items-center">
                    <li className="Social-Icon">
                      <a
                        href="https://www.linkedin.com/in/ishrat-abbas-879223253/"
                        target="_blank"
                        rel="noreferrer"
                        className="linkedin"
                      >
                        <FaLinkedin />
                      </a>
                    </li>
                    <li className="Social-Icon">
                      <a
                        href="https://www.facebook.com/p/Govt-Girls-Degree-College-Skardu-100064667592957/"
                        target="_blank"
                        rel="noreferrer"
                        className="Facebook"
                      >
                        <FaFacebookSquare />
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a
                        href="https://web.whatsapp.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="whatsapp"
                      >
                        <FaWhatsappSquare />
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a
                        href="https://github.com/ishtuuabbas/DocApp/"
                        target="_blank"
                        rel="noreferrer"
                        className="Github"
                      >
                        <FaGithubSquare />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/ishtuuabbas/"
                        target="_blank"
                        rel="noreferrer"
                        className="instagram"
                      >
                        <FaInstagramSquare />
                      </a>
                    </li>
                  </ul>
                     <div className="d-flex mb-2 gap-2">
                                    <FaEnvelope className='icon' />
                                    <div>
                                        <h4>Email:</h4>
                                        <p>ishtuuabbas786@gmail.com</p>
                                    </div>
                                </div>

                     <div className="d-flex mb-2 gap-2">
                                    <FaPhoneAlt className='icon' />
                                    <div>
                                        <h4>Call:</h4>
                                        <p>05815-960245</p>
                                    </div>
                                </div>
                </div>
              </div>
            </div>
		
          </div>
        </div>
        <div className="IS-row">
				<marquee behavior="" direction="left">
				       <p>
                          Copyright {new Date().getFullYear()} All Rights
                          Reserved
                        </p>
                   
				</marquee>
			</div>
      </div>
    </footer>
  );
};

export default Footer;
