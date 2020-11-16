import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import TableHeader from "../../components/Table/TableHeader/TableHeader";
import TableBody from "../../components/Table/TableBody/TableBody";
import classes from "./Books.module.css";

const Books = () => {
	const booksHeaders = ["Name", "ISBN", "Number of pages", "Release date"];
	const dispatch = useDispatch();
	const { booksList, loading } = useSelector(
		(state) => ({
			booksList: state.books.books,
			loading: state.books.loading,
		}),
		shallowEqual
	);
	useEffect(() => {
		const loadBooks = () => {
			dispatch(actions.fetchBooks());
		};
		loadBooks();
	}, [dispatch]);

	let booksTable = null;
	if (loading) {
		booksTable = <Spinner />;
	} else if (booksList) {
		booksTable = (
			<React.Fragment>
				<TableHeader tableHeaders={booksHeaders} />
				<TableBody data={booksList} />
			</React.Fragment>
		);
	} else
		booksTable = (
			<h2>
				If you think this has a happy ending, you haven’t been paying attention.
				Some error occurs, try again later.
			</h2>
		);
	return (
		<React.Fragment>
			<div className={classes.Table}>{booksTable}</div>
		</React.Fragment>
	);
};

export default Books;
