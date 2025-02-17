import { combineReducers } from "redux";

import session from "../sessionReducer";
import notifications from "../notificationsReducer";
import products from "../productsReducer";
import categories from "../categoriesReducer";
import sales from "../salesReducer";
import chart from "../chartReducer";
import goals from "../goalsReducer";
import globalIncome from "../globalIncomeReducer";

const rootReducer = () =>
	combineReducers({
		session,
		notifications,
		products,
		categories,
		sales,
		chart,
		goals,
		globalIncome,
	});

export default rootReducer;
