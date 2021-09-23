import { combineReducers } from "redux";

import session from "../sessionReducer";
import notifications from "../notificationsReducer";
import products from "../productsReducer";
import categories from "../categoriesReducer";

const rootReducer = () =>
	combineReducers({
		session,
		notifications,
		products,
		categories,
	});

export default rootReducer;
