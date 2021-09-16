import fetcher from "./fetcher";
import { showErrorMessage, showSuccessMessage } from "./notificationsReducer";

// Actions
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

const FETCH_USER_DATA_SUCCESS = "FETCH_USER_DATA_SUCCESS";

const UPDATE_DATA_SUCCESS = "UPDATE_DATA_SUCCESS";

const DELETE_ACCOUNT_SUCCESS = "DELETE_ACCOUNT_SUCCESS";

const PASSWORD_CHANGE_REQUEST_LOADING = "PASSWORD_CHANGE_REQUEST_LOADING";
const PASSWORD_CHANGE_REQUEST_SUCCESS = "PASSWORD_CHANGE_REQUEST_SUCCESS";
const PASSWORD_CHANGE_REQUEST_ERROR = "PASSWORD_CHANGE_REQUEST_ERROR";

const PASSWORD_VALIDATION_SUCCESS = "PASSWORD_VALIDATION_SUCCESS";

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
		.catch(() => {
			dispatch({
				type: LOGIN_ERROR,
				email: email,
			});
			dispatch(showErrorMessage("Usuario/Contraseña incorrecta."));
		});

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

export const changePassword = (userId, email, currentPassword, newPassword) => async dispatch =>
	await fetcher
		.post("login", { email, password: currentPassword })
		.then(() =>
			fetcher
				.put(`updateAccountData/${userId}`, { password: newPassword })
				.then(() => {
					dispatch(showSuccessMessage("Su contraseña ha sido modificada éxitosamente."));
				})
				.catch(() =>
					dispatch(showErrorMessage("No fue posible actualizar su contraseña. Intente de nuevo."))
				)
		)
		.catch(() => {
			dispatch(showErrorMessage("Contraseña actual incorrecta. Vuelva a intentar."));
		});

export const deleteAccount = (userId, email, password) => async dispatch =>
	await fetcher
		.post("login", { email, password })
		.then(() =>
			fetcher
				.delete(`deleteAccount/${userId}`)
				.then(() => {
					dispatch({ type: DELETE_ACCOUNT_SUCCESS });
					dispatch(showSuccessMessage("Sus cuenta ha sido borrada éxitosamente."));
				})
				.catch(() => dispatch(showErrorMessage("Algo salió mal borrar la cuenta. Intente de nuevo.")))
		)
		.catch(() => {
			dispatch(showErrorMessage("Contraseña incorrecta. Vuelva a intentar."));
			throw new Error();
		});

export const requestPasswordChange = email => async dispatch => {
	dispatch({ type: PASSWORD_CHANGE_REQUEST_LOADING });

	await fetcher
		.post("requestPasswordReestablishment", { email })
		.then(() => {
			dispatch({ type: PASSWORD_CHANGE_REQUEST_SUCCESS, email, previousPath: "requestPasswordReset" });
			dispatch(showSuccessMessage("Código de seguridad enviado."));
		})
		.catch(errorMessage => {
			dispatch({ type: PASSWORD_CHANGE_REQUEST_ERROR });
			dispatch(showErrorMessage(errorMessage));
			throw new Error();
		});
};

export const validateCode = (email, code) => async dispatch => {
	await fetcher
		.post("validateCode", { email, code })
		.then(response => {
			dispatch({ type: PASSWORD_VALIDATION_SUCCESS, email, previousPath: "securityCodeValidation" });
			dispatch(showSuccessMessage(response.message));
		})
		.catch(errorMessage => {
			dispatch(showErrorMessage(errorMessage));
			throw new Error();
		});
};

export const resetPassword = (email, newPassword) => async dispatch => {
	await fetcher
		.put("resetPassword", { email, newPassword })
		.then(response => {
			dispatch(showSuccessMessage(response.message));
		})
		.catch(errorMessage => {
			dispatch(showErrorMessage(errorMessage));
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
	previousPath: "",
	loading: false,
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
			};
		case DELETE_ACCOUNT_SUCCESS:
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
		case LOGIN_ERROR:
			return {
				...state,
				accountData: {
					...state.accountData,
					email: action.email,
				},
			};
		case PASSWORD_CHANGE_REQUEST_LOADING:
			return {
				...state,
				loading: true,
			};
		case PASSWORD_CHANGE_REQUEST_SUCCESS:
		case PASSWORD_VALIDATION_SUCCESS:
			return {
				...state,
				previousPath: action.previousPath,
				loading: false,
				accountData: {
					...state.accountData,
					email: action.email,
				},
			};
		case PASSWORD_CHANGE_REQUEST_ERROR:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};

export default sessionReducer;
