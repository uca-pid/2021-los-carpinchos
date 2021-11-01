import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
	goalsCard: {
		padding: 20,
	},
	background: {
		backgroundColor: theme.palette.action.hover,
	},
	seeMoreText: {
		color: theme.palette.secondary.dark,
	},
}));

export default styles;
