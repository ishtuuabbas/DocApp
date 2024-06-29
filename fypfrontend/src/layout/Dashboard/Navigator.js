import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import { AlertContext } from "../../store/alert-context";
import LogoutIcon from "@mui/icons-material/Logout";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import logo from "../../assets/logo.png";

const item = {
  py: "2px",
  px: 3,
  color: "black",
  "&:hover, &:focus": {
    bgcolor: "#F7F7F7",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(247, 247, 247,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const alertCtx = React.useContext(AlertContext);
  const authCtx = React.useContext(AuthContext);

  const rabcSuperAdminRoutes =
    authCtx.isLoggedIn && authCtx.user.role === "superadmin";
  const rabcAdminRoutes = authCtx.isLoggedIn && authCtx.user.role === "admin";

  let sidebarItems;
  if (rabcSuperAdminRoutes) {
    sidebarItems = [
      {
        id: "User",
        children: [
          { text: "Add User", link: "/user/create", icon: <GroupAddIcon /> },
          {
            text: "All Users",
            link: "/users",
            icon: <SupervisedUserCircleIcon />,
          },
        ],
      },
      {
        id: "Patient",
        children: [
          { text: "All Patients", link: "/patients", icon: <PeopleAltIcon /> },
          {
            text: "Add Patients",
            link: "/patient/create",
            icon: <PersonAddIcon />,
          },
        ],
      },
      {
        id: "Doctor",
        children: [
          {
            text: "All Doctor",
            link: "/doctors",
            icon: <GroupIcon />,
          },
          {
            text: "Add Doctor",
            link: "/doctor/create",
            icon: <MedicalInformationIcon />,
          },
         
      
        ],
      },
      {
        id: "Appointment",
        children: [
          {
            text: "All Appointments",
            link: "/appointments",
        icon: <FormatListBulletedIcon />
          },
        ],
      },
     
      {
        id: "Contacts",
        children: [
          {
            text: "All Contacts",
            link: "/contacts",
            icon: <GroupIcon />,
          },
        
        ],
      },
      {
        id: "Statistics",
        children: [
          // {
          //   text: "Clinic Stats",
          //   link: "/clinic/stats",
          //   icon: <LocalHospitalIcon />,
          // },
          {
            text: "Revenue",
            link: "/revenue",
            icon: <AttachMoneyIcon />,
          },
        ],
      },
    ];
  } else if (rabcAdminRoutes) {
    sidebarItems = [
      {
        id: "User",
        children: [
          { text: "Add User", link: "/user/create", icon: <GroupAddIcon /> },
          {
            text: "All Users",
            link: "/users",
            icon: <SupervisedUserCircleIcon />,
          },
        ],
      },
      {
        id: "Patient",
        children: [
          { text: "All Patients", link: "/patients", icon: <PeopleAltIcon /> },
          {
            text: "Add Patients",
            link: "/patient/create",
            icon: <PersonAddIcon />,
          },
        ],
      },
    ];
  } else {
    sidebarItems = [
      {
        id: "User",
        children: [
          {
            text: "All Users",
            link: "/users",
            icon: <SupervisedUserCircleIcon />,
          },
        ],
      },
      {
        id: "Patient",
        children: [
          { text: "All Patients", link: "/patients", icon: <PeopleAltIcon /> },
        ],
      },
    ];
  }

  const logoutClickHandler = () => {
    authCtx.logout();
    alertCtx.setSuccess("User logged out successfully!");
  };

  return (
    <Drawer
      variant="permanent"
      {...other}
      sx={{ backgroundColor: "#F7F7F7", overflow: "hidden" }}
    >
      <List disablePadding sx={{ overflowY: "auto", height: "100%" }}>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            backgroundColor: "#F7F7F7",
            fontSize: 22,
            color: "black",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img width={100} height={90} src={logo} alt="logo" />
        </ListItem>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            backgroundColor: "#F7F7F7",

            color: "black",
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemButton component={Link} to={"/"}>
            Home
          </ListItemButton>
        </ListItem>
        {sidebarItems.map(({ id, children }) => (
          <Box key={id} sx={{ backgroundColor: "#F7F7F7" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "black" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ text, link, icon }) => (
              <ListItem
                sx={{
                  ...item,
                  ...itemCategory,
                  backgroundColor: "#F7F7F7",

                  color: "black",
                }}
                disablePadding
                key={text}
              >
                <ListItemButton component={Link} to={link}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{text}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
        <ListItemButton
          sx={{
            ...item,
            ...itemCategory,
            backgroundColor: "#F7F7F7",

            color: "black",
          }}
          onClick={logoutClickHandler}
        >
          <ListItem>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            Logout
          </ListItem>
        </ListItemButton>
      </List>
    </Drawer>
  );
}
