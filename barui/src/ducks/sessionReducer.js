import fetcher from "./fetcher";
import { showErrorMessage, showSuccessMessage } from "./notificationsReducer";

// Actions
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
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
export const signUp = (name, manager, email, password) => async dispatch =>
	await fetcher
		.post("createAccount", { name, manager, email, password })
		.then(response => {
			dispatch({ type: SIGNUP_SUCCESS, email: response.email });
			dispatch(showSuccessMessage("Cuenta creada éxtisamente."));
		})
		.catch(() => {
			dispatch(showErrorMessage("Cuenta ya existente. Utilice otro correo electrónico."));
			throw new Error();
		});

export const login = (email, password) => async dispatch =>
	await fetcher
		.post("login", { email, password })
		.then(response => {
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
		.catch(() => dispatch(showErrorMessage("Usuario/Contraseña incorrecta.")));

export const getUserData = userId => async dispatch =>
	await fetcher
		.get(`accountDetails/${userId}`)
		.then(response =>
			dispatch({
				type: FETCH_USER_DATA_SUCCESS,
				name: response.name,
				id: response.id,
				manager: response.manager,
				email: response.email,
			})
		)
		.catch(() =>
			dispatch(showErrorMessage("No fue posible obtener su información. Recargue la página."))
		);

export const updateAccountData = (userId, data) => async dispatch =>
	await fetcher
		.put(`updateAccountData/${userId}`, data)
		.then(response => {
			dispatch({
				type: UPDATE_DATA_SUCCESS,
				name: response.name,
				manager: response.manager,
				email: response.email,
			});
			dispatch(showSuccessMessage("Sus datos han sido actualizados éxitosamente."));
		})
		.catch(() =>
			dispatch(showErrorMessage("No fue posible actualizar los datos de la cuenta. Intente de nuevo."))
		);

export const deleteAccount = (userId, email, password) => async dispatch => {
	return await fetcher
		.post("login", { email, password })
		.then(() => {
			fetcher
				.delete(`deleteAccount/${userId}`)
				.then(() => {
					dispatch({ type: DELETE_ACCOUNT_SUCCESS });
					dispatch(showSuccessMessage("Sus cuenta ha sido borrada éxitosamente."));
				})
				.catch(() => dispatch(showErrorMessage("Algo salió mal borrar la cuenta. Intente de nuevo.")));
		})
		.catch(() => {
			dispatch(showErrorMessage("Contraseña incorrecta. Vuelva a intentar."));
			throw new Error();
		});
};

export const getAllProducts = accountId => async dispatch =>
	await fetcher
		.get(`getAllProducts/${accountId}`)
		.then(response =>
			dispatch({
				type: GET_ALL_PRODUCTS_SUCCESS,
				products: response,
			})
		)
		.catch(() => {
			dispatch(showErrorMessage("No se pudieron obtener los productos. Intente de nuevo."));
		});

export const addNewProduct = (name, price, accountId) => async dispatch =>
	await fetcher
		.post("addNewProduct", {
			name,
			price,
			accountId,
		})
		.then(() => dispatch(showSuccessMessage("Un nuevo producto ha sido agregado a la carta.")))
		.catch(() => {
			dispatch(showErrorMessage("No se pudo agrega el nuevo producto. Intente de nuevo."));
		});

// State
const initialState = {
	accountData: {
		id: null,
		name: "",
		manager: "",
		email: "",
	},
	products: [],
};

// Reducer
const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGNUP_SUCCESS:
			return {
				...state,
				accountData: {
					...state.accountData,
					email: action.email,
				},
			};
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
