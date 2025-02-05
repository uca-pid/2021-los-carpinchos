import fetcher from "./fetcher";
import { showErrorMessage, showSuccessMessage } from "./notificationsReducer";

const GET_STATIC_CATEGORIES_SUCCESS = "GET_STATIC_CATEGORIES_SUCCESS";
const GET_USER_CATEGORIES_SUCCESS = "GET_USER_CATEGORIES_SUCCESS";

const SELECT_CATEGORY = "SELECT_CATEGORY";
const DESELECT_CATEGORY = "DESELECT_CATEGORY";

const SAVE_CATEGORY_SUCCESS = "SAVE_CATEGORY_SUCCESS";

const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS";

const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";

export const getStaticCategories = () => async dispatch =>
	await fetcher
		.get("getAllStaticCategories")
		.then(response =>
			dispatch({
				type: GET_STATIC_CATEGORIES_SUCCESS,
				staticCategories: response.map(cat => ({
					id: cat.category_id,
					name: cat.category_name,
					static: cat.static,
				})),
			})
		)
		.catch(() => {
			dispatch(showErrorMessage("No se pudieron obtener las categorias. Recargue la página."));
		});

export const getUserCategories = accountId => async dispatch =>
	await fetcher
		.get(`getAllNonStaticCategories/${accountId}`)
		.then(response =>
			dispatch({
				type: GET_USER_CATEGORIES_SUCCESS,
				userCategories: response.map(cat => ({
					id: cat.category_id,
					name: cat.category_name,
					static: cat.static,
				})),
			})
		)
		.catch(() => {
			dispatch(showErrorMessage("No se pudieron obtener las categorias. Recargue la página."));
		});

export const addNewCategory = (name, accountId) => async dispatch =>
	await fetcher
		.post(`createCategory/${accountId}`, { name })
		.then(response => {
			dispatch({ type: SAVE_CATEGORY_SUCCESS });
			dispatch(showSuccessMessage(`Una nueva categoría ha sido creada: ${name}`));

			return response;
		})
		.catch( error => {
		    const errorMessage = error.message || 'Hubo un problema al crear la categoría. Intente de nuevo';
			dispatch(showErrorMessage(errorMessage));
		});

export const selectCategory = category => dispatch =>
	dispatch({
		type: SELECT_CATEGORY,
		category,
	});

export const deselectCategory = () => dispatch => dispatch({ type: DESELECT_CATEGORY });

export const updateCategory = (categoryId, data) => async dispatch =>
	await fetcher
		.put(`updateCategoryData/${categoryId}`, data)
		.then(() => {
			dispatch({ type: UPDATE_CATEGORY_SUCCESS });
			dispatch(showSuccessMessage("La categoría se ha actualizado éxitosamente."));
		})
		.catch( error => {
            const errorMessage = error.message || 'Hubo un problema al editar la categoría. Intente de nuevo';
            dispatch(showErrorMessage(errorMessage));
    });

export const deleteCategory = categoryId => async dispatch =>
	await fetcher
		.delete(`deleteCategory/${categoryId}`)
		.then(() => {
			dispatch({ type: DELETE_CATEGORY_SUCCESS });
			dispatch(showSuccessMessage("La categoría se ha borrada éxitosamente."));
		})
		.catch(() => dispatch(showErrorMessage("Algo salió mal borrar la categoría. Intente de nuevo.")));

// State
const initialState = {
	staticCategories: [],
	userCategories: [],
	selectedCategory: null,
};

// Reducer
const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_STATIC_CATEGORIES_SUCCESS:
			return {
				...state,
				staticCategories: action.staticCategories,
			};
		case GET_USER_CATEGORIES_SUCCESS:
			return {
				...state,
				userCategories: action.userCategories,
			};
		case SELECT_CATEGORY:
			return {
				...state,
				selectedCategory: action.category,
			};
		case DESELECT_CATEGORY:
		case SAVE_CATEGORY_SUCCESS:
		case DELETE_CATEGORY_SUCCESS:
		case UPDATE_CATEGORY_SUCCESS:
			return {
				...state,
				selectedCategory: null,
			};
		default:
			return state;
	}
};

export default categoriesReducer;
