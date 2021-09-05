import React from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import AppBar from "../common/AppBar";
import Home from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";
import Dashboard from "../Dashboard";
import ResetPassword from "../ResetPassword";
import Route from "./RedirectRoute";

import theme from "./theme";

const App = () => (
	<ThemeProvider theme={theme}>
		<Router>
			<AppBar />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/signUp">
					<SignUp />
				</Route>
				<Route exact path="/resetPassword">
					<ResetPassword />
				</Route>
				<PrivateRoute exact path="/dashboard">
					<Dashboard />
				</PrivateRoute>
			</Switch>
		</Router>
	</ThemeProvider>
);

export default App;
