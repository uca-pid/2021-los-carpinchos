import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
	toolbar: {
		marginBottom: 20,
	},
	navigationContainer: {
		marginLeft: 30,
	},
	navigationButtons: {
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	currentLocation: {
		borderBottom: `2px solid ${theme.palette.secondary.main}`,
	},
}));

export default styles;
