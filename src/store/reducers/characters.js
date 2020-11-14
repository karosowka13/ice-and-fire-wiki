import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	characters: [],
	loading: false,
	error: null,
	success: false,
	inputed: "",
	selected: "",
	pageSize: "",
	links: { next: "", prev: "", first: "", last: "" },
};

const fetchCharactersStart = (state, action) => {
	return updateObject(state, { loading: true });
};

const fetchCharactersSuccess = (state, action) => {
	return updateObject(state, {
		characters: action.characters,
		loading: false,
		success: true,
	});
};

const fetchCharactersFail = (state, action) => {
	return updateObject(state, { loading: false, error: action.error });
};

const selectCharacter = (state, action) => {
	return updateObject(state, {
		selected: action.selectedValue,
	});
};

const searchCharacter = (state, action) => {
	return updateObject(state, {
		inputed: action.inputedValue,
	});
};

const changePageSize = (state, action) => {
	return updateObject(state, {
		pageSize: action.pageSize,
	});
};

const setPagination = (state, action) => {
	return updateObject(state, {
		links: action.links,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CHARACTERS_START:
			return fetchCharactersStart(state, action);
		case actionTypes.FETCH_CHARACTERS_SUCCESS:
			return fetchCharactersSuccess(state, action);
		case actionTypes.FETCH_CHARACTERS_FAIL:
			return fetchCharactersFail(state, action);
		case actionTypes.SELECT_CHARACTER:
			return selectCharacter(state, action);
		case actionTypes.SEARCH_CHARACTER:
			return searchCharacter(state, action);
		case actionTypes.PAGE_SIZE:
			return changePageSize(state, action);
		case actionTypes.SET_PAGINATION:
			return setPagination(state, action);
		default:
			return state;
	}
};

export default reducer;
