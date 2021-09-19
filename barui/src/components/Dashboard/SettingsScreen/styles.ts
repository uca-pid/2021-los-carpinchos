import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.action.hover,
		display: "flex",
		minHeight: 400,
	},
	tabs: {
		[theme.breakpoints.up("sm")]: {
			height: "100%",
			borderRight: `1px solid ${theme.palette.divider}`,
		},
		[theme.breakpoints.down("xs")]: {
			borderBottom: `1px solid ${theme.palette.divider}`,
		},
	},
	contentContainer: {
		padding: 30,
		flex: 1,
		[theme.breakpoints.down("xs")]: {
			paddingTop: 0,
		},
	},
}));

export default styles;
