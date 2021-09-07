import React, { useCallback, useEffect, useState } from "react";

import { Switch, Route, useRouteMatch, useHistory, useLocation } from "react-router-dom";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Card, Container } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import WarningIcon from "@material-ui/icons/Warning";

import ProfileScreen from "./ProfileScreen";
import DeleteAccount from "./DeleteAccount";

import styles from "./styles";

const SettingsScreen = () => {
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
				<Tabs orientation="vertical" value={value} onChange={handleChange} className={classes.tabs}>
					<Tab icon={<PersonIcon />} label="Perfil" value="profile" />
					<Tab icon={<WarningIcon />} label="Eliminar cuenta" value="deleteAccount" />
				</Tabs>

				<div className={classes.contentContainer}>
					<Switch>
						<Route exact path={`${path}/profile`}>
							<ProfileScreen />
						</Route>
						<Route exact path={`${path}/deleteAccount`}>
							<DeleteAccount />
						</Route>
					</Switch>
				</div>
			</Card>
		</Container>
	);
};

export default SettingsScreen;
