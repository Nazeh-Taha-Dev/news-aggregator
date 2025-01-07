import { Close } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { sourcesOptions, categoriesOptions } from "../../constants";
import CheckBoxGroup from "../CheckBoxGroup";
import { useUserPreferences } from "./UserPreferencesHook";

/**
 * A drawer component that allows users to set their preferences for the news feed.
 * The drawer displays a list of categories and sources that the user can select
 * from. The user's preferences are saved locally in the browser's local storage.
 * The component takes an isOpen prop to control whether the drawer is open or not.
 * It also takes a handleClose prop which is a function to call when the user closes
 * the drawer.
 * @param {boolean} [isOpen=true] - Whether the drawer is open or not.
 * @param {function} [handleClose=() => {}] - A function to call when the user closes the drawer.
 * @returns {ReactElement} - A Drawer component with a list of categories and sources.
 */
const UserPreferencesDrawer = ({ isOpen = true, handleClose = () => {} }) => {
  const { preferences, authorsList, handleSave, handleToggle } =
    useUserPreferences({ isOpen, handleClose });

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 280,
        },
      }}
    >
      <AppBar position="relative">
        <Toolbar>
          <Typography
            variant="body1"
            sx={{ flexGrow: 1, marginInlineStart: 0.5 }}
          >
            Preferences
          </Typography>

          <IconButton onClick={handleClose} color="inherit">
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box sx={{ maxHeight: "calc(100vh - 150px)", overflow: "auto" }}>
          <CheckBoxGroup
            title="Category"
            options={categoriesOptions}
            selectedItem={preferences.category}
            handleChange={(option) => handleToggle("category", option.label)}
          />
          <CheckBoxGroup
            title="Sources"
            options={sourcesOptions}
            selectedItem={preferences.source}
            handleChange={(option) => handleToggle("source", option.label)}
          />
          <CheckBoxGroup
            title="Authors"
            options={authorsList}
            selectedItem={preferences.author}
            handleChange={(option) => handleToggle("author", option.label)}
          />
        </Box>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Drawer>
  );
};

export default UserPreferencesDrawer;
