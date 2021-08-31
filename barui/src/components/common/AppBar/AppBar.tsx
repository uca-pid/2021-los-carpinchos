import React from "react";

import { withStyles } from "@material-ui/core/styles";
import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import styles from "./styles";
import { Grid } from "@material-ui/core";

type Props = {
	classes: {};
};

const AppBar = ({ classes }: Props) => {
	return (
		<MaterialAppBar position="fixed">
			<Toolbar>
				<Grid alignItems="center" container spacing={1}>
					<Grid item xs>
						<Typography variant="h6">MyBar</Typography>
					</Grid>
					<Grid item>
						<Button color="inherit">Iniciar Sesión</Button>
					</Grid>
					<Grid item>
						<Button color="inherit" variant="outlined">
							Crear Cuenta
						</Button>
					</Grid>
				</Grid>
			</Toolbar>
		</MaterialAppBar>
	);
};

export default withStyles(styles)(AppBar);
