import React from 'react';
import './index.css';
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaGithubSquare, FaPhoneAlt, FaEnvelope, FaWhatsappSquare  } from "react-icons/fa";

const TopHeader = () => {
    return (
        <div id="topbar" className="d-flex align-items-center fixed-top">
            <div className="container d-flex justify-content-between">
                <div className="contact-info d-flex align-items-center">
                    <FaEnvelope className='contact-icon'/> <a href="ishtuuabbas786@gmail.come">ishtuuabbas786@gmail.com</a>
                    <FaPhoneAlt className='contact-icon'/> <a href="tel:+92-3437714631">+92-3437714631</a> 
                </div>
                <div className="d-none d-lg-flex social-links align-items-center">
                    <a href="https://www.linkedin.com/in/ishrat-abbas-879223253/" target='_blank' rel="noreferrer" className="linkedin"><FaLinkedin /></a>
                    <a href="https://web.whatsapp.com/" target='_blank' rel="noreferrer" className="whatsapp"><FaWhatsappSquare /></a>
                    <a href="https://github.com/ishtuuabbas/DocApp/" target='_blank' rel="noreferrer" className="Github"><FaGithubSquare /></a>
                    <a href="https://www.instagram.com/ishtuuabbas/" target='_blank' rel="noreferrer" className="instagram"><FaInstagramSquare /></a>
                </div>
            </div>
        </div>
    );
};
export default TopHeader;