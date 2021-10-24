import fetcher from "./fetcher";
import { showErrorMessage, showSuccessMessage } from "./notificationsReducer";
import moment from "moment";

const SELECT_GOAL = "SELECT_GOAL";
const DESELECT_GOAL = "DESELECT_GOAL";

export const getGoals = accountId => async dispatch => {};
// await fetcher
// 	.get(`getAllSales/${accountId}`)
// 	.then(response => {
// 		dispatch({
// 			type: GET_USER_SALES_SUCCES,
// 			userSales: response.map(sale => ({
// 				id: sale.sale_id,
// 				creationDate: new Date(sale.creation_date),
// 				productsSale: sale.sale_product.map(p => ({
// 					id: p.sale_products,
// 					amount: p.quantity_of_product,
// 					product: {
// 						id: p.product.product_id,
// 						name: p.product.name,
// 						price: p.product.price,
// 						category: {
// 							id: p.product.category.category_id,
// 							name: p.product.category.category_name,
// 							static: p.product.category.category_static,
// 						},
// 					},
// 				})),
// 			})),
// 		});
// 	})
// 	.catch(() => {
// 		dispatch(showErrorMessage("No se pudieron obtener las ventas. Recargue la página."));
// 	});

export const addNewGoal = (accountId, productsSale, date) => async dispatch => {};
// await fetcher
// 	.post(`createSale/${accountId}`, {
// 		creation_date: moment(date).format("DD/MM/YY HH:mm:ss"),
// 		products: productsSale,
// 	})
// 	.then(response => {
// 		dispatch({ type: SAVE_SALE_SUCCESS });
// 		dispatch(showSuccessMessage("Una nueva venta ha sido creada."));

// 		return response;
// 	})
// 	.catch(() => {
// 		dispatch(showErrorMessage("No se pudo crear la nueva venta. Intente de nuevo."));
// 	});

export const selectGoal = goal => dispatch =>
	dispatch({
		type: SELECT_GOAL,
		goal,
	});

export const deselectGoal = () => dispatch => dispatch({ type: DESELECT_GOAL });

export const updateGoal = (goalId, data) => async dispatch => {};
// await fetcher
// 	.put(`updateSaleData/${saleId}`, data)
// 	.then(() => {
// 		dispatch(showSuccessMessage("La venta se ha actualizado éxitosamente."));
// 	})
// 	.catch(() => dispatch(showErrorMessage("No fue posible actualizar la venta. Intente de nuevo.")));

export const deleteGoal = goalId => async dispatch => {};
// await fetcher
// 	.delete(`deleteSale/${saleId}`)
// 	.then(() => {
// 		dispatch({ type: DELETE_SALE_SUCCESS });
// 		dispatch(showSuccessMessage("La venta se ha borrada éxitosamente."));
// 	})
// 	.catch(() => dispatch(showErrorMessage("Algo salió mal borrar la venta. Intente de nuevo.")));

export const deleteGoalProduct = goalCategoryId => async dispatch => {};
// await fetcher
// 	.delete(`deleteSaleProduct/${saleProductId}`)
// 	.then(() => {
// 		dispatch({ type: DELETE_SALE_PRODUCT_SUCCESS, productSaleId: saleProductId });
// 	})
// 	.catch(() => null);

// State
const initialState = {
	futureGoals: [],
	pastGoals: [],
	currentGoal: null,
	selectedGoal: null,
};

// Reducer
const goalsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SELECT_GOAL:
			return {
				...state,
				selectedGoal: action.goal,
			};
		case DESELECT_GOAL:
			return {
				...state,
				selectedGoal: null,
			};
		default:
			return state;
	}
};

export default goalsReducer;
