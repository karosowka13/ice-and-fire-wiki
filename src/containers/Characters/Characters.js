import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import * as actions from "../../store/actions/index";

import Spinner from "../../components/UI/Spinner/Spinner";
import TableHeader from "../../components/Table/TableHeader/TableHeader";
import TableBody from "../../components/Table/TableBody/TableBody";
//import Filter from "./Filter/Filter";
import classes from "./Characters.module.css";

class Characters extends Component {
	componentDidMount() {
		this.props.fetchCharacters();
	}
	render() {
		let charactersTable = null;
		if (this.props.loading) {
			charactersTable = <Spinner />;
		} else if (this.props.charactersList) {
			const charactersHeaders = [
				"Name and Aliases",
				"Gender",
				"Culture",
				"Books' IDs",
				"Serial seasons",
			];
			charactersTable = (
				<React.Fragment>
					<TableHeader tableHeaders={charactersHeaders} />
					<TableBody data={this.props.charactersList} />
				</React.Fragment>
			);
		}
		return <div className={classes.Table}>{charactersTable}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		charactersList: state.characters.filteredCharacters,
		loading: state.characters.loading,
		error: state.characters.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCharacters: () => dispatch(actions.fetchCharacters()),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Characters)
);

Characters.propTypes = {
	fetchCharacters: PropTypes.func,
	charactersList: PropTypes.array,
	loading: PropTypes.bool,
};
