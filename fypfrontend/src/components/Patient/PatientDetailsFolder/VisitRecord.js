import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

const VisitRecord = ({ record }) => {
  const inputDateString = record.createdAt;
  // Create a Date object from the input date string
  const date = new Date(inputDateString);

  // Get the components of the date
  const year = date.getFullYear().toString().slice(-2); // Extract last 2 digits of the year
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month starts from 0
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  // Create the formatted string
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;

  return (
    <React.Fragment>
      <Box sx={{ marginTop: 5 }}>
        <Card sx={{ maxWidth: "100%" }} variant="outlined">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Visit Number {record.visitNumber}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {formattedDate}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </React.Fragment>
  );
};

export default VisitRecord;
