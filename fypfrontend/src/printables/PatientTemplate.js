import React, { useState } from "react";
import classes from "./PatientTemplate.module.css";
import logo from "./logo.png";

const PatientTemplate = React.forwardRef(
  ({ patientData, patientHealthInfo, doctorNames }, ref) => {
    function formatDate(date) {
      const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];

      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `${day} ${month} ${year}`;
    }

    const newDate = new Date(); // Get the current date
    const currentDate = formatDate(newDate);

    const doctorList = doctorNames.find(
      (doctor) => doctor.id === patientData.selectedDoctor
    );
    const doctor = doctorList?.name;

    return (
      <div className={classes.containerDiv} ref={ref}>
        <header className={classes.header}>
          <div className={classes.logoDiv}>
            <img src={logo} alt="logo" className={classes.logo} />
          </div>
          <div className={classes.mainText}>
            <h1 className={classes.clinicName}>Doctor's</h1>
            <h2 className={classes.sologan}>Prescription Form</h2>
          </div>
        </header>

        <div className={classes.mainDiv}>
          <div className={classes.bio}>
            <div className={classes.bioItem}>
              <span className={classes.bioKey}>Tracking Number:</span>
              <span className={classes.bioValue}>{patientData.ptn}</span>
            </div>
            <div className={classes.bioItem}>
              <span className={classes.bioKey}>Visit Number:</span>
              <span className={classes.bioValue}>
                {patientData.visitNumber}
              </span>
            </div>
            <div className={classes.bioItem}>
              <span className={classes.bioKey}>Name:</span>
              <span className={classes.bioValue}>{patientData.name}</span>
            </div>
            <div className={classes.bioItem}>
              <span className={classes.bioKey}>Father's Name:</span>
              <span className={classes.bioValue}>{patientData.fatherName}</span>
            </div>
            <div className={classes.bioItem}>
              <span className={classes.bioKey}>Phone:</span>
              <span className={classes.bioValue}>
                {patientData.phoneNumber}
              </span>
            </div>
            <div className={classes.bioItem}>
              <span className={classes.bioKey}>Gender:</span>
              <span className={classes.bioValue}>{patientData.gender}</span>
            </div>
            <div className={classes.bioItem}>
              <span className={classes.bioKey}>CNIC:</span>
              <span className={classes.bioValue}>{patientData.cnicNumber}</span>
            </div>
            <div className={classes.bioItem}>
              <span className={classes.bioKey}>Date:</span>
              <span className={classes.bioValue}>{currentDate}</span>
            </div>
            <div className={classes.bioItem}>
              <span className={classes.bioKey}>Address:</span>
              <span className={classes.bioValue}>{patientData.address}</span>
            </div>
            <div className={classes.bioItem}>
              <span className={classes.bioKey}>Age:</span>
              <span className={classes.bioValue}>{patientData.age}</span>
            </div>
            <div className={classes.bioItem}>
              <span className={classes.bioKey}>Doctor:</span>
              <span className={classes.bioValue}>{doctor}</span>
            </div>
            <div className={classes.bioItem}>
              <span className={classes.bioKey}>Token:</span>
              <span className={classes.bioValue}>{patientData.token}</span>
            </div>
          </div>
        </div>
        <div className={classes.bottomBody}>
          <div className={classes.sideInfo}>
            <div className={classes.infoContainer}>
              <div className={classes.infoItem}>
                <span className={classes.infoKey}>BP:</span>
                <span className={classes.infoValue}>
                  {patientHealthInfo.bloodPressure} mmHg
                </span>
              </div>
              <div className={classes.infoItem}>
                <span className={classes.infoKey}>Tempt:</span>
                <span className={classes.infoValue}>
                  {patientHealthInfo.temperature} °C
                </span>
              </div>
              <div className={classes.infoItem}>
                <span className={classes.infoKey}>RR:</span>
                <span className={classes.infoValue}>
                  {patientHealthInfo.respiratoryRate} b/m
                </span>
              </div>
              <div className={classes.infoItem}>
                <span className={classes.infoKey}>Pulsus:</span>
                <span className={classes.infoValue}>
                  {patientHealthInfo.pulsus} bts/m
                </span>
              </div>
              <div className={classes.infoItem}>
                <span className={classes.infoKey}>Diabetes:</span>
                <span className={classes.infoValue}>
                  {patientHealthInfo.diabetes}
                </span>
              </div>
              {patientHealthInfo.diabetes === "Yes" && (
                <div className={classes.infoItem}>
                  <span className={classes.infoKey}>Diabetes Type:</span>
                  <span className={classes.infoValue}>
                    {patientHealthInfo.diabetesType}
                  </span>
                </div>
              )}
              {patientData.gender === "Female" && (
                <div className={classes.infoItem}>
                  <span className={classes.infoKey}>Pregnancy:</span>
                  <span className={classes.infoValue}>
                    {patientHealthInfo.pregnancy}
                  </span>
                </div>
              )}
              <div className={classes.infoItem}>
                <span className={classes.infoKey}>HTN:</span>
                <span className={classes.infoValue}>
                  {patientHealthInfo.hypertension}
                </span>
              </div>
              <div className={classes.infoItem}>
                <span className={classes.infoKey}>IHD:</span>
                <span className={classes.infoValue}>
                  {patientHealthInfo.IHD}
                </span>
              </div>
              <div className={classes.infoItem}>
                <span className={classes.infoKey}>Hepatitis:</span>
                <span className={classes.infoValue}>
                  {patientHealthInfo.hepatitis}
                </span>
              </div>
              <div className={classes.infoItem}>
                <span className={classes.infoKey}>Previous Surgery:</span>
                <span className={classes.infoValue}>
                  {patientHealthInfo.previousSurgery}
                </span>
              </div>
              <div className={classes.infoItem}>
                <span className={classes.infoKey}>Pre Medication:</span>
                <span className={classes.infoValue}>
                  {patientHealthInfo.preMedication}
                </span>
              </div>
            </div>
          </div>
          <div className={classes.whiteSpace}></div>
        </div>
        <footer className={classes.footer}>
          <div className={classes.footerPara}>
            Copyright © 2024. All rights reserved
          </div>
        </footer>
      </div>
    );
  }
);

export default PatientTemplate;
