import React, { Fragment, useContext, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlertContext } from "../../store/alert-context";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const PatientItem = ({ patient, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State for confirmation modal

  const ctx = useContext(AlertContext);
  const authCtx = useContext(AuthContext);

  const rabcSuperAdmin =
    authCtx.isLoggedIn && authCtx.user.role === "superadmin";

  const navigate = useNavigate();

  const patientEditHandler = async () => {
    navigate(`/patient/edit/${patient._id}`);
  };

  const openConfirmationModal = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationOpen(false);
  };

  const patientDeleteHandler = async () => {
    closeConfirmationModal(); // Close the confirmation modal before proceeding with deletion

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/patient/delete/${patient._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        },
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      onDelete(patient._id);
      ctx.setSuccess(responseData.message);
    } catch (err) {
      ctx.setError(err.message || "Something went wrong!");
      setIsLoading(false);
    }
  };

  const linkStyles = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <Fragment>
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": {
            border: 0,
          },
          textDecoration: "none",
        }}
      >
        <TableCell component="th" scope="row">
          <Link to={`/patient/detail/${patient._id}`} style={linkStyles}>
            {patient.ptn}
          </Link>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link to={`/patient/detail/${patient._id}`} style={linkStyles}>
            {patient.name}
          </Link>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link to={`/patient/detail/${patient._id}`} style={linkStyles}>
            {patient.fatherName}
          </Link>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link to={`/patient/detail/${patient._id}`} style={linkStyles}>
            {patient.age}
          </Link>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link to={`/patient/detail/${patient._id}`} style={linkStyles}>
            {patient.gender}
          </Link>
        </TableCell>

        {rabcSuperAdmin && (
          <TableCell align="left">
            <IconButton aria-label="edit" onClick={patientEditHandler}>
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={openConfirmationModal}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={isConfirmationOpen}
        onClose={closeConfirmationModal}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Patient</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this patient?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationModal} color="primary">
            Cancel
          </Button>
          <Button onClick={patientDeleteHandler} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default PatientItem;
