import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
	card: {
		backgroundColor: theme.palette.action.hover,
		padding: 20,
		height: 500,
	},
	goalsCard: {
		backgroundColor: theme.palette.action.hover,
		padding: 20,
		//height: 250,
	},
}));

export default styles;
