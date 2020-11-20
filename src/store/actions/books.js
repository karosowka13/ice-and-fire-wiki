import * as actionTypes from "./actionTypes";
import axios from "axios";
import { getBookData } from "../../shared/utility";

export const fetchBooksSuccess = (books) => {
	return {
		type: actionTypes.FETCH_BOOKS_SUCCESS,
		books: books,
	};
};

export const fetchBooksFail = () => {
	return {
		type: actionTypes.FETCH_BOOKS_FAIL,
	};
};

export const fetchBooksStart = () => {
	return {
		type: actionTypes.FETCH_BOOKS_START,
	};
};

export const fetchBooks = () => {
	return async (dispatch) => {
		dispatch(fetchBooksStart());
		await axios
			.get("https://www.anapioficeandfire.com/api/books?pageSize=25")
			.then((res) => {
				const booksList = getBookData(res.data);
				dispatch(fetchBooksSuccess(booksList));
			})
			.catch((err) => {
				dispatch(fetchBooksFail());
			});
	};
};
