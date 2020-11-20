import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../store/actions/index";

import Spinner from "../../components/UI/Spinner/Spinner";
import TableHeader from "../../components/Table/TableHeader/TableHeader";
import TableBody from "../../components/Table/TableBody/TableBody";
import Filter from "./Filter/Filter";
import classes from "./Characters.module.css";
import Pagination from "./Pagination/Pagination";

const Characters = () => {
	const dispatch = useDispatch();

	const {
		charactersList,
		loading,
		inputed,
		selected,
		pageSize,
		error,
	} = useSelector(
		(state) => ({
			charactersList: state.characters.characters,
			loading: state.characters.loading,
			inputed: state.characters.inputed,
			selected: state.characters.selected,
			pageSize: state.characters.pageSize,
			error: state.characters.error,
		}),
		shallowEqual
	);

	useEffect(() => {
		const loadCharacters = () => {
			dispatch(actions.fetchCharacters(inputed, selected, pageSize));
		};
		loadCharacters();
	}, [inputed, selected, pageSize, dispatch]);
	const charactersHeaders = [
		"Name and Aliases",
		"Gender",
		"Culture",
		"Books' IDs",
		"Serial seasons",
	];
	let charactersTable = null;
	if (error) {
		charactersTable = (
			<h2>
				If you think this has a happy ending, you haven’t been paying attention.
				Some error occurs, try again later.
			</h2>
		);
	} else if (loading) {
		charactersTable = <Spinner />;
	} else if (charactersList) {
		charactersTable = (
			<React.Fragment>
				<TableBody data={charactersList} />
			</React.Fragment>
		);
	}
	return (
		<div className={classes.Container}>
			<Filter />
			<div className={classes.Table}>
				<TableHeader tableHeaders={charactersHeaders} />
				{charactersTable}
			</div>
			<Pagination />
		</div>
	);
};

export default withRouter(Characters);
