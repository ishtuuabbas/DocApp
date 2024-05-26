import { Checkbox, message } from 'antd';
import { useEffect, useState } from 'react';
import {
   
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack
  } from "@mui/material";

const PersonalInformation = ({ handleChange, selectValue, setPatientId =() =>{},doctors }) => {
    const { name, fatherName, age, phoneNumber, gender, address,doctor } = selectValue;

    return (
        <form className="rounded p-3 mt-5" style={{ background: "#f8f9fa" }}>
            <div className="row">
              

                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label> Name</label>
                        <input onChange={(e) => handleChange(e)} name='name' value={name && name} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Father Name</label>
                        <input onChange={(e) => handleChange(e)} name='fatherName' value={fatherName && fatherName} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Age</label>
                        <input onChange={(e) => handleChange(e)} name='age' value={age && age} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
    <div className="form-group card-label mb-3">
        <label>Gender</label>
        <select value={gender} onChange={(e) => handleChange(e)} name='gender' className="form-control">
            <option value="" disabled>Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
         </select>

    </div>
</div>

                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Phone</label>
                        <input onChange={(e) => handleChange(e)} name='phoneNumber' value={phoneNumber && phoneNumber} className="form-control" type="text" />
                    </div>
                </div>
             
           
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Address</label>
                        <input onChange={(e) => handleChange(e)} name='address' value={address && address} className="form-control" type="text" />
                    </div>
                </div>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          {/* <FormControl fullWidth>
            <InputLabel id="doctor">Doctor</InputLabel>
            <Select
              labelId="doctor"
              id="doctor"
              sx={{ mb: 4 }}
              label="Doctor"
              name="doctor"
              onChange={(e) => handleChange(e)}
              value={doctor}
           
            >
              {doctors.map((doc) => (
                <MenuItem key={doc._id} value={doc._id}>
                  {doc.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <FormControl fullWidth>
  <InputLabel id="doctor">Doctor</InputLabel>
  <Select
    labelId="doctor"
    id="doctor"
    sx={{ mb: 4 }}
    label="Doctor"
    name="doctor"
    onChange={(e) => handleChange(e)}
    value={doctor}
  >
    {doctors.map((doc) => (
      <MenuItem key={doc._id} value={doc._id}>
        {doc.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

        </Stack>
            </div>
        </form>
    )
}

export default PersonalInformation;