import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {ThemeProvider} from "styled-components";
import {Theme} from "./theme";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
	<QueryClientProvider client={queryClient}>
		<ThemeProvider theme={Theme}>
		  <App />
		</ThemeProvider>
	</QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
