import fetcher from "./fetcher";
import { showErrorMessage, showSuccessMessage } from "./notificationsReducer";
import moment from "moment";

const GET_GOALS_SUCCES = "GET_GOALS_SUCCES";
const SAVE_GOAL_SUCCESS = "SAVE_GOAL_SUCCESS";
const DELETE_GOAL_SUCCESS = "DELETE_GOAL_SUCCESS";

const SELECT_GOAL = "SELECT_GOAL";
const DESELECT_GOAL = "DESELECT_GOAL";

export const getGoals = accountId => async dispatch =>
	await fetcher
		.get(`getAllGoals/${accountId}`)
		.then(response => {
			dispatch({
				type: GET_GOALS_SUCCES,
				allGoals: response.map(goal => ({
					id: goal.id,
					incomeGoal: goal.incomeGoal,
					month: goal.month,
					year: goal.year,
					incomesByCategory: goal.incomeByCategory.map(cat => ({
						category: {
							id: cat.categoryId,
							name: cat.categoryName,
							static: false,
						},
						categoryIncomeGoal: cat.categoryIncomeGoal,
						totalCategoryIncome: cat.totalCategoryIncome,
					})),
				})),
			});
		})
		.catch(e => {
			dispatch(showErrorMessage("No se pudieron obtener las metas. Recargue la página."));
			throw new Error(e);
		});

export const addNewGoal = (accountId, incomeGoal, incomesByCategory, date) => async dispatch =>
	await fetcher
		.post(`createGoal/${accountId}`, {
			incomeGoal: incomeGoal,
			month: parseInt(moment(date).format("MM")),
			year: parseInt(moment(date).format("YYYY")),
			categories: incomesByCategory,
		})
		.then(response => {
			dispatch({ type: SAVE_GOAL_SUCCESS });
			dispatch(showSuccessMessage("Una nueva meta ha sido creada."));

			return response;
		})
		.catch(() => {
			dispatch(showErrorMessage("No se pudo crear la nueva meta. Intente de nuevo."));
		});

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

export const deleteGoal = goalId => async dispatch =>
	await fetcher
		.delete(`deleteGoal/${goalId}`)
		.then(() => {
			dispatch({ type: DELETE_GOAL_SUCCESS });
			dispatch(showSuccessMessage("La meta se ha borrada éxitosamente."));
		})
		.catch(() => dispatch(showErrorMessage("Algo salió mal borrar la meta. Intente de nuevo.")));

export const deleteGoalCategory = goalCategoryId => async dispatch => {};
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
		case GET_GOALS_SUCCES:
			return {
				...state,
				futureGoals: action.allGoals,
			};
		case SELECT_GOAL:
			return {
				...state,
				selectedGoal: action.goal,
			};
		case SAVE_GOAL_SUCCESS:
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
