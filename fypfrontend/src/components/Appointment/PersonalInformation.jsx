import { Checkbox, message } from 'antd';
import { useEffect, useState } from 'react';
import "./index.css";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack
} from "@mui/material";

const PersonalInformation = ({ handleChange, selectValue, setPatientId = () => {}, doctors }) => {
    const { name, fatherName, age, phoneNumber, gender, address, doctor, email } = selectValue;
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^(\+92|0)?3[0-9]{2}[0-9]{7}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        handleChange(e);
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const handlePhoneChange = (e) => {
        const phoneNumber = e.target.value;
        handleChange(e);
        if (!validatePhoneNumber(phoneNumber)) {
            setPhoneError('Please enter a valid phone number.');
        } else {
            setPhoneError('');
        }
    };

    return (
        <form className="rounded p-3 mt-5" style={{ background: "#f8f9fa" }}>
            <div className='scrollable-container'>
                <div className="row content">
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group card-label mb-3">
                            <label>Name</label>
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
                            <input onChange={(e) => handleChange(e)} name='age' value={age && age} className="form-control" type="number" />
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
                            <label>Email</label>
                            <input onChange={handleEmailChange} name='email' value={email && email} className="form-control" type="email" />
                            {emailError && <div className="error-message" style={{ color: 'red' }}>{emailError}</div>}
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group card-label mb-3">
                            <label>Phone</label>
                            <input onChange={handlePhoneChange} name='phoneNumber' value={phoneNumber && phoneNumber} className="form-control" type="text" />
                            {phoneError && <div className="error-message" style={{ color: 'red' }}>{phoneError}</div>}
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group card-label mb-3">
                            <label>Address</label>
                            <input onChange={(e) => handleChange(e)} name='address' value={address && address} className="form-control" type="text" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PersonalInformation;
