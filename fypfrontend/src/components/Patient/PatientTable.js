import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Typography,
  TablePagination,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PatientItem from "./PatientItem";
import { AuthContext } from "../../store/auth-context";
import { transferPatientsToBackend } from "../../utils/indexDB/patientUtils";

function PatientTable({ patients, onPatientDelete }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const authCtx = useContext(AuthContext);

  const rabcSuperAdmin =
    authCtx.isLoggedIn && authCtx.user.role === "superadmin";

  const addPatientHandler = () => {
    navigate("/patient/create");
  };

  // Function to filter patients based on the search query
  const filteredPatients = patients.filter((patient) =>
    patient?.ptn?.includes(searchQuery),
  );

  const displayedPatients = filteredPatients.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const syncHandler = async () => {
    await transferPatientsToBackend(authCtx);
  };

  return (
    <React.Fragment>
      {patients.length === 0 && (
        <Typography variant="h6">No patients to show!</Typography>
      )}
      <Box sx={{ textAlign: "right" }}>
        <Button variant="contained" onClick={addPatientHandler}>
          Add Patient
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: 2 }}
          onClick={syncHandler}
        >
          Upload Offline Data
        </Button>
      </Box>
      <Box sx={{ mb: 4 }}>
        <TextField
          label="Search by PTN"
          variant="standard"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "30%" }} // Adjust the width as needed
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tracking No#</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Father's Name</TableCell>
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Gender</TableCell>
              {rabcSuperAdmin && <TableCell align="left">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedPatients.map((patient) => (
              <PatientItem
                key={patient.ptn}
                patient={patient}
                onDelete={onPatientDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredPatients.length} // Count based on filtered patients
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </React.Fragment>
  );
}

export default PatientTable;
