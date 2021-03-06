import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../store/actions/index";
import { getPage } from "../../../shared/utility";
import classes from "./Pagination.module.css";
import Button from "../../../components/UI/Button/Button";

const Pagination = () => {
	const [actualPage, setActualPage] = useState(1);

	const dispatch = useDispatch();
	const linksObject = useSelector((state) => state.characters.links);

	useEffect(() => {
		if (linksObject.first === linksObject.last) {
			setActualPage(1);
		} else
			setActualPage(
				linksObject.prev
					? getPage(linksObject.prev) + 1
					: getPage(linksObject.next) - 1
			);
	}, [linksObject]);

	const prev = (
		<Button
			key="prev"
			btnType="GoTo"
			disabled={!linksObject.prev}
			clicked={() => dispatch(actions.changePage(linksObject.prev))}
		>
			Previous page
		</Button>
	);

	const next = (
		<Button
			key="next"
			btnType="GoTo"
			disabled={!linksObject.next}
			clicked={() => dispatch(actions.changePage(linksObject.next))}
		>
			Next page
		</Button>
	);

	const last = (
		<Button
			key="last"
			btnType="GoTo"
			disabled={!linksObject.next}
			clicked={() => dispatch(actions.changePage(linksObject.last))}
		>
			Last page
		</Button>
	);

	const first = (
		<Button
			key="first"
			btnType="GoTo"
			disabled={actualPage === 1}
			clicked={() => dispatch(actions.changePage(linksObject.first))}
		>
			First page
		</Button>
	);

	return (
		<div className={classes.Pagination}>
			{first} {prev} {actualPage}
			{next} {last}
		</div>
	);
};

export default Pagination;
