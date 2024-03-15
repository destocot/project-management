import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { ChakraProvider, extendTheme, UseToastOptions } from "@chakra-ui/react";

const colors = {
  blue: {
    900: "#1e3a8a",
    800: "#1e40af",
    700: "#1d4ed8",
    600: "#2563eb",
    500: "#3b82f6",
    400: "#60a5fa",
    300: "#93c5fd",
    200: "#bfdbfe",
    100: "#dbeafe",
    50: "#eff6ff ",
  },
  warning: {
    700: "#a16207",
    600: "#ca8a04",
    500: "#eab308",
  },
  danger: {
    700: "#b91c1c",
    600: "#dc2626",
    500: "#ef4444",
  },
  success: {
    700: "#15803d",
    600: "#16a34a",
    500: "#22c55e",
  },
};

const theme = extendTheme({ colors });

const defaultToastOptions: UseToastOptions = {
  duration: 1000,
  isClosable: true,
  position: "top-right",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider
      theme={theme}
      toastOptions={{ defaultOptions: defaultToastOptions }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
