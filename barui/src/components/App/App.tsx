import React from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./RedirectRoute";
import PrivateRoute from "./PrivateRoute";

import AppBar from "../common/AppBar";
import Home from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";
import Dashboard from "../Dashboard";

import RequestPasswordReset from "../Password/RequestPasswordReset";
import SecurityCodeValidation from "../Password/SecurityCodeValidation";
import ResetPassword from "../Password/ResetPassword";

import theme from "./theme";
import Notifications from "./Notification";

const App = () => (
	<ThemeProvider theme={theme}>
		<Router>
			<AppBar />
			<Notifications />
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
				<Route exact path="/requestPasswordReset">
					<RequestPasswordReset />
				</Route>
				<Route exact path="/securityCodeValidation">
					<SecurityCodeValidation />
				</Route>
				<Route exact path="/resetPassword">
					<ResetPassword />
				</Route>
				<PrivateRoute path="/dashboard">
					<Dashboard />
				</PrivateRoute>
				<Route path="*">Page not found</Route>
			</Switch>
		</Router>
	</ThemeProvider>
);

export default App;
