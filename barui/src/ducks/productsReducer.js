import fetcher from "./fetcher";
import { showErrorMessage, showSuccessMessage } from "./notificationsReducer";

const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS";

const SELECT_PRODUCT = "SELECT_PRODUCT";
const DESELECT_PRODUCT = "DESELECT_PRODUCT";

const SAVE_PRODUCT_SUCCESS = "SAVE_PRODUCT_SUCCESS";

const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";

const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";

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
		.then(() => {
			dispatch({ type: SAVE_PRODUCT_SUCCESS });
			dispatch(showSuccessMessage("Un nuevo producto ha sido agregado a la carta."));
		})
		.catch(() => {
			dispatch(showErrorMessage("No se pudo agrega el nuevo producto. Intente de nuevo."));
		});

export const selectProduct = product => dispatch =>
	dispatch({
		type: SELECT_PRODUCT,
		product,
	});

export const deselectProduct = () => dispatch => dispatch({ type: DESELECT_PRODUCT });

export const updateProduct = (productId, data) => async dispatch =>
	await fetcher
		.put(`updateProductData/${productId}`, data)
		.then(() => {
			dispatch({ type: UPDATE_PRODUCT_SUCCESS });
			dispatch(showSuccessMessage("El producto se ha actualizado éxitosamente."));
		})
		.catch(() =>
			dispatch(showErrorMessage("No fue posible actualizar los datos del producto. Intente de nuevo."))
		);

export const deleteProduct = productId => async dispatch =>
	await fetcher
		.delete(`deleteProduct/${productId}`)
		.then(() => {
			dispatch({ type: DELETE_PRODUCT_SUCCESS });
			dispatch(showSuccessMessage("El producto se ha borrada éxitosamente."));
		})
		.catch(() => dispatch(showErrorMessage("Algo salió mal borrar el producto. Intente de nuevo.")));

// State
const initialState = {
	userProducts: [],
	selectedProduct: null,
};

// Reducer
const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_PRODUCTS_SUCCESS:
			return {
				...state,
				userProducts: action.products,
			};
		case SELECT_PRODUCT:
			return {
				...state,
				selectedProduct: action.product,
			};
		case DESELECT_PRODUCT:
		case SAVE_PRODUCT_SUCCESS:
		case DELETE_PRODUCT_SUCCESS:
		case UPDATE_PRODUCT_SUCCESS:
			return {
				...state,
				selectedProduct: null,
			};
		default:
			return state;
	}
};

export default productsReducer;
