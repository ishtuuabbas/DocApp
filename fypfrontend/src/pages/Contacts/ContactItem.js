
import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";


const ContactItem = ({ contact,  }) => {




  return (
    <TableRow
      key={contact.email}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {contact?.firstName + contact?.lastName}
      </TableCell>
      <TableCell align="right">{contact?.email}</TableCell>
      <TableCell align="right">{contact?.subject}</TableCell>
      <TableCell align="right">{contact?.message}</TableCell>
  
    </TableRow>
  );
};

export default ContactItem;
