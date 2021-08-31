import React from "react";
import { Toolbar } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppBar from "../common/AppBar";
import Home from "../Home";
import Login from "../Login";
import PrivateRoute from "../PrivateRoute";

const App = () => (
	<Router>
		<AppBar />
		<Toolbar />
		<Switch>
			<Route exact path="/home">
				<Home />
			</Route>
			<Route exact path="/login">
				<Login />
			</Route>
			<Route path="/">
				<PrivateRoute />
			</Route>
		</Switch>
	</Router>
);

export default App;
