import React from "react";

import { Route, Redirect } from "react-router-dom";

type Props = {
	exact?: boolean;
	path: string;
	children: any;
};

const PrivateRoute = ({ children, ...rest }: Props) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				JSON.parse(localStorage.getItem("isLoggedIn") ?? "false") ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
