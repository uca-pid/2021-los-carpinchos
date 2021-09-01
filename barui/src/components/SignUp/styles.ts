import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
	card: {
		backgroundColor: theme.palette.action.hover,
		padding: 20,
	},
	cardActions: {
		marginTop: 20,
	},
}));

export default styles;
