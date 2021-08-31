import React from "react";

import { Toolbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppBar from "../common/AppBar";
import Home from "../Home";
import Login from "../Login";
import PrivateRoute from "../PrivateRoute";

import theme from "./theme";

const App = () => (
	<ThemeProvider theme={theme}>
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
	</ThemeProvider>
);

export default App;
