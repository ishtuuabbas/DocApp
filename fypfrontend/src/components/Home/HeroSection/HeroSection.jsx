import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section id="hero" className="d-flex align-items-center">
            <div className="container">
                <div>
                    <small>TOTAL HEALTH CARE SOLUTION</small>
                    <h1>Your Most Trusted <br />Health Partner</h1>
                    <small>A trusted health partner for clinic digitization goes beyond simply offering software solutions. They act as a comprehensive guide, understanding the unique needs of clinic and providing solutions that streamline operations, enhance patient care, and ensure data security. This partner should possess a proven track record in the healthcare industry, offering user-friendly technology that integrates seamlessly with existing workflows.</small>
                </div>
                <div className="d-flex justify-content-start gap-2">
                    <Link to={'/appointment'} className="btn-get-started scrollto">Make an Appointment</Link>
                  
                </div>
            </div>
        </section>
    )
}
export default HeroSection;