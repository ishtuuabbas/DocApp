import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const ContactItem = ({ contact, onDelete }) => {
  const handleDelete = () => {
    onDelete(contact._id);
  };

  return (
    <TableRow
      key={contact.email}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {contact?.firstName + " " + contact?.lastName}
      </TableCell>
      <TableCell align="right">{contact?.email}</TableCell>
      <TableCell align="right">{contact?.subject}</TableCell>
      <TableCell align="right">{contact?.message}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ContactItem;
