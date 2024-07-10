import React from "react";
import img1 from "../../../images/IS/DC.gif";
import "./index.css";
import { Link } from "react-router-dom";

const IS = () => {
  return (
    <section className="section section-IS position-relative">
      <div className="container-fluid">
        <div className="mb-2 section-title text-center">
          <h2>Do you have any questions? </h2>
      <div className="row">
          <div className="IS-con col-lg-6 ps-4 mt-4">
          <p >
          Our support system is round-the-clock! Our 24/7 team is ready to
            assist, ensuring your questions are answered promptly for seamless
            customer satisfaction.
          </p>
          <Link to={"/contact"} className="btn-get-started scrollto ">
                Contact Us
              </Link>
        </div>  
        <div className="Is-img col-lg-6 " >  
            <img className="IS-img"src={img1} alt="" />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IS;
