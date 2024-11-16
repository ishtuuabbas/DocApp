import React from "react";
import Footer from "../Shared/Footer/Footer";
import { useForm } from "react-hook-form";
import { FaLocationArrow, FaEnvelope, FaPhoneAlt, FaPeopleArrows, FaUser } from "react-icons/fa";
import Header from "../Shared/Header/Header";
import "./index.css";
import SubHeader from "../Shared/SubHeader";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constant/url";
import Img1 from "../../images/img/developer.jpeg";

const Contact = () => {
  const { register, handleSubmit, reset, getValues } = useForm({});
  const navigate = useNavigate();
  const onSubmit = async () => {
    try {
      // console.log("contact",getValues())
      const response = await fetch(
        BASE_URL+"/api/contact/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getValues()),
      });
      alert("Message send successfully");
      navigate("/");
    } catch (error) {
      console.log("error", error);
      alert("Message can't Send");
    }
    reset();
  };

  return (
    <>
      <Header />
      <SubHeader
        title="Contact us"
        subtitle="The digitization of clinics is to digitize the manual system of clinics."
      />
      <section id="contact" className="contact mt-5 mb-5">
        <div className="container" style={{ marginTop: 60, marginBottom: 50 }}>
          <div className="row">
            <div className="col-lg-4">
              <div
                className="info rounded p-2"
                style={{ background: "#f8f9fa" }}
              >
              <div className="d-flex mb-2 gap-2">
                  <FaUser className="icon" />
                  <div>
                    <h4>About Developer</h4>
                    <p>Ishrat Fatima </p>
                    <img src={Img1} alt="" className="img1-fluid rounded shadow" />
                  </div>
                </div>
                <div className="d-flex mb-2 gap-2">
                  <FaPhoneAlt className="icon" />
                  <div>
                    <h4>Call:</h4>
                    <p>+92 3437 714631</p>
                  </div>
                </div>
                <div className="d-flex mb-2 gap-2">
                  <FaEnvelope className="icon" />
                  <div>
                    <h4>Email:</h4>
                    <p>ishtuuabbas786@gmail.com</p>
                  </div>
                </div>

                <div className="d-flex mb-2 gap-2">
                  <FaLocationArrow className="icon" />
                  <div>
                    <h4>Location:</h4>
                    <p>Govt Girls Degree College, Skardu</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-lg-8">
              <div
                className="mb-5 p-2 rounded"
                style={{ background: "#f8f9fa" }}
              >
                <form
                  className="row form-row"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="col-md-6">
                    <div className="form-group mb-2 card-label">
                      <label>First Name</label>
                      <input
                        required
                        {...register("firstName")}
                        className="form-control"
                        placeholder="First Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-2 card-label">
                      <label>Last Name</label>
                      <input
                        required
                        {...register("lastName")}
                        className="form-control"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group mb-2 card-label">
                      <label>Email</label>
                      <input
                        required
                        {...register("email")}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group mb-2 card-label">
                      <label>Subject</label>
                      <input
                        required
                        {...register("subject")}
                        className="form-control"
                        placeholder="Enter your subject"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea
                        required
                        {...register("message")}
                        className="form-control mb-1"
                        cols="30"
                        rows="10"
                        placeholder="enter your message"
                      />
                    </div>
                  </div>

                  <div className="text-end mx-3">
                    <Button
                      size="large"
                      className="btn-get-started scrollto"
                      onClick={onSubmit}
                    >
                      Sent Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13025.499880227904!2d75.6375301!3d35.2966633!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e46355072d0649%3A0x46ebeb0c9b3e6ef1!2sDoctors%20Hospital%20Skardu!5e0!3m2!1sen!2s!4v1720555470708!5m2!1sen!2s"
              width="1100"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
