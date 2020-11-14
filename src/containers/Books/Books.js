import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../store/actions/index";

import Spinner from "../../components/UI/Spinner/Spinner";
import TableHeader from "../../components/Table/TableHeader/TableHeader";
import TableBody from "../../components/Table/TableBody/TableBody";
import classes from "./Books.module.css";

class Books extends Component {
	componentDidMount() {
		this.props.fetchBooks();
	}
	render() {
		let booksTable = null;
		if (this.props.loading) {
			booksTable = <Spinner />;
		} else if (this.props.booksList) {
			const booksHeaders = ["Name", "ISBN", "Number of pages", "Release date"];
			booksTable = (
				<React.Fragment>
					<TableHeader tableHeaders={booksHeaders} />
					<TableBody data={this.props.booksList} />
				</React.Fragment>
			);
		} else
			booksTable = (
				<h2>
					If you think this has a happy ending, you haven’t been paying
					attention. Some error occurs, try again later.
				</h2>
			);
		return (
			<React.Fragment>
				<div className={classes.Table}>{booksTable}</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		booksList: state.books.books,
		loading: state.books.loading,
		error: state.books.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBooks: () => dispatch(actions.fetchBooks()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Books));
