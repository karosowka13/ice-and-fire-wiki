import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Book.module.css";

class Book extends Component {
	state = {
		book: {},
		loading: true,
		error: false,
	};
	componentDidMount() {
		if (!this.props.successFetchBooks) {
			axios.get(
				`https://www.anapioficeandfire.com/api/books/1${this.props.match.params.id}`
			);
		}
	}

	render() {
		const { match } = this.props;
		let actualBook = null;
		let isReadyBook = null;
		let spinner = null;
		if (this.props.successFetchBooks) {
			this.props.bookList.forEach((book, index) => {
				if (index + 1 === match.params.id) {
					actualBook = book;
				} else isReadyBook = <Redirect to="/" />;
			});

			if (actualBook) {
				isReadyBook = (
					<div className={classes.Container}>
						<h2>Title:{actualBook.name}</h2>
						<div className={classes.Description}>
							<h3>ISBN:{actualBook.ISBN}</h3>
							<h3>{actualBook.nrPages}</h3>
							<h3>{actualBook.releaseDate}</h3>
						</div>
					</div>
				);
			}
		} else if (this.state.loading) {
			spinner = <Spinner />;
		}

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
