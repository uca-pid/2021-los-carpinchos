import React from "react";

import { Route, Redirect } from "react-router-dom";

type Props = {
	exact?: boolean;
	path: string;
	children: any;
};

const RedirectRoute = ({ children, ...rest }: Props) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				JSON.parse(localStorage.getItem("isLoggedIn") ?? "false") ? (
					<Redirect
						to={{
							pathname: "/dashboard",
							state: { from: location },
						}}
					/>
				) : (
					children
				)
			}
		/>
	);
};

export default RedirectRoute;
