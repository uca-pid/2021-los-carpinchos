import React, { useCallback, useEffect, useState } from "react";

import { Switch, Route, useRouteMatch, useHistory, useLocation, Redirect } from "react-router-dom";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Card, Container, Grid } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

import ProfileScreen from "./ProfileScreen";
import DeleteAccountScreen from "./DeleteAccountScreen";
import SecurityScreen from "./SecurityScreen";

import styles from "./styles";
import PersonIcon from "@material-ui/icons/Person";
import WarningIcon from "@material-ui/icons/Warning";
import LockIcon from "@material-ui/icons/Lock";
import CategoryIcon from "@material-ui/icons/Category";
import CategoriesScreen from "./CategoriesScreen";

type Props = {
	width: Breakpoint;
};

const SettingsScreen = ({ width }: Props) => {
	const [value, setValue] = useState("profile");

	let { path } = useRouteMatch();
	const classes = styles();
	const history = useHistory();
	const location = useLocation();

	const handleChange = useCallback(
		(event: React.ChangeEvent<{}>, newPath: string) => {
			setValue(newPath);
			history.push(`${path}/${newPath}`);
		},
		[history, setValue, path]
	);

	useEffect(() => {
		var paths: string[] = location.pathname.split("/");
		setValue(paths[paths.length - 1]);
	}, [location]);

	return (
		<Container maxWidth="md">
			<Card className={classes.root}>
				<Grid container direction={width === "xs" ? "column" : "row"}>
					<Grid item>
						<Tabs
							onChange={handleChange}
							className={classes.tabs}
							orientation={width === "xs" ? "horizontal" : "vertical"}
							value={value}
							variant="fullWidth"
						>
							<Tab icon={<PersonIcon />} label="Perfil" value="profile" />
							<Tab icon={<CategoryIcon />} label="Categorias" value="userCategories" />
							<Tab icon={<LockIcon />} label="Seguridad" value="security" />
							<Tab icon={<WarningIcon />} label="Eliminar cuenta" value="deleteAccount" />
						</Tabs>
					</Grid>
					<Grid className={classes.contentContainer} item>
						<Switch>
							<Route exact path={`${path}/profile`}>
								<ProfileScreen />
							</Route>
							<Route exact path={`${path}/userCategories`}>
								<CategoriesScreen />
							</Route>
							<Route exact path={`${path}/deleteAccount`}>
								<DeleteAccountScreen />
							</Route>
							<Route exact path={`${path}/security`}>
								<SecurityScreen />
							</Route>
							<Route path="*">
								<Redirect to={`${path}/profile`} />
							</Route>
						</Switch>
					</Grid>
				</Grid>
			</Card>
		</Container>
	);
};

export default withWidth()(SettingsScreen);
