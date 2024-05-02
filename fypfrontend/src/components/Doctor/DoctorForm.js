import React, { useRef, useState } from "react";
import { TextField, Button, Typography, Stack, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DoctorForm = ({
  isLoading,
  onSubmitDoctorData,
  editMode,
  oldData,
  haveError,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState(null);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [specialtyError, setSpecialtyError] = useState("");
  const [experienceError, setExperienceError] = useState("");

  const navigate = useNavigate();

  const handleNameBlur = () => {
    if (name.trim() === "" || name.length < 3 || /\d/.test(name)) {
      setNameError(
        "Name is required and should be at least 3 characters and contain only characters"
      );
    } else {
      setNameError("");
    }
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please provide a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSpecialtyBlur = () => {
    if (!specialty || specialty.trim() === "" || /\d/.test(specialty)) {
      setSpecialtyError("Specialty is required.");
    } else {
      setSpecialtyError("");
    }
  };

  const handleExperienceBlur = () => {
    if (!experience || isNaN(Number(experience)) || Number(experience) < 0) {
      setExperienceError("Experience should be a non-negative number.");
    } else {
      setExperienceError("");
    }
  };

  const checkForValidation = () => {
    // Validate name
    if (name.trim() === "" || name.length < 3 || /\d/.test(name)) {
      setNameError(
        "Name is required and should be at least 3 characters and contain only characters"
      );
      return;
    }
    setNameError("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please provide a valid email address.");
      return;
    }
    setEmailError("");

    // Validate specialty
    if (!specialty || specialty.trim() === "" || /\d/.test(specialty)) {
      setSpecialtyError("Specialty is required.");
      return;
    }
    setSpecialtyError("");

    // Validate experience
    if (!experience || isNaN(Number(experience)) || Number(experience) < 0) {
      setExperienceError("Experience should be a non-negative number.");
      return;
    }
    setExperienceError("");

    if (!nameError && !emailError && !specialtyError && !experienceError) {
      return true;
    } else {
      return false;
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    const isValid = checkForValidation();

    if (isValid) {
      onSubmitDoctorData({
        name,
        email,
        specialty,
        experience,
      });
      setName("");
      setEmail("");
      setSpecialty("");
      setExperience("");
    }
  }

  return (
    <React.Fragment>
      <Box component="div" sx={{ marginBottom: 2, marginTop: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          ADD Doctor
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            autoComplete="Name"
            value={name}
            fullWidth
            error={!!nameError}
            helperText={nameError}
            onBlur={handleNameBlur}
          />

          <TextField
            type="email"
            variant="outlined"
            color="primary"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth
            error={!!emailError}
            helperText={emailError}
            onBlur={handleEmailBlur}
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Specialty"
            onChange={(e) => setSpecialty(e.target.value)}
            autoComplete="Specialty"
            value={specialty}
            fullWidth
            error={!!specialtyError}
            helperText={specialtyError}
            onBlur={handleSpecialtyBlur}
          />
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Experience"
            onChange={(e) => setExperience(e.target.value)}
            autoComplete="Experience"
            value={experience}
            fullWidth
            // sx={{ mb: 4 }}
            error={!!experienceError}
            helperText={experienceError}
            onBlur={handleExperienceBlur}
          />
        </Stack>

        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Stack>
      </form>
    </React.Fragment>
  );
};

export default DoctorForm;
