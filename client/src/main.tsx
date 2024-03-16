import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { ChakraProvider, extendTheme, UseToastOptions } from "@chakra-ui/react";
import chakrauiConfig from "./lib/chakraui.config.ts";

const theme = extendTheme({ ...chakrauiConfig });

const defaultToastOptions: UseToastOptions = {
  duration: 1000,
  isClosable: true,
  position: "bottom-right",
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
