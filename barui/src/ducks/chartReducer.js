import fetcher from "./fetcher";
import moment from "moment";

const GET_BARS_CHART_SUCCESS = "GET_BARS_CHART_SUCCESS";
const GET_PIE_CHART_SUCCESS = "GET_PIE_CHART_SUCCESS";

export const getSalesBarsChart = (accountId, from, to) => async dispatch =>
	await fetcher
		.post(`getAllSalesByDate/${accountId}`, {
			from: moment(from).format("DD/MM/YY"),
			to: moment(to).format("DD/MM/YY"),
		})
		.then(response => {
			dispatch({
				type: GET_BARS_CHART_SUCCESS,
				yearIncomes: response.map(r => ({
					...r,
					month: moment(r.month, "M").format("MMMM").substr(0, 3),
				})),
			});
			return response;
		})
		.catch(() => null);

export const getIncomeByCategory = (accountId, from, to) => async dispatch =>
	await fetcher
		.post(`getIncomeByCategory/${accountId}`, {
			from: moment(from).format("DD/MM/YY"),
			to: moment(to).format("DD/MM/YY"),
		})
		.then(response => {
			dispatch({
				type: GET_PIE_CHART_SUCCESS,
				categoriesChart: response
					.map(r => ({
						categoryId: r.categoryId,
						categoryName: r.category,
						income: r.income,
					}))
					.filter(r => r.income > 0),
			});
			return response;
		})
		.catch(() => null);

// State
const initialState = {
	yearIncomes: [],
	categoriesChart: [],
};

// Reducer
const chartReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_BARS_CHART_SUCCESS:
			return {
				...state,
				yearIncomes: action.yearIncomes,
			};
		case GET_PIE_CHART_SUCCESS:
			return {
				...state,
				categoriesChart: action.categoriesChart,
			};
		default:
			return state;
	}
};

export default chartReducer;
