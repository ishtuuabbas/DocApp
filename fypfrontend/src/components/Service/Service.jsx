import React from 'react'
import SubHeader from '../Shared/SubHeader'
import Footer from '../Shared/Footer/Footer'
import Header from '../Shared/Header/Header'
import img from '../../images/features/baby.png'
import img1 from '../../images/features/img1.jpg'
import img2 from '../../images/features/img2.jpg'
import img4 from '../../images/features/img3.jpg'
import img5 from '../../images/features/img5.jpg'
import img6 from '../../images/features/img4.jpg'

import { Link } from 'react-router-dom'
import doctorBg from '../../images/img/doctors-bg.jpg';

const Service = () => {
  const weArePleaseStyle = {
    backgroundColor: "antiquewhite",
    height: "60vh",
    background: `url(${doctorBg}) no-repeat`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    padding: "10px",
    position: "relative",
    marginTop: 200,
    marginBottom: 100
  }
  return (
    <>
      <Header />
      <SubHeader title="Service" subtitle="We empower clinics and doctors with innovative solutions for streamlined operations, enhanced patient care, and secure data management." />

      <div className="container" style={{ marginTop: 200, marginBottom: 100 }}>
        <div className="row">
          
              <div className="col-lg-4 col-md-6 col-sm-6" >
                <div className="card shadow border-0 mb-5">
                  <img src={img} alt="" className="img-fluid" style={{ maxHeight: '17rem', objectFit: 'cover' }} />
                  <div className="p-2">
                    <h4 className="mt-4 mb-2">Child care</h4>
                    <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                  </div>
                </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6" >
                <div className="card shadow border-0 mb-5">
                  <img src={img1} alt="" className="img-fluid" style={{ maxHeight: '17rem', objectFit: 'cover' }} />
                  <div className="p-2">
                    <h4 className="mt-4 mb-2">Dental care</h4>
                    <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                  </div>
                </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6" >
                <div className="card shadow border-0 mb-5">
                  <img src={img2} alt="" className="img-fluid" style={{ maxHeight: '17rem', objectFit: 'cover' }} />
                  <div className="p-2">
                    <h4 className="mt-4 mb-2">Ear care</h4>
                    <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6" >
                <div className="card shadow border-0 mb-5">
                  <img src={img4} alt="" className="img-fluid" style={{ maxHeight: '17rem', objectFit: 'cover' }} />
                  <div className="p-2">
                    <h4 className="mt-4 mb-2">X-ray care</h4>
                    <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                  </div>
                </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6" >
                <div className="card shadow border-0 mb-5">
                  <img src={img5} alt="" className="img-fluid" style={{ maxHeight: '17rem', objectFit: 'cover' }} />
                  <div className="p-2">
                    <h4 className="mt-4 mb-2">BP care</h4>
                    <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                  </div>
                </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6" >
                <div className="card shadow border-0 mb-5">
                  <img src={img6} alt="" className="img-fluid" style={{ maxHeight: '17rem', objectFit: 'cover' }} />
                  <div className="p-2">
                    <h4 className="mt-4 mb-2">Eye care</h4>
                    <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                  </div>
                </div>
              </div>
        </div>
      </div>

      <section style={weArePleaseStyle}>
        <div className="container" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <div className="row">
            <div className="col-lg-7">
              <div className="d-flex align-items-center">
                <div className='mb-4 section-title text-center'>
                  <h2 className='text-uppercase'>We are ready to help your health problems</h2>
                  <p className='form-text'> There are many things can be done to help relieve the symptoms of illness or injury,and improve recovery. Positive thinking , relaxation, a healthy diet, regular exercise, good 
                  sleep and social support can all promote health and wellbeing.</p>
                  <Link to={'/doctors'} className="btn-get-started scrollto">Get Started</Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </>
  )
}

export default Service