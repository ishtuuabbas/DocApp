import React, { useContext, useRef, useState } from "react";
import PatientTemplate from "../../printables/PatientTemplate";
import { useReactToPrint } from "react-to-print";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AlertContext } from "../../store/alert-context";
import { AuthContext } from "../../store/auth-context";
import { generateUniqueIdentifier } from "../../utils/patientUniqueKey";
import ConfirmationDialog from "./ConfirmationDialog";
import { PatientTokenContext } from "../../store/patientToken-context";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z\s]+$/, "Name should not contain numbers")
    .min(3, "Name should be at least 3 characters"),
  fName: Yup.string()
    .required("Father's Name is required")
    .matches(/^[A-Za-z\s]+$/, "Father's Name should not contain numbers")
    .min(3, "Father's Name should be at least 3 characters"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age should be a positive number")
    .integer("Age should be an integer")
    .min(1, "Age must be at least 18 years old")
    .max(99, "Age must be less than 100 years old"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  bloodPressure: Yup.string()
    .matches(
      /^\d+\/\d+$/,
      "Blood Pressure should be in the format 'systolic/diastolic'"
    )
    .required("Blood Pressure is required"),
  temperature: Yup.number()
    .required("Temperature is required")
    .typeError("Temperature should be a number"),
  spo: Yup.number()
    .required("SpO2 is required")
    .typeError("SpO2 should be a number"),
  respiratoryRate: Yup.number()
    .required("Respiratory Rate is required")
    .typeError("Respiratory Rate should be a number"),
  pulsus: Yup.number()
    .required("Pulsus is required")
    .typeError("Pulsus should be a number"),
  diabetes: Yup.boolean().required("Diabetes is required"),
  hypertension: Yup.boolean().required("Hypertension is required"),
  IHD: Yup.boolean().required("Ischemic Heart Disease is required"),
  hepatitis: Yup.boolean().required("Hepatitis is required"),
  previousSurgery: Yup.boolean().required("Previous Surgery is required"),
  preMedication: Yup.boolean().required("Pre Medication is required"),
  selectedDoctor: Yup.string().required("Doctor is required"),
  payment: Yup.number().required("Payment must be a number"),
});

