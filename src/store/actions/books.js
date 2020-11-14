import * as actionTypes from "./actionTypes";
import axios from "axios";
import { getBookData } from "../../shared/utility";

export const fetchBooksSuccess = (books) => {
	return {
		type: actionTypes.FETCH_BOOKS_SUCCESS,
		books: books,
	};
};

export const fetchBooksFail = (error) => {
	return {
		type: actionTypes.FETCH_BOOKS_FAIL,
		error: true,
	};
};

export const fetchBooksStart = () => {
	return {
		type: actionTypes.FETCH_BOOKS_START,
	};
};

export const fetchBooks = () => {
	return (dispatch) => {
		dispatch(fetchBooksStart());
		axios
			.get("https://www.anapioficeandfire.com/api/books?pageSize=25")
			.then((res) => {
				const booksList = getBookData(res.data);
				dispatch(fetchBooksSuccess(booksList));
			})
			.catch((err) => {
				dispatch(fetchBooksFail(err));
			});
	};
};
