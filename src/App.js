import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import { UserPreferencesProvider } from "./global-context";

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
