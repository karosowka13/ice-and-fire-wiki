import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchCharactersSuccess = (characters) => {
	return {
		type: actionTypes.FETCH_CHARACTERS_SUCCESS,
		characters: characters,
	};
};

export const fetchCharactersFail = (error) => {
	return {
		type: actionTypes.FETCH_CHARACTERS_FAIL,
		error: error,
	};
};

export const fetchCharactersStart = () => {
	return {
		type: actionTypes.FETCH_CHARACTERS_START,
	};
};

export const fetchCharacters = () => {
	return (dispatch) => {
		dispatch(fetchCharactersStart());
		axios
			.get("https://www.anapioficeandfire.com/api/characters")
			.then((res) => {
				const fetchedCharacters = [];
				const results = res.data.data.results;
				for (let i in results) {
					let books = [];
					for (let n = 0; n < results[i].books.length; n++) {
						books.push(results[i].books.items[n].name);
					}
					const isGender = results[i].gender ? results[i].gender : "Unknown";
					const isCulture = results[i].culture ? results[i].culture : "Unknown";
					let namesAndAliases = results[i].aliases;
					namesAndAliases.push(results[i].name).join(", ");
					fetchedCharacters.push({
						nameAndAliases: namesAndAliases,
						gender: isGender,
						culture: isCulture,
						books: books,
						numberOfSeasons: results[i].length,
					});
				}
				dispatch(fetchCharactersSuccess(fetchedCharacters));
			})
			.catch((err) => {
				dispatch(fetchCharactersFail(err));
			});
	};
};

export const inputChangeHandler = (event) => {
	const value = event.target.value;
	return { type: actionTypes.SEARCH_CHARACTER, inputedValue: value };
};

export const selectChangeHandler = (event) => {
	const value = event.target.value;
	return { type: actionTypes.SELECT_CHARACTER, selectedValue: value };
};
