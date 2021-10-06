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
			dispatch({
				type: GET_USER_SALES_SUCCES,
				userSales: response.map(sale => ({
					id: sale.sale_id,
					creationDate: new Date(sale.creation_date),
					productsSale: sale.sale_product.map(p => ({
						amount: p.quantity_of_product,
						product: {
							id: p.product.product_id,
							name: p.product.name,
							price: p.product.price,
							category: {
								id: p.product.category.category_id,
								name: p.product.category.category_name,
								static: p.product.category.category_static,
							},
						},
					})),
				})),
			});
		})
		.catch(() => {
			dispatch(showErrorMessage("No se pudieron obtener las ventas. Recargue la página."));
		});

export const addNewSale = (accountId, productsSale) => async dispatch =>
	await fetcher
		.post(`createSale/${accountId}`, { creation_date: new Date().toString(), products: productsSale })
		.then(response => {
			dispatch({ type: SAVE_SALE_SUCCESS });
			dispatch(showSuccessMessage("Una nueva venta ha sido creada."));

			return response;
		})
		.catch(() => {
			dispatch(showErrorMessage("No se pudo crear la nueva venta. Intente de nuevo."));
		});

export const selectSale = sale => dispatch =>
	dispatch({
		type: SELECT_SALE,
		sale,
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
				selectedSale: action.sale,
			};
		case DESELECT_SALE:
		case SAVE_SALE_SUCCESS:
		case DELETE_SALE_SUCCESS:
		case UPDATE_SALE_SUCCESS:
			return {
				...state,
				selectedSale: null,
			};
		default:
			return state;
	}
};

export default categoriesReducer;
