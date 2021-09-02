import React from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppBar from "../common/AppBar";
import Home from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";
import PrivateRoute from "../PrivateRoute";

import theme from "./theme";

const App = () => (
	<ThemeProvider theme={theme}>
		<Router>
			<AppBar />
			<Switch>
				<Route exact path="/home">
					<Home />
				</Route>
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/signUp">
					<SignUp />
				</Route>
				<Route path="/">
					<PrivateRoute />
				</Route>
			</Switch>
		</Router>
	</ThemeProvider>
);

export default App;
