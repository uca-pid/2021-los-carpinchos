import fetcher from "./fetcher";

// Actions
const SIGNUP_ERROR = "SIGNUP_ERROR";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

const FETCH_USER_DATA_SUCCESS = "FETCH_USER_DATA_SUCCESS";

const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

const UPDATE_DATA_SUCCESS = "UPDATE_DATA_SUCCESS";

const DELETE_ACCOUNT_SUCCESS = "DELETE_ACCOUNT_SUCCESS";
const DELETE_ACCOUNT_ERROR = "DELETE_ACCOUNT_ERROR";

const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS";

// Action Creators
export const signUp = (name, manager, email, password) => async dispatch => {
	await fetcher.post("createAccount", { name, manager, email, password }).catch(() => {
		dispatch({
			type: SIGNUP_ERROR,
			message: "! Cuenta ya existente. Utilice otro correo electrónico.",
		});
	});
};

export const login = (email, password) => async dispatch => {
	return await fetcher
		.post("login", { email, password })
		.then(response => {
			console.log(response);
			localStorage.setItem("isLoggedIn", "true");
			localStorage.setItem("userId", `${response.id}`);

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

export const getUserData = userId => async dispatch => {
	return await fetcher
		.get(`accountDetails/${userId}`)
		.then(response => {
			console.log(response);
			dispatch({
				type: FETCH_USER_DATA_SUCCESS,
				name: response.name,
				id: response.id,
				manager: response.manager,
				email: response.email,
			});
		})
		.catch(error => {
			console.log(error);
		});
};

export const updateAccountData = (userId, data) => async dispatch => {
	return await fetcher
		.put(`updateAccountData/${userId}`, data)
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

export const deleteAccount = (userId, email, password) => async dispatch => {
	return await fetcher
		.post("login", { email, password })
		.then(() => {
			fetcher.delete(`deleteAccount/${userId}`).then(() => {
				console.log("DELETE_ACCOUNT_SUCCESS");
				dispatch({ type: DELETE_ACCOUNT_SUCCESS });
			});
		})
		.catch(() => {
			console.log("DELETE_ACCOUNT_ERROR");
			dispatch({ type: DELETE_ACCOUNT_ERROR, message: "! Contraseña incorrecta. Vuelva a intentar." });
			throw new Error();
		});
};

export const getAllProducts = accountId => async dispatch => {
	return await fetcher.get(`getAllProducts/${accountId}`).then(response => {
		console.log(response);
		dispatch({
			type: GET_ALL_PRODUCTS_SUCCESS,
			products: response,
		});
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
	errors: {
		value: false,
		message: "",
	},
	products: [],
};

// Reducer
const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
		case FETCH_USER_DATA_SUCCESS:
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
		case LOGOUT_SUCCESS:
		case DELETE_ACCOUNT_SUCCESS:
			return {
				...state,
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
		case UPDATE_DATA_SUCCESS:
			return {
				...state,
				accountData: {
					...state.accountData,
					name: action.name,
					manager: action.manager,
					email: action.email,
				},
				error: {
					value: false,
					message: "",
				},
			};
		case SIGNUP_ERROR:
		case LOGIN_ERROR:
		case DELETE_ACCOUNT_ERROR:
			return {
				...state,
				error: {
					value: true,
					message: action.message,
				},
			};
		case GET_ALL_PRODUCTS_SUCCESS:
			return {
				...state,
				products: action.products,
			};
		default:
			return state;
	}
};

export default sessionReducer;
