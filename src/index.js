import React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
const store = createStore(reducers, compose(applyMiddleware(thunk)));
//store.subscribe(() => console.log(store.getState()));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
