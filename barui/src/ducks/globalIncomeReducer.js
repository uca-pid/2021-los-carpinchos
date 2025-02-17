const SET_GLOBAL_INCOME = "SET_GLOBAL_INCOME";

export const setGlobalIncome = (income) => ({
  type: SET_GLOBAL_INCOME,
  payload: income,
});

const initialState = 0;

const globalIncomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GLOBAL_INCOME:
      return action.payload;
    default:
      return state;
  }
};

export default globalIncomeReducer;