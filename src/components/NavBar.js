import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";

const Navbar = ({ searchTerm, onSearchChange }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo or App Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News Aggregator
        </Typography>

        {/* Search Bar */}
        <Box sx={{ display: { xs: "none", sm: "block" }, width: "40%" }}>
          <TextField
            placeholder="Search articles..."
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={onSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
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
