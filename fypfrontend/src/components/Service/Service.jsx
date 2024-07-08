import React from "react";
import SubHeader from "../Shared/SubHeader";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import img from "../../images/features/baby.png";
import img1 from "../../images/features/img1.jpg";
import img2 from "../../images/features/img2.jpg";
import img4 from "../../images/features/img3.jpg";
import img5 from "../../images/features/img5.jpg";
import img6 from "../../images/features/img4.jpg";

import { Link } from "react-router-dom";
import doctorBg from "../../images/img/doctors-bg.jpg";

const Service = () => {
  const weArePleaseStyle = {
    backgroundColor: "antiquewhite",
    height: "60vh",
    background: `url(${doctorBg}) no-repeat`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    padding: "10px",
    position: "relative",
    marginTop: 50,
    marginBottom: 50,
    
  
  };
  return (
    <>
      <Header />
      <SubHeader
        title="Service"
        subtitle="We empower clinics and doctors with innovative solutions for streamlined operations, enhanced patient care, and secure data management."
      />

      <div className="container" style={{ marginTop: 100, marginBottom: 50 }}>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card shadow border-0 mb-5">
              <img
                src={img}
                alt=""
                className="img-fluid"
                style={{ maxHeight: "17rem", objectFit: "cover" }}
              />
              <div className="p-2">
                <h4 className="mt-4 mb-2">Child Health care</h4>
                <p className="mb-4">
                  Risks to child health include low birth weight, malnutrition,
                  not breast feeding, overcrowded conditions, unsafe drinking
                  water and food and poor hygiene practices.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card shadow border-0 mb-5">
              <img
                src={img1}
                alt=""
                className="img-fluid"
                style={{ maxHeight: "17rem", objectFit: "cover" }}
              />
              <div className="p-2">
                <h4 className="mt-4 mb-2">Dental care</h4>
                <p className="mb-4">
                  To keep your teeth healthy, it is important to remove dental
                  plaque, a sticky, colorless film of bacteria. Plaque buildup
                  can cause tooth decay and gum disease. Even teeth that already
                  have fillings are at risk for tooth decay.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card shadow border-0 mb-5">
              <img
                src={img2}
                alt=""
                className="img-fluid"
                style={{ maxHeight: "17rem", objectFit: "cover" }}
              />
              <div className="p-2">
                <h4 className="mt-4 mb-2">Ear care</h4>
                <p className="mb-4">
                  Good hearing health eliminates the frustration of missing out
                  on conversations and being isolated from social situations
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card shadow border-0 mb-5">
              <img
                src={img4}
                alt=""
                className="img-fluid"
                style={{ maxHeight: "17rem", objectFit: "cover" }}
              />
              <div className="p-2">
                <h4 className="mt-4 mb-2">X-ray</h4>
                <p className="mb-4">
                  Digital X-ray facility at Digitl Clinics save time by allowing
                  imaging to bypass chemical processing and through the ability
                  to digitally transfer and enhance images.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card shadow border-0 mb-5">
              <img
                src={img5}
                alt=""
                className="img-fluid"
                style={{ maxHeight: "17rem", objectFit: "cover" }}
              />
              <div className="p-2">
                <h4 className="mt-4 mb-2">Health care services</h4>
                <p className="mb-4">
                  Health care services are the diagnosis, treatment, and
                  prevention of disease, illness, injury, and other physical and
                  mental impairments in citizens. Health care services are
                  delivered by specialists in medicine.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card shadow border-0 mb-5">
              <img
                src={img6}
                alt=""
                className="img-fluid"
                style={{ maxHeight: "17rem", objectFit: "cover" }}
              />
              <div className="p-2">
                <h4 className="mt-4 mb-2">Vision care</h4>
                <p className="mb-4">
                  Everyone needs to have their eyesight tested to check for
                  vision and eye problems. Children usually have vision
                  screening in school or at their health care provider's office
                  during a checkup.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section style={weArePleaseStyle}>
        <div
          className="container"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            
          }}
        >
          <div className="row">
            <div className="col-lg-7">
              <div className="d-flex align-items-center">
                <div className="mb-4 section-title text-center">
                  <h2 className="text-uppercase">
                    We are ready to help your health problems
                  </h2>
                  <p className="form-text">
                    {" "}
                    Are you looking for a new doctor or don’t know how to best
                    prepare for an appointment? Check out these articles for
                    topics you might want to discuss with your doctor,
                    information on choosing the right doctor for you, and ideas
                    for bringing up sensitive topics with your health care team.
                  </p>
                  <Link to={"/contact"} className="btn-get-started scrollto ">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Service;
