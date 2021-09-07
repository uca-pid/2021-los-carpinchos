import React, { useCallback } from "react";

import { useHistory, useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core";
import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import BarIcon from "@material-ui/icons/LocalBar";
import styles from "./styles";
import SettingsMenu from "./SettingsMenu";

const AppBar = () => {
	const history = useHistory();
	const location = useLocation();
	const classes = styles();

	const handleNameClick = useCallback(() => history.push("/"), [history]);

	const handleLoginButton = useCallback(() => history.push("/login"), [history]);

	const handleSignUpButton = useCallback(() => history.push("/signUp"), [history]);

	return (
		<>
			<MaterialAppBar position="fixed">
				<Toolbar>
					<Grid alignItems="center" container spacing={1}>
						<Grid alignItems="flex-end" container item xs spacing={2}>
							<Grid item>
								<BarIcon color="secondary" />
							</Grid>
							<Grid item>
								<Typography color="secondary" variant="h6" onClick={handleNameClick}>
									MyBar
								</Typography>
							</Grid>
						</Grid>
						{(location.pathname === "/" || location.pathname === "/signUp") && (
							<Grid item>
								<Button color="secondary" onClick={handleLoginButton}>
									Iniciar Sesión
								</Button>
							</Grid>
						)}
						{(location.pathname === "/" || location.pathname === "/login") && (
							<Grid item>
								<Button color="secondary" onClick={handleSignUpButton} variant="outlined">
									Crear Cuenta
								</Button>
							</Grid>
						)}
						{location.pathname.startsWith("/dashboard") && (
							<>
								<Grid item>
									<Typography>BAR_NAME</Typography>
								</Grid>
								<Grid item>
									<SettingsMenu />
								</Grid>
							</>
						)}
					</Grid>
				</Toolbar>
			</MaterialAppBar>
			<Toolbar className={classes.toolbar} />
		</>
	);
};

export default AppBar;
