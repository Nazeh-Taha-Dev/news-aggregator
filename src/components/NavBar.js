import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import logo from "../assets/imgs/logo.png";
import { DisplaySettings } from "@mui/icons-material";
import UserPreferencesDrawer from "./UserPreferencesDrawer";

/**
 * A simple navigation bar with a logo and a button to open the preferences drawer.
 * @returns {ReactElement} - A MUI AppBar component with a logo and a button to open the preferences drawer.
 */
export default function NavBar() {
  const [preferencesDrawerIsOpen, setPreferencesDrawerIsOpen] = useState(false);

  const handleOpenPreferencesDrawer = () => {
    setPreferencesDrawerIsOpen(true);
  };

  const handleClosePreferencesDrawer = () => {
    setPreferencesDrawerIsOpen(false);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <img src={logo} alt="logo" style={{ width: 40 }} />
          <Typography
            variant="body1"
            sx={{ flexGrow: 1, marginInlineStart: 0.5 }}
          >
            Aggregator
          </Typography>

          <IconButton onClick={handleOpenPreferencesDrawer}  color="inherit">
            <Tooltip title="Preferences" edge="end">
              <DisplaySettings />
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>
      <UserPreferencesDrawer
        isOpen={preferencesDrawerIsOpen}
        handleClose={handleClosePreferencesDrawer}
      />
    </>
  );
}
