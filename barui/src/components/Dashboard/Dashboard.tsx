import React, { useEffect } from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";
import ProductsScreen from "./ProductsScreen";
import SettingsScreen from "./SettingsScreen";
import SalesScreen from "./SalesScreen";
import ChartsScreen from "./ChartsScreen";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getUserData } from "../../ducks/sessionReducer";
import { getAllProducts } from "../../ducks/productsReducer";

type Props = {
	actions: {
		getUserData: Function;
		getAllProducts: Function;
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
				<ChartsScreen />
			</Route>
			<Route path={`${path}/settings`}>
				<SettingsScreen />
			</Route>
			<Route exact path={`${path}/products`}>
				<ProductsScreen />
			</Route>
			<Route path={`${path}/sales`}>
				<SalesScreen />
			</Route>
			<Route path="*">Page not found</Route>
		</Switch>
	);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			getUserData,
			getAllProducts,
		},
		dispatch
	),
});

export default connect(null, mapDispatchToProps)(Dashboard);
