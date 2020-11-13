import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	characters: [],
	loading: false,
	error: null,
	success: false,
	inputed: "",
	selected: "",
	filteredCharacters: [],
};

const fetchCharactersStart = (state, action) => {
	return updateObject(state, { loading: true });
};

const fetchCharactersSuccess = (state, action) => {
	return updateObject(state, {
		characters: action.characters,
		filteredCharacters: action.characters,
		loading: false,
		success: true,
	});
};

const fetchCharactersFail = (state, action) => {
	return updateObject(state, { loading: false });
};

const selectCharacter = (state, action) => {
	let filteredCharactersNew = null;
	if (action.selectedValue === "") {
		filteredCharactersNew = state.characters;
	} else {
		filteredCharactersNew = state.characters.filter((character) =>
			character.comics
				.map((element) => element.includes(action.selectedValue))
				.includes(true)
		);
	}
	return updateObject(state, {
		filteredCharacters: filteredCharactersNew,
		selected: action.selectedValue,
	});
};

const searchCharacter = (state, action) => {
	let searchedCharactersNew = null;
	const regex = new RegExp(action.inputedValue, "i");
	if (action.inputedValue === "") {
		searchedCharactersNew = state.characters;
	} else
		searchedCharactersNew = state.characters.filter((character) =>
			character.name.match(regex)
		);
	return updateObject(state, {
		filteredCharacters: searchedCharactersNew,
		inputed: action.inputedValue,
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
		default:
			return state;
	}
};

export default reducer;