const PatientForm = ({ onSubmitPatientData, docNames, oldData, editMode }) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const { tokenCounter, incrementTokenCounter, resetPatientToken } =
    useContext(PatientTokenContext);

  const handleOpenConfirmation = () => {
    resetPatientToken();
    setConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  const handleConfirmAction = () => {
    // Handle your confirmation action here
    // For example, delete an item, submit a form, etc.
    handleCloseConfirmation();
  };

  const formik = useFormik({
    initialValues: {
      cnicNumber: "",
      name: "",
      age: "",
      gender: "",
      address: "",
      phoneNumber: "",
      fName: "",
      bloodPressure: "",
      temperature: "",
      spo: "",
      respiratoryRate: "",
      pulsus: "",
      diabetes: "",
      diabetesType: "",
      hypertension: "",
      IHD: "",
      hepatitis: "",
      previousSurgery: "",
      preMedication: "",
      selectedDoctor: "",
      payment: "",
      pregnancy: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmitPatientData({
        name: values.name,
        fName: values.fName,
        age: Number(values.age),
        gender: values.gender,
        address: values.address,
        ptn: generateUniqueIdentifier(values.name, values.fName, values.age),
        selectedDoctor: values.selectedDoctor,

        record: {
          payment: Number(values.payment),
          token: tokenCounter,
          visitNumber: 1,
          bloodPressure: values.bloodPressure,
          temperature: String(values.temperature),
          spo: values.spo,
          respiratoryRate: String(values.respiratoryRate),
          pulsus: values.pulsus,
          diabetes: values.diabetes,
          diabetesType:
            values.diabetes === "true" ? values.diabetesType : "NULL",
          pregnancy: values.gender === "Female" ? values.pregnancy : "NULL",
          hypertension: values.hypertension,
          IHD: values.IHD,
          hepatitis: values.hepatitis,
          previousSurgery: values.previousSurgery,
          preMedication: values.preMedication,
        },
      });
      incrementTokenCounter();
      formik.resetForm();
    },
  });

  const printComponentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });

  const handleSaveAndPrint = () => {
    // Check if the form is valid using Formik's isValid property

    const ptn = generateUniqueIdentifier(
      formik.values.name,
      formik.values.fName,
      formik.values.age
    );
    if (formik.isValid) {
      onSubmitPatientData({
        name: formik.values.name,
        fName: formik.values.fName,
        age: Number(formik.values.age),
        gender: formik.values.gender,
        address: formik.values.address,
        ptn: ptn,
        selectedDoctor: formik.values.selectedDoctor,

        record: {
          payment: Number(formik.values.payment),
          token: tokenCounter,
          visitNumber: 1,
          bloodPressure: formik.values.bloodPressure,
          temperature: String(formik.values.temperature),
          spo: formik.values.spo,
          respiratoryRate: String(formik.values.respiratoryRate),
          pulsus: formik.values.pulsus,
          diabetes: formik.values.diabetes,
          diabetesType:
            formik.values.diabetes === "true"
              ? formik.values.diabetesType
              : "NULL",
          pregnancy:
            formik.values.gender === "Female"
              ? formik.values.pregnancy
              : "NULL",
          hypertension: formik.values.hypertension,
          IHD: formik.values.IHD,
          hepatitis: formik.values.hepatitis,
          previousSurgery: formik.values.previousSurgery,
          preMedication: formik.values.preMedication,
        },
      });

      // Trigger the printing functionality

      handlePrint();
      incrementTokenCounter();
      formik.resetForm();
    }
  };

  return (
    <React.Fragment>
      <Box component="div" sx={{ marginBottom: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {editMode ? "EDIT PATIENT" : "ADD PATIENT"}
        </Typography>
      </Box>
      <Box sx={{ textAlign: "right", marginBottom: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenConfirmation}
        >
          Reset Tokens
        </Button>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="number"
            variant="standard"
            color="primary"
            label="CNIC"
            autoComplete="cnicNumber"
            fullWidth
            sx={{ mb: 4 }}
            {...formik.getFieldProps("cnicNumber")}
            error={formik.touched.cnicNumber && formik.errors.cnicNumber}
            helperText={formik.touched.cnicNumber && formik.errors.cnicNumber}
          />

          <TextField
            type="text"
            variant="standard"
            color="primary"
            label="Name"
            {...formik.getFieldProps("name")}
            fullWidth
            error={formik.touched.name && formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            type="text"
            variant="standard"
            color="primary"
            label="Father's Name"
            {...formik.getFieldProps("fName")}
            fullWidth
            error={formik.touched.fName && formik.errors.fName}
            helperText={formik.touched.fName && formik.errors.fName}
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="number"
            variant="standard"
            color="primary"
            label="Age"
            autoComplete="age"
            {...formik.getFieldProps("age")}
            fullWidth
            error={formik.touched.age && formik.errors.age}
            helperText={formik.touched.age && formik.errors.age}
          />
          <FormControl fullWidth variant="standard">
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              id="gender"
              label="Gender"
              {...formik.getFieldProps("gender")}
              error={formik.touched.gender && formik.errors.gender}
              helperText={formik.touched.gender && formik.errors.gender}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="number"
            variant="standard"
            color="primary"
            label="Phone Number"
            autoComplete="phone Number"
            fullWidth
            {...formik.getFieldProps("phoneNumber")}
            error={formik.touched.phoneNumber && formik.errors.phoneNumber}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="standard"
            color="primary"
            label="Address"
            autoComplete="address"
            fullWidth
            {...formik.getFieldProps("address")}
            error={formik.touched.address && formik.errors.address}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Stack>

        <Box component="div" sx={{ marginBottom: 4, marginTop: 6 }}>
          <Typography variant="h5">{" INITIAL ASSESMENT"}</Typography>
        </Box>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="standard"
            color="primary"
            label="Blood Pressure"
            autoComplete="bloodPressure"
            fullWidth
            {...formik.getFieldProps("bloodPressure")}
            error={formik.touched.bloodPressure && formik.errors.bloodPressure}
            helperText={
              formik.touched.bloodPressure && formik.errors.bloodPressure
            }
          />
          <TextField
            type="number"
            variant="standard"
            color="primary"
            label="Temperature"
            autoComplete="temperature"
            fullWidth
            {...formik.getFieldProps("temperature")}
            error={formik.touched.temperature && formik.errors.temperature}
            helperText={formik.touched.temperature && formik.errors.temperature}
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 10 }}>
          <TextField
            type="number"
            variant="standard"
            color="primary"
            label="SpO2"
            autoComplete="spo2"
            fullWidth
            {...formik.getFieldProps("spo")}
            error={formik.touched.spo && formik.errors.spo}
            helperText={formik.touched.spo && formik.errors.spo}
          />
          <TextField
            type="number"
            variant="standard"
            color="primary"
            label="Respiratory rate (RR)"
            autoComplete="rr"
            fullWidth
            {...formik.getFieldProps("respiratoryRate")}
            error={
              formik.touched.respiratoryRate && formik.errors.respiratoryRate
            }
            helperText={
              formik.touched.respiratoryRate && formik.errors.respiratoryRate
            }
          />
          <TextField
            type="number"
            variant="standard"
            color="primary"
            label="Pulsus"
            autoComplete="pulsus"
            fullWidth
            {...formik.getFieldProps("pulsus")}
            error={formik.touched.pulsus && formik.errors.pulsus}
            helperText={formik.touched.pulsus && formik.errors.pulsus}
          />
        </Stack>

        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="diabetes ">Diabetes</InputLabel>
            <Select
              labelId="diabetes"
              id="diabetes"
              label="Diabetes"
              {...formik.getFieldProps("diabetes")}
              error={formik.touched.diabetes && formik.errors.diabetes}
              helperText={formik.touched.diabetes && formik.errors.diabetes}
            >
              <MenuItem value={"true"}>Yes</MenuItem>
              <MenuItem value={"false"}>No</MenuItem>
            </Select>
          </FormControl>
          {formik.values.diabetes === "true" && (
            <FormControl fullWidth size="small">
              <InputLabel id="diabetesType ">Diabetes Type</InputLabel>
              <Select
                labelId="diabetesType"
                id="diabetesType"
                label="Diabetes Type"
                {...formik.getFieldProps("diabetesType")}
                error={
                  formik.touched.diabetesType && formik.errors.diabetesType
                }
                helperText={
                  formik.touched.diabetesType && formik.errors.diabetesType
                }
              >
                <MenuItem value={"C+"}>C+</MenuItem>
                <MenuItem value={"B+"}>B+</MenuItem>
                <MenuItem value={"-VE"}>-VE</MenuItem>
              </Select>
            </FormControl>
          )}

          <FormControl fullWidth size="small">
            <InputLabel id="htn ">Hypertension (HTN)</InputLabel>
            <Select
              labelId="htn"
              id="htn"
              label="Hypertension (HTN)"
              {...formik.getFieldProps("hypertension")}
              error={formik.touched.hypertension && formik.errors.hypertension}
              helperText={
                formik.touched.hypertension && formik.errors.hypertension
              }
            >
              <MenuItem value={"true"}>Yes</MenuItem>
              <MenuItem value={"false"}>No</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="ihd ">Ischemic Heart Disease (IHD)</InputLabel>
            <Select
              labelId="ihd"
              id="ihd"
              label="Ischemic Heart Disease (IHD)"
              {...formik.getFieldProps("IHD")}
              error={formik.touched.IHD && formik.errors.IHD}
              helperText={formik.touched.IHD && formik.errors.IHD}
            >
              <MenuItem value={"true"}>Yes</MenuItem>
              <MenuItem value={"false"}>No</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack spacing={2} direction="row" sx={{ marginBottom: 10 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="hepatitis ">Hepatitis</InputLabel>
            <Select
              labelId="hepatitis"
              id="hepatitis"
              label="Hepatitis"
              {...formik.getFieldProps("hepatitis")}
              error={formik.touched.hepatitis && formik.errors.hepatitis}
              helperText={formik.touched.hepatitis && formik.errors.hepatitis}
            >
              <MenuItem value={"true"}>Yes</MenuItem>
              <MenuItem value={"false"}>No</MenuItem>
            </Select>
          </FormControl>

          {formik.values.gender === "Female" && (
            <FormControl fullWidth size="small">
              <InputLabel id="pregnancy ">Pregnancy</InputLabel>
              <Select
                labelId="pregnancy"
                id="pregnancy"
                label="Pregnancy"
                {...formik.getFieldProps("pregnancy")}
                error={formik.touched.pregnancy && formik.errors.pregnancy}
                helperText={formik.touched.pregnancy && formik.errors.pregnancy}
              >
                <MenuItem value={"true"}>Yes</MenuItem>
                <MenuItem value={"false"}>No</MenuItem>
              </Select>
            </FormControl>
          )}

          <FormControl fullWidth size="small">
            <InputLabel id="previousSurgery ">Previous Surgery</InputLabel>
            <Select
              labelId="previousSurgery"
              id="previousSurgery"
              label="Previous Surgery"
              {...formik.getFieldProps("previousSurgery")}
              error={
                formik.touched.previousSurgery && formik.errors.previousSurgery
              }
              helperText={
                formik.touched.previousSurgery && formik.errors.previousSurgery
              }
            >
              <MenuItem value={"true"}>Yes</MenuItem>
              <MenuItem value={"false"}>No</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel id="preMedication">Pre Medication</InputLabel>
            <Select
              labelId="preMedication"
              id="preMedication"
              label="Pre Medication"
              {...formik.getFieldProps("preMedication")}
              error={
                formik.touched.preMedication && formik.errors.preMedication
              }
              helperText={
                formik.touched.preMedication && formik.errors.preMedication
              }
            >
              <MenuItem value={"true"}>Yes</MenuItem>
              <MenuItem value={"false"}>No</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="doctor">Doctor</InputLabel>
            <Select
              labelId="doctor"
              id="doctor"
              sx={{ mb: 4 }}
              label="Doctor"
              {...formik.getFieldProps("selectedDoctor")}
              error={
                formik.touched.selectedDoctor && formik.errors.selectedDoctor
              }
              helperText={
                formik.touched.selectedDoctor && formik.errors.selectedDoctor
              }
            >
              {docNames.map((doc) => (
                <MenuItem key={doc.id} value={doc.id}>
                  {doc.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="number"
            variant="standard"
            color="primary"
            label="Payment"
            autoComplete="Payment"
            fullWidth
            sx={{ mb: 4 }}
            {...formik.getFieldProps("payment")}
            error={formik.touched.payment && formik.errors.payment}
            helperText={formik.touched.payment && formik.errors.payment}
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <Button variant="contained" type="submit">
            {editMode ? "Edit" : "Save"}
          </Button>
          <Button variant="outlined" onClick={handleSaveAndPrint}>
            Save And Print
          </Button>
          <div style={{ display: "none" }}>
            <PatientTemplate
              ref={printComponentRef}
              doctorNames={docNames}
              patientData={{
                name: formik.values.name,
                fatherName: formik.values.fName,
                age: formik.values.age,
                gender: formik.values.gender,
                address: formik.values.address,
                phoneNumber: formik.values.phoneNumber,
                selectedDoctor: formik.values.selectedDoctor,
                cnicNumber: formik.values.cnicNumber,
                visitNumber: 1,
                ptn: generateUniqueIdentifier(
                  formik.values.name,
                  formik.values.fName,
                  formik.values.age
                ),
                token: tokenCounter,
              }}
              patientHealthInfo={{
                bloodPressure: formik.values.bloodPressure,
                temperature: formik.values.temperature,
                spo: formik.values.spo,
                respiratoryRate: formik.values.respiratoryRate,
                pulsus: formik.values.pulsus,
                diabetes: formik.values.diabetes === "true" ? "Yes" : "No",
                diabetesType:
                  formik.values.diabetes === "true"
                    ? formik.values.diabetesType
                    : "NULL",
                pregnancy:
                  formik.values.gender === "Female"
                    ? formik.values.pregnancy === "true"
                      ? "Yes"
                      : "No"
                    : "NULL",
                hypertension:
                  formik.values.hypertension === "true" ? "Yes" : "No",
                IHD: formik.values.IHD === "true" ? "Yes" : "No",
                hepatitis: formik.values.hepatitis === "true" ? "Yes" : "No",
                previousSurgery:
                  formik.values.previousSurgery === "true" ? "Yes" : "No",
                preMedication:
                  formik.values.preMedication === "true" ? "Yes" : "No",
              }}
            />
          </div>
        </Stack>
      </form>
      <ConfirmationDialog
        open={confirmationOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmAction}
        msgHead={"Reset Token!"}
        msgBody={"Are you sure you want to Reset the tokens?"}
      />
    </React.Fragment>
  );
};

export default PatientForm;
