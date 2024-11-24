import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";

export default function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="loader-container">
        <Loader className="loader" />
      </div>
    );

  return (
    <MantineProvider
      defaultColorScheme="auto"
      theme={{
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <>
        <Header />

        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to={"/signin"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signin"
            element={!authUser ? <SignInPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/settings"
            element={authUser ? <SettingsPage /> : <Navigate to={"/signin"} />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to={"/signin"} />}
          />
        </Routes>
      </>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </MantineProvider>
  );
}
