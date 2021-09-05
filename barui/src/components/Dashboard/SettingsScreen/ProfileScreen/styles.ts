import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.action.hover,
		display: "flex",
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
}));

export default styles;
