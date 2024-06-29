import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import PatientTemplate from "../../../printables/PatientTemplate";
import { useFormik } from "formik";
import * as Yup from "yup";
import VisitRecord from "./VisitRecord";
import { AuthContext } from "../../../store/auth-context";
import { AlertContext } from "../../../store/alert-context";
import ConfirmationDialog from "../ConfirmationDialog";
import { PatientTokenContext } from "../../../store/patientToken-context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "90%",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

const validationSchema = Yup.object({
  bloodPressure: Yup.string()
    .matches(
      /^\d+\/\d+$/,
      "Blood Pressure should be in the format 'systolic/diastolic'"
    )
    .required("Blood Pressure is required"),
  temperature: Yup.number()
    .required("Temperature is required")
    .typeError("Temperature should be a number"),
  // spo: Yup.number()
  //   .required("SpO2 is required")
  //   .typeError("SpO2 should be a number"),
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

export default function Bio({
  patientDetail,
  onSubmitNewRecord,
  totalVisits,
  docNames,
  patientRecords,
  refundMoneyHandler,
}) {
  const { tokenCounter, incrementTokenCounter } =
    React.useContext(PatientTokenContext);
  const sortedPatientRecords = patientRecords.sort(
    (a, b) => b.visitNumber - a.visitNumber
  );
  const formik = useFormik({
    initialValues: {
      bloodPressure: "",
      temperature: "",
      // spo: "",
      respiratoryRate: "",
      pulsus: "",
      diabetes: "",
      diabetesType: "",
      hypertension: "",
      IHD: "",
      hepatitis: "",
      previousSurgery: "",
      pregnancy: "",
      preMedication: "",
      selectedDoctor: "",
      payment: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmitNewRecord({
        selectedDoctor: values.selectedDoctor,

        record: {
          payment: Number(values.payment),
          token: tokenCounter,
          visitNumber: 1,
          bloodPressure: values.bloodPressure,
          temperature: String(values.temperature),
          // spo: values.spo,
          respiratoryRate: String(values.respiratoryRate),
          pulsus: values.pulsus,
          diabetes: values.diabetes,
          diabetesType:
            values.diabetes === "true" ? values.diabetesType : "NULL",
          pregnancy:
            patientDetail.gender === "Female" ? values.pregnancy : "NULL",
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

  const authCtx = React.useContext(AuthContext);
  const alertCtx = React.useContext(AlertContext);

  console.log(patientDetail);
  console.log(patientRecords[patientRecords.length - 1]);

  const rabcSuperAdmin =
    authCtx.isLoggedIn && authCtx.user.role === "superadmin";

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [confirmationOpen, setConfirmationOpen] = React.useState(false);

  const handleOpenConfirmation = () => {
    setConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  const handleConfirmAction = () => {
    // Handle your confirmation action here
    // For example, delete an item, submit a form, etc.
    refundMoneyHandler();
    handleCloseConfirmation();
  };

  const printComponentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });

  const handleSaveAndPrint = () => {
    // Check if the form is valid using Formik's isValid property
    if (formik.isValid) {
      onSubmitNewRecord({
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
            patientDetail.gender === "Female"
              ? formik.values.pregnancy
              : "NULL",
          hypertension: formik.values.hypertension,
          IHD: formik.values.IHD,
          hepatitis: formik.values.hepatitis,
          previousSurgery: formik.values.previousSurgery,
          preMedication: formik.values.preMedication,
        },
      });

      handlePrint();
      incrementTokenCounter();
      formik.resetForm();
    }
  };

  return (
    <React.Fragment>
      <Box component="div">
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          PATIENT DETAILS
        </Typography>
      </Box>
      <Box component="div" sx={{ marginBottom: 3, textAlign: "right" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total Number Of Visits: {totalVisits}
        </Typography>
      </Box>
      <Box component="div" sx={{ marginBottom: 8, textAlign: "right" }}>
        <Button variant="outlined" onClick={handleOpen}>
          New Entry
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: 3 }}
          onClick={handleOpenConfirmation}
          // disabled={patientRecords[patientRecords.length - 1].refundStatus}
        >
          Refund Money
        </Button>
      </Box>
      <Box component="div" sx={{ marginBottom: 3, textAlign: "right" }}></Box>
      <Stack spacing={2} direction="row" sx={{ marginBottom: 8 }}>
        <TextField
          type="text"
          variant="standard"
          color="primary"
          InputProps={{
            readOnly: true,
          }}
          value={`${patientDetail.ptn}`}
          fullWidth
        />

        <TextField
          type="text"
          variant="standard"
          color="primary"
          InputProps={{
            readOnly: true,
          }}
          value={`Patient Name: ${patientDetail.name}`}
          fullWidth
        />

        <TextField
          type="text"
          variant="standard"
          color="primary"
          InputProps={{
            readOnly: true,
          }}
          value={`Father's Name: ${patientDetail.fatherName}`}
          fullWidth
        />
      </Stack>
      <Stack spacing={2} direction="row" sx={{ marginBottom: 8 }}>
        <TextField
          type="text"
          variant="standard"
          color="primary"
          InputProps={{
            readOnly: true,
          }}
          value={`Patient Age: ${patientDetail.age}`}
          fullWidth
        />

        <TextField
          type="text"
          variant="standard"
          color="primary"
          InputProps={{
            readOnly: true,
          }}
          value={`Gender: ${patientDetail.gender}`}
          fullWidth
        />

        {patientDetail.cnicNumber && (
          <TextField
            type="text"
            variant="standard"
            color="primary"
            InputProps={{
              readOnly: true,
            }}
            value={`CNIC Number: ${patientDetail.cnicNumber}`}
            fullWidth
          />
        )}

        <TextField
          type="text"
          variant="standard"
          color="primary"
          InputProps={{
            readOnly: true,
          }}
          value={`Phone Number: ${patientDetail.phoneNumber}`}
          fullWidth
        />
      </Stack>
      <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
        <TextField
          type="text"
          variant="standard"
          color="primary"
          InputProps={{
            readOnly: true,
          }}
          value={`Address: ${patientDetail.address}`}
          fullWidth
        />
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
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
                error={
                  formik.touched.bloodPressure && formik.errors.bloodPressure
                }
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
                helperText={
                  formik.touched.temperature && formik.errors.temperature
                }
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
                  formik.touched.respiratoryRate &&
                  formik.errors.respiratoryRate
                }
                helperText={
                  formik.touched.respiratoryRate &&
                  formik.errors.respiratoryRate
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
                  error={
                    formik.touched.hypertension && formik.errors.hypertension
                  }
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
                  helperText={
                    formik.touched.hepatitis && formik.errors.hepatitis
                  }
                >
                  <MenuItem value={"true"}>Yes</MenuItem>
                  <MenuItem value={"false"}>No</MenuItem>
                </Select>
              </FormControl>

              {patientDetail.gender === "Female" && (
                <FormControl fullWidth size="small">
                  <InputLabel id="pregnancy ">Pregnancy</InputLabel>
                  <Select
                    labelId="pregnancy"
                    id="pregnancy"
                    label="Pregnancy"
                    {...formik.getFieldProps("pregnancy")}
                    error={formik.touched.pregnancy && formik.errors.pregnancy}
                    helperText={
                      formik.touched.pregnancy && formik.errors.pregnancy
                    }
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
                    formik.touched.previousSurgery &&
                    formik.errors.previousSurgery
                  }
                  helperText={
                    formik.touched.previousSurgery &&
                    formik.errors.previousSurgery
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
                    formik.touched.selectedDoctor &&
                    formik.errors.selectedDoctor
                  }
                  helperText={
                    formik.touched.selectedDoctor &&
                    formik.errors.selectedDoctor
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
                Save
              </Button>
              <Button variant="outlined" onClick={handleSaveAndPrint}>
                Save And Print
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
      <div style={{ display: "none" }}>
        <PatientTemplate
          ref={printComponentRef}
          doctorNames={docNames}
          patientData={{
            name: patientDetail.name,
            age: patientDetail.age,
            gender: patientDetail.gender,
            address: patientDetail.address,
            phoneNumber: patientDetail.phoneNumber,
            cnicNumber: patientDetail.cnicNumber && "NULL",
            ptn: patientDetail.ptn,
            selectedDoctor: formik.values.selectedDoctor,
            token: tokenCounter,
            visitNumber: totalVisits + 1,
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
              patientDetail.gender === "Female"
                ? formik.values.pregnancy === "true"
                  ? "Yes"
                  : "No"
                : "NULL",
            hypertension: formik.values.hypertension === "true" ? "Yes" : "No",
            IHD: formik.values.IHD === "true" ? "Yes" : "No",
            hepatitis: formik.values.hepatitis === "true" ? "Yes" : "No",
            previousSurgery:
              formik.values.previousSurgery === "true" ? "Yes" : "No",
            preMedication:
              formik.values.preMedication === "true" ? "Yes" : "No",
          }}
        />
      </div>

      {rabcSuperAdmin &&
        sortedPatientRecords.map((record) => <VisitRecord record={record} />)}
      <ConfirmationDialog
        open={confirmationOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmAction}
        msgHead={"Refund Money?"}
        msgBody={"Are you sure you want to Refund Money?"}
      />
    </React.Fragment>
  );
}
