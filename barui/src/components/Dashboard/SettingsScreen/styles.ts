import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.action.hover,
		display: "flex",
		height: 400,
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
	contentContainer: {
		padding: 30,
		flex: 1,
	},
}));

export default styles;
