import React from "react";

import { withStyles } from "@material-ui/core/styles";
import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import styles from "./styles";

type Props = {
	classes: {
		root: string;
		title: string;
	};
};

const AppBar = ({ classes }: Props) => {
	return (
		<MaterialAppBar className={classes.root} position="fixed">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					AppBar
				</Typography>
				<Button color="inherit">Login</Button>
			</Toolbar>
		</MaterialAppBar>
	);
};

export default withStyles(styles)(AppBar);
