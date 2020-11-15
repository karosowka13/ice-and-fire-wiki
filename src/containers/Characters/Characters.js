import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import * as actions from "../../store/actions/index";

import Spinner from "../../components/UI/Spinner/Spinner";
import TableHeader from "../../components/Table/TableHeader/TableHeader";
import TableBody from "../../components/Table/TableBody/TableBody";
import Filter from "./Filter/Filter";
import classes from "./Characters.module.css";
import Pagination from "./Pagination/Pagination";

class Characters extends Component {
	componentDidMount() {
		this.props.fetchCharacters(
			this.props.inputed,
			this.props.selected,
			this.props.pageSize
		);
	}
	state = {
		charactersHeaders: [
			"Name and Aliases",
			"Gender",
			"Culture",
			"Books' IDs",
			"Serial seasons",
		],
	};
	render() {
		let charactersTable = null;
		if (this.props.loading) {
			charactersTable = <Spinner />;
		} else if (this.props.charactersList) {
			charactersTable = (
				<React.Fragment>
					<TableBody data={this.props.charactersList} />
				</React.Fragment>
			);
		} else
			charactersTable = (
				<h2>
					If you think this has a happy ending, you haven’t been paying
					attention. Some error occurs, try again later.
				</h2>
			);
		return (
			<React.Fragment>
				<Filter />
				<div className={classes.Table}>
					{" "}
					<TableHeader tableHeaders={this.state.charactersHeaders} />
					{charactersTable}
				</div>
				<Pagination />
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		charactersList: state.characters.characters,
		loading: state.characters.loading,
		error: state.characters.error,
		inputed: state.characters.inputed,
		selected: state.characters.selected,
		pageSize: state.characters.pageSize,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCharacters: (inputed, selected, pageSize) =>
			dispatch(actions.fetchCharacters(inputed, selected, pageSize)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Characters)
);

Characters.propTypes = {
	fetchCharacters: PropTypes.func,
	charactersList: PropTypes.array,
	loading: PropTypes.bool,
	error: PropTypes.bool,
};
