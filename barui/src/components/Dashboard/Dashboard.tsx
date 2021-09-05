import React from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";
import MainScreen from "./MainScreen";
import SettingsScreen from "./SettingsScreen";

const Dashboard = () => {
	let { path } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={path}>
				<MainScreen />
			</Route>
			<Route path={`${path}/settings`}>
				<SettingsScreen />
			</Route>
		</Switch>
	);
};

export default Dashboard;
