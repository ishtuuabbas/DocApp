import React, { useContext, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlertContext } from "../../store/alert-context";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import { BASE_URL } from "../../constant/url";
const UserItem = ({ user, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State for confirmation modal

  const ctx = useContext(AlertContext);
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const rabcSuperAdmin =
    authCtx.isLoggedIn && authCtx.user.role === "superadmin";

  const userDeleteHandler = () => {
    setIsConfirmationOpen(true); // Show the confirmation modal
  };

  const confirmDeleteHandler = async () => {
    setIsConfirmationOpen(false); // Close the confirmation modal
    try {
      setIsLoading(true);
      const response = await fetch(
        BASE_URL+ `/api/user/delete/${user._id}`,
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
      onDelete(user._id);
      ctx.setSuccess(responseData.message);
    } catch (err) {
      setIsLoading(false);
      ctx.setError(err.message || "Something went wrong!");
    }
  };

  const cancelDeleteHandler = () => {
    setIsConfirmationOpen(false); // Close the confirmation modal
  };

  return (
    <TableRow
      key={user.email}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {user.name}
      </TableCell>
      <TableCell align="right">{user.email}</TableCell>
      <TableCell align="right">{user.role}</TableCell>
      {rabcSuperAdmin && (
        <TableCell align="right">
          <IconButton
            aria-label="delete"
            color="error"
            onClick={userDeleteHandler}
          >
            <DeleteIcon />
          </IconButton>
          {/* Confirmation Modal */}
          <Dialog open={isConfirmationOpen} onClose={cancelDeleteHandler}>
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this User?
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelDeleteHandler}>Cancel</Button>
              <Button onClick={confirmDeleteHandler} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </TableCell>
      )}
    </TableRow>
  );
};

export default UserItem;
