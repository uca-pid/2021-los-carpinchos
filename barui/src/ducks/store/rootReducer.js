import { combineReducers } from "redux";

import session from "../sessionReducer";
import notifications from "../notificationsReducer";
import products from "../productsReducer";
import categories from "../categoriesReducer";
import sales from "../salesReducer";
import chart from "../chartReducer";

const rootReducer = () =>
	combineReducers({
		session,
		notifications,
		products,
		categories,
		sales,
		chart,
	});

export default rootReducer;
