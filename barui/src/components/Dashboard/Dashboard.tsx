import React, { useEffect } from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";
import MainScreen from "./MainScreen";
import SettingsScreen from "./SettingsScreen";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getUserData } from "../../ducks/sessionReducer";

type Props = {
	actions: {
		getUserData: Function;
	};
};
const Dashboard = ({ actions }: Props) => {
	let { path } = useRouteMatch();

	useEffect(() => {
		let userId = localStorage.getItem("userId");

		actions.getUserData(userId);
	}, [actions]);

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			getUserData,
		},
		dispatch
	),
});

export default connect(null, mapDispatchToProps)(Dashboard);
