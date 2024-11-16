import { useEffect, useState } from "react";
import "./index.css";

import { Link } from "react-router-dom";
import img from "../../../images/logo.png";

import HeaderNav from "./HeaderNav";

const Header = () => {
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
   
      <header id="header" className={`fixed-top ${!show && "stickyHeader"}`}>
        <div className="container d-flex align-items-center">
          <Link to={"/"} className="logo me-auto">
            <img src={img} alt="" className="img-fluid" />
          </Link>
          <HeaderNav open={open} setOpen={setOpen} />
          <Link to={"/appointment"} className="appointment-btn scrollto">
            <span className="d-none d-md-inline">Make an</span> Appointment
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
