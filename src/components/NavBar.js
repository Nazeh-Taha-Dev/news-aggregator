import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import logo from "../assets/imgs/logo.png";

const Navbar = ({ searchTerm, onSearchChange }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo */}
        <Box sx={{ flexGrow: 1 }}>
          <img src={logo} alt="logo" style={{ width: 40 }} loading="lazy" />
        </Box>
       

        {/* Mobile Menu Icon */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
