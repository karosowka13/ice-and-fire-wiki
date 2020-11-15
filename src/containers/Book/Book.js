import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { getBookData } from "../../shared/utility";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Book.module.css";

class Book extends Component {
	state = {
		book: null,
		loading: false,
		error: false,
		success: this.props.successFetchBooks,
	};
	fetchBook() {
		this.setState({ loading: true });
		axios
			.get(
				`https://www.anapioficeandfire.com/api/books/${this.props.match.params.id}`
			)
			.then((res) => {
				let fetchedBook = [];
				fetchedBook.push(res.data);
				let formatedBook = getBookData(fetchedBook);
				this.setState({
					loading: false,
					book: formatedBook,
				});
			})
			.catch((err) => this.setState({ error: true }));
	}
	render() {
		const { match } = this.props;
		let isReadyBook = null;
		let spinner = null;
		if (this.props.successFetchBooks) {
			this.props.bookList.forEach((book, index) => {
				if (index + 1 === match.params.id) {
					this.setState({ book: book, loading: false });
				}
			});
		} else if (
			!this.props.successFetchBooks &&
			!this.state.book &&
			!this.state.loading &&
			!this.state.error
		) {
			this.fetchBook();
		} else if (this.state.book) {
			const displayBook = this.state.book[0];
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
		} else if (this.state.loading) {
			spinner = <Spinner />;
		} else if (this.state.error) {
			isReadyBook = <h2>We are forcing some problems, pkeas try again.</h2>;
		} else isReadyBook = <Redirect to="/" />;

		return (
			<div className={classes.Background}>
				{spinner}
				{isReadyBook}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		bookList: state.books.books,
		successFetchBooks: state.books.success,
	};
};

export default withRouter(connect(mapStateToProps, null)(Book));
