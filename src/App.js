import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import { UserPreferencesProvider } from "./global-context";

/**
 * The main application component.
 * Provides the user preferences context and renders the navbar and home pages.
 * The navbar is given a fixed height of 65px, and then the home page is rendered.
 * @returns {ReactElement} The main application component.
 */
function App() {
  return (
    <UserPreferencesProvider>
      <Navbar />
      {/* --------- add navbar height -------- */}
      <div style={{ height: 65 }} />
      <Home />
    </UserPreferencesProvider>
  );
}

export default App;
