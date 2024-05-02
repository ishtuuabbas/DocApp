import { TableCell, TableRow } from "@mui/material";
import React from "react";

const BioItem = ({ patientRecord }) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {patientRecord.bloodPressure}
      </TableCell>
      <TableCell align="right">{patientRecord.temperature}</TableCell>
      <TableCell align="right">{patientRecord.spo}</TableCell>
      <TableCell align="right">{patientRecord.respiratoryRate}</TableCell>
      <TableCell align="right">{patientRecord.pulsus}</TableCell>
      <TableCell align="right">{patientRecord.diabetes}</TableCell>
      <TableCell align="right">{patientRecord.pregnancy}</TableCell>
      <TableCell align="right">{patientRecord.hypertension}</TableCell>
      <TableCell align="right">{patientRecord.IHD}</TableCell>
      <TableCell align="right">{patientRecord.hepatitis}</TableCell>
      <TableCell align="right">{patientRecord.previousSurgery}</TableCell>
      <TableCell align="right">{patientRecord.medication}</TableCell>
    </TableRow>
  );
};

export default BioItem;
