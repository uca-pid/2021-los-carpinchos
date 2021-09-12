import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import configureStore from "./ducks/store";

import { SnackbarProvider as NotificationsProvider } from "notistack";

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<NotificationsProvider maxSnack={3}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</NotificationsProvider>
	</Provider>,

	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
