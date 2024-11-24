import { MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <MantineProvider
      defaultColorScheme="auto"
      theme={{
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <App />
    </MantineProvider>
  </BrowserRouter>
);
