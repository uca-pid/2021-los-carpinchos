import { combineReducers } from "redux";

import session from "../sessionReducer";
import notifications from "../notificationsReducer";
import products from "../productsReducer";

const rootReducer = () =>
	combineReducers({
		session,
		notifications,
		products,
	});

export default rootReducer;
