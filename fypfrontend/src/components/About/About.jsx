import React from "react";
import "./index.css";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";
import ImageHeading from "../../images/doc/doctor 5.jpg";
import SubHeader from "../Shared/SubHeader";
import AvailableServiceContent from "../Home/AvailableFeatures/AvailableServiceContent";

const About = () => {
  return (
    <>
      <Header />
      <SubHeader
        title="about us"
        subtitle="This aims to streamline the manual clinic system and digitize the paperwork process.."
      />
      <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
        <div className="row p-5">
          <div className="col-lg-4">
            <div className="section-title text-center">
              <h2 className="text-uppercase">Our Doctors</h2>
              <p className="form-text m-0">Never stop learning....</p>
            </div>
            <p className="mt-3">
              Doctors need to be willing and able learners to survive and thrive
              as medical professionals. They must embrace change because it's
              happening all around us, every day, and as a physician, you should
              be as prepared as possible.
            </p>
          </div>

          <div className="col-lg-8">
            <img
              src={ImageHeading}
              alt=""
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{ marginBottom: 100, marginTop: 100 }}
      ></div>

      <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
        <div className="row align-items-center">
          <div className="col-lg-4">
            <div className="section-title text-center">
              <h2 className="text-uppercase">THE MISSION</h2>
              <p className="form-text m-0">
                "Our mission is to revolutionize healthcare delivery by 
                seamlessly integrating digital technologies into clinics,
                empowering healthcare professionals with efficient tools for
                patient care, enhancing accessibility, accuracy, and quality of
                medical services, while fostering a patient-centric approach
                that prioritizes convenience, transparency, and holistic
                well-being."
              </p>
            </div>
          </div>
          <div className="col-lg-8">
          <AvailableServiceContent/>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="mb-4 section-title text-center">
              <h2 className="text-uppercase">Meet Our Specialist</h2>
              <p className="form-text m-0">
                Introducing our specialist in clinic digitization, equipped to
                streamline and modernize healthcare practices for enhanced
                efficiency and patient care.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container say-about"
        style={{ marginBottom: 100, marginTop: 100 }}
      >
        <div className="row">
          <div className="col-lg-6 offset-lg-6">
            <div className="mb-4 section-title text-center">
              <h2 className="text-uppercase">Vision Statement</h2>
              <p className="form-text m-0">
                <q>
                  Our vision is to revolutionize healthcare delivery through
                  seamless digitization of clinics, fostering a future where
                  every patient experiences personalized, efficient, and
                  accessible care. By harnessing cutting-edge technology, we aim
                  to create a connected ecosystem that empowers healthcare
                  professionals, enhances patient outcomes, and promotes
                  proactive wellness management. Through our commitment to
                  innovation and collaboration, we envision a healthcare
                  landscape where digitized clinics serve as hubs of holistic
                  care, breaking down barriers and advancing the standard of
                  healthcare worldwide.
                </q>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
