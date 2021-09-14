import fetcher from "./fetcher";
import { showErrorMessage, showSuccessMessage } from "./notificationsReducer";

const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS";

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
	userProducts: [],
};

// Reducer
const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_PRODUCTS_SUCCESS:
			return {
				...state,
				userProducts: action.products,
			};
		default:
			return state;
	}
};

export default productsReducer;
