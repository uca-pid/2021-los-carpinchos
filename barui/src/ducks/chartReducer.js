import fetcher from "./fetcher";
import moment from "moment";

const GET_BARS_CHART_SUCCESS = "GET_BARS_CHART_SUCCESS";

export const getSalesBarsChart = (accountId, from, to) => async dispatch =>
	await fetcher
		.post(`getAllSalesByDate/${accountId}`, {
			from: moment(from).format("DD/MM/YY"),
			to: moment(to).format("DD/MM/YY"),
		})
		.then(response => {
			dispatch({
				type: GET_BARS_CHART_SUCCESS,
				yearIncomes: response.map(r => ({ ...r, month: moment(r.month, "M").format("MMMM") })),
			});
			return response;
		})
		.catch(() => null);

// State
const initialState = {
	yearIncomes: [],
};

// Reducer
const chartReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_BARS_CHART_SUCCESS:
			return {
				...state,
				yearIncomes: action.yearIncomes,
			};
		default:
			return state;
	}
};

export default chartReducer;
