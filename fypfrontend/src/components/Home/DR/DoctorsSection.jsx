import React from 'react';
import Doctor from './Doctor';
import { DoctorsData } from './DoctorsData'; // Adjust the path as needed
import './Doctor.css';

const DoctorsSection = () => {
  return (
    <section className="container" style={{ marginTop: 100 }}>
      <div className="section-title text-center">
        <h2>{DoctorsData.heading}</h2>
      </div>
      <div className=" flex justify-between gap-10 overflow-auto px-5 md:p-0">
        {DoctorsData.doctors.map((doctor, index) => (
          <Doctor key={index} doctor={doctor} />
        ))}
      </div>
    </section>
  );
};

export default DoctorsSection;
