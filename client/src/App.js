import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Route path="/" component={LandingPage} />
			</BrowserRouter>
		</MuiThemeProvider>
	);
}

export default App;
