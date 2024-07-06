import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loader from "../../UI/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";


const defaultTheme = createTheme();

function SignupForm({ onSubmitLoginData, isLoading }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    }),
    onSubmit: (values) => {
      // Handle login logic here
      onSubmitLoginData({
        email: values.email,
        password: values.password,
      });
    },
  });
  return (
    <>
    <Header />
    {/* <div className="container" style={{ marginBottom: 100, marginTop: 100 }}></div> */}
   
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs"style={{ marginBottom: 100, marginTop: 300 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="div" sx={{ marginBottom: 2, marginTop: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Welocome Back!
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              autoFocus={true}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Add onBlur event handler
              value={formik.values.email}
              sx={{ marginBottom: 3 }}
            />

            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Add onBlur event handler
              value={formik.values.password}
            />
            {!isLoading && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            )}
            {isLoading && <Loader />}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
   
   
    <Footer />
    </>
  );
}

export default SignupForm;
