import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BioItem from "./BioItem";

export default function BioTable({ patientData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Blood Pressure</TableCell>
            <TableCell align="right">Temperature</TableCell>
            {/* <TableCell align="right">SpO2</TableCell> */}
            <TableCell align="right">Respiratory Rate</TableCell>
            <TableCell align="right">Pulsus</TableCell>
            <TableCell align="right">Diabetes</TableCell>
            <TableCell align="right">Pregnancy</TableCell>
            <TableCell align="right">Hypertension</TableCell>
            <TableCell align="right">Ischemic Heart Disease</TableCell>
            <TableCell align="right">Hepatitis</TableCell>
            <TableCell align="right">Previous Surgery</TableCell>
            <TableCell align="right">Medication</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientData.map((patient) => (
            <BioItem key={patient._id} patientRecord={patient} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
