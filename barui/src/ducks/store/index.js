import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

const configureStore = initialState =>
	createStore(rootReducer(), initialState, applyMiddleware(thunk));

export default configureStore;
