import React from "react";
import GrowthTrend from "../../components/Patient/PatientStats/GrowthTrend";
import { TotalNumBox } from "../../components/Patient/PatientStats/TotalNumBox";
import Demographic from "../../components/Patient/PatientStats/Demographic";
import AgeDistribution from "../../components/Patient/PatientStats/AgeDistribution";
import GenderRatio from "../../components/Patient/PatientStats/GenderRatio";
import FlexInit from "../../UI/FlexInit";

const ClinicStats = () => {
  return (
    <div>
      <div>
        <h1 className="text-4xl mt-8 font-bold text-dash-blue ">
          
          Dashboard
        </h1>
      </div>
      <FlexInit>
        <TotalNumBox val={"patient"} url={"patient"} />
        <TotalNumBox val={"male"} url={"doctors"} />
       
      </FlexInit>
      <FlexInit>
        <GrowthTrend />
        <AgeDistribution />
      </FlexInit>
      <FlexInit>
        <GenderRatio />
      </FlexInit>
    </div>
  );
};

export default ClinicStats;
