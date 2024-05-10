import React, { useEffect } from 'react'
import Footer from '../Shared/Footer/Footer'
import { useForm } from 'react-hook-form';
import { FaLocationArrow, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Header from '../Shared/Header/Header';
import './index.css';
import SubHeader from '../Shared/SubHeader';
import { Button } from 'antd';

const Contact = () => {

    const { register, handleSubmit, reset,getValues } = useForm({});
    const onSubmit = async() => {
        try {
            console.log("contact",getValues())
            const response = await fetch(
                "http://localhost:8080/api/contact/create",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  
                  },
                  body: JSON.stringify(getValues()), 
                },
              );
        } catch (error) {
            console.log("error",error)
        }
        reset();
    };
    
    return (
        <>
            <Header />
            <SubHeader title="Contact us" subtitle="The digitization of clinics is to digitize the manual system of clinics." />
            <section id="contact" className="contact mt-5 mb-5">
                <div className="container" style={{ marginTop: 80, marginBottom: 120 }}>
                    <div className="row">

                        <div className="col-lg-4">
                            <div className="info rounded p-3" style={{ background: '#f8f9fa' }}>
                                <div className="d-flex mb-2 gap-2">
                                    <FaLocationArrow className='icon' />
                                    <div>
                                        <h4>Location:</h4>
                                        <p>Degree College for Girls, Skardu</p>
                                    </div>
                                </div>

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

                        <div className="col-lg-8">
                            <div className="mb-5 p-2 rounded" style={{ background: '#f8f9fa' }}>
                                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>First Name</label>
                                            <input required {...register("firstName")} className="form-control" placeholder='First Name'/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Last Name</label>
                                            <input required {...register("lastName")} className="form-control" placeholder='Last Name'/>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group mb-2 card-label">
                                            <label>Email</label>
                                            <input required {...register("email")} type='email' className="form-control" placeholder="Email" />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group mb-2 card-label">
                                            <label>Subject</label>
                                            <input required {...register("subject")} className="form-control" placeholder="Enter your subject"/>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className='form-label'>Message</label>
                                            <textarea required {...register("message")} className="form-control mb-3" cols="30" rows="10" placeholder="enter your message"/>
                                        </div>
                                    </div>

                                    <div className="text-center mt-3 mb-5">
                                       <Button type="button" onClick={onSubmit}  variant="contained" sx={{ mt: 3, mb: 2 }} >
                                        Sent Message</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container">

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1675201.6768348725!2d73.56297730807671!3d34.909504119191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e463eddd6e4255%3A0x518dcc549077eb8!2sDegree%20College%20for%20Women%20Skardu!5e0!3m2!1sen!2s!4v1714892607877!5m2!1sen!2s" style={{ border: 0, width: "100%", height: "350px" }} frameborder="0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact