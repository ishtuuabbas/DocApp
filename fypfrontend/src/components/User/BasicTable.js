import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserItem from "./UserItem";
import { AuthContext } from "../../store/auth-context";

function BasicTable({ users, onUserDelete }) {
  const navigate = useNavigate();

  const authCtx = React.useContext(AuthContext);
  const rabcSuperAdmin =
    authCtx.isLoggedIn && authCtx.user.role === "superadmin";
  const rabcAdmin = authCtx.isLoggedIn && authCtx.user.role === "admin";

  const addUserHandler = () => {
    navigate("/user/create");
  };

  return (
    <React.Fragment>
      {users.length === 0 && <h3>No users to show!</h3>}
      <Box sx={{ mb: 4, textAlign: "right" }}>
        {rabcSuperAdmin && rabcAdmin && (
          <Button variant="contained" onClick={addUserHandler}>
            Add User
          </Button>
        )}
      </Box>
      <hr/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role</TableCell>
              {rabcSuperAdmin && <TableCell align="right">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <UserItem key={user.email} user={user} onDelete={onUserDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default BasicTable;
