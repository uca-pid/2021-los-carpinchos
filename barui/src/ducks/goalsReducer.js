import fetcher from "./fetcher";
import { showErrorMessage, showSuccessMessage } from "./notificationsReducer";
import moment from "moment";

const GET_FUTURE_GOALS_SUCCESS = "GET_FUTURE_GOALS_SUCCESS";
const GET_CURRENT_GOAL_SUCCESS = "GET_CURRENT_GOAL_SUCCESS";
const GET_PAST_GOALS_SUCCESS = "GET_PAST_GOALS_SUCCESS";
const SAVE_GOAL_SUCCESS = "SAVE_GOAL_SUCCESS";
const DELETE_GOAL_SUCCESS = "DELETE_GOAL_SUCCESS";
const DELETE_CATEGORY_GOAL_SUCCESS = "DELETE_CATEGORY_GOAL_SUCCESS";

const SELECT_GOAL = "SELECT_GOAL";
const DESELECT_GOAL = "DESELECT_GOAL";

export const getCurrentGoal = accountId => async dispatch =>
	await fetcher
		.get(`getCurrentGoal/${accountId}`)
		.then(response => {
			if (response.length > 0) {
				let goal = response[0];
				dispatch({
					type: GET_CURRENT_GOAL_SUCCESS,
					currentGoal: {
						id: goal.id,
						incomeGoal: goal.incomeGoal,
						month: goal.month,
						year: goal.year,
						incomesByCategory: goal.incomeByCategory
							.filter(m => m.categoryIncomeGoal > 0)
							.map(cat => ({
								category: {
									id: cat.categoryId,
									name: cat.categoryName,
									static: false,
								},
								idGoalCategory: cat.idGoalCategory,
								categoryIncomeGoal: cat.categoryIncomeGoal,
								totalCategoryIncome: cat.totalCategoryIncome,
							})),
					},
				});
			}
		})
		.catch(e => {
			dispatch(showErrorMessage("No se pudieron obtener las metas. Recargue la página."));
		});

export const getFutureGoals = accountId => async dispatch =>
	await fetcher
		.get(`getFutureGoals/${accountId}`)
		.then(response => {
			dispatch({
				type: GET_FUTURE_GOALS_SUCCESS,
				futureGoals: response.map(goal => ({
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
						idGoalCategory: cat.idGoalCategory,
						categoryIncomeGoal: cat.categoryIncomeGoal,
						totalCategoryIncome: cat.totalCategoryIncome,
					})),
				})),
			});
		})
		.catch(e => {
			dispatch(showErrorMessage("No se pudieron obtener las metas. Recargue la página."));
		});

export const getPastGoals = accountId => async dispatch =>
	await fetcher
		.get(`getPastGoals/${accountId}`)
		.then(response => {
			dispatch({
				type: GET_PAST_GOALS_SUCCESS,
				pastGoals: response.map(goal => ({
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
						idGoalCategory: cat.idGoalCategory,
						categoryIncomeGoal: cat.categoryIncomeGoal,
						totalCategoryIncome: cat.totalCategoryIncome,
					})),
				})),
			});
		})
		.catch(e => {
			dispatch(showErrorMessage("No se pudieron obtener las metas. Recargue la página."));
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

export const updateGoal = (goalId, data) => async dispatch =>
	await fetcher
		.put(`updateGoalData/${goalId}`, data)
		.then(() => {
			dispatch(showSuccessMessage("La meta se ha actualizado éxitosamente."));
		})
		.catch(() => dispatch(showErrorMessage("No fue posible actualizar la meta. Intente de nuevo.")));

export const deleteGoal = goalId => async dispatch =>
	await fetcher
		.delete(`deleteGoal/${goalId}`)
		.then(() => {
			dispatch({ type: DELETE_GOAL_SUCCESS });
			dispatch(showSuccessMessage("La meta se ha borrada éxitosamente."));
		})
		.catch(() => dispatch(showErrorMessage("Algo salió mal borrar la meta. Intente de nuevo.")));

export const deleteGoalCategory = goalCategoryId => async dispatch =>
	await fetcher
		.delete(`deleteGoalCategory/${goalCategoryId}`)
		.then(() => {
			dispatch({ type: DELETE_CATEGORY_GOAL_SUCCESS, goalCategoryId: goalCategoryId });
		})
		.catch(() => null);

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
		case GET_CURRENT_GOAL_SUCCESS:
			return {
				...state,
				currentGoal: action.currentGoal,
			};
		case GET_FUTURE_GOALS_SUCCESS:
			return {
				...state,
				futureGoals: action.futureGoals,
			};
		case GET_PAST_GOALS_SUCCESS:
			return {
				...state,
				pastGoals: action.pastGoals,
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
		case DELETE_CATEGORY_GOAL_SUCCESS:
			return {
				...state,
				selectedGoal: {
					...state.selectedGoal,
					incomesByCategory: state.selectedGoal.incomesByCategory.filter(
						p => p.idGoalCategory !== action.goalCategoryId
					),
				},
			};
		default:
			return state;
	}
};

export default goalsReducer;
