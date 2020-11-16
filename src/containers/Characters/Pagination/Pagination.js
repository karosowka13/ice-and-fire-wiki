import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../../store/actions/index";
import { getPage } from "../../../shared/utility";
import classes from "./Pagination.module.css";
import Button from "../../../components/UI/Button/Button";
const Pagination = () => {
	const [actualPage, setActualPage] = useState(1);
	let first = null;
	let prev = null;
	let next = null;
	let last = null;

	const dispatch = useDispatch();
	const linksObject = useSelector((state) => state.characters.links);

	useEffect(() => {
		setActualPage(
			linksObject.prev
				? getPage(linksObject.prev) + 1
				: getPage(linksObject.next) - 1
		);
	}, [linksObject.prev, linksObject.next]);

	prev = (
		<Button
			key="prev"
			btnType="GoTo"
			disabled={!linksObject.prev}
			clicked={() => dispatch(actions.changePage(linksObject.prev))}
		>
			&lt;
		</Button>
	);

	next = (
		<Button
			key="next"
			btnType="GoTo"
			disabled={!linksObject.next}
			clicked={() => dispatch(actions.changePage(linksObject.next))}
		>
			&gt;
		</Button>
	);

	last = (
		<Button
			key="last"
			btnType="GoTo"
			disabled={!linksObject.next}
			clicked={() => dispatch(actions.changePage(linksObject.last))}
		>
			&gt;&gt;
		</Button>
	);

	first = (
		<Button
			key="first"
			btnType="GoTo"
			disabled={actualPage === 1}
			clicked={() => dispatch(actions.changePage(linksObject.first))}
		>
			&lt;&lt;
		</Button>
	);

	return (
		<div className={classes.Pagination}>
			{first} {prev} {actualPage}
			{next} {last}
		</div>
	);
};

export default withRouter(Pagination);
