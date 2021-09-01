import React, { useCallback } from "react";

import { useHistory, useLocation } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import styles from "./styles";
import { Grid } from "@material-ui/core";

const AppBar = () => {
	const history = useHistory();
	const location = useLocation();
	const classes = styles();

	const handleNameClick = useCallback(() => history.push("/home"), [history]);

	const handleLoginButton = useCallback(() => history.push("/login"), [history]);

	const handleSignUpButton = useCallback(() => history.push("/signUp"), [history]);

	return (
		<>
			<MaterialAppBar position="fixed">
				<Toolbar>
					<Grid alignItems="center" container spacing={1}>
						<Grid item xs>
							<Typography variant="h6" onClick={handleNameClick}>
								MyBar
							</Typography>
						</Grid>
						{(location.pathname === "/home" || location.pathname === "/signUp") && (
							<Grid item>
								<Button color="inherit" onClick={handleLoginButton}>
									Iniciar Sesión
								</Button>
							</Grid>
						)}
						{(location.pathname === "/home" || location.pathname === "/login") && (
							<Grid item>
								<Button color="inherit" onClick={handleSignUpButton} variant="outlined">
									Crear Cuenta
								</Button>
							</Grid>
						)}
					</Grid>
				</Toolbar>
			</MaterialAppBar>
			<Toolbar className={classes.toolbar} />
		</>
	);
};

export default AppBar;
