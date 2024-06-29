import { useEffect, useState } from "react";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";

import PersonalInformation from "./PersonalInformation";
import { Button, Steps, message } from "antd";
import moment from "moment";
import SelectApppointment from "./SelectApppointment";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import SubHeader from "../Shared/SubHeader";

let initialValue = {
  name:'', fatherName:'', age:'', phoneNumber:'', gender:'', address:"", doctor:'',email:''
};

const AppointmentPage = () => {
  const [current, setCurrent] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectTime, setSelectTime] = useState("");
  const [selectValue, setSelectValue] = useState(initialValue);
  const [IsDisable, setIsDisable] = useState(true);
  const [isConfirmDisable, setIsConfirmDisable] = useState(true);
  const [patientId, setPatientId] = useState("");
  const [doctorData, setDoctorData] = useState("");
const navigate=useNavigate()
  const handleChange = async (e) => {
    setSelectValue({ ...selectValue, [e.target.name]: e.target.value });
  };

  const getDoctors = async () => {
    try {
      let { data } = await axios.get("http://localhost:8080/api/doctors");
      console.log("doctor data");
      setDoctorData(data?.allDoctors);
    } catch (error) {}
  };
  useEffect(() => {
    getDoctors();
  }, []);
  const next = () => {
    if (selectTime === "" || selectedDate === "") {
      //show alert date and time must be seelceted
    } else {
      setCurrent(current + 1);
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    const { name, fatherName, age, phoneNumber, doctor } = selectValue;
    const isInputEmpty =
      !name || !fatherName || !age || !phoneNumber || !doctor;

    setIsDisable(isInputEmpty);
  }, [selectValue]);

  const handleConfirmSchedule = async () => {
    try {
      const { name, fatherName, age, phoneNumber, gender, address, doctor ,email} =
        selectValue;
      await axios.post("http://localhost:8080/api/appointment/create", {
        name,
        fatherName,
        age,
        phoneNumber,
        gender,
        address,
        doctor,
        status: "Pending",
        appointmentDate: selectedDate,
        appointmentTime: selectTime,
        email
      });
      alert("appointment created successfully")
      navigate('/')
    } catch (error) {
      console.log("error", error);
      alert("appointment can't created")
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(moment(date).format("YYYY-MM-DD"));
  };

  const steps = [
    {
      title: "Select Appointment Date & Time",
      content: (
        <SelectApppointment
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectTime={selectTime}
          setSelectTime={setSelectTime}
        />
      ),
    },
    {
      title: "Patient Information",
      content: (
        <PersonalInformation
          handleChange={handleChange}
          selectValue={selectValue}
          // setPatientId={setPatientId}
          doctors={doctorData}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <Header />
      <SubHeader
        title="Appointment"
        subtitle="This aims to reduce patient waiting times and save time for both patients and doctors by using an online appointment system.."
      />
      <div className="container" style={{ marginTop: "8rem", bottom: "5rem" }}>
        <div
          className="container"
          style={{ marginBottom: "12rem", marginTop: "8rem" }}
        >
          <Steps current={current} items={items} />
          <div className="mb-5 mt-3 mx-3">{steps[current].content}</div>
          <div className="text-end mx-3">
            {current < steps.length - 1 && (
              <Button
                // type="primary "
                className="btn btn-primary px-3"
                size="large"
                disabled={selectTime === "" || selectedDate === ""}
                onClick={() => next()}
              >
                Next
              </Button>
            )}

            {current === steps.length - 1 && (
              <Button
                // type="primary"
                className="btn btn-primary px-3"
                size="large"
                loading={false}
                onClick={() => handleConfirmSchedule()}
              >
                Confirm
              </Button>
            )}
            {current > 0 && (
              <Button
                // style={{ margin: "0 8px" }}
                className="btn btn-dark px-3"
                size="large"
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppointmentPage;
