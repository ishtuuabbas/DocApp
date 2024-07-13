import React, { useEffect, useState } from 'react';
import Doctor from './Doctor';
import { DoctorsData } from './DoctorsData'; // Adjust the path as needed
import './Doctor.css';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { BASE_URL } from '../../../constant/url';
const DoctorsSection = () => {
  const [doctors,setDoctors] =useState([])
  const getDoctors = async () => {
    try {
      let { data } = await axios.get(
        BASE_URL+"/api/doctors");
      console.log("doctor data");
      setDoctors(data?.allDoctors);
    } catch (error) {}
  };
  useEffect(() => {
    getDoctors();
  }, []);
  return (
    <section className="container" style={{ marginTop: 100 }}>
      <div className="section-title text-center">
        <h2>{DoctorsData.heading}</h2>
      </div>
      <div className=" flex justify-between gap-10 overflow-auto px-5 md:p-0">
        <Swiper
                spaceBetween={2}
                slidesPerView={4}
                modules={[Navigation, Autoplay]}
                loop={true}
                centeredSlides={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
            >
                    {doctors.map((doctor, index) => (
                        <SwiperSlide  className='my-2'>                               
                        <Doctor key={index} doctor={doctor} />
                            
                        </SwiperSlide>
                      ))}
            </Swiper>
        {/* {doctors.map((doctor, index) => (
          <Doctor key={index} doctor={doctor} />
        ))} */}
      </div>
      
    </section>
  );
};

export default DoctorsSection;
