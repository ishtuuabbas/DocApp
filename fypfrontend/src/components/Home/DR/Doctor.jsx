// src/components/Doctor.js
import React from 'react';
import doc1 from '../../../images/img/avator1.png';

const Doctor = ({ doctor }) => {
  return (
    <div className="doctor-card bg-[#9ae7ff] p-2 pb-0 rounded-tl-[100px] rounded-br-[100px] lg:rounded-tl-[130px] lg:rounded-br-[120px] overflow-hidden">
      <img className="min-w-[180px]" src={doc1} alt={doctor.name} />
      <div className="pb-5 pt-3">
        <h5 className="font-bold">{doctor?.name}</h5>
        <p className="text-sm">{doctor?.specialty}</p>
      </div>
      
    </div>
  );
};

export default Doctor;
