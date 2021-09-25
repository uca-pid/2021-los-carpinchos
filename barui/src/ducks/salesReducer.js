import fetcher from "./fetcher";
import { showErrorMessage, showSuccessMessage } from "./notificationsReducer";

const GET_USER_SALES_SUCCES = "GET_USER_SALES_SUCCES";

const SELECT_SALE = "SELECT_SALE";
const DESELECT_SALE = "DESELECT_SALE";

const SAVE_SALE_SUCCESS = "SAVE_SALE_SUCCESS";

const UPDATE_SALE_SUCCESS = "UPDATE_SALE_SUCCESS";

const DELETE_SALE_SUCCESS = "DELETE_SALE_SUCCESS";

export const getSales = accountId => async dispatch =>
	await fetcher
		.get(`getAllSales/${accountId}`)
		.then(response => {
			console.log(response);
			dispatch({
				type: GET_USER_SALES_SUCCES,
				// userSales: response.map(cat => ({
				// 	id: cat.category_id,
				// 	name: cat.category_name,
				// 	static: cat.static,
				// })),
			});
		})
		.catch(() => {
			dispatch(showErrorMessage("No se pudieron obtener las ventas. Recargue la página."));
		});

export const addNewSale = (name, accountId) => async dispatch =>
	await fetcher
		.post(`createSale/${accountId}`, { name })
		.then(response => {
			dispatch({ type: SAVE_SALE_SUCCESS });
			dispatch(showSuccessMessage("Una nueva venta ha sido creada."));

			return response;
		})
		.catch(() => {
			dispatch(showErrorMessage("No se pudo crear la nueva venta. Intente de nuevo."));
		});

export const selectSale = category => dispatch =>
	dispatch({
		type: SELECT_SALE,
		category,
	});

export const deselectSale = () => dispatch => dispatch({ type: DESELECT_SALE });

export const updateSale = (saleId, data) => async dispatch =>
	await fetcher
		.put(`updateSaleData/${saleId}`, data)
		.then(() => {
			dispatch({ type: UPDATE_SALE_SUCCESS });
			dispatch(showSuccessMessage("La venta se ha actualizado éxitosamente."));
		})
		.catch(() => dispatch(showErrorMessage("No fue posible actualizar la venta. Intente de nuevo.")));

export const deleteSale = saleId => async dispatch =>
	await fetcher
		.delete(`deleteSale/${saleId}`)
		.then(() => {
			dispatch({ type: DELETE_SALE_SUCCESS });
			dispatch(showSuccessMessage("La venta se ha borrada éxitosamente."));
		})
		.catch(() => dispatch(showErrorMessage("Algo salió mal borrar la venta. Intente de nuevo.")));

// State
const initialState = {
	userSales: [],
	selectedSale: null,
};

// Reducer
const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_SALES_SUCCES:
			return {
				...state,
				userSales: action.userSales,
			};
		case SELECT_SALE:
			return {
				...state,
				selectedCategory: action.category,
			};
		case DESELECT_SALE:
		case SAVE_SALE_SUCCESS:
		case DELETE_SALE_SUCCESS:
		case UPDATE_SALE_SUCCESS:
			return {
				...state,
				selectedCategory: null,
			};
		default:
			return state;
	}
};

export default categoriesReducer;
