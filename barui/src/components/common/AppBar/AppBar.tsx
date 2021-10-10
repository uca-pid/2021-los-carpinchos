import React, { useCallback } from "react";

import { useHistory, useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core";
import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withWidth from "@material-ui/core/withWidth";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import Button from "@material-ui/core/Button";

import BarIcon from "@material-ui/icons/LocalBar";
import styles from "./styles";
import SettingsMenu from "./SettingsMenu";

import ProductsMenuIcon from "@material-ui/icons/MenuBook";
import ReceiptIcon from "@material-ui/icons/Receipt";
import HomeIcon from "@material-ui/icons/House";

import { connect } from "react-redux";

type Props = {
	accountName: string;
	width: Breakpoint;
};

const AppBar = ({ accountName, width }: Props) => {
	const history = useHistory();
	const location = useLocation();
	const classes = styles();

	const handleNameClick = useCallback(() => history.push("/"), [history]);

	const handleLoginButton = useCallback(() => history.push("/login"), [history]);

	const handleSignUpButton = useCallback(() => history.push("/signUp"), [history]);

	const handleProductsButton = useCallback(() => history.push("/dashboard/products"), [history]);

	const handleHomeButton = useCallback(() => history.push("/dashboard"), [history]);

	const handleSalesButton = useCallback(() => history.push("/dashboard/sales"), [history]);

	return (
		<>
			<MaterialAppBar position="fixed">
				<Toolbar>
					<Grid alignItems="center" container spacing={1}>
						<Grid item>
							<BarIcon color="secondary" />
						</Grid>
						<Grid item>
							<Typography color="secondary" variant="h6" onClick={handleNameClick}>
								MyBar
							</Typography>
						</Grid>
						{location.pathname.startsWith("/dashboard") && width !== "xs" ? (
							<Grid container className={classes.navigationContainer} item xs spacing={2}>
								<Grid item>
									<Button
										variant="text"
										color="inherit"
										className={`${classes.navigationButtons} ${
											location.pathname === "/dashboard" && classes.currentLocation
										}`}
										onClick={handleHomeButton}
										startIcon={<HomeIcon fontSize="small" />}
									>
										Inicio
									</Button>
								</Grid>
								<Grid item>
									<Button
										variant="text"
										color="inherit"
										className={`${classes.navigationButtons} ${
											location.pathname === "/dashboard/products" && classes.currentLocation
										}`}
										onClick={handleProductsButton}
										startIcon={<ProductsMenuIcon fontSize="small" />}
									>
										Productos
									</Button>
								</Grid>
								<Grid item>
									<Button
										variant="text"
										color="inherit"
										className={`${classes.navigationButtons} ${
											location.pathname === "/dashboard/sales" && classes.currentLocation
										}`}
										onClick={handleSalesButton}
										startIcon={<ReceiptIcon fontSize="small" />}
									>
										Ventas
									</Button>
								</Grid>
							</Grid>
						) : (
							<Grid item xs></Grid>
						)}

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
								{width !== "xs" && (
									<Grid item>
										<Typography>{accountName}</Typography>
									</Grid>
								)}
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

type State = {
	session: {
		accountData: {
			name: string;
		};
	};
};

const mapStateToProps = (state: State) => ({
	accountName: state.session.accountData.name,
});

const AppBarWithWidth = withWidth()(AppBar);

export default connect(mapStateToProps)(AppBarWithWidth);
