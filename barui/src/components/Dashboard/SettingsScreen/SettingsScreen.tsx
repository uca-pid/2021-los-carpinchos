import React, { useCallback, useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Switch, Route, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import ProfileScreen from "./ProfileScreen";
import { Card, Container } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import WarningIcon from "@material-ui/icons/Warning";
import DeleteAccount from "./DeleteAccount";
import styles from "./ProfileScreen/styles";

const routes = [
	{
		pathName: "profile",
		component: ProfileScreen,
	},
	{
		pathName: "deleteAccount",
		component: DeleteAccount,
	},
];

const SettingsScreen = () => {
	let { path } = useRouteMatch();
	const classes = styles();

	const history = useHistory();

	const location = useLocation();

	const [value, setValue] = React.useState("profile");

	const handleChange = useCallback(
		(event: React.ChangeEvent<{}>, newPath: string) => {
			setValue(newPath);
			history.push(`${path}/${newPath}`);
		},
		[history, setValue]
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

				<Switch>
					<Route exact path={`${path}/profile`}>
						<ProfileScreen />
					</Route>
					<Route exact path={`${path}/deleteAccount`}>
						<DeleteAccount />
					</Route>
				</Switch>
			</Card>
		</Container>
	);
};

export default SettingsScreen;
