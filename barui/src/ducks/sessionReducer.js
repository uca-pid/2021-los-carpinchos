import fetcher from "./fetcher";

// Actions
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

const UPDATE_DATA_SUCCESS = "UPDATE_DATA_SUCCESS";

// Action Creators
export const login = (email, password) => async dispatch => {
	return await fetcher
		.post("login", { email, password })
		.then(response => {
			console.log(response);
			localStorage.setItem("isLoggedIn", "true");

			dispatch({
				type: LOGIN_SUCCESS,
				name: response.name,
				id: response.id,
				manager: response.manager,
				email: response.email,
			});
		})
		.catch(() => {
			dispatch({ type: LOGIN_ERROR, message: "! Usuario/Contraseña incorrecta" });
		});
};

export const updateAccountData = (userId, data) => async dispatch => {
	console.log(data);
	console.log(userId);
	return await fetcher
		.put(`updateUserData/${userId}`, data)
		.then(response => {
			console.log(response);

			dispatch({
				type: UPDATE_DATA_SUCCESS,
				name: response.name,
				manager: response.manager,
				email: response.email,
			});
		})
		.catch(() => {
			console.log("UPDATE_DATA_ERROR");
		});
};

// State
const initialState = {
	accountData: {
		id: null,
		name: "",
		manager: "",
		email: "",
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
				accountData: {
					id: action.id,
					name: action.name,
					manager: action.manager,
					email: action.email,
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
		case LOGOUT_SUCCESS:
			return {
				...state,
				accountData: {
					id: null,
					name: "",
					manager: "",
					email: "",
				},
			};
		case UPDATE_DATA_SUCCESS:
			return {
				...state,
				accountData: {
					...state.accountData,
					name: action.name,
					manager: action.manager,
					email: action.email,
				},
			};
		default:
			return state;
	}
};

export default sessionReducer;
