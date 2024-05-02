import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import { AlertContext } from "../../store/alert-context";

const lightColor = "rgba(255, 255, 255, 0.7)";

function Header(props) {
  const { onDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const authCtx = React.useContext(AuthContext);
  const alerCtx = React.useContext(AlertContext);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logoutHandler = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    authCtx.logout();
    alerCtx.setSuccess("User logged out successfully!");
    // navigate("/");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!authCtx.isLoggedIn && (
        <MenuItem onClick={handleMenuClose} component={Link} to="/auth/login">
          Login
        </MenuItem>
      )}
      {authCtx.isLoggedIn && (
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      )}
    </Menu>
  );

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={3}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <MenuItem onClick={handleProfileMenuOpen}>
              <AccountCircleIcon />
            </MenuItem>
          </Grid>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
