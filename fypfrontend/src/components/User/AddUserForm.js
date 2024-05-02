import React, { useContext } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AuthContext } from "../../store/auth-context";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  role: Yup.string().required("Role is required"),
});

const AddUserForm = ({ isLoading, onSubmitUserData }) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      onSubmitUserData({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      });

      formik.resetForm();
    },
  });

  return (
    <React.Fragment>
      <Box component="div" sx={{ marginBottom: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          ADD USER
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="standard"
            color="primary"
            label="Name"
            {...formik.getFieldProps("name")}
            fullWidth
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            type="email"
            variant="standard"
            color="primary"
            label="Email"
            autoComplete="email"
            {...formik.getFieldProps("email")}
            fullWidth
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="password"
            variant="standard"
            color="primary"
            label="Password"
            autoComplete="new-password"
            {...formik.getFieldProps("password")}
            fullWidth
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <FormControl
            fullWidth
            variant="standard"
            error={formik.touched.role && Boolean(formik.errors.role)}
          >
            <InputLabel id="role">Role</InputLabel>
            <Select
              labelId="role"
              id="role"
              {...formik.getFieldProps("role")}
              sx={{ mb: 4 }}
            >
              <MenuItem value={"user"} defaultChecked>
                User
              </MenuItem>
              {authCtx.user.role === "superadmin" && (
                <MenuItem value={"admin"}>Admin</MenuItem>
              )}
              {authCtx.user.role === "superadmin" && (
                <MenuItem value={"superadmin"}>SuperAdmin</MenuItem>
              )}
            </Select>
          </FormControl>
        </Stack>

        {!isLoading && (
          <Button variant="contained" type="submit">
            Add
          </Button>
        )}

        {isLoading && (
          <LoadingButton
            loading
            loadingIndicator="Creating…"
            variant="outlined"
          >
            Fetch data
          </LoadingButton>
        )}
      </form>
    </React.Fragment>
  );
};

export default AddUserForm;
