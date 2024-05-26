import React, { useState, useEffect, useContext, Fragment } from 'react';
import { AuthContext } from "../../store/auth-context";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import './index.css';
import { Box, Typography } from '@mui/material';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const authCtx = useContext(AuthContext);

    const fetchAppointments = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/appointment", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + authCtx.token,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAppointments(data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8080/api/appointment/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authCtx.token,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setAppointments(prevAppointments =>
                prevAppointments.map(appointment =>
                    appointment._id === id ? { ...appointment, status: newStatus } : appointment
                )
            );
        } catch (error) {
            setError(error);
        }
    };

    return (
        <Fragment>
       
      <Box component="div" sx={{ marginBottom: 2, marginTop: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Appointment Table
        </Typography>
      </Box>
      <hr />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Father Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Appointment Date</TableCell>
                            <TableCell>Appointment Time</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map(appointment => (
                            <TableRow key={appointment._id}>
                                <TableCell>{appointment.name}</TableCell>
                                <TableCell>{appointment.fatherName}</TableCell>
                                <TableCell>{appointment.age}</TableCell>
                                <TableCell>{appointment.gender}</TableCell>
                                <TableCell>{appointment.address}</TableCell>
                                <TableCell>{appointment.appointmentDate}</TableCell>
                                <TableCell>{appointment.appointmentTime}</TableCell>
                                <TableCell>{appointment.status}</TableCell>
                                <TableCell>
                                    {appointment.status !== 'Cancelled' && (
                                        <>
                                            {appointment.status === 'Pending' && (
                                                <Button 
                                                    variant="contained" 
                                                    color="success" 
                                                    onClick={() => handleStatus(appointment._id, 'Confirmed')}
                                                >
                                                    Approve
                                                </Button>
                                            )}
                                            <Button 
                                                variant="contained" 
                                                color="error" 
                                                onClick={() => handleStatus(appointment._id, 'Cancelled')}
                                                style={{ marginLeft: '8px' }}
                                            >
                                                Reject
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
};

export default Appointments;
