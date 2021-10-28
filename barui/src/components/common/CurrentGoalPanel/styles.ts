import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
	goalsCard: {
		padding: 20,
	},
	background: {
		backgroundColor: theme.palette.action.hover,
	},
}));

export default styles;
