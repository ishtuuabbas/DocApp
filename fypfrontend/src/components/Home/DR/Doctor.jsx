// src/components/Doctor.js
import React from 'react';

const Doctor = ({ doctor }) => {
  return (
    <div className="doctor-card bg-[#9ae7ff] p-3 pb-0 rounded-tl-[100px] rounded-br-[100px] lg:rounded-tl-[130px] lg:rounded-br-[120px] overflow-hidden">
      <img className="min-w-[180px]" src={doctor.img} alt={doctor.name} />
      <div className="pb-5 pt-3">
        <h5 className="font-bold">{doctor.name}</h5>
        <p className="text-sm">{doctor.job}</p>
      </div>
    </div>
  );
};

export default Doctor;
