import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
	typography: {
		fontFamily: "Poppins , sans-serif",
		fontSize: 12,
		h1: {
			// could customize the h1 variant as well
		},
	},
	palette: {
		primary: { main: "#DF1B1B" },
	},
});
