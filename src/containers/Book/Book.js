import React, { useState } from "react";
import { withRouter, Redirect, useParams } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import axios from "axios";
import { getBookData } from "../../shared/utility";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Book.module.css";

const Book = () => {
	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const { id } = useParams();
	const { bookList, successFetchBooks } = useSelector(
		(state) => ({
			bookList: state.books.books,
			successFetchBooks: state.books.success,
		}),
		shallowEqual
	);

	const findBook = (bookList, id) => {
		bookList.forEach((book, index) => {
			if (index + 1 === Number(id)) {
				setBook(book);
				setLoading(false);
			}
		});
	};

	const fetchBook = (id) => {
		setLoading(true);
		axios
			.get(`https://www.anapioficeandfire.com/api/books/${id}`)
			.then((res) => {
				let fetchedBook = [];
				fetchedBook.push(res.data);
				let formatedBook = getBookData(fetchedBook);
				setBook(formatedBook[0]);
				setLoading(false);
			})
			.catch((err) => {
				setError(true);
				setLoading(false);
			});
	};

	let isReadyBook = null;
	let spinner = null;
	if (book) {
		const displayBook = book;
		isReadyBook = (
			<div className={classes.Container}>
				<h2>Title: {displayBook.name}</h2>
				<div className={classes.Description}>
					<h3>ISBN: {displayBook.ISBN}</h3>
					<h3>Pages: {displayBook.nrPages}</h3>
					<h3>Release date: {displayBook.releaseDate}</h3>
				</div>
			</div>
		);
	} else if (successFetchBooks) {
		findBook(bookList, id);
	} else if (!successFetchBooks && !book && !loading && !error) {
		fetchBook(id);
	} else if (loading) {
		spinner = <Spinner />;
	} else if (error) {
		isReadyBook = (
			<h2>
				We are forcing some problems, please try again. <br></br>Hint: check if
				the book id is correct.
			</h2>
		);
	} else isReadyBook = <Redirect to="/" />;

	return (
		<div className={classes.Background}>
			{spinner}
			{isReadyBook}
		</div>
	);
};

export default withRouter(Book);
