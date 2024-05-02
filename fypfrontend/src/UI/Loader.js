import * as React from "react";
import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";

function Loader() {
  return (
    <LoadingButton
      loading={true}
      variant="outlined"
      fullWidth
      sx={{ mt: 3, mb: 2 }}
    >
      Submitting...
    </LoadingButton>
  );
}
export default Loader;
