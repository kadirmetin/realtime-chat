import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SingUpPage";

export default function App() {
  return (
    <MantineProvider>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </MantineProvider>
  );
}
