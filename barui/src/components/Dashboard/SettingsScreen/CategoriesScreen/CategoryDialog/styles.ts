import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
	textField: {
		margin: 0,
		minWidth: 420,
		[theme.breakpoints.down(400)]: {
			minWidth: 120,
		},
	},
}));

export default styles;
