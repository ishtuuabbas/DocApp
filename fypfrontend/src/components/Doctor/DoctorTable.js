import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import DoctorItem from "./DoctorItem";

function DoctorTable({ doctors, onDoctorDelete }) {
  const navigate = useNavigate();

  const authCtx = React.useContext(AuthContext);

  const addDoctorHandler = () => {
    navigate("/doctor/create");
  };

  return (
    <React.Fragment>
      {doctors.length === 0 && <h3>No Doctors to show!</h3>}
      <Box sx={{ mb: 4, textAlign: "right" }}>
        <Button variant="contained" onClick={addDoctorHandler}>
          Add Doctor
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Specialty</TableCell>
              <TableCell align="right">Experience</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <DoctorItem
                key={doctor.email}
                doctor={doctor}
                onDelete={onDoctorDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default DoctorTable;
