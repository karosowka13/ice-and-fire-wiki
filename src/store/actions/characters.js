import * as actionTypes from "./actionTypes";
import axios from "axios";
import { parseLinkHeader, getCharactersData } from "../../shared/utility";

export const fetchCharactersSuccess = (characters) => {
	return {
		type: actionTypes.FETCH_CHARACTERS_SUCCESS,
		characters: characters,
	};
};

export const fetchCharactersFail = (error) => {
	return {
		type: actionTypes.FETCH_CHARACTERS_FAIL,
		error: true,
	};
};

export const fetchCharactersStart = () => {
	return {
		type: actionTypes.FETCH_CHARACTERS_START,
	};
};

export const fetchCharacters = (inputed, selected, pageSize) => {
	return (dispatch) => {
		dispatch(fetchCharactersStart());
		const params = { name: inputed, gender: selected, pageSize: pageSize };
		axios
			.get("https://www.anapioficeandfire.com/api/characters", { params })
			.then((res) => {
				const charactersList = getCharactersData(res.data);
				dispatch(fetchCharactersSuccess(charactersList));
				dispatch(setPagination(res.headers.link));
			})
			.catch((err) => {
				dispatch(fetchCharactersFail(err));
			});
	};
};

export const inputSearchHandler = (event, selected, pageSize) => {
	const inputed = event.target.value;
	return (dispatch) => {
		dispatch(inputChangeHandler(inputed));
		dispatch(fetchCharacters(inputed, selected, pageSize));
	};
};

export const selectSearchHandler = (event, inputed, pageSize) => {
	const selected = event.target.value;
	return (dispatch) => {
		dispatch(selectChangeHandler(selected));
		dispatch(fetchCharacters(inputed, selected, pageSize));
	};
};

export const inputChangeHandler = (inputed) => {
	const value = inputed;
	return { type: actionTypes.SEARCH_CHARACTER, inputedValue: value };
};

export const selectChangeHandler = (selected) => {
	const value = selected;
	return { type: actionTypes.SELECT_CHARACTER, selectedValue: value };
};

export const selectPageSize = (event, inputed, selected) => {
	const pageSize = event.target.value;
	return (dispatch) => {
		dispatch(changePageSize(pageSize));
		dispatch(fetchCharacters(inputed, selected, pageSize));
	};
};

export const changePageSize = (pageSize) => {
	const value = pageSize;
	return { type: actionTypes.PAGE_SIZE, pageSize: value };
};

export const setPagination = (linkHeader) => {
	const linkObject = parseLinkHeader(linkHeader);
	return { type: actionTypes.SET_PAGINATION, links: linkObject };
};

export const changePage = (link) => {
	return (dispatch) => {
		dispatch(fetchCharactersStart());
		axios
			.get(link)
			.then((res) => {
				const charactersList = getCharactersData(res.data);
				dispatch(fetchCharactersSuccess(charactersList));
				dispatch(setPagination(res.headers.link));
			})
			.catch((err) => {
				dispatch(fetchCharactersFail(err));
			});
	};
};
