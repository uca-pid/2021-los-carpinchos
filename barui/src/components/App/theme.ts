import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#2f2e41",
		},
		secondary: {
			main: "#ffc963",
			dark: "#EB9800",
		},
	},
	typography: {
		fontFamily: "GillSans",
	},
});

export default theme;
