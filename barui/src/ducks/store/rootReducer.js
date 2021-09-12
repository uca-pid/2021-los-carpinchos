import { combineReducers } from "redux";

import session from "../sessionReducer";
import notifications from "../notificationsReducer";

const rootReducer = () =>
	combineReducers({
		session,
		notifications,
	});

export default rootReducer;
