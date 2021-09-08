// What is Redux Ducks?
// https://medium.com/@matthew.holman/what-is-redux-ducks-46bcb1ad04b7

import fetcher from "./fetcher";

// WARNING: This is just a model to build the actual reducers.

// Actions
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

// Action Creators
export const login = (email, password) => async dispatch => {
	console.log(email);
	console.log(password);

	return await fetcher
		.post("user_log_in/", { email, password })
		.then(response => {
			console.log("login success");
			console.log(response);
			localStorage.setItem("isLoggedIn", "true");
			dispatch({ type: LOGIN_SUCCESS, name: response.user_name, id: response.user_id });
		})
		.catch(() => {
			console.log("login failed");

			dispatch({ type: LOGIN_ERROR, message: "! Usuario/Contraseña incorrecta" });
		});
};

// State
const initialState = {
	userData: {
		id: null,
		name: "",
	},
	error: {
		value: false,
		message: "",
	},
};

// Reducer
const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				userData: {
					id: action.id,
					name: action.name,
				},
				error: {
					value: false,
					message: "",
				},
			};
		case LOGIN_ERROR:
			return {
				...state,
				error: {
					value: true,
					message: action.message,
				},
			};
		default:
			return state;
	}
};

export default sessionReducer;
