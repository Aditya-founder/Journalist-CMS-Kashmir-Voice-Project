import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {Provider}  from "react-redux"
import "./index.css";
import { store, persistor } from "./redux/store";
import {PersistGate} from "redux-persist/integration/react"
import ThemeProvider from "./components/themeProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
    <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ThemeProvider>
  </Provider>
  </PersistGate>
  
);
