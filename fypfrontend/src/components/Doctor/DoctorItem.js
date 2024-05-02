import React, { Fragment, useContext, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlertContext } from "../../store/alert-context";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

const DoctorItem = ({ doctor, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const ctx = useContext(AlertContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const doctorDeleteHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://doctorapp-gagm.onrender.com/api/doctor/delete/${doctor._id}`,
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
      onDelete(doctor._id);
      ctx.setSuccess(responseData.message);
      closeDeleteModal(); // Close the modal after successful deletion
    } catch (err) {
      setIsLoading(false);
      ctx.setError(err.message || "Something went wrong!");
    }
  };

  return (
    <TableRow
      key={doctor.email}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {doctor.name}
      </TableCell>
      <TableCell align="right">{doctor.email}</TableCell>
      <TableCell align="right">{doctor.specialty}</TableCell>
      <TableCell align="right">{doctor.experience}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="delete" color="error" onClick={openDeleteModal}>
          <DeleteIcon />
        </IconButton>
        {/* Delete Confirmation Modal */}
        <Dialog
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this doctor?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteModal} color="primary">
              Cancel
            </Button>
            <Button onClick={doctorDeleteHandler} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        {/* End Delete Confirmation Modal */}
      </TableCell>
    </TableRow>
  );
};

export default DoctorItem;
