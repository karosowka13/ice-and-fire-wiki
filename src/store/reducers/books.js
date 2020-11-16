import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	books: [],
	loading: false,
	error: false,
	success: false,
};

const fetchBooksStart = (state, action) => {
	return updateObject(state, { loading: true });
};

const fetchBooksSuccess = (state, action) => {
	return updateObject(state, {
		books: action.books,
		loading: false,
		success: true,
	});
};

const fetchBooksFail = (state, action) => {
	return updateObject(state, { loading: false, error: true });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_BOOKS_START:
			return fetchBooksStart(state, action);
		case actionTypes.FETCH_BOOKS_SUCCESS:
			return fetchBooksSuccess(state, action);
		case actionTypes.FETCH_BOOKS_FAIL:
			return fetchBooksFail(state, action);
		default:
			return state;
	}
};

export default reducer;
