
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AuthContext } from "../../store/auth-context";

import ContactItem from "./ContactItem";
// import { Button } from "antd";

function ContactTable({ contacts ,onContactDelete}) {
  // const authCtx = React.useContext(AuthContext);
  // const rabcSuperAdmin=
  //   authCtx.isLoggedIn && authCtx.contact.role === "superadmin";
 
  
  // Check if contacts is undefined or empty
  if (!contacts || contacts.length === 0) {
    return <h3>No contacts to show!</h3>;
  } 
  
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Subject</TableCell>
              <TableCell align="right">Message</TableCell>
              <TableCell align="right">Actions</TableCell>
              
               {/* {rabcSuperAdmin && <TableCell align="right">Actions</TableCell>} */}
              
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <ContactItem 
              key={contact.email} 
              contact={contact} 
              onDelete={onContactDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default ContactTable;

