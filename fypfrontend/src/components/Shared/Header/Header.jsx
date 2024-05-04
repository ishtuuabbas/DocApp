import { useEffect, useState } from 'react';
import './index.css';

import TopHeader from '../TopHeader/TopHeader';
import { Link,  } from 'react-router-dom';
import img from '../../../images/logo.png';

import HeaderNav from './HeaderNav';

const Header = () => {
 
 
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);

    // const lastScrollRef = useRef(0);
    const handleScroll = () => {
        const currentScroll = window.scrollY;
        // if (currentScroll > lastScrollRef.current) { // Undo scroll up effect
        if (currentScroll > 50) {
            setShow(false);
        } else {
            setShow(true);
        }
        // lastScrollRef.current = currentScroll;
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return (() => window.removeEventListener('scroll', handleScroll));
    }, [])

   


    return (
        <>
            <div className={`navbar navbar-expand-lg navbar-light ${!show && "hideTopHeader"}`} expand="lg">
                <TopHeader />
            </div>
            <header id="header" className={`fixed-top ${!show && "stickyHeader"}`}>
                <div className="container d-flex align-items-center">

                    <Link to={'/'} className="logo me-auto">
                        <img src={img} alt="" className="img-fluid" />
                    </Link>
                    <HeaderNav 
                        open={open} setOpen={setOpen} />
                    <Link to={'/appointment'} className="appointment-btn scrollto"><span className="d-none d-md-inline">Make an</span> Appointment</Link>
                </div>
            </header>
        </>
    )
}

export default Header