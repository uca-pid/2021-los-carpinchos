import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
	card: {
		backgroundColor: theme.palette.action.hover,
		padding: 20,
	},
	cardActions: {
		marginTop: 20,
		justifyContent: "center",
	},
	textField: {
		margin: 0,
		minWidth: 220,
		[theme.breakpoints.down(400)]: {
			minWidth: 120,
		},
	},
	title: {
		marginBottom: 20,
	},
	loginButton: {
		width: 210,
	},
	signUpText: {
		color: theme.palette.secondary.dark,
	},
}));

export default styles;
