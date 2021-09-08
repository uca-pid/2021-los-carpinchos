// What is Redux Ducks?
// https://medium.com/@matthew.holman/what-is-redux-ducks-46bcb1ad04b7

// WARNING: This is just a model to build the actual reducers.

// Actions
const ACTION_NAME = "ACTION_NAME";

// Action Creators
export const action = propName => dispatch => dispatch({ type: ACTION_NAME, propName });

// State
const initialState = {};

// Reducer
const ducksReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_NAME:
			return {
				...state,
				// state: action.propName
			};
		default:
			return state;
	}
};

export default ducksReducer;
