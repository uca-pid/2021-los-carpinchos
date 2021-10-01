import { combineReducers } from "redux";

import session from "../sessionReducer";
import notifications from "../notificationsReducer";
import products from "../productsReducer";
import categories from "../categoriesReducer";
import sales from "../salesReducer";

const rootReducer = () =>
	combineReducers({
		session,
		notifications,
		products,
		categories,
		sales,
	});

export default rootReducer;
