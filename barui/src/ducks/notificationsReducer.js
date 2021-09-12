export const ERROR_NOTIFICATION = "ERROR_NOTIFICATION";
export const SUCCESS_NOTIFICATION = "SUCCESS_NOTIFICATION";

export const showErrorMessage =
	(message = null) =>
	dispatch => {
		dispatch({
			type: ERROR_NOTIFICATION,
			notificationsMessage: message ?? "Algo salió mal. Intenta de nuevo.",
			notificationsOptions: { variant: "error" },
		});
	};

export const showSuccessMessage =
	(message = null) =>
	dispatch => {
		dispatch({
			type: SUCCESS_NOTIFICATION,
			notificationsMessage: message ?? "Operación éxitosa.",
			notificationsOptions: { variant: "success" },
		});
	};

const initialState = {
	iteration: 0,
	notificationsMessage: "",
	notificationsOptions: undefined,
};

const notificationsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ERROR_NOTIFICATION:
		case SUCCESS_NOTIFICATION:
			// eslint-disable-next-line no-case-declarations
			let iter = state.iteration + 1;
			if (state.notificationsMessage !== action.notificationsMessage) {
				iter = 0;
			}

			return {
				iteration: iter,
				notificationsMessage: action.notificationsMessage + `${iter > 0 ? ` (${iter})` : ""}`,
				notificationsOptions: action.notificationsOptions,
			};
		default:
			return state;
	}
};

export default notificationsReducer;
