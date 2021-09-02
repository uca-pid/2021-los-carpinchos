import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
	card: {
		backgroundColor: theme.palette.action.hover,
		padding: 20,
	},
	cardActions: {
		marginTop: 20,
	},
	singleInputRow: {
		width: "calc(50% - 12px)",
		[theme.breakpoints.down(585)]: {
			width: "100%",
		},
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
}));

export default styles;
