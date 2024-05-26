import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmationDialog = ({ open, onClose, onConfirm, msgHead, msgBody }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{msgHead}</DialogTitle>
      <DialogContent>
        <DialogContentText>{msgBody}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmationDialog;
