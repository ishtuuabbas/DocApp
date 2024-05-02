import * as React from "react";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

function Error({ msg }) {
  return (
    <Snackbar open={true} autoHideDuration={6000}>
      <Alert severity="error" sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
export default Error;
